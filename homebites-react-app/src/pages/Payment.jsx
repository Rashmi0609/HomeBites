import React, { useState } from 'react';
import '../styles/Payment.css';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const price = 299;

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMethod) {
      alert(`Payment method: ${selectedMethod}`);
    }
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-container">

        <div className="brand">
          <div className="logo-circle">H</div>
          <h1 className="brand-text">Home Bites</h1>
          <p className="tagline">City Moms, Cooking with Love</p>
        </div>


        <section className="cart">
          <h2><span className="material-icons">shopping_cart</span> Your Cart</h2>
          <div className="cart-item">
            <div className="item-info">
              <span>Chole Bhature Kit ₹{price}</span>
            </div>
            <div className="quantity">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>
          <hr />
          <div className="total">Total: ₹{quantity * price}</div>
        </section>


        <section className="payment-section">
          <h2><span className="material-icons">credit_card</span> Select Payment Method</h2>
          <form onSubmit={handleSubmit}>
            <div className="payment-options">
              {[
                { label: 'PhonePe', icon: 'phone_iphone', method: 'phonepe' },
                { label: 'Google Pay (GPay)', icon: 'account_balance_wallet', method: 'gpay' },
                { label: 'Cash on Delivery', icon: 'local_shipping', method: 'cod' }
              ].map(({ label, icon, method }) => (
                <div
                  key={method}
                  className={`payment-option ${selectedMethod === method ? 'selected' : ''}`}
                  onClick={() => handleSelectMethod(method)}
                >
                  <span className="material-icons">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <button type="submit" disabled={!selectedMethod}>
              Confirm Payment Method
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Payment;
