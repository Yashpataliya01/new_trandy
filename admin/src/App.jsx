import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Lazy-loaded components
import Home from "./pages/home/Home.jsx";
import Login from "./pages/authentication/Login.jsx";
import Navbar from "./components/navigation/Navbar.jsx";
import Products from "./pages/products/Products.jsx";
import Users from "./pages/users/Users.jsx";
import BuySell from "./pages/buysell/BuySell.jsx";
import Mobile from "./pages/buysell/Mobile.jsx";
import Discount from "./pages/discount/Discount.jsx";

const App = () => {
  const isLogin = localStorage.getItem("isLogin");
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/mobile" element={<BuySell />} />
        <Route path="/mobile/:id" element={<Mobile />} />
        <Route path="/discount" element={<Discount />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
