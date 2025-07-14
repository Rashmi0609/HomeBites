import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const handleInstantOrder = () => {
    navigate("/payment");
  };

  const handleScheduleOrder = () => {
    navigate("/dishes");
  };

  return (
    <div className="cartWrapper">
      <header
  className="cartHeader"
  style={{
    padding: "40px 0",
    textAlign: "center",
    backgroundColor: "#F97316",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "220px",
  }}
>
  <h1 className="cartTitle" style={{ fontSize: "2.5rem", marginBottom: "8px" }}>
    Homemade Chole Bhature
  </h1>
  <p className="cartSubtitle" style={{ fontSize: "1.1rem" }}>
    Cook this North Indian delight at home!
  </p>
</header>
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <section>
          <div className="videoContainer">
            <iframe
              src="https://www.youtube.com/embed/j7b69ReQ5fA"
              title="Chole Bhature Video"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>

          <div className="recipeCard">
            <h2 style={{ color: "#FFA500", marginBottom: "16px" }}>Ingredients</h2>
            <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
              <li>2 cups chickpeas (soaked overnight)</li>
              <li>2 tbsp oil</li>
              <li>1 tsp cumin seeds</li>
              <li>1 large onion (chopped)</li>
              <li>2 tomatoes (pureed)</li>
              <li>1 tbsp ginger-garlic paste</li>
              <li>Chole masala & spices</li>
              <li>2 cups maida</li>
              <li>½ cup fine sooji</li>
              <li>2 tbsp yogurt</li>
              <li>1 tsp sugar</li>
              <li>Oil for deep frying</li>
            </ul>
          </div>

          <div className="recipeCard">
            <h2 style={{ color: "#FFA500", marginBottom: "16px" }}>Steps</h2>
            <ol style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
              <li>Pressure cook chickpeas with salt and tea bag (5-6 whistles).</li>
              <li>Sauté cumin and onions, add ginger-garlic paste and tomato puree.</li>
              <li>Add masalas, then cooked chickpeas. Simmer 15-20 minutes.</li>
              <li>Mix maida, sooji, yogurt, sugar into dough. Rest 2 hrs.</li>
              <li>Roll and deep fry bhature until puffed and golden.</li>
            </ol>
          </div>
        </section>

        <section className="compactBox">
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#FF4500" }}>
              Chole Bhature Ingredient Kit
            </h3>
            <p style={{ color: "#555" }}>
              Includes pre-measured dry ingredients for perfect results
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "8px" }}>
              <span style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#FF4500" }}>
                ₹299
              </span>
              <span style={{ textDecoration: "line-through", color: "#aaa" }}>₹399</span>
              <span
                style={{
                  backgroundColor: "#D4EDDA",
                  color: "#2E7D32",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                }}
              >
                25% OFF
              </span>
            </div>

            <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
              <button
                onClick={handleScheduleOrder}
                className="smallButton"
                style={{ backgroundColor: "#FFA500", color: "white" }}
              >
                <i className="fas fa-clock"></i> Schedule Order
              </button>
              <button
                onClick={handleInstantOrder}
                className="smallButton"
                style={{ backgroundColor: "#28a745", color: "white" }}
              >
                <i className="fas fa-bolt"></i> Instant Order
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          backgroundColor: "#F97316",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <p>© 2025 HomeBites. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Cart;
