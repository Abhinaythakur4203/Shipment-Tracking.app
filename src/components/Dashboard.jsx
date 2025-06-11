import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalShipments: 0,
    activeShipments: 0,
    deliveredShipments: 0,
    inTransit: 0,
    pendingETA: 0
  });

  useEffect(() => {
    // Simulate fetching data from backend
    const fetchData = async () => {
      const dummyData = [
        { status: 'in-transit', eta: '2025-06-15T10:00:00Z' },
        { status: 'delivered', eta: '2025-06-10T13:00:00Z' },
        { status: 'in-transit', eta: '' },
        { status: 'pending', eta: '' },
        { status: 'delivered', eta: '2025-06-01T09:00:00Z' }
      ];

      const total = dummyData.length;
      const active = dummyData.filter(s => s.status === 'in-transit' || s.status === 'pending').length;
      const delivered = dummyData.filter(s => s.status === 'delivered').length;
      const inTransit = dummyData.filter(s => s.status === 'in-transit').length;
      const pendingETA = dummyData.filter(s => !s.eta).length;

      setStats({
        totalShipments: total,
        activeShipments: active,
        deliveredShipments: delivered,
        inTransit,
        pendingETA
      });
    };

    fetchData();
  }, []);

  return (
    <div className=" bg-gradient-to-br from-slate-700 to-gray-900 h-screen  p-6 rounded-lg shadow-md space-y-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total Shipments" value={stats.totalShipments} color="bg-blue-500" />
        <Card title="Active Shipments" value={stats.activeShipments} color="bg-yellow-500" />
        <Card title="Delivered Shipments" value={stats.deliveredShipments} color="bg-green-500" />
        <Card title="In Transit" value={stats.inTransit} color="bg-purple-500" />
        <Card title="Pending ETA" value={stats.pendingETA} color="bg-red-500" />
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-5 rounded-xl text-white shadow-lg ${color}`}>
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Dashboard;
