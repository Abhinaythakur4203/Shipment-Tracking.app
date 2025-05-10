import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api/v1' }); // Update as needed

export const getAllShipments = ({ page, limit }) => 
  API.get(`/shipments`, {
    params: { page, limit }, // Automatically appends ?page=1&limit=10
  });


export const getShipmentById = (shipmentId) => API.get(`/shipments/${shipmentId}`);
export const createShipment = (data) => API.post('/shipments', data);
export const updateLocation = (shipmentId, data) => API.post(`/shipments/${shipmentId}/update-location`, data);
export const updateETA = (shipmentId, data) => API.get(`/shipments/${shipmentId}/eta`, data);
export const deleteShipment = (shipmentId) => API.delete(`/shipments/${shipmentId}`);



// (async () => {
  
//     getAllShipments({ page: 1, limit: 10 })
//     .then((response) => {
//         const shipments = response.data.data;
//         console.log('Fetched shipments:', shipments);
//     })
    
// })();



