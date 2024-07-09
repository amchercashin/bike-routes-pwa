import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RouteMap from '../components/RouteMap';
import { getRoute, saveRoute, getRouteVersion } from '../utils/indexedDB';
import useGeolocationAndOrientation from '../hooks/useGeolocationAndOrientation';
import { parseKml, extractRouteFromGeoJSON } from '../utils/kmlParser';

function RouteView() {
  const { id } = useParams();
  const [route, setRoute] = useState(null);
  const { position, heading, error: geoError } = useGeolocationAndOrientation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRoute() {
      console.log('Starting to load route:', id);
      try {
        setLoading(true);
        const response = await fetch(`${process.env.PUBLIC_URL}/data/routes/index.json`);
        const routesInfo = await response.json();
        console.log('Routes info:', routesInfo);
        const routeInfo = routesInfo.find(r => r.id === id);

        if (!routeInfo) {
          throw new Error('Route info not found');
        }

        console.log('Found route info:', routeInfo);

        let localVersion;
        try {
          localVersion = await getRouteVersion(id);
          console.log('Local version:', localVersion);
        } catch (dbError) {
          console.error('Error accessing IndexedDB:', dbError);
          localVersion = null;
        }
        
        let routeData;
        if (localVersion !== routeInfo.version) {
          console.log('Loading new version of route');
          const kmlResponse = await fetch(`${process.env.PUBLIC_URL}/data/routes/${id}.kml`);
          const kmlBlob = await kmlResponse.blob();
          const geojson = await parseKml(new File([kmlBlob], `${id}.kml`));
          console.log('Parsed GeoJSON:', geojson);
          routeData = extractRouteFromGeoJSON(geojson);
          console.log('Extracted route data:', routeData);
          
          routeData.id = id;
          routeData.version = routeInfo.version;
          
          try {
            await saveRoute(routeData);
            console.log('Route saved to IndexedDB');
          } catch (saveError) {
            console.error('Error saving route to IndexedDB:', saveError);
          }
        } else {
          console.log('Loading route from IndexedDB');
          routeData = await getRoute(id);
          console.log('Loaded local route:', routeData);
        }
        
        console.log('Setting route state:', routeData);
        setRoute(routeData);
      } catch (error) {
        console.error(`Error loading route ${id}:`, error);
        setError(`Ошибка загрузки маршрута: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadRoute();
  }, [id]);

  console.log('Current route state:', route);
  console.log('Loading state:', loading);
  console.log('Error state:', error);
  console.log('Current position:', position);
  console.log('Current heading:', heading);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!route) return <div>No route data available</div>;

  // Функция для безопасного рендеринга содержимого
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
      {position && (
        <div>
          <h2>Ваше местоположение:</h2>
          <p>Широта: {position.latitude.toFixed(6)}</p>
          <p>Долгота: {position.longitude.toFixed(6)}</p>
          {heading !== null && <p>Направление: {heading.toFixed(2)}°</p>}
        </div>
      )}
      {geoError && <p>Ошибка геолокации: {geoError}</p>}
      <RouteMap route={route} position={position} heading={heading} />
      <Link to="/catalog">Назад к каталогу</Link>
    </div>
  );
}

export default RouteView;