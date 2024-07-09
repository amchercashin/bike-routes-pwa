import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Catalog() {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/routes/index.json`)
      .then(response => response.json())
      .then(data => setRoutes(data))
      .catch(error => {
        console.error('Error loading routes:', error);
        setError('Не удалось загрузить список маршрутов. Пожалуйста, попробуйте позже.');
      });
  }, []);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Каталог маршрутов</h1>
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