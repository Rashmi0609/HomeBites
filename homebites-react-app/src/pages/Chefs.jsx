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
          const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          window.open(googleMapsUrl, '_blank');
        },
        (error) => {
          alert('Failed to get your location. Please enable location access.');
          console.error(error);
        }
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
              <div className="cert-rating">
                <span className="badge">⭐ Hygienic Certified</span>
                <span className="rating">⭐ {chef.rating}</span>
              </div>
              <p className="price">Dishes: {chef.dishes?.join(', ')}</p>
              <button className="book-now-btn" onClick={() => handleBookNow(chef)}>
  Book Now
</button>

            </div>
          </div>
        ))
      ) : (
        <p>No chefs found for this dish.</p>
      )}
    </div>
  );
};

export default ChefsPage;
