import { db } from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { description, transactionType, paymentMethod, amount } = req.body;

    if (!description || !transactionType || !paymentMethod || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const [result] = await db.query(
        `INSERT INTO expenses 
        (description, transaction_type, payment_method, amount, date)
        VALUES (?, ?, ?, ?, NOW())`,
        [description, transactionType, paymentMethod, amount]
      );
      return res.status(201).json({ id: result.insertId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }

  } else if (req.method === "GET") {
    try {
      const [rows] = await db.query(
        `SELECT * FROM expenses ORDER BY date DESC`
      );
      return res.status(200).json(rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
