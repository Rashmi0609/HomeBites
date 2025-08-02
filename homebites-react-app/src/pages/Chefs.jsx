import React, { useState, useEffect } from 'react';
import '../styles/Chefs.css';
// --- 1. IMPORT `useParams` TO READ THE ID FROM THE URL ---
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const ChefsPage = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDish, setSelectedDish] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  // --- 2. GET THE `id` PARAMETER FROM THE URL ---
  const { id } = useParams();

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        setLoading(true);
        setError(null);

        // --- 3. ADD LOGIC TO HANDLE BOTH SINGLE CHEF AND LIST OF CHEFS ---
        if (id) {
          // SCENARIO A: We are on a single chef page (e.g., /chef/6)
          const apiUrl = `http://localhost:5000/api/chefs/${id}`;
          const response = await axios.get(apiUrl);
          // The component expects an array, so we wrap the single chef object in an array
          setChefs(response.data ? [response.data] : []);
          setSelectedDish(`Details for ${response.data.name}`);

        } else {
          // SCENARIO B: We are on the list page (e.g., /chefs?dish=Paneer)
          // This is your original, working code for the list view.
          const searchParams = new URLSearchParams(location.search);
          const dishName = searchParams.get('dish');
          setSelectedDish(dishName || 'All Dishes');
          
          const apiUrl = dishName
            ? `http://localhost:5000/api/chefs?dish=${dishName}`
            : 'http://localhost:5000/api/chefs';
          
          const response = await axios.get(apiUrl);
          setChefs(response.data);
        }

      } catch (err) {
        console.error("Failed to fetch chefs:", err);
        setError("Could not load chefs. Please try again later.");
        setChefs([]); // Ensure chefs array is empty on error
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  // --- 4. ADD `id` TO THE DEPENDENCY ARRAY ---
  }, [id, location.search]);

  const handleBookNow = async (chefId) => {
    try {
      await axios.post('http://localhost:5000/api/cart', 
        { chefId: chefId },
        { withCredentials: true }
      );
      alert('Chef added to your cart!');
      navigate('/cart');
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

  // The rest of your JSX rendering logic remains exactly the same.
  // It works perfectly for both a single chef and a list of chefs.
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
