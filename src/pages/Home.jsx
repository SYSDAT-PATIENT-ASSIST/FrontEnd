import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/HospitalLogo.jpg";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 20px 10vw;
  width: 100%;
`;

const LinkCard = styled(Link)`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  padding: 12px;
  text-decoration: none;
  color: black;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 48px;
    height: 48px;
    margin-right: 16px;
  }

  h1 {
    font-size: 1rem;
    margin: 0;
  }
`;

const Home = () => {
  return (
    <Container>
      <LinkGrid>
        <LinkCard to="/DishCalendarPage">
          <img src={Logo} alt="mad icon" />
          <h1>Mad bestilling</h1>
        </LinkCard>

        <LinkCard to="/Calendar">
          <img src={Logo} alt="mad icon" />
          <h1>Kalender</h1>
        </LinkCard>

        <LinkCard to="/exercises">
          <img src={Logo} alt="øvelser icon" />
          <h1>Øvelser</h1>
        </LinkCard>

        <LinkCard to="/contact">
          <img src={Logo} alt="kontakt icon" />
          <h1>Kontakt</h1>
        </LinkCard>

        <LinkCard to="/info">
          <img src={Logo} alt="hospital info icon" />
          <h1>Hospital Info</h1>
        </LinkCard>

        <LinkCard to="/entertainment">
          <img src={Logo} alt="underholdning icon" />
          <h1>Underholdning</h1>
        </LinkCard>

        <LinkCard to="/mysp">
          <img src={Logo} alt="min sp icon" />
          <h1>Min SP</h1>
        </LinkCard>
      </LinkGrid>
    </Container>
  );
};

export default Home;
