import React from "react";
import "./../styles/mainpage.css";
import { Link } from "react-router-dom";

function MainPage({ user }) {
    const handleLogout = () => {
    window.open("http://localhost:5000/logout", "_self");
  };

  return (
    <>
      <header>
      
        <div className="logo">
          <div className="circle">H</div>
          <span className="logo-text">HomeBites</span>
        </div>

        <nav>
          <a href="#features">Features</a>
          <a href="#dishes">Dishes</a>
          <a href="#contact">Contact</a>
          <span className="nav-buttons">
  {user ? (
    <>
      <span style={{ marginRight: '10px' }}>👋 {user.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </>
  ) : (
    <>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </>
  )}
</span>


        </nav>
      </header>

      <section className="hero">
        <h1>City Moms, Cooking with Love</h1>
        <p>Wholesome meals straight from their kitchen to your doorstep</p>
        <p className="para">“Har bite mein maa ka haath.”</p>
      </section>

      <section id="features" className="section">
        <h2>Why Choose Us?</h2>
        <div className="cards">
          <div className="card">
            <img
              src="https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2865,w_3934,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/photo_3_nxdhiw.jpg"
              alt="Healthy"
            />
            <h3>Fresh & Healthy</h3>
            <p>Every meal is cooked fresh with high-quality ingredients.</p>
          </div>

          <div className="card">
            <img
              src="https://img.freepik.com/premium-photo/indian-mother-cooking-kitchen_924463-5189.jpg?w=2000"
              alt="Verified Chefs"
            />
            <h3>Verified Home Chefs</h3>
            <p>Cooked by trained and trusted moms from your city.</p>
          </div>

          <div className="card">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/007/951/021/small_2x/delivery-man-delivering-holding-parcel-box-to-customer-free-photo.jpg"
              alt="On-time Delivery"
            />
            <h3>On-time Delivery</h3>
            <p>Timely delivery with freshness intact.</p>
          </div>
        </div>
      </section>

      <section id="dishes" className="section">
        <h2>Popular Dishes</h2>
        <div className="cards">
          <div className="card">
            <img
              src="https://i.pinimg.com/originals/e1/da/d5/e1dad5315972c8a9db86fb01d69c7ecb.jpg"
              alt="Thali"
            />
            <h3>Traditional Thali</h3>
            <p>A complete meal to satisfy your taste buds.</p>
          </div>

          <div className="card">
            <img
              src="https://img.freepik.com/premium-photo/matar-paneer-with-garnish-dried-fenugreek_1177965-75431.jpg"
              alt="Paneer Curry"
            />
            <h3>Paneer Curry</h3>
            <p>Rich, creamy and made with home-style spices.</p>
          </div>

          <div className="card">
            <img
              src="https://storage.googleapis.com/recipesmedia/thumb/1001547_1399953983.jpg"
              alt="Desserts"
            />
            <h3>Homemade Desserts</h3>
            <p>End your meal with love-infused sweets.</p>
          </div>
        </div>
      </section>

      <footer id="contact">
        &copy; 2025 HomeBites | Designed with ❤ for home chefs and food lovers.
      </footer>
    </>
  );
}

export default MainPage;
