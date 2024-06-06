import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';

export const Trade = () => {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState();
  const [userId, setUserId] = useState();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate('/');
    }
    setUserId(JSON.parse(loggedInUser).id);})

  const handleBuy = async() => {
    setError('');
    setMessage('');
    try {
      await axios.post(`http://localhost:8080/ml4t/transaction/add?ticker=${ticker}&quantity=${quantity}&type=BUY&id=${userId}`);
      setMessage(`Successfully bought ${quantity} of ${ticker}`);
      setTicker('');
      setQuantity('');

} catch (error) {
  setError('Error executing buy transaction. Please try again.');
  
};}

const handleSell = async() => {
  setError('');
    setMessage('');
  try {
    const response = await axios.post(`http://localhost:8080/ml4t/transaction/add?ticker=${ticker}&quantity=${quantity}&type=SELL&id=${userId}`);
    setMessage(`Successfully sold ${quantity} of ${ticker}`);
    setTicker('');
    setQuantity('');

} catch (error) {
setError('Error executing sell transaction. Please try again.');

};}
  return (
    
    
      <div style={{ flex: '2' }}>
      <h1>Trade</h1>
      <div>
        <label>
          Stock Ticker:
          <input 
            type="text" 
            value={ticker} 
            onChange={(e) => setTicker(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <button onClick={handleBuy}>Buy</button>
        <button onClick={handleSell}>Sell</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      </div>
  
  )
}
