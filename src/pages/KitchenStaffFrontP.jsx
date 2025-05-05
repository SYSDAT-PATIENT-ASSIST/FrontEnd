import React, { useEffect, useState } from "react";
import mockFacade from "../../data/mockApiFacade";

function KitchenStaffFrontP() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    mockFacade
      .getAllOrders()
      .then(setOrders)
      .catch((err) => setError(err));
  }, []);

  const specialOrders = orders.filter(
    (order) => order.comment?.trim() && order.status !== "KLAR"
  );
  const specialMeals = orders.filter((order) => order.comment?.trim()).length;
  const finishedSpecialMeals = orders.filter(
    (order) => order.comment?.trim() && order.status === "KLAR"
  ).length;
  const beefCount = orders.filter((order) =>
    order.dishes?.some((d) => d.name === "Hakkebøf m. løg")
  ).length;
  const sandwhichCount = orders.filter((order) =>
    order.dishes?.some((d) => d.name === "Peanut Butter Sandwich")
  ).length;
  const isDelayed = specialOrders.some((order) => order.status === "FORSINKET");

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
          <div className="bg-[#D5FBFF] text-black p-4 border border-gray-300">
            <p className="text-lg mb-2">
              <strong>Special måltider:</strong> {specialMeals}
            </p>
            <p className="text-lg mb-2">
              <strong>Hakkebøf m. løg:</strong> {beefCount}
            </p>
            <p className="text-lg mb-2">
              <strong>Peanut Butter Sandwhich:</strong> {sandwhichCount}
            </p>
            <p className="text-lg">
              <strong>Færdiggjorte specialmåltider:</strong>{" "}
              {finishedSpecialMeals}
            </p>
          </div>

          {/* BUTTON BAR */}
          <div className="flex items-center justify-between my-4">
            <button className="w-40 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
              Forsinket!
            </button>

            <h1 className="text-xl text-black font-bold">Specialretter</h1>

            <button className="w-40 bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
              Marker som klar
            </button>
          </div>

           {/* SPECIAL ORDER BOXES */}
           <div className="overflow-y-auto flex-grow space-y-2">
            {specialOrders.map((order) => {
              // SET COLOR + LABEL
              let boxColor = "bg-[#D5FBFF]";
              let buttonLabel = "";
              let buttonColor = "";

              switch (order.status) {
                case "NY":
                  buttonLabel = "NY!";
                  buttonColor =
                    "bg-blue-400 hover:bg-blue-500 text-white";
                  break;
                case "IN_PREPARATION":
                  buttonLabel = "Igang";
                  buttonColor =
                    "bg-yellow-400 hover:bg-yellow-500 text-black";
                  break;
                case "FORSINKET":
                  boxColor = "bg-red-300";
                  break;
                default:
                  break;
              }

              return (
                <div
                  key={order.id}
                  className={`p-4 border border-gray-300 flex items-center justify-between rounded ${boxColor}`}
                >
                  <p className="text-lg text-black font-semibold">
                    Bestilling #{order.id}
                  </p>
                  {order.status === "FORSINKET" ? (
                    <p className="italic text-black">Forsinket</p>
                  ) : (
                    <button
                      className={`${buttonColor} font-bold py-1 px-3 rounded`}
                    >
                      {buttonLabel}
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {error && (
            <p className="text-red-600 mt-4">Fejl: {error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default KitchenStaffFrontP;