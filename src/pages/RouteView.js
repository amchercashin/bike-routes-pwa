import React from 'react';
import { useParams, Link } from 'react-router-dom';

function RouteView() {
  const { id } = useParams();

  const route = {
    id: id,
    name: `Маршрут ${id}`,
    description: "Описание маршрута будет здесь",
  };

  return (
    <div>
      <h1>{route.name}</h1>
      <p>{route.description}</p>
      <p>Здесь будет отображаться карта маршрута</p>
      <Link to="/catalog">Назад к каталогу</Link>
    </div>
  );
}

export default RouteView;