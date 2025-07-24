import React, { useState, useEffect } from 'react';
import '../styles/Chefs.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ChefsPage = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDish, setSelectedDish] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const dishName = searchParams.get('dish');
    setSelectedDish(dishName || 'All Dishes');

    const fetchChefs = async () => {
      try {
        setLoading(true);
        const apiUrl = dishName
          ? `http://localhost:5000/api/chefs?dish=${dishName}`
          : 'http://localhost:5000/api/chefs';
        
        const response = await axios.get(apiUrl);
        setChefs(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch chefs:", err);
        setError("Could not load chefs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, [location.search]);

  // --- THIS IS THE KEY CHANGE ---
  // This function now sends a request to the backend to add a chef to the cart.
  const handleBookNow = async (chefId) => {
    try {
      // Send the chef's ID to the backend /api/cart endpoint
      await axios.post('http://localhost:5000/api/cart', 
        { chefId: chefId },
        { withCredentials: true } // Important: This sends the user's session cookie
      );
      
      alert('Chef added to your cart!');
      navigate('/cart'); // Automatically take the user to their cart
    } catch (error) {
      console.error('Error booking chef:', error);
      alert(error.response?.data?.message || 'Failed to add chef to cart. Are you logged in?');
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
        },
        (error) => alert('Failed to get your location. Please enable location access.')
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="chefs-container">
      <div className="location-buttons">
        <button className="location-btn" onClick={handleCurrentLocation}>
          Current Location
        </button>
      </div>
      <h1 className="chefs-title">
        Showing Chefs for: <span className="dish-selection">{selectedDish}</span>
      </h1>

      {loading ? (
        <p className="status-text">Loading chefs...</p>
      ) : error ? (
        <p className="status-text error-text">{error}</p>
      ) : chefs.length > 0 ? (
        chefs.map((chef) => (
          <div className="chef-profile" key={chef._id}>
            <img src={chef.image} alt={chef.name} className="chef-photo" />
            <div className="chef-details">
              <h2>{chef.name}</h2>
              <p className="specialty">{chef.specialty}</p>
              <div className="cert-rating">
                <span className="badge">⭐ Hygienic Certified</span>
                <span className="rating">⭐ {chef.rating}</span>
              </div>
              <p className="price">Price: ₹{chef.price}</p>
              {/* The button now passes the specific chef's ID */}
              <button className="book-now-btn" onClick={() => handleBookNow(chef._id)}>
                Book Now
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="status-text">No chefs found for this dish.</p>
      )}
    </div>
  );
};

export default ChefsPage;
