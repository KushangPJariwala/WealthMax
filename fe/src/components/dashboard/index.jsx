/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../../styles/dashboard.css"; // Assuming you have a separate CSS file for styling
import { useNavigate } from "react-router-dom";
import { symbolMapping } from "../../constants/symbolMaping";

export default function Dashboard() {
  const navigate = useNavigate();
  const [priceData, setPriceData] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state
  // Symbol to Stock Name mapping

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket("ws://localhost:8081");

    // Listen for messages (price updates) from the server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // console.log("Received data from WebSocket:", data);

      // Update the price data for the corresponding symbol
      setPriceData((prevData) => ({
        ...prevData,
        [data.symbol]: {
          currentPrice: data.currentPrice,
          priceDifference: data.priceDifference,
          percentageDifference: data.percentageDifference,
        },
      }));

      // Set loading to false after first data comes in
      setLoading(false);
    };

    // Clean up the WebSocket connection when the component is unmounted
    // return () => {
    //   ws.close();
    // };
  }, []);

  // Show loader while waiting for data
  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
        <p>Loading market data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Market Overview</h1>
      <div className="indices-section">
        {Object.keys(priceData).map((symbol) => (
          <div
            key={symbol}
            className="symbol-card"
            onClick={() => navigate(`/marketDetails/${symbol}`)}
          >
            <h2>{symbolMapping[symbol].symbol || symbol}</h2>{" "}
            {/* Display stock name */}
            <p className="price">
              ₹
              {priceData[symbol].currentPrice
                ? priceData[symbol].currentPrice.toFixed(2)
                : "0.00"}
            </p>
            <p
              className={`price-difference ${
                priceData[symbol].priceDifference >= 0 ? "positive" : "negative"
              }`}
            >
              {priceData[symbol].priceDifference
                ? priceData[symbol].priceDifference
                : "0.00"}{" "}
              (
              {priceData[symbol].percentageDifference
                ? priceData[symbol].percentageDifference
                : "0.00%"}
              )
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
