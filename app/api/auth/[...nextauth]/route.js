import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs"; // for password hashing

const handler = NextAuth({
  providers: [
    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // Credentials (username/email + password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const db = await mysql.createConnection({
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        });

        const [rows] = await db.execute(
          "SELECT * FROM users WHERE email = ?",
          [credentials.email]
        );

        await db.end();

        if (rows.length === 0) {
          throw new Error("No user found");
        }

        const user = rows[0];
        const passwordValid = await bcrypt.compare(credentials.password, user.password);

        if (!passwordValid) {
          throw new Error("Invalid password");
        }

        return { id: user.user_id, name: user.username, email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    // Attach DB user_id to session
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id || user.user_id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },

    // Handle new GitHub users
    async signIn({ user, account }) {
      if (account.provider === "github") {
        const db = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        });

        const [existingUser] = await db.execute(
          "SELECT * FROM users WHERE email = ?",
          [user.email]
        );

        if (existingUser.length === 0) {
          await db.execute(
            "INSERT INTO users (username, email, mobile, password) VALUES (?, ?, ?, ?)",
            [user.name || "GitHub User", user.email, "", ""]
          );
        }

        await db.end();
      }

      return true;
    },
  },

  pages: {
    signIn: "/signin", // use your custom Signin page
  },
});

export { handler as GET, handler as POST };
