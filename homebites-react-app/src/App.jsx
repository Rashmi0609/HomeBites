import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Register from './pages/Register';
import Dish from './pages/Dish';
import Payment from './pages/Payment';
import TrackOrder from './pages/Trackorder';
import Chefs from './pages/Chefs'; 
// import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dishes" element={<Dish />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path="/chefs" element={<Chefs />} /> 
        {/* <Route path="/cart" element={<Cart />} />  */}
      </Routes>
    </Router>
  );
}

export default App;


