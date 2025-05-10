import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShipmentById } from '../api/shipmentsAPI.js';
import ShipmentMap from '../components/ShipmentMap';

export default function ShipmentDetails() {
  const { shipmentId } = useParams();
  const [shipment, setShipment] = useState(null);

  useEffect(() => {
    getShipmentById(shipmentId).then(res => {
      setShipment(res.data.data);
    });
  }, [shipmentId]);

  if (!shipment) return <p>Loading...</p>;

  return (
    <div>
      <h2>Shipment ID: {shipment.shipmentId}</h2>
      <p>Container: {shipment.containerId}</p>
      <p>Status: {shipment.status}</p>
      <p>ETA: {new Date(shipment.currentETA).toLocaleString()}</p>
      <ShipmentMap shipment={shipment} />
    </div>
  );
}
