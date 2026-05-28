"use client";

import { useState } from "react";
import type { FeatureCollection } from "geojson";
import Dropzone from "./dropzone";
import MapDynamic from "@/components/map/map-dynamic";
import { fetchRouteData } from "@/components/map/fetch-peaks";

export default function GpxViewer() {
  const [geoJson, setGeoJson] = useState<FeatureCollection | null>(null);
  const [peaks, setPeaks] = useState<FeatureCollection | null>(null);
  const [date, setDate] = useState<string>("");

  async function handleGeoJsonChange(data: FeatureCollection | null) {
    setGeoJson(data);
    setPeaks(null);
    setDate("");

    if (data) {
      const { peaks, date } = await fetchRouteData(data);
      setPeaks(peaks);
      setDate(date);
    }
  }

  return (
    <>
      <div className="w-1/3">
        <Dropzone onGeoJsonChange={handleGeoJsonChange} />
      </div>
      <div className="h-125 w-full rounded-lg overflow-hidden">
        <MapDynamic gpxGeoJson={geoJson} peaks={peaks} />
      </div>
    </>
  );
}