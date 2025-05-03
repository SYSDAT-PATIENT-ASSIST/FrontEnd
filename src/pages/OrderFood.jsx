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
  width: 230px;
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