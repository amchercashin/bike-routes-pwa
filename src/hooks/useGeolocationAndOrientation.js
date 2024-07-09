import { useState, useEffect } from 'react';

const useGeolocationAndOrientation = () => {
  const [position, setPosition] = useState(null);
  const [heading, setHeading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let watchId;

    const geolocationSuccess = (pos) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    };

    const geolocationError = (err) => {
      setError(`Ошибка геолокации: ${err.message}`);
    };

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(geolocationSuccess, geolocationError, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    } else {
      setError("Геолокация не поддерживается вашим браузером");
    }

    const handleOrientation = (event) => {
      if (event.webkitCompassHeading) {
        // Для устройств на iOS
        setHeading(event.webkitCompassHeading);
      } else if (event.alpha) {
        // Для устройств на Android
        setHeading(360 - event.alpha);
      }
    };

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      setError("Ориентация устройства не поддерживается");
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return { position, heading, error };
};

export default useGeolocationAndOrientation;