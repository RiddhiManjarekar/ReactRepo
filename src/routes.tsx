import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import ProductDetails from "./ProductDetails";
import Cart from "./Cart";
import Login from "./Login";
import Admin from "./Admin";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute role="admin">
          <Admin />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
