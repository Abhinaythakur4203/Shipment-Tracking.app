import React, { useEffect, useState } from 'react';
import { getAllShipments } from '../api/shipmentsAPI.js';
import { Search } from 'lucide-react';
import ShipmentForm from './ShipmentForm';

export default function ShipmentList() {
  const [shipments, setShipments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setError(null);

    getAllShipments({ page, limit: 10 })
      .then((res) => {
        const fetchedShipments = res.data.data.shipments;
        setShipments(fetchedShipments);
        setHasMore(fetchedShipments?.length > 0);
      })
      .catch((err) => {
        console.error('Error fetching shipments:', err);
        setError('Failed to load shipments. Please try again.');
      });
  }, [page]);


  const handleAddNewShipment = () => {
    setShowForm(showForm => !showForm);
  }

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Shipments Management</h1>
        <p className="text-gray-500">Manage all shipments, search, and navigate through pages.</p>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="searchShipment"
            className="pl-10 pr-4 py-2 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
          onClick={handleAddNewShipment}
        >
          Add New
        </button>
      </div>

      {showForm && (
        <div className='display flex justify-center transition ease-in-out duration-300'>
          <ShipmentForm  />
        </div>
      )}

      {/* Table Section */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th className="px-6 py-3">Shipment ID</th>
              <th className="px-6 py-3">Container ID</th>
              <th className="px-6 py-3">Routes</th>
              <th className="px-6 py-3">Current Location</th>
              <th className="px-6 py-3">Current ETA</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {shipments
              .filter(
                (shipment) =>
                  shipment.shipmentId.toLowerCase().includes(search.toLowerCase()) ||
                  shipment.containerId.toLowerCase().includes(search.toLowerCase()) ||
                  shipment.route.some((point) =>
                    point.name.toLowerCase().includes(search.toLowerCase())
                  )
              )
              .map((shipment, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      <input
                        id={`checkbox-table-search-${index}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {shipment.shipmentId}
                  </th>
                  <td className="px-6 py-4">{shipment.containerId}</td>
                  <td className="px-6 py-4">
                    {shipment.route.map((point, i) => (
                      <span key={i}>
                        {point.name}
                        {i < shipment.route.length - 1 && ', '}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4">{shipment.currentLocation?.locationName || 'N/A'}</td>
                  <td className="px-6 py-4">
                    {shipment.currentETA
                      ? new Date(shipment.currentETA).toLocaleString()
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4">{shipment.status || 'N/A'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <p className="text-gray-500">Page: {page}</p>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasMore}
        >
          Next
        </button>
      </div>
    </div>
  );
}
