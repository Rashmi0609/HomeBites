import React, { useState, useEffect } from 'react';
import '../styles/Trackorder.css'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const TrackOrder = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // This hook fetches the user's latest order from the backend when the page loads
  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/orders/latest', {
          withCredentials: true, // Important for authentication
        });
        setOrder(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Could not find your latest order. Have you placed one yet?");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestOrder();
  }, []);

  // Define the possible stages of an order to build the status tracker
  const orderStages = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  // Find the index of the current order status
  const currentStageIndex = order ? orderStages.indexOf(order.status) : -1;

  // --- Render Logic ---

  if (loading) {
    return <div className="status-text">Loading Your Order Details...</div>;
  }
  
  if (error) {
    return (
      <div className="empty-order-container">
        <h2>{error}</h2>
        <button onClick={() => navigate('/dishes')} className="browse-dishes-btn">
          Place a New Order
        </button>
      </div>
    );
  }

  return (
    <div className="trackorder-wrapper">
      <div className="trackorder-card">
        <div className="trackorder-header">
          <div className="trackorder-logo">H</div>
          <h2 className="trackorder-brand">Home Bites</h2>
          <p className="trackorder-tagline">Thank you for your order!</p>
        </div>

        <h3 className="trackorder-subheading">Your Latest Order</h3>

        {/* This section now displays the dynamic status from the database */}
        <div className="trackorder-status">
          <p><strong className="trackorder-label">Order ID:</strong> {order._id}</p>
          <p><strong className="trackorder-label">Status:</strong> {order.status}</p>
          
          <hr className="trackorder-divider" />

          {/* The status steps are now dynamically highlighted */}
          {orderStages.map((stage, index) => (
            <div className="trackorder-status-row" key={index}>
              <div className="trackorder-status-label">
                {/* Using text icons for simplicity, you can replace with material icons if you have them set up */}
                <span>{['📦', '🍳', '🚚', '🏠'][index]}</span>
                <span>{stage}</span>
              </div>
              <span
                className={`trackorder-status-box ${
                  index <= currentStageIndex ? 'trackorder-done' : ''
                }`}
              ></span>
            </div>
          ))}

          <hr className="trackorder-divider" />

          {/* These are placeholders as the data doesn't exist in the DB yet */}
          <p><strong className="trackorder-label">Delivery Boy Name:</strong> Rohan Kumar</p>
          <p><strong className="trackorder-label">Contact No:</strong> +91 9876543210</p>
        </div>

        {/* --- Live Location Tracking Simulation --- */}
        <div className="location-tracker">
            <h4>Live Tracking</h4>
            <div className="map-container">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d90013.81839942948!2d77.2219655972595!3d28.60913051614263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sIndia%20Gate%2C%20New%20Delhi%2C%20Delhi!3m2!1d28.612912!2d77.2295097!4m5!1s0x390ce2db961be393%3A0xadd6d5d58de0f66c!2sHauz%20Khas%2C%20New%20Delhi%2C%20Delhi!3m2!1d28.5493344!2d77.2004462!5e0!3m2!1sen!2sin!4v1658766185411!5m2!1sen!2sin" 
                    width="100%" 
                    height="250" 
                    style={{ border: 0, borderRadius: '8px' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
        <Link to="/dishes" className="back-to-home-btn">Place Another Order</Link>
      </div>
    </div>
  );
};

export default TrackOrder;
