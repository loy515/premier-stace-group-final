import { useEffect, useRef } from 'react';

interface MapProps {
  lat: number;
  lon: number;
  city: string;
  shipmentId: string;
}

declare global {
  interface Window { google: any; }
}

export default function Map({ lat, lon, city, shipmentId }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // IMPORTANT: Replace with your actual Google Maps API Key
  // You must get this from the Google Cloud Console.
  const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY_HERE"; 

  useEffect(() => {
    const initializeMap = () => {
      if (!mapRef.current || !window.google) {
        console.error("Google Maps script not loaded yet.");
        return;
      }
      if (isNaN(lat) || isNaN(lon) || (lat === 0 && lon === 0)) {
        if (mapRef.current) mapRef.current.innerHTML = '<p class="text-center text-gray-500 py-8">Map data is unavailable for this location.</p>';
        return;
      }
      
      const location = { lat, lng: lon };
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 8,
        center: location,
        mapId: 'DEMO_MAP_ID', // Using a simple map ID
      });
      const marker = new window.google.maps.Marker({
        position: location,
        map: map,
        title: `Shipment ${shipmentId}`
      });
      const infowindow = new window.google.maps.InfoWindow({
        content: `<div style="padding: 8px;"><h4 style="margin: 0 0 8px 0; font-weight: bold;">${shipmentId}</h4><p style="margin: 0;">Location: ${city}</p></div>`
      });
      marker.addListener('click', () => infowindow.open(map, marker));
    };

    if (window.google?.maps) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = initializeMap;
      script.onerror = () => console.error("Google Maps script failed to load.");
      document.head.appendChild(script);
    }
  }, [lat, lon, city, shipmentId]);

  return <div ref={mapRef} className="w-full h-96 bg-gray-100 rounded-lg border" />;
}
