import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCatalog, saveCatalog } from '../utils/indexedDB';

function Catalog() {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    async function loadCatalog() {
      try {
        let catalog = await getCatalog();

        if (!catalog || !isOffline) {
          const response = await fetch(`${process.env.PUBLIC_URL}/data/routes/index.json`);
          catalog = await response.json();
          await saveCatalog(catalog);
        }

        setRoutes(catalog);
      } catch (error) {
        console.error('Error loading routes:', error);
        setError('Не удалось загрузить список маршрутов. Пожалуйста, попробуйте позже.');
      }
    }

    loadCatalog();
  }, [isOffline]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Каталог маршрутов</h1>
      {isOffline && <div>Вы находитесь в офлайн-режиме. Отображаются сохраненные маршруты.</div>}
      {routes.length === 0 ? (
        <p>Загрузка маршрутов...</p>
      ) : (
        <ul>
          {routes.map(route => (
            <li key={route.id}>
              <Link to={`/route/${route.id}`}>{route.name}</Link>
              <p>{route.shortDescription}</p>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">Назад на главную</Link>
    </div>
  );
}

export default Catalog;