import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Culture } from './pages/Culture';
import { Restaurant } from './pages/Restaurant';
import { DishDetails } from './pages/DishDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/dish/:id" element={<DishDetails />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
    </Router>
  );
}

export default App;

