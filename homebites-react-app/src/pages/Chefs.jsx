import React from 'react';
import '../styles/Chefs.css';
import { useNavigate } from 'react-router-dom';

const chefs = [
  {
    name: 'Ramya Sharma',
    specialty: 'Traditional South Indian & Homemade Curries',
    price: 299,
    rating: 4.8,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5e107373-f170-4e5c-bea2-cbb845c7434c.png',
  },
  {
    name: 'Priya Patel',
    specialty: 'Gujarati Thali & Sweet Dishes',
    price: 249,
    rating: 4.5,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ecf9f7ca-6be8-474f-b779-ee909236eafd.png',
  },
  {
    name: 'Arjun Singh',
    specialty: 'Punjabi Cuisine & Tandoori Specialties',
    price: 260,
    rating: 4.6,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94092e49-9719-4f5a-9140-3267535f2a48.png',
  },
  {
    name: 'Rekha Nair',
    specialty: 'Banaras Traditional Cuisine & Sweets',
    price: 299,
    rating: 4.7,
    image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/01b57c80-b51d-4cca-86c6-2bf54038bee3.png',
  }
];

const ChefsPage = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/cart');
  };

  return (
    <div className="chefs-container">
      <div className="location-buttons">
        <button className="location-btn">Current Location</button>
        <button className="location-btn">Enter Pincode</button>
      </div>
      <h1 className="chefs-title">HomeBites Chefs</h1>

      {chefs.map((chef, index) => (
        <div className="chef-profile" key={index}>
          <img src={chef.image} alt={chef.name} className="chef-photo" />
          <div className="chef-details">
            <h2>{chef.name}</h2>
            <p className="specialty">{chef.specialty}</p>
            <div className="cert-rating">
              <span className="badge">⭐ Hygienic Certified</span>
              <span className="rating">⭐ {chef.rating}</span>
            </div>
            <p className="price">Price: ₹{chef.price}</p>

            <button className="book-now-btn" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChefsPage;

