import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';


export const Portfolio = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate('/');
    }
    const userId = JSON.parse(loggedInUser).id;

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/ml4t/transaction/find/${userId}`);
        const transactionsData = response.data;
        console.log(transactionsData);
        setTransactions(transactionsData);
      
        let totalCost = 0;
        let totalValue = 0;

        transactionsData.forEach(transaction => {
          if (transaction.type === 'BUY') {
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
        setError('Error fetching transactions. Please try again.');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate])


  return (
    <div>
      <h1>Portfolio</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (!loading &&
        <div>
          <h2 style={{ color: totalValue - totalCost >= 0 ? 'green' : 'red' }}>
            Total Portfolio Value: ${totalValue.toFixed(2)}
          </h2>
          <h3>Transaction History</h3>
          <table>
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
                <tr key={transaction.id} >
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.ticker}</td>
                  <td>{transaction.quantity}</td>
                  <td>${transaction.purchasePrice.toFixed(2)}</td>
                  <td>{transaction.type === 'SELL' ? '+' : '-'}${(transaction.purchasePrice * transaction.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>

  )
}
