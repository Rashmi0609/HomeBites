import '../styles/Dish.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dish() {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

  const handleDishClick = (dishName) => {
    navigate(`/chefs?dish=${encodeURIComponent(dishName)}`);
  };

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#FFFAF7', minHeight: '100vh' }}>
      <header className="header-center">
        <h1 className="brand-title">HomeBites</h1>
        <p className="hi">Select which homemade food you want to enjoy today</p>
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
