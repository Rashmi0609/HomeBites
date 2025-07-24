import '../styles/Dish.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dishes = [
  {
    name: 'Paneer Naan',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/67a2e3e4-de07-4242-ab1f-896609586bee.png',
    alt: 'Fresh homemade paneer naan bread with cheesy filling and garnished with herbs',
  },
  {
    name: 'Chicken Curry',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/19b6ea5a-bc57-4ce0-9629-9d48d7f0ada3.png',
    alt: 'Bowl of homemade chicken curry with creamy sauce and rice',
  },
  {
    name: 'Vegetable Stir Fry',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ba080565-911a-4820-a924-1f66cc95e477.png',
    alt: 'Colorful vegetable stir fry with bell peppers, broccoli and snap peas',
  },
  {
    name: 'Chole Bhature',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/db2b6242-76e5-44c4-9a40-4c2fbbca083b.png',
    alt: 'Plate of spicy chole curry served with fluffy fried bhature bread',
  },
  {
    name: 'Thal',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f7a72b89-327b-4f8b-ab0b-306583adb883.png',
    alt: 'Traditional Thal meal served on a round platter with various curries, rice, and breads',
  },
  {
    name: 'Caesar Salad',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c10cffc8-ba50-442c-a9d1-107a8b1f7d87.png',
    alt: 'Fresh homemade Caesar salad with crunchy croutons and shaved parmesan',
  },
  {
    name: 'Curry Chawal',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eeac2b07-7130-4b44-8b69-00ed7a70d79f.png',
    alt: 'Plate of traditional curry chawal with rice and rich curry sauce',
  },
  {
    name: 'Fire Rice',
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7bcbf6bf-6f34-4ea4-bca3-39225bd725ab.png',
    alt: 'Spicy fire rice dish served with vibrant vegetables and chili peppers',
  },
];

function Dish() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleDishClick = (dishName) => {
  navigate(`/chefs/${encodeURIComponent(dishName)}`);
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
          <span className="material-icons search-icon"></span>
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
          {filteredDishes.length > 0 ? (
            filteredDishes.map((dish, index) => (
              <article
                key={index}
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
            <p style={{ textAlign: 'center', fontWeight: 'bold', padding: '2rem' }}>
              No dishes found.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dish;
