import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const GeolocationContext = createContext();

export const useGeolocation = () => useContext(GeolocationContext);

export const GeolocationProvider = ({ children }) => {
  const [position, setPosition] = useState(null);
  const [lastKnownPosition, setLastKnownPosition] = useState(null);
  const [heading, setHeading] = useState(null);
  const [error, setError] = useState(null);
  const [isTracking, setIsTracking] = useState(false);

  const updatePosition = (pos) => {
    const newPosition = {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    };
    setPosition(newPosition);
    setLastKnownPosition(newPosition);
    setError(null);
  };

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        updatePosition,
        (err) => {
          setError(`Ошибка геолокации: ${err.message}`);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError("Геолокация не поддерживается вашим браузером");
    }
  }, []);

  const handleOrientation = useCallback((event) => {
    if (event.webkitCompassHeading) {
      // Для устройств на iOS
      setHeading(event.webkitCompassHeading);
    } else if (event.alpha) {
      // Для устройств на Android
      setHeading(360 - event.alpha);
    }
  }, []);

  useEffect(() => {
    let watchId;

    if (isTracking && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        updatePosition,
        (err) => {
          setError(`Ошибка геолокации: ${err.message}`);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );

      window.addEventListener('deviceorientation', handleOrientation);
    } else {
      setPosition(null);
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isTracking, handleOrientation]);

  const toggleTracking = () => {
    setIsTracking(prev => !prev);
  };

  return (
    <GeolocationContext.Provider value={{ position, lastKnownPosition, heading, error, isTracking, getLocation, toggleTracking }}>
      {children}
    </GeolocationContext.Provider>
  );
};