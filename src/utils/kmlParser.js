import { kml } from '@tmcw/togeojson';

export async function parseKml(file) {
  const kmlText = await file.text();
  console.log('Raw KML content:', kmlText.substring(0, 500) + '...');  // Log first 500 characters
  
  const parser = new DOMParser();
  const kmlDom = parser.parseFromString(kmlText, 'text/xml');
  
  if (kmlDom.getElementsByTagName('parsererror').length > 0) {
    console.error('XML parsing error:', kmlDom.getElementsByTagName('parsererror')[0].textContent);
    throw new Error('Failed to parse KML file');
  }
  
  const geojson = kml(kmlDom);
  console.log('Parsed GeoJSON:', JSON.stringify(geojson, null, 2));
  
  return geojson;
}

export function extractRouteFromGeoJSON(geojson) {
  console.log('Extracting route from GeoJSON:', JSON.stringify(geojson, null, 2));

  const route = {
    name: '',
    description: '',
    lines: [],
    points: []
  };

  if (geojson.type === 'FeatureCollection') {
    geojson.features.forEach(feature => {
      if (feature.geometry.type === 'Point') {
        route.points.push({
          name: feature.properties.name || '',
          description: feature.properties.description || '',
          coordinates: feature.geometry.coordinates
        });
      } else if (feature.geometry.type === 'LineString') {
        route.lines.push(feature.geometry.coordinates);
      } else if (feature.geometry.type === 'MultiGeometry' || feature.geometry.type === 'GeometryCollection') {
        feature.geometry.geometries.forEach(geometry => {
          if (geometry.type === 'LineString') {
            route.lines.push(geometry.coordinates);
          }
        });
      }
    });

    // Extracting route name and description
    const documentFeature = geojson.features.find(f => f.properties.name && f.properties.description);
    if (documentFeature) {
      route.name = documentFeature.properties.name;
      route.description = documentFeature.properties.description;
    }
  }

  console.log('Extracted route data:', route);
  return route;
}