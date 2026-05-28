import { DOMParser } from "@xmldom/xmldom";
import { gpx } from "@tmcw/togeojson";

export const parseGpxToGeoJson = (file: File): Promise<GeoJSON.FeatureCollection> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const xml = new DOMParser().parseFromString(text, "text/xml");
        const geoJson = gpx(xml);
        resolve(geoJson);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });

  
}