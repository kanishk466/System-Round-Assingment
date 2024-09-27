import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import CategoriesPage from './pages/CategoriesPage';

const App = () => {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Login setToken={setToken} />} />
          <Route path="/categories" element={<CategoriesPage token={token} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
