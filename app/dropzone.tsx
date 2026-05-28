"use client";

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadDropzoneIcon,
  FileUploadTitle,
  FileUploadDescription,
  FileUploadTrigger,
  FileUploadHelper,
  FileUploadItemGroup,
  FileUploadItem,
  FileUploadItemName,
  FileUploadItemDeleteTrigger,
} from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { parseGpxToGeoJson } from "@/components/map/parser";
import { fetchRouteData } from "@/components/map/fetch-peaks"

interface DropzoneProps {
  onGeoJsonChange: (geoJson: GeoJSON.FeatureCollection | null) => void;
}

const Dropzone = ({ onGeoJsonChange }: DropzoneProps) => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <FileUpload
      maxFiles={1}
      accept={[".gpx"]}
      onFileChange={async (details) => {
        const gpxFile = details.acceptedFiles[0] ?? null;
        setFile(gpxFile);
        if (gpxFile) {
          const parsed = await parseGpxToGeoJson(gpxFile);
          onGeoJsonChange(parsed);
        } else {
          onGeoJsonChange(null);
        }
      }}
    >
      {!file && (
        <FileUploadDropzone>
          <FileUploadDropzoneIcon />
          <FileUploadTitle>Drop GPX file here</FileUploadTitle>
          <FileUploadDescription>or</FileUploadDescription>
          <FileUploadTrigger />
          <FileUploadHelper>Only .gpx files are accepted.</FileUploadHelper>
        </FileUploadDropzone>
      )}

      <FileUploadItemGroup>
        {file && (
          <FileUploadItem className="flex flex-col gap-2" file={file}>
            <FileUploadItemName className="text-lg" asChild>
              <span>{file.name.replace(".gpx", "")}</span>
            </FileUploadItemName>
            <FileUploadItemDeleteTrigger asChild>
              <Button className="cursor-pointer" variant="destructive" size="sm">
                Usuń
              </Button>
            </FileUploadItemDeleteTrigger>
          </FileUploadItem>
        )}
      </FileUploadItemGroup>
    </FileUpload>
  );
};

export default Dropzone;