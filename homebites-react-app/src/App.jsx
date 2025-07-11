import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/login";
import Register from './pages/Register';
import Dish from './pages/Dish';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dishes" element={<Dish />} />
      </Routes>
    </Router>
  );
}

export default App;


