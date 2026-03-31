import 'proj4leaflet';
import L from 'leaflet';

interface Feature {
  geometry: {
    coordinates: number[][][];
    type: 'MultiPolygon';
  };
}

const EGIS_TOKEN = 'Basic ODkzNzgyMGVlNjQ2NDVjNmIxMzM1ZDY4ZmQzMjFkYjM6YmRmMmU4NzE4NDgxNGE5MGExMmU4NzM3NzRiYTI3Zjk=';

export const baseLayers = ['kd', 'cia'].map((key) => {
  return L.tileLayer(`/EGIS/service/api/egis/base/v1/wmts/1.0.0/${key}/default/tiles/c/{z}/{y}/{x}.png?Authorization=${EGIS_TOKEN}`);
});

export const CRS_4490 = new L.Proj.CRS('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs', {
  resolutions: [
    1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125,
    0.001373291015625, 6.866455078125e-4, 3.4332275390625e-4, 1.71661376953125e-4, 8.58306884765625e-5, 4.291534423828125e-5, 2.1457672119140625e-5,
    1.0728836059570312e-5, 5.364418029785156e-6, 2.682209064925356e-6, 1.3411045324626732e-6, 0.8411045324626732e-7, 0.6411045324626732e-7,
  ],
  origin: [-180, 90],
});

export async function getWrapperGeoData(adcode: string) {
  const response = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`);
  const json = await response.json();

  return {
    isLeaf: json.features[0].properties.childrenNum === 0,
    json,
  };
}

// export async function getChildrenGeoJSON(adcode: string) {
//   const response = await fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`);

//   return {
//     json: await response.json(),
//   };
// }

export function getMaskCoordinates(features: Feature[]) {
  features.forEach(({ geometry }) => {
    console.log(geometry.coordinates);
    console.log(geometry.type);
  });

  return [
    [-90, -180],
    [-90, 180],
    [90, 180],
    [90, -180],
    [-90, -180],
  ];
}
