import React, { useState } from 'react';
import { createShipment } from '../api/shipmentsAPI.js';

export default function ShipmentForm() {
  const [form, setForm] = useState({
    shipmentId: '',
    containerId: '',
    route: '',
    currentLocation: { lat: '', lng: '', locationName: '' },
    currentETA: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const route = JSON.parse(form.route); // expects JSON array string
    await createShipment({ ...form, route });
    alert('Shipment created!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Shipment ID" onChange={e => setForm({ ...form, shipmentId: e.target.value })} />
      <input type="text" placeholder="Container ID" onChange={e => setForm({ ...form, containerId: e.target.value })} />
      <textarea placeholder="Route (JSON array)" onChange={e => setForm({ ...form, route: e.target.value })} />
      <input type="text" placeholder="Current Location Name" onChange={e => setForm({ ...form, currentLocation: { ...form.currentLocation, locationName: e.target.value } })} />
      <input type="number" placeholder="Latitude" onChange={e => setForm({ ...form, currentLocation: { ...form.currentLocation, lat: parseFloat(e.target.value) } })} />
      <input type="number" placeholder="Longitude" onChange={e => setForm({ ...form, currentLocation: { ...form.currentLocation, lng: parseFloat(e.target.value) } })} />
      <input type="datetime-local" onChange={e => setForm({ ...form, currentETA: e.target.value })} />
      <button type="submit">Create Shipment</button>
    </form>
  );
}
