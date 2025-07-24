import '../styles/Dish.css';
<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import { useEffect, useState } from 'react';

>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dish() {
<<<<<<< HEAD
  const [dishes, setDishes] = useState([]);
=======
  const [user, setUser] = useState(null);
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
<<<<<<< HEAD
    const fetchDishes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/dishes');
        setDishes(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch dishes:", err);
        setError("Could not load dishes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, []);

  // This function navigates to the /chefs page with the selected dish name
  const handleDishClick = (dishName) => {
    navigate(`/chefs?dish=${encodeURIComponent(dishName)}`);
=======
    fetch('http://localhost:5000/auth/user', {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then((data) => {
        console.log("✅ Logged in user:", data);
        setUser(data);
      })
      .catch((err) => {
        console.log("⚠️", err.message);
        navigate('/login'); // redirect if not logged in
      });
  }, []);

  const handleDishClick = (dishName) => {
    navigate(`/chefs/${encodeURIComponent(dishName)}`);
>>>>>>> 4f6e398048a64578f4cade007a8ee07a870e8227
  };

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#FFFAF7', minHeight: '100vh' }}>
      <header className="header-center">
        <h1 className="brand-title">HomeBites</h1>
        <p className="hi">
          {user
            ? `Welcome, ${user.name || user.firstName}! Select which homemade food you want to enjoy today.`
            : 'Select which homemade food you want to enjoy today'}
        </p>

        <div className="search-container">
          <input
            type="text"
            id="searchInput"
            placeholder="Search your dish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search for dishes"
          />
        </div>
      </header>

      <main>
        <section className="food-grid" role="list" aria-label="Homemade food selection">
          {loading ? (
            <p className="status-text">Loading dishes...</p>
          ) : error ? (
            <p className="status-text error-text">{error}</p>
          ) : filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => (
              <article
                key={dish._id}
                tabIndex={0}
                className="food-card"
                role="listitem"
                aria-label={`Select homemade ${dish.name}`}
                // ** THIS IS THE CRITICAL LINE **
                // It ensures the correct function is called when a dish is clicked.
                onClick={() => handleDishClick(dish.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="food-image-container">
                  <img src={dish.image} alt={dish.alt} loading="lazy" />
                </div>
                <div className="food-label">{dish.name}</div>
              </article>
            ))
          ) : (
            <p className="status-text">No dishes found matching your search.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dish;
