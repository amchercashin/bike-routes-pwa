import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/RouteMap.css';
import PropTypes from 'prop-types';

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

function RouteMap({ route, position, heading }) {
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
    }

    return {
      bounds,
      routeLines: route.lines || [],
      routePoints: route.points || []
    };
  }, [route, position]);

  if (!bounds) return null;

  const arrowIcon = L.divIcon({
    className: 'location-arrow',
    html: `<div style="transform: rotate(${heading || 0}deg); color: red; font-size: 16px;">➤</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  const center = bounds.getCenter();

  return (
    <div style={{ position: 'relative', height: '400px', width: '100%' }}>
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
        {position && (
          <Marker position={[position.latitude, position.longitude]} icon={arrowIcon}>
            <Popup>Вы здесь</Popup>
          </Marker>
        )}
        <BoundsAdjuster bounds={bounds} />
      </MapContainer>
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          right:220,
          backgroundColor: 'white',
          padding: '0 5px',
          fontSize: '12px',
          zIndex: 1000
        }}
      >
        🇷🇺
      </div>
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
  position: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }),
  heading: PropTypes.number
};

export default RouteMap;