import "../styles/Tailwind.css";
import apiFacade from "/data/mockApiFacade"; 
import { useEffect, useState } from "react";
import  { useParams } from "react-router";



function OrderDetails() {

  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchedOrder = apiFacade.getOrderById(orderId);
    setOrder(fetchedOrder);
  }, [orderId]);


// testing the data fetching
  const fetchSomething = () => {
    apiFacade.getAllOrders()
      .then((data) => {
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });




  };

  if (!order) return <p>Loading...</p>;

  return (

    
    

    /* the outher parent */
    <div className="flex items-center justify-center min-h-screen px-4">
 


      {/* Card */}
      <div className="relative w-[400px] bg-white rounded-xl shadow-lg p-6 font-sans text-black">
      
      <button onClick={fetchSomething}> fetch all orders</button>

        {/* Section Title with Arrow */}
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded mb-3 font-semibold">
          <span>Patientmåltider og tilberedningsstatus</span>
          <button
            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow hover:bg-gray-200 text-gray-600 text-sm"
            aria-label="Open details"
          >
            ➤
          </button>
        </div>

        {/* Bestilling/Seng bar */}
        <div className="bg-blue-100 rounded p-2 text-xs font-bold text-blue-600 flex justify-between mb-3">
          <span>Bestilling #298</span>
          <span>Seng: 202-1</span>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="bg-blue-200 text-center font-bold py-1 rounded">Ret</div>
          <div className="bg-blue-200 text-center font-bold py-1 rounded">Kommentar</div>
          <div className="bg-blue-200 text-center font-bold py-1 rounded">Status</div>
        </div>

        {/* Table Content */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-blue-50 border text-center py-2 rounded text-xs shadow-inner">
            {order.title}
          </div>
          <div className="bg-blue-50 border text-center py-2 rounded text-xs shadow-inner">
            Peanut allergi
          </div>
          <div className="bg-blue-50 border text-center py-2 font-bold rounded text-xs shadow-inner">
            NY
          </div>
        </div>

        {/* Accept Button */}
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded font-semibold w-1/3">
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
