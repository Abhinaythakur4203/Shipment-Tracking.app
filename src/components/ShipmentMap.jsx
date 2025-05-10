import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getShipmentById } from '../api/shipmentsAPI';

// Component to update the map's center dynamically
function UpdateMapCenter({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function ShipmentMap() {

  
  const shipment = {
    shipmentId: 'SHIP-XXXX',
    containerId: '67890',
    route: [
      { lat: 51.505, lng: -0.09, name: 'Start' },
      { lat: 51.51, lng: -0.1, name: 'Midpoint' },
      { lat: 51.52, lng: -0.12, name: 'End' },
    ],
    currentLocation: { lat: 51.505, lng: -0.09, locationName: 'Current Location' },
    currentETA: new Date().toISOString(),
  };

  const [shipmentId, setShipmentId] = useState(shipment.shipmentId);
  const [shipmentData, setShipmentData] = useState(shipment); // Set default shipment data
  const [path, setPath] = useState(shipment.route.map((point) => [point.lat, point.lng])); // Default path
  const [current, setCurrent] = useState(shipment.currentLocation); // Default current location

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shipmentId) {
      alert('Please enter a shipment ID.');
      return;
    }

    getShipmentById(shipmentId.trim())
      .then((response) => {
        const data = response.data.data;
        setShipmentData(data); // Assuming the API returns the shipment data directly
        console.log('Shipment Data:', data);
        setCurrent(data.currentLocation);
        setPath(data.route.map((point) => [point.lat, point.lng])); // Extract lat/lng for Polyline
      })
      .catch((error) => {
        console.error('Error fetching shipment data:', error);
        alert('Error fetching shipment data. Please try again later.');
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-100%">
      <div className="shipment-map-header flex justify-between items-center w-full p-2 bg-gray-700 rounded-lg mb-4">
        <div>
          <form>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative flex justify-between items-center">
              <input
                type="search"
                id="search"
                value={shipmentId}
                onChange={(e) => setShipmentId(e.target.value)}
                className="block w-80 p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white absolute end-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-white">Container ID: {shipmentData?.containerId || 'N/A'}</p>
          <p className="text-sm text-white">ETA: {shipmentData?.currentETA ? new Date(shipmentData.currentETA).toLocaleString() : 'N/A'}</p>
        </div>
      </div>
      <div className="shipment-map w-5/6 h-4/5 p-2 rounded-lg">
        <MapContainer center={[51.505, -0.09]} zoom={9} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Update map center dynamically */}
          <UpdateMapCenter center={[current.lat, current.lng]} />
          {shipmentData.route.map((point, index) => (
            <Marker key={index} position={[point.lat, point.lng]}>
              <Popup>{point.name}</Popup>
            </Marker>
          ))}
          <Polyline positions={path} color="blue" />
          {current.lat && current.lng && (
            <Marker
              position={[current.lat, current.lng]}
              icon={L.icon({
                iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            >
              <Popup>{current.locationName}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
