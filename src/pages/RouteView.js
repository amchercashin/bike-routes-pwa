import React from 'react';
import { useParams, Link } from 'react-router-dom';

function RouteView() {
  const { id } = useParams();

  // В будущем здесь будет логика загрузки данных маршрута
  const route = {
    id: id,
    name: `Маршрут ${id}`,
    description: "Описание маршрута будет здесь",
  };

  return (
    <div>
      <h1>{route.name}</h1>
      <p>{route.description}</p>
      {/* Здесь в будущем будет компонент карты */}
      <p>Здесь будет отображаться карта маршрута</p>
      <Link to="/catalog">Назад к каталогу</Link>
    </div>
  );
}

export default RouteView;