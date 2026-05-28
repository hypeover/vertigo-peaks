"use client";

import dynamic from "next/dynamic";
import type { FeatureCollection } from "geojson";

const MapComponent = dynamic(() => import("./map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <span className="text-sm text-muted-foreground">Ładowanie mapy...</span>
    </div>
  ),
});

interface MapDynamicProps {
  gpxGeoJson?: FeatureCollection | null;
  peaks?: FeatureCollection | null;
}

const MapDynamic = ({ gpxGeoJson, peaks }: MapDynamicProps) => {
  return <MapComponent gpxGeoJson={gpxGeoJson} peaks={peaks} />;
}

export default MapDynamic