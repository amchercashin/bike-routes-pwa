import React, { useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/RouteMap.css';
import PropTypes from 'prop-types';
import { useGeolocation } from '../context/GeolocationContext';

const customIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function BoundsAdjuster({ bounds }) {
  const map = useMap();
  React.useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds);
    }
  }, [map, bounds]);
  return null;
}

function FullscreenControl({ isFullscreen, toggleFullscreen }) {
  const map = useMapEvents({
    fullscreenchange: () => {
      toggleFullscreen(document.fullscreenElement !== null);
    }
  });

  const handleFullscreenToggle = useCallback(() => {
    if (!isFullscreen) {
      if (map.getContainer().requestFullscreen) {
        map.getContainer().requestFullscreen();
      } else if (map.getContainer().mozRequestFullScreen) { // Firefox
        map.getContainer().mozRequestFullScreen();
      } else if (map.getContainer().webkitRequestFullscreen) { // Chrome, Safari and Opera
        map.getContainer().webkitRequestFullscreen();
      } else if (map.getContainer().msRequestFullscreen) { // IE/Edge
        map.getContainer().msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
      }
    }
  }, [isFullscreen, map]);

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        <button 
          onClick={handleFullscreenToggle}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          className="fullscreen-button"
          aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

function GeolocationControls({ getLocation, isTracking, toggleTracking }) {
  return (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control leaflet-bar geolocation-controls">
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
    </div>
  );
}

function RouteMap({ route, isOffline }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { position, lastKnownPosition, heading, isTracking, getLocation, toggleTracking } = useGeolocation();

  const { bounds, routeLines, routePoints } = useMemo(() => {
    if (!route || (!route.lines && !route.points)) {
      return { bounds: null, routeLines: [], routePoints: [] };
    }

    const allCoordinates = [
      ...(route.lines ? route.lines.flat() : []),
      ...(route.points ? route.points.map(point => point.coordinates) : [])
    ];

    let bounds = L.latLngBounds(allCoordinates.map(([lon, lat]) => [lat, lon]));

    if (position) {
      bounds.extend([position.latitude, position.longitude]);
    } else if (lastKnownPosition) {
      bounds.extend([lastKnownPosition.latitude, lastKnownPosition.longitude]);
    }

    return {
      bounds,
      routeLines: route.lines || [],
      routePoints: route.points || []
    };
  }, [route, position, lastKnownPosition]);

  if (!bounds) return null;

  const createArrowIcon = (color) => L.divIcon({
    className: 'location-arrow',
    html: `<div style="transform: rotate(${heading || 0}deg); color: ${color}; font-size: 16px;">➤</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const redArrowIcon = createArrowIcon('red');
  const blackArrowIcon = createArrowIcon('black');

  const center = bounds.getCenter();

  return (
    <div className={`map-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {routeLines.map((line, index) => (
          <Polyline
            key={`line-${index}`}
            positions={line.map(([lon, lat]) => [lat, lon])}
            color="blue"
          />
        ))}
        {routePoints.map((point, index) => (
          <Marker
            key={`point-${index}`}
            position={[point.coordinates[1], point.coordinates[0]]}
            icon={customIcon}
          >
            <Popup>
              <strong>{point.name}</strong>
              {point.description && <p>{point.description}</p>}
            </Popup>
          </Marker>
        ))}
        {isTracking && position && (
          <Marker position={[position.latitude, position.longitude]} icon={redArrowIcon}>
            <Popup>Вы здесь (активное отслеживание)</Popup>
          </Marker>
        )}
        {!isTracking && lastKnownPosition && (
          <Marker position={[lastKnownPosition.latitude, lastKnownPosition.longitude]} icon={blackArrowIcon}>
            <Popup>Последнее известное местоположение</Popup>
          </Marker>
        )}
        <BoundsAdjuster bounds={bounds} />
        <FullscreenControl isFullscreen={isFullscreen} toggleFullscreen={setIsFullscreen} />
        <GeolocationControls getLocation={getLocation} isTracking={isTracking} toggleTracking={toggleTracking} />
      </MapContainer>
      <div 
        className="map-overlay"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 220,
          backgroundColor: 'white',
          padding: '0 5px',
          fontSize: '12px',
          zIndex: 1000
        }}
      >
        🇷🇺
      </div>
      {isOffline && (
        <div 
          className="map-overlay"
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '5px 10px',
            borderRadius: '5px',
            zIndex: 1000
          }}
        >
          Офлайн-режим: карта может быть неполной
        </div>
      )}
    </div>
  );
}

RouteMap.propTypes = {
  route: PropTypes.shape({
    lines: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))),
    points: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number)
    }))
  }),
  isOffline: PropTypes.bool
};

export default RouteMap;