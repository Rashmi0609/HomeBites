import React, { useState, useEffect } from 'react';
import '../styles/Chefs.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ChefsPage = ({ user }) => {
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

  const handleBookNow = async (chefId) => {
    if (!user || !user._id) {
      alert("Please login to add items to cart.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart",
        { chefId },
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        alert('Chef added to your cart!');
        navigate('/cart');
      } else {
        alert("Failed to add to cart.");
      }
    } catch (error) {
      console.error('Error booking chef:', error);
      alert(error.response?.data?.message || 'Failed to add chef to cart. Are you logged in?');
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
        },
        () => alert('Failed to get your location. Please enable location access.')
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
            <img
              src={chef.image}
              alt={chef.name}
              className="chef-photo"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-chef.jpeg';
              }}
            />
            <div className="chef-details">
              <h2>{chef.name}</h2>
              <p className="specialty">{chef.specialty || chef.location}</p>
              <div className="cert-rating">
                <span className="badge">⭐ Hygienic Certified</span>
                <span className="rating">⭐ {chef.rating}</span>
              </div>
              <p className="price">Price: ₹{chef.price}</p>
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
