import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path="/">
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
