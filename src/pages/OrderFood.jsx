import { useState, useEffect, useRef } from 'react';
import '../styles/OrderFood.css'
import styled from "styled-components";


const GridOrderFoodContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;    
    padding: 40px 0; 
    margin-top: 30px;
`;


const BoxDish = styled.div`
  border-radius: 8px;
  height: 100px;
  width: 270px;
  background-color: ${(props) => 
    props.$isSoldOut ? '#9d2e0f' : 
    props.$isOrdered ? '#f17223' : '#65a233'}; // background color changes when the dish is ordered
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
      props.$isSoldOut ? '#9d2e0f' : 
      props.$isOrdered ? '#f17223' : '#84d045'}; // background color changes when the dish is ordered
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
  top: 450px;
  left: 50%;
  transform: translate(-50%, -50%); /* centers the dialog */
  justify-items: center;
  height:400px;
  width: 570px; 
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 19px;

  & h3 {
    font-size: 25px;
    font-weight: bold;
    margin-top: 0rem;;
    margin-bottom: 0rem; 
  }

  & p {
    margin-bottom: 3rem; 
    line-height: 1.6; /* space between text lines */
  }
`;


const Button_orderfood_custom = styled.button`
    background-color: #84d045;
    border : black solid 1px;
    box-shadow: black 0px 0px 4px;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 1.3 rem;
    font-weight: bold;
    padding: 10px 50px;
    width: 190px;
    height: 50px;

    &:hover {
    background-color: #82e631;
    opacity: 1;
  }

`;


const ButtonOrderfoodClose = styled.button`
    background-color: #84d045;
    border : black solid 1px;
    box-shadow: black 0px 0px 4px;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 17px;
    font-weight: bold;
    padding: 10px 50px;
    width: 190px;
    height: 50px;

    &:hover {
    background-color: #82e631;
    opacity: 1;
  }

`;


const CloseOrderButton = styled.button`
  position: absolute; /*position to the right corner*/
  top: -10px;
  right: 20px;
  background: none;
  border: none;
  color: black;
  font-size: 40px;
  cursor: pointer;
`;


const Commentfield_orderfood = styled.textarea`
    width: 450px;
    height: 150px;
    border-radius: 8px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    background-color: #f2f2f2;
    box-shadow: 0 6px 10px rgba(116, 173, 68, 0.2);
    border: none;
  `;


const ConfirmationOrderDialog = styled.dialog`
  border: none;
  padding: 2rem;
  border-radius: 6px;
  margin: 10px; 
  background-color: #65a233;
  position: fixed; /* stays in the same spot on the screen */
  top: 405px;
  left: 50%;
  transform: translate(-50%, -50%); /* centers the dialog */
  justify-items: center;
  height: 320px;
  width: 450px; 
  flex-direction: column;
  align-items: center;
  text-align: center;


  & h3 {
    margin-top: 0rem;
    margin-bottom: 3rem; 
    font-size: 25px;
     font-weight: bold;
  }

  & p {
    margin-bottom: 3rem; 
    line-height: 1.6; /* space between text lines */
  }
`;

const CancelOrderButton = styled.button`
  background-color: #f17223;
  box-shadow: black 0px 0px 4px;
  padding: 6px 12px;
  border-radius: 5px;
  border: black solid 1px;
  font-weight: bold;
  width: 120px;
  height: 40px;
  margin-top: 10px;
  font-size: 17px;
`;

const CancelOrderDialog = styled.dialog`
  border: none;
  padding: 2rem;
  border-radius: 6px;
  margin: 10px; 
  background-color: #65a233;
  position: fixed; /* stays in the same spot on the screen */
  top: 405px;
  left: 50%;
  transform: translate(-50%, -50%); /* centers the dialog */
  justify-items: center;
  height: 310px;
  width: 440px; 
  flex-direction: column;
  align-items: center;
  text-align: center;


  & h3 {
    margin-top: 3rem;
    margin-bottom: 3rem; 
    font-weight: bold;
    font-size: 21px;
  }

  & p {
    margin-bottom: 3rem; 
    line-height: 1.6; /* space between text lines */
  }
`;

const ButtonConfirmOrderfoodCustom = styled.button`
    background-color: #84d045;
    border : black solid 1px;
    box-shadow: black 0px 0px 4px;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 1.3 rem;
    font-weight: bold;
    padding: 10px 50px;
    width: 279px;
    height: 55px;
    font-size: 19px;

    &:hover {
    background-color: #82e631;
    opacity: 1;
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
    const bedId = "7"; 

    //reference to dialog-element. useRef is used here to interact with DOM elements without causing a re-render.
    const orderDialogRef = useRef(null);
    const confirmationDialogRef = useRef(null);
    const cancelDialogRef = useRef(null);


    useEffect(() => {
      fetch('http://localhost:9999/api/orderfood/all-available')
          .then(res => {
            if (!res.ok) throw new Error('Failed to fetch dishes');
            return res.json();
          })
          .then(data => setAvailableDishes(data))
          .catch(error => console.error(error));
    }, []);


    //used for testing without backend
    // useEffect(() => {
    //     fetch('http://localhost:3000/dishes/')
    //         .then(res => res.json())
    //         .then(data => setAvailableDishes(data))
    //         .catch(err => console.error('Fejl ved hentning:', err));
    //   }, []);


   const createOrder = (selectedDish) => {
      const newOrder = {
        bed_id: bedId,
        note: note,
        status: "VENTER",
        order_time: new Date().toISOString(),
        dish: { id: selectedDish.id }
      };

      fetch(`http://localhost:9999/api/orderfood/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`Serverfejl: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (data && data.dish && data.dish.id) {
            setOrderId(data.id);
            setOrderedDishId(data.dish.id);
            orderDialogRef.current.close();
            confirmationDialogRef.current.showModal();
          } else {
            console.error("Ugyldigt svar fra backend:", data);
          }
        })
        .catch(err => {
          console.error('Fejl ved bestilling:', err.message);
        });
    };


  
    // for use when we want to use our own API (backend)  
    const cancelOrder = (orderId) => {
      fetch(`http://localhost:9999/api/orderfood/cancel/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(() => {
        setOrderId(null);
        setOrderedDishId(null);
      })
      .catch(err => console.error('Fejl ved afbestilling:', err));
    };


    //dummy cancelOrder function for testing without backend
    // const cancelOrder = (orderId) => {
    //   console.log(`Afbestilling af ordre med ID: ${orderId}`);
    //   // Simulerer afbestilling uden backend
    //   setOrderedDishId(null);
    //   setOrderId(null);
    // };
    

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
                    <Commentfield_orderfood placeholder="Skriv en kommentar her med allergier mv." value={note} onChange={(e) => setNote(e.target.value)}></Commentfield_orderfood>
                    <Button_orderfood_custom onClick={() => {
                      createOrder(selectedDish)
                      }}>Bestil
                    </Button_orderfood_custom>
                  </>  
                )}
            </StyledOrderDialog>

            <ConfirmationOrderDialog ref={confirmationDialogRef}>
              <CloseOrderButton onClick={() => confirmationDialogRef.current.close()}>x</CloseOrderButton>
              <h3>Tak for din bestilling</h3>
              <h3>{selectedDish?.name}</h3>
              <ButtonOrderfoodClose onClick={() => confirmationDialogRef.current.close()}>Luk vindue</ButtonOrderfoodClose>        
            </ConfirmationOrderDialog>

            <CancelOrderDialog ref={cancelDialogRef}>
              <CloseOrderButton onClick={() => cancelDialogRef.current.close()}>x</CloseOrderButton>
              <h3>Er du sikker på at du vil afbestille?</h3>
              <ButtonConfirmOrderfoodCustom onClick={() => {
                cancelOrder(orderId);
                setTimeout(() => {
                setOrderedDishId(null);
                setOrderId(null);
                setSelectedDish(null);
                cancelDialogRef.current.close();
                }, 0);
                }}>Bekræft afbestilling
              </ButtonConfirmOrderfoodCustom>      
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
                                $isSoldOut={dish.status?.toUpperCase() === 'UDSOLGT'}
                                onClick={() => { //wihtout checking the time
                                  const hasOrdered = orderedDishId !== null; // check if an order has been placed
                                  if ( dish.status?.toUpperCase() !== 'UDSOLGT' && !hasOrdered) {
                                    openOrderDialog(dish);
                                }
                                //   const now =  new Date();
                                //   const isBefore14 = now.getHours() < 14; // check if the current time is before 14:00
                                //   const hasOrdered = orderedDishId !== null; // check if an order has been placed
                                //   if (dish.status !== 'UDSOLGT' && isBefore14 && !hasOrdered) {
                                //     openOrderDialog(dish); 
                              }}
                            >
                                <div>{dish.name}</div>
                                {dish.status?.toUpperCase() === 'UDSOLGT' && <Soldout_orderfood_custom>Udsolgt</Soldout_orderfood_custom>}       
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