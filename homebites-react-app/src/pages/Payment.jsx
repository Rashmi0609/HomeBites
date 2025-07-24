import React, { useState, useEffect } from 'react';
import '../styles/Payment.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
  // State for dynamic data from the backend
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for user interaction
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigate = useNavigate();

  // Fetch the user's cart data when the page loads
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/cart', {
          withCredentials: true, // Important for authentication
        });
        if (response.data.length === 0) {
          // If the cart is empty, the user shouldn't be here. Redirect them.
          alert("Your cart is empty. Redirecting to dishes page.");
          navigate('/dishes');
        } else {
          setCartItems(response.data);
        }
        setError(null);
      } catch (err) {
        setError("Could not load your cart. Please log in and try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [navigate]);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  // This function now sends the order to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      alert('Please select a payment method.');
      return;
    }
    try {
      // Send the request to create a new order in the database
      await axios.post('http://localhost:5000/api/orders', 
        { paymentMethod: selectedMethod },
        { withCredentials: true }
      );
      
      alert('Order placed successfully!');
      navigate('/trackorder'); // Navigate to the order tracking page

    } catch (error) {
      console.error('Payment error:', error);
      alert(error.response?.data?.message || 'Failed to place order.');
    }
  };

  // Calculate total price dynamically from the cart
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

        {/* This section now dynamically displays items from the user's cart */}
        <section className="cart">
          <h2><span className="material-icons">shopping_cart</span> Your Bookings</h2>
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
          <h2><span className="material-icons">credit_card</span> Select Payment Method</h2>
          <form onSubmit={handleSubmit}>
            <div className="payment-options">
              {[
                { label: 'PhonePe', icon: 'phone_iphone', method: 'PhonePe' },
                { label: 'Google Pay (GPay)', icon: 'account_balance_wallet', method: 'Google Pay (GPay)' },
                { label: 'Cash on Delivery', icon: 'local_shipping', method: 'Cash on Delivery' }
              ].map(({ label, icon, method }) => (
                <div
                  key={method}
                  className={`payment-option ${selectedMethod === method ? 'selected' : ''}`}
                  onClick={() => handleSelectMethod(method)}
                  tabIndex={0}
                >
                  <span className="material-icons">{icon}</span>
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
