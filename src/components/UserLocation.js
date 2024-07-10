import React from 'react';
import { useGeolocation } from '../context/GeolocationContext';

function UserLocation() {
  const { position, heading, error } = useGeolocation();

  if (error) {
    return <div>Ошибка геолокации: {error}</div>;
  }

  if (!position) {
    return <div>Определение местоположения...</div>;
  }

  return (
    <div>
      <h2>Ваше местоположение:</h2>
      <p>Широта: {position.latitude.toFixed(6)}</p>
      <p>Долгота: {position.longitude.toFixed(6)}</p>
      {heading !== null && <p>Направление: {heading.toFixed(2)}°</p>}
    </div>
  );
}

export default UserLocation;