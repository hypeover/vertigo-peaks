"use client";

import Map, { Source, Layer, MapRef } from "react-map-gl/maplibre";
import { useEffect, useRef } from "react";
import type { FeatureCollection } from "geojson";
import bbox from "@turf/bbox";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapComponentProps {
  gpxGeoJson?: FeatureCollection | null;
  peaks?: FeatureCollection | null;
}

const MapComponent = ({ gpxGeoJson, peaks }: MapComponentProps) => {
  const mapRef = useRef<MapRef>(null);

  useEffect(() => {
    if (!gpxGeoJson || !mapRef.current) return;

    try {
      const bounds = bbox(gpxGeoJson);

      if (bounds[0] === Infinity || bounds[1] === Infinity) return;

      mapRef.current.fitBounds(
        [bounds[0], bounds[1], bounds[2], bounds[3]],
        { padding: 60, duration: 1500, essential: true }
      );
    } catch (error) {
      console.error("Błąd podczas dopasowywania mapy do trasy:", error);
    }
  }, [gpxGeoJson]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 20,
        latitude: 52,
        zoom: 6,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="https://api.maptiler.com/maps/outdoor-v4/style.json?key=QVovYtOfq0BM6sQt6fF9"
    >
      {gpxGeoJson && (
        <Source id="gpx" type="geojson" data={gpxGeoJson}>
          <Layer
            id="gpx-route"
            type="line"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{ "line-color": "#6a00f5", "line-width": 9 }}
          />
        </Source>
      )}
    </Map>
  );
}

export default MapComponent