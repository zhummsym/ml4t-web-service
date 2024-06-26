import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";

export const Trade = () => {
  const [ticker, setTicker] = useState("");
  const [quantity, setQuantity] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
    }
    setUserId(JSON.parse(loggedInUser).id);
  });

  const handleBuy = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!ticker || !quantity) {
      setError("All fields are required.");
      return;
    }
    if (quantity <= 0 || !Number.isInteger(Number(quantity))) {
      setError("Quantity must be a positive integer.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/transaction/add?ticker=${ticker}&quantity=${quantity}&type=BUY&id=${userId}`
      );
      setMessage(`Successfully bought ${quantity} of ${ticker}`);
      setTicker("");
      setQuantity("");
    } catch (error) {
      setError(
        "Error executing buy transaction: " + error.response
          ? error.response.data
          : error.message
      );
    }
  };

  const handleSell = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!ticker || !quantity) {
      setError("All fields are required.");
      return;
    }
    if (quantity <= 0 || !Number.isInteger(Number(quantity))) {
      setError("Quantity must be a positive integer.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/transaction/add?ticker=${ticker}&quantity=${quantity}&type=SELL&id=${userId}`
      );
      setMessage(`Successfully sold ${quantity} of ${ticker}`);
      setTicker("");
      setQuantity("");
    } catch (error) {
      setError(
        "Error executing sell transaction: " + error.response
          ? error.response.data
          : error.message
      );
    }
  };
  return (
    <div>
      <h1>Trade</h1>
      <form>
        <div className="form-group mb-3">
          <label className="form-label">
            Stock Ticker
            <input
              type="text"
              className="form-control"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
            />
          </label>
        </div>
        <div className="form-group mb-3">
          <label className="form-label">
            Quantity
            <input
              type="number"
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              step="1"
            />
          </label>
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-success" onClick={handleBuy}>
            Buy
          </button>

          <button type="submit" className="btn btn-danger" onClick={handleSell}>
            Sell
          </button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};
