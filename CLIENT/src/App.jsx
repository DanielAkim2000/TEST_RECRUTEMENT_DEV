import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import CategoryDetail from "./pages/CategoryDetail";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route index element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
