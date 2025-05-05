import { useState, useEffect } from "react";
import "../styles/Tailwind.css";

function BestillingsinfoPage() {
  return (
    <div className="min-h-screen w-full bg-pink-200 flex justify-center items-start p-6">
      {/* Card */}
      <div className="relative w-[400px] bg-white rounded-xl shadow-lg p-4 font-sans text-sm">

        {/* Header Row: Hospital, Køkken, Exit */}
        <div className="flex items-start justify-between mb-4 gap-2">
          {/* Bornholms Hospital Box */}
          <div className="bg-white border rounded px-3 py-1 text-xs font-bold shadow-sm w-[40%] text-center h-[56px] flex items-center justify-center">
            Bornholms Hospital
          </div>

          {/* Køkken Box */}
          <div className="bg-white border rounded px-3 py-1 text-xs shadow-sm w-[40%] text-center h-[56px] flex flex-col justify-center">
            <div className="text-sm font-bold">Køkken</div>
            <div className="text-xs">Mandag 10/03</div>
            <div className="font-bold text-sm">15:18</div>
          </div>

          {/* Exit Button beside Køkken */}
          <button
            className="w-7 h-7 flex items-center justify-center bg-white border text-red-500 text-xs font-bold rounded shadow"
            aria-label="Luk"
          >
            X
          </button>
        </div>

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
            Hakkebøf m/Kartofler
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

export default BestillingsinfoPage;
