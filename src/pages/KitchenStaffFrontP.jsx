import React, { useEffect, useState } from "react";
import mockFacade from "../../data/mockApiFacade";
import { useNavigate } from "react-router";
import { useOrderStatus } from "../../contexts/OrderStatusContext";

function KitchenStaffFrontP() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    mockFacade
      .getAllOrders()
      .then(setOrders)
      .catch((err) => setError(err));
  }, []);

  const { setDelayedOrder } = useOrderStatus();

  const visibleOrders = orders.filter(o => o.status !== "afsendt");


  const specialOrders = visibleOrders.filter(
    (order) => order.note?.trim() && order.status !== "færdig"
  );

  const specialMeals = visibleOrders.filter((order) => order.note?.trim()).length;

  const finishedSpecialMeals = visibleOrders.filter(
    (order) => order.note?.trim() && order.status === "færdig"
  ).length;

const dishCounts = {};
visibleOrders.forEach(order => {
  const dish = order.dish;
  if (dish?.name) {
    dishCounts[dish.name] = (dishCounts[dish.name] || 0) + 1;
  }
});

  const isDelayed = specialOrders.some((order) => order.status === "DELAYED");

  const handleMarkDelayed = async () => {
  const updated = await Promise.all(
    orders.map(async (order) => {
      if (order.note?.trim() && order.status !== "FÆRDIG") {
        await mockFacade.updateOrderStatus(order.id, "DELAYED");
        setDelayedOrder({ orderId: order.id, customerId: order.customerId });
        return { ...order, status: "DELAYED" };
      }
      return order;
    })
  );

  setOrders(updated);
};


  const handleMarkReady = async () => {
    const updated = await Promise.all(
      orders.map(async (order) => {
        if (order.note?.trim() && order.status !== "FÆRDIG") {
          await mockFacade.updateOrderStatus(order.id, "FÆRDIG");
          return { ...order, status: "FÆRDIG" };
        }
        return order;
      })
    );

    setOrders(updated);
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center flex flex-col">
      <div className="flex justify-center">
        <div
          className="w-full max-w-[1200px] bg-white rounded-lg shadow-md px-8 py-6 overflow-auto"
          style={{
            flexGrow: 1,
            marginTop: "10px",
            height: "81.7vh",
          }}
        >
          {/* TOP TITLE */}
          <h1 className="text-xl text-black font-bold mb-4">
            Patientmåltider og tilberedningsstatus
          </h1>

          {/* STATS BOX */}
          <div
            className={`p-4 border border-gray-300 ${
              isDelayed ? "bg-red-300" : "bg-[#D5FBFF]"
            } text-black`}
          >
            <p className="text-lg mb-2">
              <strong>Special måltider:</strong> {specialMeals}
            </p>

            {Object.entries(dishCounts).map(([dishName, count]) => (
              <p key={dishName} className="text-lg mb-2">
                <strong>{dishName}:</strong> {count}
              </p>
            ))}

            <p className="text-lg">
              <strong>Færdiggjorte specialmåltider:</strong>{" "}
              {finishedSpecialMeals}
            </p>
          </div>

          {/* BUTTON BAR */}
          <div className="flex items-center justify-between my-4">
            {!isDelayed && (
              <button
                onClick={handleMarkDelayed}
                className="w-40 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
              >
                Forsinket!
              </button>
            )}

            <h1 className="text-xl text-black font-bold">Specialretter</h1>

            <button
              onClick={handleMarkReady}
              className="w-40 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded"
            >
              Marker som klar
            </button>
          </div>

{/* SPECIAL ORDER BOXES */}
<div className="overflow-y-auto flex-grow space-y-2">
  {specialOrders.length === 0 ? (
    <p className="text-center text-gray-500 italic mt-4">
      Ikke flere specialretter!
    </p>
  ) : (
    specialOrders.map(order => {
      let boxColor = "bg-[#D5FBFF]";
      let buttonLabel = "";
      let buttonColor = "";

      switch (order.status) {
        case "venter":
          buttonLabel = "VENTER";
          buttonColor = "bg-blue-400 hover:bg-blue-500 text-white";
          break;

        case "afsendt":
          buttonLabel = "AFSENDT";
          buttonColor = "bg-purple-400 hover:bg-purple-500 text-white";
          break;

        case "bekræftet":
          buttonLabel = "BEKRÆFTET";
          buttonColor = "bg-yellow-400 hover:bg-yellow-500 text-black";
          break;

        case "færdig":
          boxColor = "bg-green-300";
          break;

        default:
          break;
      }

      return (
        <div
          key={order.id}
          onClick={() => {
                      if (order.status === "venter") {
                        navigate(`/orderdetails/${order.id}`);
                      } else if (order.status === "bekræftet") {
                        navigate(`/Order-confirmation`);
                      }
                    }}
          className={`cursor-pointer p-4 border border-gray-300 flex items-center justify-between rounded ${boxColor}`}
        >
          <p className="text-lg text-black font-bold">
            Bestilling #{order.id}
          </p>

          {order.status === "færdig" ? (
            <p className="italic text-black">FÆRDIG</p>
          ) : (
            <button
              className={`${buttonColor} font-bold py-1 px-3 rounded`}
            >
              {buttonLabel}
            </button>
          )}
        </div>
      );
    })
  )}
</div>


          {error && <p className="text-red-600 mt-4">Fejl: {error.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default KitchenStaffFrontP;