<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Chefs.css';

const ChefsPage = () => {
  const { dish } = useParams();

  const [chefs, setChefs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchChefs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chefs/${dish}`);
      const data = await response.json();
      setChefs(data);
    } catch (err) {
      console.error("Failed to fetch chefs:", err);
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
    }
  };

  if (dish) {
    fetchChefs();
  }
}, [dish]);

  const handleBookNow = async (chef) => {
  if (!user || !user._id) {
    alert("Please login to add items to cart.");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        userId: user._id,
        chefId: chef._id,
        dishName: dish,

        quantity: 1 // default to 1
      })
    });

    if (response.ok) {
      navigate("/cart");
    } else {
      alert("Failed to add to cart.");
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Something went wrong.");
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
<<<<<<< HEAD
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
=======

     <h1 className="chefs-title">Chefs for "{decodeURIComponent(dish)}"</h1>


      {chefs.length > 0 ? (
        chefs.map((chef, index) => (
          <div className="chef-profile" key={index}>
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
              <p className="specialty">{chef.location}</p>
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
              <div className="cert-rating">
                <span className="badge">⭐ Hygienic Certified</span>
                <span className="rating">⭐ {chef.rating}</span>
              </div>
<<<<<<< HEAD
              <p className="price">Price: ₹{chef.price}</p>
              {/* The button now passes the specific chef's ID */}
              <button className="book-now-btn" onClick={() => handleBookNow(chef._id)}>
                Book Now
              </button>
=======
              <p className="price">Dishes: {chef.dishes?.join(', ')}</p>
              <button className="book-now-btn" onClick={() => handleBookNow(chef)}>
  Book Now
</button>

>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
            </div>
          </div>
        ))
      ) : (
<<<<<<< HEAD
        <p className="status-text">No chefs found for this dish.</p>
=======
        <p>No chefs found for this dish.</p>
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
      )}
    </div>
  );
};

export default ChefsPage;
