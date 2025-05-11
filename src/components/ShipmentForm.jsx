import React, { useState } from "react";

const ShipmentForm = () => {
  const [shipmentData, setShipmentData] = useState({
    shipmentId: "",
    containerId: "",
    route: [{ name: "", lat: "", lng: "", isCurrent: false }],
    currentLocation: { lat: "", lng: "", locationName: "" },
    currentETA: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipmentData({ ...shipmentData, [name]: value });
  };

  const handleRouteChange = (index, field, value) => {
    const updatedRoute = [...shipmentData.route];
    updatedRoute[index][field] = field === "isCurrent" ? value === "true" : value;

    if (field === "isCurrent" && value === "true") {
      updatedRoute.forEach((r, i) => (r.isCurrent = i === index));
      const currentStop = updatedRoute[index];
      setShipmentData({
        ...shipmentData,
        route: updatedRoute,
        currentLocation: {
          lat: currentStop.lat,
          lng: currentStop.lng,
          locationName: currentStop.name,
        },
      });
    } else {
      setShipmentData({ ...shipmentData, route: updatedRoute });
    }
  };

  const addRouteStop = () => {
    setShipmentData({
      ...shipmentData,
      route: [...shipmentData.route, { name: "", lat: "", lng: "", isCurrent: false }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Shipment:", shipmentData);
    // You can post this data to a backend here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Create New Shipment</h2>

      {/* Shipment Details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Shipment ID</label>
          <input
            type="text"
            name="shipmentId"
            value={shipmentData.shipmentId}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Shipment ID"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Container ID</label>
          <input
            type="text"
            name="containerId"
            value={shipmentData.containerId}
            onChange={handleInputChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Container ID"
            required
          />
        </div>
      </div>

      {/* Route Stops */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Route Stops</label>
        {shipmentData.route.map((stop, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 mb-3">
            <input
              type="text"
              placeholder="City Name"
              value={stop.name}
              onChange={(e) => handleRouteChange(index, "name", e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Latitude"
              value={stop.lat}
              onChange={(e) => handleRouteChange(index, "lat", e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <input
              type="number"
              placeholder="Longitude"
              value={stop.lng}
              onChange={(e) => handleRouteChange(index, "lng", e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <select
              value={stop.isCurrent}
              onChange={(e) => handleRouteChange(index, "isCurrent", e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="false">Not Current</option>
              <option value="true">Current</option>
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={addRouteStop}
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          + Add Another Stop
        </button>
      </div>

      {/* Current ETA */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Current ETA</label>
        <input
          type="datetime-local"
          name="currentETA"
          value={shipmentData.currentETA}
          onChange={handleInputChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
      >
        Submit Shipment
      </button>
    </form>
  );
};

export default ShipmentForm;

