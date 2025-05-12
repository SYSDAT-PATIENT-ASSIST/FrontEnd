import "../styles/Tailwind.css";
import apiFacade from "/data/mockApiFacade";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function OrderDetails() {
  // hooks / state variables
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [dish, setDish] = useState(null);

  // class variables
  const navigate = useNavigate();

  // useEffect to fetch the order details by id when called upon
  // and set the order state with the fetched data
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const fetchedOrder = await apiFacade.getOrderById(id);
        setOrder(fetchedOrder);
        console.log("Fetched order:", fetchedOrder);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };

    fetchOrder();
  }, [id]);

  // testing the data fetching
  const fetchSomething = () => {
    apiFacade
      .getAllOrders()
      .then((data) => {
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

// handleClick function for the accept button. with updating the order to "Igang" and returning to kitchenstaff page
  function handleClickUpDateStatus() {
    console.log("Accept Button clicked!");

    const updateStatus = async () => {
      try {
        const updatedOrder = await apiFacade.updateOrderStatus(id, "IN_PREPARATION");
        setOrder(updatedOrder);
        console.log("Order status updated:", updatedOrder);
        navigate("/kitchenStaff"); // Redirect to the kitchen page after updating the status
      } catch (err) {
        console.error("Failed to update order status:", err);
      }
    };

    updateStatus(); 
  }

  function handleClickNavKichenStaff() {
    navigate("/kitchenStaff");
  }

  if (!order) return <p>Loading...</p>;

  return (
    /* the outher parent */
    <div className="flex items-center justify-center min-h-screen px-4">
      {/* Card */}
      <div className="relative w-[400px] bg-white rounded-xl shadow-lg p-6 font-sans text-black">
        
        {/* Test Button to fetch some data 
       
        <button
          onClick={fetchSomething}
          className="hover:bg-blue-400 bg-blue-500 text-white py-2 px-4 rounded font-semibold w-1/3"
        >
          fetch all orders
        </button>
        */}


        {/* Section Title with Arrow */}
        <div className="flex items-center justify-between bg-gray-100 p-2 rounded mb-3 font-semibold">
          <span>Patientmåltider og tilberedningsstatus</span>
          <button
            className="w-7 h-7 flex items-center justify-center bg-white rounded shadow hover:bg-gray-200 text-gray-600 text-sm"
            aria-label="Open details"
            onClick={handleClickNavKichenStaff}
          >
            ➤
          </button>
        </div>

        {/* Bestilling/Seng bar */}
        <div className="bg-blue-100 rounded p-2 text-xs font-bold text-blue-600 flex justify-between mb-3">
          <span>{order?.id ? `Bestilling #${order.id}` : "Bestilling"}</span>
          <span>{order?.bed_id ? `Seng ${order.bed_id}` : "Seng"}</span>
        </div>

        {/* Table Headers the "Ret". "Kommentar". "Status"*/}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="bg-blue-200 text-center font-bold py-1 rounded">
            Ret
          </div>
          <div className="bg-blue-200 text-center font-bold py-1 rounded">
            Kommentar
          </div>
          <div className="bg-blue-200 text-center font-bold py-1 rounded">
            Status
          </div>
        </div>

        {/* Table Content/ the info   */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-blue-50 border text-center py-2 rounded text-xs shadow-inner">
            {order?.dishes?.map((dish) => (
              <h1 key={dish.id}>{dish.name}</h1>
            ))}
          </div>
          <div className="bg-blue-50 border text-center py-2 rounded text-xs shadow-inner">
            {order?.note && <h1>{order.note}</h1>}
          </div>
          <div className="bg-blue-50 border text-center py-2 font-bold rounded text-xs shadow-inner">
            <h2>NY</h2>
          </div>
        </div>

        {/* Accept Button */}
        <div className="flex justify-center">
          <button
            onClick={handleClickUpDateStatus}
            className="hover:bg-blue-400 bg-blue-500 text-white py-2 px-4 rounded font-semibold w-1/3"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
