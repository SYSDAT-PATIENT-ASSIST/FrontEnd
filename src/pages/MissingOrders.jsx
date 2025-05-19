const MissingOrders = () => {


    // Dummy data for patients
    const patient = [
        { lastName: "Rasmussen", bed: "201" }, 
        { lastName: "Henriksen", bed: "202" }, 
        { lastName: "Christiansen", bed: "203" }, 
        { lastName: "Christiansen", bed: "204" },
        { lastName: "Christiansen", bed: "205" }, 
        { lastName: "Christiansen", bed: "206" }
    ];


    return ( 
        <div className="bg-white rounded-2xl p-4 mt-8 md:w-[40rem] text-black m-auto w-[20rem] h-[30rem] overflow-y-scroll">
            <h1 className="font-semibold text-2xl mb-2">Patienter der mangler at bestille mad</h1>
            <div className="flex flex-col gap-2">
                {patient.map((p, index) => (
                    <div key={index} className="flex items-center border-b-2 border-gray-300 p-4">
                        <span className="bg-blue-200 flex items-center justify-center w-14 h-14 rounded-full mr-4 text-white">{p.bed}</span>
                        <span className="text-black">{p.lastName}</span>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default MissingOrders;