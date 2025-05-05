import { useState, useEffect } from "react";
import "../styles/Tailwind.css";

function BestillingsinfoPage() {
  return (
    <div className="p-4">
      {/* Big Header */}
      <div className="text-3xl font-bold text-blue-600 mb-6">
        Tailwind is working!
      </div>

      {/* Card */}
      <div className="w-[360px] bg-white rounded-xl shadow-lg p-4 font-sans text-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded">REGION</div>
            <div className="text-xs font-bold">Bornholms Hospital</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">Køkken</div>
            <div className="text-xs">Mandag 10/03</div>
            <div className="text-lg font-bold">15:18</div>
          </div>
        </div>

        {/* Section Title */}
        <div className="bg-gray-100 p-2 rounded mb-3 font-semibold">
          Patientmåltider og tilberedningsstatus
        </div>

        {/* Bestilling/Seng bar */}
        <div className="bg-gray-200 rounded p-2 text-xs font-bold text-blue-600 flex justify-between mb-3">
          <span>Bestilling #298</span>
          <span>Seng: 202-1</span>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <div className="bg-gray-300 text-center font-bold py-1 rounded">Ret</div>
          <div className="bg-gray-300 text-center font-bold py-1 rounded">Kommentar</div>
          <div className="bg-gray-300 text-center font-bold py-1 rounded">Status</div>
        </div>

        {/* Table Content (boxed) */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white border text-center py-2 rounded text-xs shadow-inner">
            Hakkebøf m/Kartofler
          </div>
          <div className="bg-white border text-center py-2 rounded text-xs shadow-inner">
            Peanut allergi
          </div>
          <div className="bg-white border text-center py-2 font-bold rounded text-xs shadow-inner">
            NY
          </div>
        </div>

        {/* Accept Button (smaller) */}
        <div className="flex justify-center">
          <button className="bg-blue-500 text-white py-2 px-4 rounded font-semibold w-1/3">
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

export default BestillingsinfoPage;
