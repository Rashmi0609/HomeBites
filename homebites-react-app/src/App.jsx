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

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user on load
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

  if (loading) return <div>Loading...</div>; // Optional loading state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage user={user} />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dishes" element={<Dish user={user} />} />
        <Route path="/payment" element={<Payment user={user} />} />
        <Route path="/trackorder" element={<TrackOrder user={user} />} />
        <Route path="/chefs" element={<ChefsPage />} />
        <Route path="/cart" element={<Cart user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
