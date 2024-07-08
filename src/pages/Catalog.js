import React from 'react';
import { Link } from 'react-router-dom';

function Catalog() {
  // В будущем здесь будет логика загрузки маршрутов
  const routes = [
    { id: 1, name: "Маршрут по парку" },
    { id: 2, name: "Горная трасса" },
    { id: 3, name: "Городской маршрут" },
  ];

  return (
    <div>
      <h1>Каталог маршрутов</h1>
      <ul>
        {routes.map(route => (
          <li key={route.id}>
            <Link to={`/route/${route.id}`}>{route.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/">Назад на главную</Link>
    </div>
  );
}

export default Catalog;