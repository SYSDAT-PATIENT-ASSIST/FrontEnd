import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/hospital-region-logo.jpg";
import ExitIcon from "../assets/exit-icon.webp";
import SettingsIcon from "../assets/settings-icon-2.png";
import Clock from "./Clock";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 16px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px;
  padding: 6px 12px;
  gap: 10px;

  img {
    height: 40px;
  }

  h1 {
    font-size: 1rem;
    color: black;
    margin: 0;
  }
`;

const LocationBox = styled.div`
  background: white;
  border-radius: 6px;
  padding: 4px 10px;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 0.9rem;
    margin: 0;
    color: black;
  }

  h3 {
    font-size: 0.7rem;
    margin: 0;
    color: grey;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AdminButton = styled.button`
  background: #2563eb;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 8px 12px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  height: 50px;
  width: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #1d4ed8;
  }
`;

const IconButton = styled.button`
  background: ${(props) => props.bg || "#e5e5e5"};
  border: none;
  border-radius: 8px;
  padding: 6px;
  cursor: pointer;
  height: 40px;
  width: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    filter: brightness(1.1);
  }
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <LeftSection>
        <LogoBox>
          <img src={Logo} alt="Hospital Logo" />
          <h1>Bornholms Hospital</h1>
        </LogoBox>
        <LocationBox>
          <h2>202-1</h2>
          <h3>Kirurgisk afdeling</h3>
        </LocationBox>
      </LeftSection>

      <RightSection>
        <AdminButton onClick={() => navigate("/auth/login")}>Admin Login</AdminButton>

        <IconButton bg="#f87171">
          <img src={ExitIcon} alt="Exit" />
        </IconButton>

        <IconButton bg="#bfdbfe">
          <img src={SettingsIcon} alt="Settings" />
        </IconButton>

        <Clock />
      </RightSection>
    </HeaderWrapper>
  );
};

export default Header;
