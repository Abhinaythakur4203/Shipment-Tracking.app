import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.jsx';
import ShipmentList from './components/ShipmentList';
import ShipmentForm from './components/ShipmentForm';
import ShipmentDetails from './pages/ShipmentDetails';
import ShipmentMap from './components/ShipmentMap.jsx';
import ShipmentUpdateLocation from './components/ShipmentUpdateLocation.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  return (
    <>
      <div className='flex w-full min-h-screen  dark:bg-main-dark-bg'>
        <BrowserRouter>
          {/* Sidebar */}
          <div className='fixed top-0 left-0 w-1/5 h-full dark:bg-main-dark-bg'>
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className=' ml-[20%] w-[100%] p-2.5 min-h-full  bg-gray-800 dark:bg-main-dark-bg'>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard/all-shipment' element={<ShipmentList />} />
              <Route path='/dashboard/create-shipment' element={<ShipmentForm />} />
              <Route path='/dashboard/track-shipment' element={<ShipmentDetails />} />
              <Route path='/dashboard/update-location' element={<ShipmentUpdateLocation />} />
              <Route path='/dashboard/map-view' element={<ShipmentMap />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
