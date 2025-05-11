import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getShipmentById } from '../api/shipmentsAPI';

// Component to dynamically update the map's center
function UpdateMapCenter({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

export default function ShipmentMap() {
  const defaultShipment = {
    shipmentId: '',
    containerId: 'N/A',
    route: [],
    currentLocation: { lat: 51.505, lng: -0.09, locationName: 'Default Location' },
    currentETA: null,
  };

  const [shipmentId, setShipmentId] = useState('');
  const [shipmentData, setShipmentData] = useState(defaultShipment);
  const [path, setPath] = useState([]);
  const [current, setCurrent] = useState(defaultShipment.currentLocation);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shipmentId.trim()) {
      alert('Please enter a shipment ID.');
      return;
    }

    getShipmentById(shipmentId.trim())
      .then((response) => {
        const data = response.data.data;
        setShipmentData(data);
        setCurrent(data.currentLocation);
        setPath(data.route.map((point) => [point.lat, point.lng]));
      })
      .catch((error) => {
        console.error('Error fetching shipment data:', error);
        alert('Error fetching shipment data. Please try again later.');
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {/* Header Section */}
      <div className="shipment-map-header flex justify-between items-center w-full p-4 bg-gray-700 rounded-lg mb-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="search"
            id="search"
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
            className="block w-80 p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Enter Shipment ID"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </form>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-white">Container ID: {shipmentData.containerId}</p>
          <p className="text-sm text-white">
            ETA: {shipmentData.currentETA ? new Date(shipmentData.currentETA).toLocaleString() : 'N/A'}
          </p>
        </div>
      </div>

      {/* Map Section */}
      <div className="shipment-map w-5/6 h-4/5 p-2 rounded-lg">
        <MapContainer center={[current.lat, current.lng]} zoom={9} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
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
