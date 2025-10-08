"use client";
import { useEffect, useState } from "react";

export default function StatementTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data
  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/expenses", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading)
    return (
      <div className="text-gray-400 text-center p-4">Loading statements…</div>
    );
  if (error)
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  if (!transactions.length)
    return (
      <div className="text-gray-500 text-center p-4">
        No transactions found.
      </div>
    );

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = transactions.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="bg-gray-950/90 border border-green-400/30 rounded-xl shadow-lg shadow-green-900/40 p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
        Transaction Statements
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-900 text-green-400 uppercase tracking-wide text-xs">
            <tr>
              <th className="px-4 py-3 text-left border-b border-green-400/30">
                Description
              </th>
              <th className="px-4 py-3 text-left border-b border-green-400/30">
                Type
              </th>
              <th className="px-4 py-3 text-left border-b border-green-400/30">
                Payment
              </th>
              <th className="px-4 py-3 text-right border-b border-green-400/30">
                Amount (₹)
              </th>
              <th className="px-4 py-3 text-left border-b border-green-400/30">
                Date
              </th>
              <th className="px-4 py-3 text-left border-b border-green-400/30">
                Day
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-green-400/10 hover:bg-gray-900/50 transition"
              >
                <td className="px-4 py-3 text-gray-200">{tx.description}</td>
                <td className="px-4 py-3 text-gray-300">
                  <span className="px-2 py-1 rounded-md text-xs bg-green-400/20 text-green-300">
                    {tx.transaction_type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-300">{tx.payment_method}</td>
                <td className="px-4 py-3 text-right font-semibold text-emerald-400">
                  ₹{Number(tx.amount).toLocaleString("en-IN")}
                </td>
                <td className="px-4 py-3 text-gray-400">
                  {new Date(tx.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-gray-400">{tx.day}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-4 text-gray-300">
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border border-green-400/30 hover:border-green-400 hover:shadow-[0_0_6px_rgba(34,197,94,0.6)] transition-all ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          ← Previous
        </button>

        <span className="text-sm text-gray-400">
          Page <span className="text-green-400">{currentPage}</span> of {totalPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border border-green-400/30 hover:border-green-400 hover:shadow-[0_0_6px_rgba(34,197,94,0.6)] transition-all ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next →
        </button>
      </div>
      </div>
    </div>
  );
}
