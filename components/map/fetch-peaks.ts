import bbox from "@turf/bbox";
import osmtogeojson from "osmtogeojson";
import type { FeatureCollection } from "geojson";

export interface RouteData {
  date: string;
  peaks: FeatureCollection;
}

export const fetchRouteData = async (
  geoJson: FeatureCollection
): Promise<RouteData> => {
  const [minLng, minLat, maxLng, maxLat] = bbox(geoJson);

  const query = `
    [out:json];
    node["natural"="peak"](${minLat},${minLng},${maxLat},${maxLng});
    out geom;
  `;

  const response = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: query,
  });

  const data = await response.json();
  const peaks = osmtogeojson(data) as FeatureCollection;

  const times = geoJson.features[0]?.properties?.coordinateProperties?.times;
  const date = times?.[0] ?? "";

  return { date, peaks };
}