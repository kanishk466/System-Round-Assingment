// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/Login';
import Categories from './components/Categories';
import Services from './components/Services'; // Import the Services component

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [categoryId, setCategoryId] = useState(null); // State for selected category ID

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!token ? <LoginForm setToken={setToken} /> : <Navigate to="/categories" />}
        />
        <Route
          path="/categories"
          element={token ? <Categories setCategoryId={setCategoryId} token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/categories/:categoryId/services" // New route for services
          element={token ? <Services token={token} categoryId={categoryId} /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
