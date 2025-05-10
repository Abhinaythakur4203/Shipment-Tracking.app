  export default  shipment = {
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