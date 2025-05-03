import { useState, useEffect, useRef } from 'react';
import '../styles/OrderFood.css'
import styled from "styled-components";


const GridOrderFoodContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;    
    padding: 40px 0; 
`;


const Box = styled.div`
  border-radius: 8px;
  height: 100px;
  width: 250px;
  background-color: #65a233; /* green color */
  display: flex;
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
    background-color: #84d045;
    opacity: 1;
  }
`;


const StyledInfoDialog = styled.dialog`
  border: none;
  padding: 2rem;
  border-radius: 6px;
  margin: 10px; 
  background-color: #65a233;
  position: fixed; /* stays in the same spot on the screen */
  top: 50%;
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
    margin-bottom: 1rem; 
  }

  & p {
    margin-bottom: 1rem; 
    line-height: 1.6; /* space between text lines */
  }
`;


const CloseButton = styled.button`
  position: absolute; /*position to the right corner*/
  top: 15px;
  right: 25px;
  background: none;
  border: none;
  color: black;
  font-size: 20px;
  cursor: pointer;
`;


const Commentfield = styled.div`
  border-radius: 8px;
  height: 100px;
  width: 250px;
  background-color: white; /* green color */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 6px 10px rgba(116, 173, 68, 0.2);
  padding: 8px;
`;




function OrderFood() {

    const [availableDishes, setAvailableDishes] = useState([]);
    const [selectedDish, setSelectedDish] = useState(null); // state for selected dish


    //reference to dialog-element. useRef is used here to interact with DOM elements without causing a re-render.
    const infoDialogRef = useRef(null);


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



    // storing the selected dish and opens infodialogbox
    const openInfoDialog = (dish) => {
        setSelectedDish(dish); 
        infoDialogRef.current.showModal();
      };
  

    return (
        <>

            <StyledInfoDialog ref={infoDialogRef}>
            {/*  && checks if selectedDish exists, if true, the following will render*/}
              {selectedDish && (
                  <>
                   <CloseButton onClick={() => infoDialogRef.current.close()}>x</CloseButton>
                    <h3>{selectedDish.name}</h3>
                    <p><strong>Description:</strong> {selectedDish.description || "Ingen beskrivelse tilgængelig"}</p>
                    <Commentfield></Commentfield>
                    <button className="button_orderfood_custom">Bestil</button>
                  </>  
                )}
            </StyledInfoDialog>

            <div className="orderfood_container">
                <h1 className="h1_orderfood_custom">Mad Bestilling</h1>
                <h2 className="h2_orderfood_custom">Husk at lægge din bestilling inden kl. 14</h2>
                <GridOrderFoodContainer>
                    {availableDishes.length > 0 ? (
                        availableDishes.map((dish) => (
                            <Box key={dish.id}  onClick={() => openInfoDialog(dish)}>
                                <div onClick={() => openInfoDialog(dish)} >
                                    <div>{dish.name}</div>
                                </div>                        
                            </Box>      
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