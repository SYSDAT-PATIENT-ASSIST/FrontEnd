// src/pages/OrderConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';   
import facade from '../../data/mockApiFacade';

const OrderConfirmation = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();                

  useEffect(() => {
    facade.getAllOrders().then((all) => {
      const inPrep = all.filter((o) => o.status === 'IN_PREPARATION');
      setOrders(inPrep);
    });
  }, []);

  const markAsCompleted = async (id) => {
    await facade.updateOrderStatus(id, 'COMPLETED');
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  
  const handleClickNavKitchenStaff = () => {
    navigate('/kitchenStaff');
  };

  const order = orders[0];
  if (!order) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/hospital-bg.jpg")' }}
    >
      <div className="w-full max-w-2xl bg-white border border-gray-300 rounded-md shadow-xl text-base font-sans">
        
        
        <div className="bg-sky-100 px-6 py-3 border-b border-gray-300 flex justify-between items-center">
          <span className="font-bold text-black text-lg">
            Patientmåltider og tilberedningsstatus
          </span>
        
          <button
            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow hover:bg-gray-200 text-gray-600 text-sm"
            aria-label="Open details"
            onClick={handleClickNavKitchenStaff}
          >
            ➤
          </button>
        </div>

       
        <div className="bg-[#d9f4ff] px-6 py-3 border-b border-gray-300 flex justify-between font-bold text-black text-lg">
          <span>Bestilling #{order.id}</span>
          <span>Seng: {order.bed_id}</span>
        </div>

        
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="border border-gray-400 bg-gray-300 px-4 py-2 text-black font-semibold">
                Patient &amp; Bestillings nr.
              </th>
              <th className="border border-gray-400 bg-gray-300 px-4 py-2 text-black font-semibold">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-3 text-black">
                Seng: {order.bed_id} &amp; #{order.id}
              </td>
              <td className="border border-gray-300 px-4 py-3 bg-yellow-400 text-black font-bold text-center">
                Igang
              </td>
            </tr>
          </tbody>
        </table>

       
        <div className="px-6 py-6 flex justify-center">
          <button
            onClick={() => markAsCompleted(order.id)}
            className="w-2/3 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded font-bold transition"
          >
            Marker som klar
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
