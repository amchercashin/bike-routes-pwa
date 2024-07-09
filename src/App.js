import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import RouteView from './pages/RouteView';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/route/:id" element={<RouteView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;