"use client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const containerStyle = {
  width: '100%',
  height: '180px',
};
const center = { lat: 28.6139, lng: 77.2090 }; // Default: New Delhi

export default function ClientMapPicker() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Set in .env.local
  });
  const [marker, setMarker] = useState(center);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  }, []);

  if (!isLoaded) return <div className="h-48 flex items-center justify-center text-blue-600">Loading map...</div>;

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