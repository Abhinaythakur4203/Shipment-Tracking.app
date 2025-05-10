import React, { useEffect, useState } from 'react';
import { getAllShipments } from '../api/shipmentsAPI.js';
import { Link } from 'react-router-dom';

export default function ShipmentList() {
  const [shipments, setShipments] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more shipments are available
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    setError(null); // Reset error state
    //console.log('Fetching shipments for page:', page); // Debugging

    getAllShipments({ page, limit: 10 })
      .then(res => {
        const fetchedShipments = res.data.data.shipments;

        console.log('Fetched shipments:', fetchedShipments); // Debugging
        setShipments(fetchedShipments);
        setHasMore(fetchedShipments?.length > 0); // Disable "Next" if no shipments
      })
      .catch(err => {
        console.error('Error fetching shipments:', err);
        setError('Failed to load shipments. Please try again.');
      });
  }, [page]);

  return (
    <div>
      


      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="checkbox-all-search" class="sr-only">checkbox</label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">
                Shipment_ID
              </th>
              <th scope="col" class="px-6 py-3">
                Container_ID
              </th>
              <th scope="col" class="px-6 py-3">
                Routes
              </th>
              <th scope="col" class="px-6 py-3">
                Current Location
              </th>
              <th scope="col" class="px-6 py-3">
                Current ETA
              </th>
              <th scope="col" class="px-6 py-3">
                status
              </th>
              <th scope="col" class="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-table-search-${index}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                <td className="flex items-center px-6 py-4">
                  <Link
                    to={`/shipments/edit/${shipment.shipmentId}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleRemove(shipment.shipmentId)}
                    className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className=' btn p-5 cursor-pointer  rounded ' onClick={() => setPage(p => p - 1)} disabled={page === 1}>Prev</button>
      <button className='btn' onClick={() => setPage(p => p + 1)} disabled={!hasMore}>Next</button>
    </div>
  );
}
