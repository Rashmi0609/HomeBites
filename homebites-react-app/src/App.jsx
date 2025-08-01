import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dish from "./pages/Dish";
import Payment from "./pages/Payment";
import TrackOrder from "./pages/Trackorder";
import ChefsPage from "./pages/Chefs";
import Cart from "./pages/Cart";
import LoginSuccess from "./pages/LoginSuccess";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", {
      credentials: "include",
    })
      .then(res => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage user={user} />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dishes" element={<Dish user={user} />} />
        <Route path="/payment" element={<Payment user={user} />} />
        <Route path="/trackorder" element={<TrackOrder user={user} />} />
        
        {/* This route handles a page for a SINGLE chef (e.g., /chef/6) */}
        <Route path="/chef/:id" element={<ChefsPage user={user} />} />

        {/* === THIS IS THE FIX === */}
        {/* This new route handles the page for a LIST of chefs (e.g., /chefs) */}
        <Route path="/chefs" element={<ChefsPage user={user} />} />

        <Route path="/cart" element={<Cart user={user} />} />
        
        <Route path="/login-success" element={<LoginSuccess />} />

      </Routes>
    </Router>
  );
}

export default App;
