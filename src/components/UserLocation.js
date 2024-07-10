import React from 'react';
import { useGeolocation } from '../context/GeolocationContext';

function UserLocation() {
  const { position, heading, error, isTracking, getLocation, toggleTracking } = useGeolocation();

  return (
    <div>
      <h2>Ваше местоположение:</h2>
      {error ? (
        <div>Ошибка геолокации: {error}</div>
      ) : position ? (
        <>
          <p>Широта: {position.latitude.toFixed(6)}</p>
          <p>Долгота: {position.longitude.toFixed(6)}</p>
          {heading !== null && <p>Направление: {heading.toFixed(2)}°</p>}
        </>
      ) : (
        <div>Местоположение не определено</div>
      )}
      <button onClick={getLocation}>Определить местоположение</button>
      <label>
        <input
          type="checkbox"
          checked={isTracking}
          onChange={toggleTracking}
        />
        Отслеживать местоположение
      </label>
    </div>
  );
}

export default UserLocation;