import React, { useState, useEffect } from 'react';
import '../styles/Payment.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/cart', {
          withCredentials: true,
        });
        if (response.data.length === 0) {
          navigate('/dishes');
        } else {
          setCartItems(response.data);
        }
        setError(null);
      } catch (err) {
        setError("Could not load your cart.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert('Please select a payment method.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/orders', 
        { paymentMethod: selectedMethod },
        { withCredentials: true }
      );
      
      alert('Order placed successfully!');
      navigate('/trackorder');

    } catch (error) {
      console.error('Payment error:', error);
      alert(error.response?.data?.message || 'Failed to place order.');
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.chef.price, 0);

  if (loading) return <div className="status-text">Loading Payment Details...</div>;
  if (error) return <div className="status-text error-text">{error}</div>;

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <div className="brand">
          <div className="logo-circle">H</div>
          <h1 className="brand-text">Home Bites</h1>
          <p className="tagline">Confirm Your Order</p>
        </div>

        <section className="cart">
          <h2>Your Bookings</h2>
          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <div className="item-info">
                <span>{item.chef.name}</span>
                <span>₹{item.chef.price}</span>
              </div>
            </div>
          ))}
          <hr />
          <div className="total">Total: ₹{totalPrice}</div>
        </section>

        <section className="payment-section">
          <h2>Select Payment Method</h2>
          <form onSubmit={handleSubmit}>
            {/* --- THIS IS THE UPDATED SECTION --- */}
            <div className="payment-options">
              {[
                { label: 'Razorpay', method: 'Razorpay' },
                { label: 'Cash on Delivery', method: 'Cash on Delivery' }
              ].map(({ label, method }) => (
                <div
                  key={method}
                  className={`payment-option ${selectedMethod === method ? 'selected' : ''}`}
                  onClick={() => handleSelectMethod(method)}
                  tabIndex={0}
                >
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <button type="submit" disabled={!selectedMethod || loading}>
              Confirm & Place Order
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Payment;