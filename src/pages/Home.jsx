// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold">Welcome to Our Store!</h1>
      <p className="mt-4 text-lg text-gray-600">Explore amazing products at great prices.</p>

      <Link to="/products">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          View Products
        </button>
      </Link>
    </div>
  );
};

export default Home;
