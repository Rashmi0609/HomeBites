import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Cart.css"; // Your main stylesheet

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/cart', {
          withCredentials: true,
        });
        setCartItems(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setError("Could not load your cart. Please try logging in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/cart/${itemId}`, {
            withCredentials: true,
        });
        setCartItems(response.data);
        alert('Chef removed from cart.');
    } catch (error) {
        console.error('Error removing item:', error);
        alert(error.response?.data?.message || 'Failed to remove item from cart.');
    }
  };
  
  const handleProceedToPayment = () => {
    navigate("/payment");
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.chef.price, 0);

  return (
    <div className="cart-page-container">
      {/* --- STYLE FIX FOR THE IMAGE --- */}
      <style>{`
        .cart-item-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background-color: #fff;
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }
        .cart-item-image {
          width: 120px;   /* Sets a fixed width for the image */
          height: 120px;  /* Sets a fixed height for the image */
          border-radius: 8px;
          object-fit: cover; /* Ensures the image covers the area without distortion */
        }
      `}</style>

      <header className="cart-header">
        <h1>Your Bookings</h1>
        <p>Review the chefs you've selected before proceeding to payment.</p>
      </header>
      
      <main className="cart-main">
        {loading ? (
          <p className="status-text">Loading your cart...</p>
        ) : error ? (
          <p className="status-text error-text">{error}</p>
        ) : cartItems.length > 0 ? (
          <div className="cart-content">
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item-card" key={item._id}>
                  <img src={item.chef.image} alt={item.chef.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h2>{item.chef.name}</h2>
                    <p className="specialty">{item.chef.specialty}</p>
                    <p className="price">Price: ₹{item.chef.price}</p>
                  </div>
                  <button 
                    className="remove-item-btn" 
                    onClick={() => handleRemoveItem(item._id)}
                    aria-label={`Remove ${item.chef.name} from cart`}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Taxes & Fees</span>
                <span>₹{(totalPrice * 0.1).toFixed(2)}</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{(totalPrice * 1.1).toFixed(2)}</span>
              </div>
              <button 
                className="payment-btn" 
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <h2>Your cart is empty.</h2>
            <p>Go to the dishes page to find and book a chef!</p>
            <button onClick={() => navigate('/dishes')} className="browse-dishes-btn">
              Browse Dishes
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
