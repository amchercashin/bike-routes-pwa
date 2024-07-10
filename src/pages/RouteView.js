import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RouteMap from '../components/RouteMap';
import UserLocation from '../components/UserLocation';
import { getRoute, saveRoute, getRouteVersion } from '../utils/indexedDB';
import { useGeolocation } from '../context/GeolocationContext';
import { parseKml, extractRouteFromGeoJSON } from '../utils/kmlParser';

function RouteView() {
  const { id } = useParams();
  const [route, setRoute] = useState(null);
  const { position, heading } = useGeolocation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
    async function loadRoute() {
      try {
        setLoading(true);
        let routeData = await getRoute(id);

        if (!routeData || !isOffline) {
          const response = await fetch(`${process.env.PUBLIC_URL}/data/routes/index.json`);
          const routesInfo = await response.json();
          const routeInfo = routesInfo.find(r => r.id === id);

          if (!routeInfo) {
            throw new Error('Route info not found');
          }

          let localVersion = await getRouteVersion(id).catch(() => null);
          
          if (localVersion !== routeInfo.version) {
            const kmlResponse = await fetch(`${process.env.PUBLIC_URL}/data/routes/${id}.kml`);
            const kmlBlob = await kmlResponse.blob();
            const geojson = await parseKml(new File([kmlBlob], `${id}.kml`));
            routeData = extractRouteFromGeoJSON(geojson);
            
            routeData.id = id;
            routeData.version = routeInfo.version;
            
            await saveRoute(routeData).catch(console.error);
          } else if (!routeData) {
            routeData = await getRoute(id);
          }
        }
        
        setRoute(routeData);
      } catch (error) {
        console.error(`Error loading route ${id}:`, error);
        setError(`Ошибка загрузки маршрута: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadRoute();
  }, [id, isOffline]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!route) return <div>No route data available</div>;

  const safeRender = (content) => {
    if (typeof content === 'string') {
      return content;
    } else if (content && typeof content === 'object') {
      if (content['@type'] === 'html' && content.value) {
        return <div dangerouslySetInnerHTML={{ __html: content.value }} />;
      } else {
        return JSON.stringify(content);
      }
    }
    return '';
  };

  return (
    <div>
      <h1>{safeRender(route.name)}</h1>
      {safeRender(route.description)}
      <UserLocation />
      <RouteMap route={route} position={position} heading={heading} isOffline={isOffline} />
      <Link to="/catalog">Назад к каталогу</Link>
      {isOffline && <div>Вы находитесь в офлайн-режиме. Некоторые функции могут быть недоступны.</div>}
    </div>
  );
}

export default RouteView;