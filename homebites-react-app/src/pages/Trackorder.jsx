import React from 'react';
import '../styles/Trackorder.css'; 

const TrackOrder = () => {
  return (
    
    <div className="trackorder-wrapper">
      <div className="trackorder-card">
        <div className="trackorder-header">
          <div className="trackorder-logo">H</div>
          <h2 className="trackorder-brand">Home Bites</h2>
          <p className="trackorder-tagline">City Moms, Cooking with Love</p>
        </div>

        <h3 className="trackorder-subheading">Track Your Order</h3>
        <input
          type="text"
          className="trackorder-input"
          placeholder="Enter your Order ID (e.g., 12)"
        />
        <button className="trackorder-button">Track Order</button>


        <div className="trackorder-status">
          <strong className="trackorder-label">Order ID:</strong>
          <strong className="trackorder-label">Status:</strong>

          {[
            { icon: 'inventory_2', label: 'Received', done: true },
            { icon: 'autorenew', label: 'Processing', done: true },
            { icon: 'local_shipping', label: 'Shipped', done: true },
            { icon: 'home', label: 'Delivered', done: false }
          ].map((step, index) => (
            <div className="trackorder-status-row" key={index}>
              <div className="trackorder-status-label">
                <i className="material-icons">{step.icon}</i>
                <span>{step.label}</span>
              </div>
              <span
                className={`trackorder-status-box ${
                  step.done ? 'trackorder-done' : ''
                }`}
              ></span>
            </div>
          ))}

          <strong className="trackorder-label">Delivery Boy Name:</strong>
          <strong className="trackorder-label">Contact No:</strong>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
