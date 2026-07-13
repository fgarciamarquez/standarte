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
  'Gijón': [43.54, -5.66],
  'Barcelona': [41.39, 2.17],
  'Batalha': [39.66, -8.83],
  'Bilbao': [43.26, -2.93],
  'Irún': [43.34, -1.79],
  'Logroño': [42.47, -2.44],
  'Pamplona': [42.81, -1.64],
  'Alfaro': [42.18, -1.75],
  'Calahorra': [42.30, -1.96],
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
  'Mealhada': [40.38, -8.45],
  'Oporto': [41.15, -8.61],
  'Ourense': [42.34, -7.86],
  'Palencia': [42.01, -4.53],
  'Plasencia': [40.03, -6.09],
  'Portugal Sur': [38.02, -7.87],
  'Porzuna': [39.09, -4.20],
  'Pozoblanco': [38.38, -4.85],
  'Punta Umbría': [37.19, -6.97],
  'Salamanca': [40.97, -5.66],
  'Santander': [43.46, -3.81],
  'Santarém': [39.24, -8.68],
  'Santiago de Compostela': [42.88, -8.54],
  'Sevilla': [37.39, -5.99],
  'Silleda': [42.70, -8.24],
  'Sobral de Monte Agraço': [39.02, -9.15],
  'Tineo': [43.34, -6.41],
  'Toledo': [39.86, -4.02],
  'Torrelavega': [43.35, -4.05],
  'Vegadeo': [43.48, -7.06],
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
// (Las ciudades canarias NO van aquí: tienen su propio inset, ver más abajo.)
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

// ── Inset de Canarias ─────────────────────────────────────────────────────
// Las islas quedan a ~1.000 km al suroeste de la península: proyectarlas real-
// mente obligaría a agrandar el mapa y encoger todo lo demás. En su lugar se
// hace la MISMA convención que los mapas oficiales de España: una traslación
// artificial del archipiélago a un recuadro (aquí una circunferencia de borde
// de puntos) situado en el océano a la altura de Cádiz y a su izquierda. Así la
// malla de Pat "llega" a las islas sin sacrificar la escala peninsular.
// Coordenadas en px absolutos (misma proyección visual, NO projectLatLon).
// Centro del inset (px). Para mover TODO el recuadro (islas + puntos + anillo)
// basta cambiar estas dos cifras: las islas y las ciudades se definen en offsets
// relativos al centro y se trasladan aquí. Situado en el océano, abajo-izquierda
// de Cádiz, con aire suficiente para que se lea como una traslación artificial.
const CAN_CX = -5;
const CAN_CY = 735;
const CAN_R = 92;

// Polígonos simples de las 7 islas (oeste→este), en offsets px RELATIVOS al centro.
const CAN_ISLANDS_BASE = [
  'M -70,28 L -65,24 L -58,29 L -63,34 Z',                 // El Hierro
  'M -60,-14 L -54,-8 L -56,1 L -61,3 L -62,-6 Z',         // La Palma
  'M -44,15 L -39,12 L -33,16 L -38,20 L -43,19 Z',        // La Gomera
  'M -36,4 L -20,1 L -13,10 L -22,17 L -33,13 Z',          // Tenerife
  'M -6,17 L 2,12 L 12,16 L 13,24 L 5,29 L -4,25 Z',       // Gran Canaria
  'M 36,14 L 46,4 L 58,-6 L 63,-1 L 53,10 L 42,19 Z',      // Fuerteventura
  'M 54,-12 L 62,-21 L 72,-25 L 75,-18 L 67,-11 L 58,-8 Z' // Lanzarote
];

// Traslada un path 'M x,y L x,y … Z' sumando (dx, dy) a cada par de coordenadas.
const shiftPath = (d, dx, dy) =>
  d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g, (_, x, y) => `${+x + dx},${+y + dy}`);

export const CANARIAS_INSET = {
  cx: CAN_CX, cy: CAN_CY, r: CAN_R, label: 'Islas Canarias',
  islands: CAN_ISLANDS_BASE.map((d) => shiftPath(d, CAN_CX, CAN_CY))
};

// Puntos-ciudad del archipiélago DENTRO del inset: cada ciudad ferial canaria se
// ancla sobre su isla (offset relativo al centro) y el hub "Islas Canarias" al centro.
const CANARIAS_CITY_BASE = {
  'Islas Canarias': [0, 0],
  'Tenerife': [-24, 9],
  'Gran Canaria': [4, 19],
  'Las Palmas': [12, 10],
  'Fuerteventura': [49, 5]
};
const CANARIAS_CITY_POINTS = Object.fromEntries(
  Object.entries(CANARIAS_CITY_BASE).map(([name, [dx, dy]]) => [name, [CAN_CX + dx, CAN_CY + dy]])
);

// ── Inset de Madeira ──────────────────────────────────────────────────────
// Mismo criterio que Canarias: el archipiélago de Madeira queda a ~1.000 km al
// suroeste del continente. Se traslada a un recuadro (circunferencia de borde de
// puntos) situado a la IZQUIERDA del gráfico, a la altura de Lisboa. Más pequeño
// que el canario (Madeira + Porto Santo + Desertas).
const MAD_CX = -175;
const MAD_CY = 477;
const MAD_R = 60;

const MAD_ISLANDS_BASE = [
  // Madeira: isla alargada E-O (proporción ~3:1) con punta O (Ponta do Pargo) y
  // península fina al ENE (Ponta de São Lourenço).
  'M -40,3 L -26,-7 L -6,-10 L 12,-8 L 22,-5 L 33,-8 L 34,-5 L 24,-1 L 14,6 L -4,10 L -24,9 Z',
  'M 28,-26 L 38,-34 L 41,-31 L 31,-23 Z', // Porto Santo (islote alargado al NE)
  'M 15,15 L 17,15 L 16,31 L 14,31 Z',     // Desertas (slivers verticales finos al SE)
  'M 20,18 L 21,18 L 20,28 L 19,28 Z'
];

export const MADEIRA_INSET = {
  cx: MAD_CX, cy: MAD_CY, r: MAD_R, label: 'Islas de Madeira',
  islands: MAD_ISLANDS_BASE.map((d) => shiftPath(d, MAD_CX, MAD_CY))
};

// Puntos-ciudad de Madeira dentro del inset (offset relativo al centro).
const MADEIRA_CITY_BASE = {
  'Islas de Madeira': [-8, 3],
  'Funchal': [10, 6],
  'Madeira': [-26, 3]
};
const MADEIRA_CITY_POINTS = Object.fromEntries(
  Object.entries(MADEIRA_CITY_BASE).map(([name, [dx, dy]]) => [name, [MAD_CX + dx, MAD_CY + dy]])
);

// Insets que PatMesh dibuja (anillo de puntos + islas). Añadir aquí uno nuevo
// basta para que se pinte automáticamente.
export const MAP_INSETS = [CANARIAS_INSET, MADEIRA_INSET];

// Ciudad → [x, y] en px: península/Baleares por proyección + insets canario y madeirense.
export const CITY_POINTS = {
  ...Object.fromEntries(
    Object.entries(CITY_LATLON).map(([name, [lat, lon]]) => [name, projectLatLon(lat, lon)])
  ),
  ...CANARIAS_CITY_POINTS,
  ...MADEIRA_CITY_POINTS
};

// Ciudad del mapa → sección-pilar de su página de ciudad (misma convención que
// CITY_TO_PILLAR en Feria.svelte): las poblaciones satélite cuelgan de su ciudad
// matriz. Fuente única para el enlazado del mapa (PatMesh) y de su gemelo SEO
// server-renderizado (MeshCoverageLinks). Las ciudades sin entrada no tienen
// página propia y no enlazan.
export const CITY_PILLAR = {
  'Madrid': 'madrid', 'Barcelona': 'barcelona', 'Bilbao': 'bilbao', 'Lisboa': 'lisboa',
  'Oporto': 'oporto', 'Valencia': 'valencia', 'Mallorca': 'mallorca', 'Vigo': 'vigo',
  'Santiago de Compostela': 'santiago', 'A Coruña': 'coruna', 'Valladolid': 'valladolid',
  'Salamanca': 'salamanca', 'Batalha': 'batalha', 'Málaga': 'malaga', 'Badajoz': 'badajoz',
  'Sevilla': 'sevilla', 'Ciudad Real': 'ciudad_real', 'Zaragoza': 'zaragoza',
  'Don Benito': 'montaje_don_benito', 'Zafra': 'montaje_zafra',
  'Almendralejo': 'badajoz', 'Plasencia': 'badajoz', 'Mérida': 'badajoz',
  'Portugal Sur': 'portugal_sur',
  'Aguadulce': 'almeria', 'El Ejido': 'almeria', 'Almería': 'almeria', 'Jaén': 'jaen',
  'Huelva': 'huelva', 'Aracena': 'huelva', 'Punta Umbría': 'huelva',
  'Murcia': 'murcia', 'Torre Pacheco': 'murcia',
  'Córdoba': 'cordoba', 'Pozoblanco': 'cordoba', 'Villanueva de Córdoba': 'cordoba',
  'Granada': 'granada', 'Armilla': 'granada',
  'Cádiz': 'cadiz', 'Jerez de la Frontera': 'cadiz',
  'Manzanares': 'ciudad_real', 'Porzuna': 'ciudad_real',
  'Santarém': 'santarem', 'Trujillo': 'trujillo', 'Elche': 'elche', 'Alicante': 'alicante',
  'Silleda': 'silleda', 'Ourense': 'ourense',
  'Lleida': 'lleida', 'Girona': 'girona',
  'Irún': 'irun',
  'Logroño': 'logrono', 'Alfaro': 'logrono', 'Calahorra': 'logrono',
  'Pamplona': 'pamplona',
  'Santander': 'santander', 'Torrelavega': 'santander',
  'Gijón': 'gijon', 'Tineo': 'gijon', 'Vegadeo': 'gijon',
  'Islas Canarias': 'islas_canarias', 'Tenerife': 'islas_canarias',
  'Gran Canaria': 'islas_canarias', 'Las Palmas': 'islas_canarias',
  'Fuerteventura': 'islas_canarias',
  'Islas de Madeira': 'islas_de_madeira', 'Funchal': 'islas_de_madeira',
  'Madeira': 'islas_de_madeira'
};

// Ciudades con punto en el mapa pero SIN página-ciudad propia ni pilar asignado:
// salen como punto informativo (sin enlace) y no aparecen en el gemelo SEO. Es
// una exclusión EXPLÍCITA para que el guardián (check_mesh_cities) distinga entre
// "deliberadamente sin enlace" y "olvidé asignarle pilar". Al añadir una ciudad
// nueva: o le pones CITY_PILLAR (se enlaza) o la incluyes aquí (queda informativa).
export const UNLINKED_CITIES = [
  'Albacete', 'Boqueixón', 'Cacabelos', 'Elvas', 'Mealhada',
  'Palencia', 'Sobral de Monte Agraço', 'Toledo', 'Zamora'
];

// Contorno simplificado de la península ibérica (px, misma proyección).
export const IBERIA_PATH = "M 15.5,92 L 38.8,170.2 L 44.4,202.4 L 52.9,253 L 52.9,299.9 L 44.4,345 L 7,395.6 L 2.1,478.4 L 28.2,501.4 L 44.4,547.4 L 37.4,633 L 146.6,621 L 172.7,618.2 L 225.5,678 L 274.2,726.8 L 358,671.6 L 495.4,662.4 L 600.5,579.6 L 635.7,515.2 L 647,409.4 L 729.4,292.6 L 757.6,257.6 L 821,234.6 L 903.5,145.4 L 873.9,133.4 L 711.8,110.4 L 567.3,82.8 L 530,53.4 L 456.7,47.8 L 401.7,39.6 L 270.6,30.4 L 89.5,38.6 L 15.5,92 Z";
