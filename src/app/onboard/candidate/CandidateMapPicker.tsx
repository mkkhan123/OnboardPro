"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const containerStyle = {
  width: '100%',
  height: '180px',
};
const center = { lat: 28.6139, lng: 77.2090 }; // Default: New Delhi

interface MapPickerProps {
    apiKey: string | undefined;
    onLocationSelect: (location: { lat: number; lng: number }) => void;
}

export default function CandidateMapPicker({ apiKey, onLocationSelect }: MapPickerProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
  });
  const [marker, setMarker] = useState(center);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
        const newLocation = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        setMarker(newLocation);
        onLocationSelect(newLocation);
    }
  }, [onLocationSelect]);

  if (loadError) {
    return <div className="h-48 flex items-center justify-center text-red-600">Error loading map. Please check the API key.</div>;
  }
  if (!isLoaded) return <div className="h-48 flex items-center justify-center text-gray-600">Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={marker}
      zoom={10}
      onClick={onMapClick}
    >
      <Marker position={marker} />
    </GoogleMap>
  );
} 