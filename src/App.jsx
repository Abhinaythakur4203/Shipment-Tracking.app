import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.jsx';
import ShipmentList from './components/ShipmentList';
import ShipmentForm from './components/ShipmentForm';
import ShipmentDetails from './pages/ShipmentDetails';
import ShipmentMap from './components/ShipmentMap.jsx';

function App() {
  return (
    <>
      <div className='flex w-full h-screendark:bg-main-dark-bg'>
        <BrowserRouter>
          <div className='flex flex-col w-1/5  h-screen  dark:bg-main-dark-bg'>
            <Sidebar />
          </div>
          <div className='w-full p-2.5 h-screen  bg-gray-800 dark:bg-main-dark-bg'>
            <Routes>
              <Route path='/' element={<ShipmentList />} />
              <Route path='/dashboard/all-shipment' element={<ShipmentList />} />
              <Route path='/dashboard/create-shipment' element={<ShipmentForm />} />
              <Route path='/dashboard/track-shipment' element={<ShipmentDetails />} />
              <Route path='/dashboard/update-location' element={<ShipmentForm />} />
              <Route path='/dashboard/map-view' element={<ShipmentMap />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
