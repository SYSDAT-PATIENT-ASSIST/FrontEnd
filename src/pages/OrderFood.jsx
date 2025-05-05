import { useState, useEffect, useRef } from 'react';
import '../styles/OrderFood.css'
import styled from "styled-components";


const GridOrderFoodContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;    
    padding: 40px 0; 
`;


const BoxDish = styled.div`
  border-radius: 8px;
  height: 90px;
  width: 250px;
  background-color: ${(props) => 
    props.$isSoldOut ? '#9d2e0f' : // sold out color
    props.$isOrdered ? '#f37b31' : '#65a233'}; // background color changes when the dish is ordered
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 6px 10px rgba(116, 173, 68, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;  /* smooth effect */
  padding: 8px;


  &:hover {
    transform: translateY(-10px); /* moves the element upwards by 10px when hovered */
    box-shadow: 0 12px 20px rgba(116, 173, 68, 0.6);
    background-color:${(props) => 
      props.$isSoldOut ? '##9d2e0f' : // sold out color
      props.$isOrdered ? '#f37b31' : '#84d045'}; // background color changes when the dish is ordered
    opacity: 1;
  }
`;


const StyledOrderDialog = styled.dialog`
  border: none;
  padding: 2rem;
  border-radius: 6px;
  margin: 10px; 
  background-color: #65a233;
  position: fixed; /* stays in the same spot on the screen */
  top: 470px;
  left: 50%;
  transform: translate(-50%, -50%); /* centers the dialog */
  justify-items: center;
  height: 350px;
  width: 550px; 
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 19px;

  & h3 {
    margin-top: 0rem;;
    margin-bottom: 0rem; 
  }

  & p {
    margin-bottom: 3rem; 
    line-height: 1.6; /* space between text lines */
  }
`;


const CloseOrderButton = styled.button`
  position: absolute; /*position to the right corner*/
  top: 5px;
  right: 15px;
  background: none;
  border: none;
  color: black;
  font-size: 35px;
  cursor: pointer;
`;

const ConfirmationOrderDialog = styled.dialog`
  border: none;
  padding: 2rem;
  border-radius: 6px;
  margin: 10px; 
  background-color: #65a233;
  position: fixed; /* stays in the same spot on the screen */
  top: 460px;
  left: 50%;
  transform: translate(-50%, -50%); /* centers the dialog */
  justify-items: center;
  height: 250px;
  width: 350px; 
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 19px;

  & h3 {
    margin-top: 0rem;
    margin-bottom: 3rem; 
  }

  & p {
    margin-bottom: 3rem; 
    line-height: 1.6; /* space between text lines */
  }
`;

const CancelOrderButton = styled.button`
  background-color: #f37b31;
  padding: 6px 12px;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 10px;
`;

const CancelOrderDialog = styled.dialog`
  border: none;
  padding: 2rem;
  border-radius: 6px;
  margin: 10px; 
  background-color: #65a233;
  position: fixed; /* stays in the same spot on the screen */
  top: 460px;
  left: 50%;
  transform: translate(-50%, -50%); /* centers the dialog */
  justify-items: center;
  height: 250px;
  width: 350px; 
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 19px;

  & h3 {
    margin-top: 3rem;
    margin-bottom: 3rem; 
  }

  & p {
    margin-bottom: 3rem; 
    line-height: 1.6; /* space between text lines */
  }
`;


const Soldout_orderfood_custom = styled.p`
  padding: 0px 12px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 20px;
  margin-top: 15px;
`;


function OrderFood() {

    const [availableDishes, setAvailableDishes] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null); 
    // const [order, setOrder] = useState(null); //for use when we want to fetch data from our own API (backend)
    const [orderId, setOrderId] = useState(null);
    const [orderedDishId, setOrderedDishId] = useState(null);
    const [note, setNote] = useState(''); 

    //bedId placeholder, to be replaced with the actual bedId when we got it from the login-team.
    // const bedId = "Tilføjes_senere"; 

    //reference to dialog-element. useRef is used here to interact with DOM elements without causing a re-render.
    const orderDialogRef = useRef(null);
    const confirmationDialogRef = useRef(null);
    const cancelDialogRef = useRef(null);


    //for use when we want to fetch data from our own API (backend)
    // useEffect(() => {
    //     fetchData(
    //       'url',
    //       setAvailableDishes,
    //       'GET'
    //     );
    //   }, []);

    useEffect(() => {
        fetch('http://localhost:3000/dishes/')
            .then(res => res.json())
            .then(data => setAvailableDishes(data))
            .catch(err => console.error('Fejl ved hentning:', err));
      }, []);


    //  for use when we want to use our own API (backend)  
    // const createOrder = (selectedDish) => {
    //     const newOrder = {
    //         bed_id: bedId,
    //         note: note,
    //         status: "PENDING",
    //         dish: { id: selectedDish.id }
    //     };

    //     fetch(`https://.dk/api/orders/${bedId}/createOrder`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newOrder)
    //     })
    //     .then(res => res.json())
    //     .then(data => {
    //       setOrderId(data.id); // set the orderId to the response from the backend
    //       setOrderedDishId(data.dish.id); // set the orderedDishId to the response from the backend
    //     })
    //     .catch(err => console.error('Fejl ved bestilling:', err));     
    // };

  
    // for use when we want to use our own API (backend)  
    // const cancelOrder = (orderId) => {
    //   fetchData(`https://.dk/api/orders/${bedId}/cancelOrder/${orderId}`, {
    //     method: 'PUT',
    //     headers: {'Content-Type': 'application/json'},
    //   })
    //   .then(() =>{
    //     setOrderId(null);
    //     setOrderedDishId(null);
    //   })
    //   .catch(err => console.error('Fejl ved afbestilling:', err));  
    // };

    //dummy cancelOrder function for testing without backend
    const cancelOrder = (orderId) => {
      console.log(`Afbestilling af ordre med ID: ${orderId}`);
      // Simulerer afbestilling uden backend
      setOrderedDishId(null);
      setOrderId(null);
    };
    

    // storing the selected dish and opens orderdialogbox
    const openOrderDialog = (dish) => {
        setSelectedDish(dish); 
        orderDialogRef.current.showModal();
    };
  

    return (
        <>
            <StyledOrderDialog ref={orderDialogRef}>
            {/*  && checks if selectedDish exists, if true, the following will render*/}
              {selectedDish && (
                  <>
                   <CloseOrderButton onClick={() => orderDialogRef.current.close()}>x</CloseOrderButton>
                    <h3>{selectedDish.name}</h3>
                    <p><strong>Beskrivelse:</strong> {selectedDish.description || "Ingen beskrivelse tilgængelig"}</p>
                    <textarea className="commentfield_orderfood" placeholder="Skriv en kommentar her med allergier mv." value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                    {/* <button className="button_orderfood_custom" onClick={() => createOrder(selectedDish)}>Bestil</button> for use when we want to use our own API (backend) */}
                    <button className="button_orderfood_custom" onClick={() => {
                      orderDialogRef.current.close();        
                      confirmationDialogRef.current.showModal();
                      setOrderedDishId(selectedDish.id); // Temporary: used only for frontend testing without backend. with backend: setOrderedDishId(response.dish.id);
                      setOrderId(1); // Temporary dummy ID: should be removed when backend returns a real orderId. with backend: setOrderId(response.id);
                      }}>Bestil
                    </button>
                  </>  
                )}
            </StyledOrderDialog>

            <ConfirmationOrderDialog ref={confirmationDialogRef}>
              <CloseOrderButton onClick={() => confirmationDialogRef.current.close()}>x</CloseOrderButton>
              <h3>Tak for din bestilling</h3>
              <h3>{selectedDish?.name}</h3>
              <button className="button_orderfood_custom" onClick={() => confirmationDialogRef.current.close()}>Luk vindue</button>        
            </ConfirmationOrderDialog>

            <CancelOrderDialog ref={cancelDialogRef}>
              <CloseOrderButton onClick={() => cancelDialogRef.current.close()}>x</CloseOrderButton>
              <h3>Er du sikker på at du vil afbestille?</h3>
              <button className="button_orderfood_custom" onClick={() => {
                cancelOrder(orderId);
                setTimeout(() => {
                setOrderedDishId(null);
                setOrderId(null);
                setSelectedDish(null);
                cancelDialogRef.current.close();
                }, 0);
                }}>Bekræft afbestilling
              </button>      
            </CancelOrderDialog>
          
            <div className="orderfood_container">
                <h1 className="h1_orderfood_custom">Mad Bestilling</h1>
                <h2 className="h2_orderfood_custom">Husk at lægge din bestilling inden kl. 14</h2>
                <GridOrderFoodContainer>
                    {availableDishes.length > 0 ? (
                        availableDishes.map((dish) => (
                          <div key={dish.id}>
                            <BoxDish 
                                $isOrdered={dish.id == orderedDishId}
                                $isSoldOut={dish.status === 'SOLD_OUT'}
                                onClick={() => dish.status !== 'SOLD_OUT' && openOrderDialog(dish)} //wihtout checking the time
                                // onClick={() => {
                                //   const now =  new Date();
                                //   const isBefore14 = now.getHours() < 14; // check if the current time is before 14:00
                                //   if (dish.status !== 'SOLD_OUT' && isBefore14) {
                                //     openOrderDialog(dish);
                                //   }
                                // }}
                            >
                                <div>{dish.name}</div>
                                {dish.status === 'SOLD_OUT' && <Soldout_orderfood_custom>Udsolgt</Soldout_orderfood_custom>}       
                                {dish.id == orderedDishId && (
                                <CancelOrderButton onClick={(e) => {
                                  e.stopPropagation (); // prevents the click event from bubbling up to the Box component
                                  cancelDialogRef.current.showModal();
                                  }}>Afbestil
                                </CancelOrderButton>
                              )}           
                            </BoxDish> 
                          </div>
                        ))
                        ) : (
                        <p className="p_orderfood_custom">Ingen retter er tilgængelige</p>
                    )}
                </GridOrderFoodContainer>
            </div>
        </>
    );
}

export default OrderFood