import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",       // Your MySQL host
  user: "root",            // Your MySQL username
  password: "password",    // Your MySQL password
  database: "expense_tracker",
});
