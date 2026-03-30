import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Feature from "./pages/Feature";
import Register from "./pages/Register";

const App = () => {
  return (
    <>

      <Header />

      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

    </>
  );
};

export default App;