// Datos geométricos de la malla ibérica del panel de Pat (PatMesh.svelte).
//
// ── Cómo añadir una CIUDAD nueva ──────────────────────────────────────────
// Basta con añadir su latitud/longitud a CITY_LATLON (la clave debe coincidir
// EXACTAMENTE con el campo `city` de fairsData.js); la proyección a px es
// automática. Las ferias nuevas de ciudades ya existentes aparecen solas:
// PatMesh lee fairsData + fairActivities en tiempo de ejecución.
//
// Las ciudades no peninsulares (ferias internacionales) y las entradas
// abstractas sin punto en el mapa se declaran en NON_MAP_CITIES: el guardián
// de build (scripts/check_mesh_cities.mjs) falla si aparece una ciudad que no
// esté ni en CITY_LATLON ni en esa lista, para que ninguna se quede fuera
// del mapa por olvido.

export const CITY_LATLON = {
  'A Coruña': [43.36, -8.41],
  'Aguadulce': [36.79, -2.54],
  'Albacete': [38.99, -1.86],
  'Alicante': [38.35, -0.48],
  'Almendralejo': [38.68, -6.41],
  'Almería': [36.83, -2.46],
  'Aracena': [37.89, -6.56],
  'Armilla': [37.13, -3.63],
  'Badajoz': [38.88, -6.97],
  'Barcelona': [41.39, 2.17],
  'Batalha': [39.66, -8.83],
  'Bilbao': [43.26, -2.93],
  'Boqueixón': [42.79, -8.40],
  'Cacabelos': [42.60, -6.72],
  'Ciudad Real': [38.99, -3.93],
  'Cádiz': [36.53, -6.30],
  'Córdoba': [37.89, -4.78],
  'Don Benito': [38.95, -5.86],
  'El Ejido': [36.78, -2.81],
  'Elche': [38.27, -0.70],
  'Elvas': [38.88, -7.16],
  'Granada': [37.18, -3.60],
  'Huelva': [37.26, -6.95],
  'Jaén': [37.77, -3.79],
  'Girona': [41.98, 2.82],
  'Jerez de la Frontera': [36.68, -6.14],
  'Lisboa': [38.72, -9.14],
  'Lleida': [41.61, 0.62],
  'Madrid': [40.42, -3.70],
  'Mallorca': [39.57, 2.65],
  'Manzanares': [39.00, -3.37],
  'Málaga': [36.72, -4.42],
  'Mérida': [38.92, -6.34],
  'Oporto': [41.15, -8.61],
  'Ourense': [42.34, -7.86],
  'Palencia': [42.01, -4.53],
  'Plasencia': [40.03, -6.09],
  'Portugal Sur': [38.02, -7.87],
  'Porzuna': [39.09, -4.20],
  'Pozoblanco': [38.38, -4.85],
  'Punta Umbría': [37.19, -6.97],
  'Salamanca': [40.97, -5.66],
  'Santarém': [39.24, -8.68],
  'Santiago de Compostela': [42.88, -8.54],
  'Sevilla': [37.39, -5.99],
  'Silleda': [42.70, -8.24],
  'Toledo': [39.86, -4.02],
  'Torre Pacheco': [37.75, -0.96],
  'Trujillo': [39.46, -5.88],
  'Valencia': [39.47, -0.38],
  'Valladolid': [41.65, -4.72],
  'Vigo': [42.23, -8.72],
  'Villanueva de Córdoba': [38.32, -4.64],
  'Zafra': [38.41, -6.42],
  'Zamora': [41.50, -5.75],
  'Zaragoza': [41.65, -0.88]
};

// Ciudades de fairsData SIN punto en el mapa: ferias internacionales fuera de
// la península y entradas genéricas sin ubicación fija. Añadir aquí cualquier
// ciudad extranjera nueva para que el guardián de build no la reclame.
export const NON_MAP_CITIES = [
  'Düsseldorf', 'España', 'Europa', 'Itinerante', 'Lyon',
  'Múnich', 'Núremberg', 'París', 'Portugal', 'Stuttgart'
];

// Proyección equirectangular: origen lat 43.9N / lon -9.5W, escala 92 px/grado,
// x corregida por cos(40°). Debe mantenerse sincronizada con IBERIA_PATH (el
// contorno está expresado ya en px con esta misma proyección).
const LAT_MAX = 43.9;
const LON_MIN = -9.5;
const SCALE = 92;
const COS_LAT = Math.cos(40 * Math.PI / 180);

export function projectLatLon(lat, lon) {
  const x = Math.round((lon - LON_MIN) * COS_LAT * SCALE * 10) / 10;
  const y = Math.round((LAT_MAX - lat) * SCALE * 10) / 10;
  return [x, y];
}

// Ciudad → [x, y] en px, derivado de CITY_LATLON.
export const CITY_POINTS = Object.fromEntries(
  Object.entries(CITY_LATLON).map(([name, [lat, lon]]) => [name, projectLatLon(lat, lon)])
);

// Contorno simplificado de la península ibérica (px, misma proyección).
export const IBERIA_PATH = "M 15.5,92 L 38.8,170.2 L 44.4,202.4 L 52.9,253 L 52.9,299.9 L 44.4,345 L 7,395.6 L 2.1,478.4 L 28.2,501.4 L 44.4,547.4 L 37.4,633 L 146.6,621 L 172.7,618.2 L 225.5,678 L 274.2,726.8 L 358,671.6 L 495.4,662.4 L 600.5,579.6 L 635.7,515.2 L 647,409.4 L 729.4,292.6 L 757.6,257.6 L 821,234.6 L 903.5,145.4 L 873.9,133.4 L 711.8,110.4 L 567.3,82.8 L 530,53.4 L 456.7,47.8 L 401.7,39.6 L 270.6,30.4 L 89.5,38.6 L 15.5,92 Z";
