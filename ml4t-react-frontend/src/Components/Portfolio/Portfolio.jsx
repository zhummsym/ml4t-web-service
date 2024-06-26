import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export const Portfolio = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
    const userId = JSON.parse(loggedInUser).id;

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/transaction/find/${userId}`
        );
        const transactionsData = response.data;
        setTransactions(transactionsData);

        let totalCost = 0;
        let totalValue = 0;

        transactionsData.forEach((transaction) => {
          if (transaction.type === "BUY") {
            totalCost += transaction.quantity * transaction.purchasePrice;
            totalValue += transaction.quantity * transaction.currentPrice;
          } else {
            totalCost -= transaction.quantity * transaction.purchasePrice;
            totalValue -= transaction.quantity * transaction.currentPrice;
          }
        });
        setTotalCost(totalCost);
        setTotalValue(totalValue);
        setLoading(false);
      } catch (error) {
        setError(error.response ? error.response.data : error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  return (
    <div>
      <h1>Portfolio</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        !loading && (
          <div>
            <h2>
              <span>Total Portfolio Value: </span>
              <span
                style={{ color: totalValue - totalCost >= 0 ? "green" : "red" }}
              >
                ${totalValue.toFixed(2)}
              </span>
            </h2>
            <h3>Transaction History: </h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Ticker</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.ticker.toUpperCase()}</td>
                    <td>{transaction.quantity}</td>
                    <td>${transaction.purchasePrice.toFixed(2)}</td>
                    <td>
                      {transaction.type === "SELL" ? "+" : "-"}$
                      {(
                        transaction.purchasePrice * transaction.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};
