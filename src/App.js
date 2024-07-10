import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { GeolocationProvider } from './context/GeolocationContext';

const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const RouteView = lazy(() => import('./pages/RouteView'));

function App() {
  return (
    <GeolocationProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/route/:id" element={<RouteView />} />
          </Routes>
        </Suspense>
      </Router>
    </GeolocationProvider>
  );
}

export default App;