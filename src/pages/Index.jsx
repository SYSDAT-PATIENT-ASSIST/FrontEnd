import { NavLink, Link, Outlet } from "react-router-dom";
import Logo from '../assets/HospitalLogo.jpg';
import '../styles/Index.css';
import Header from '../components/Header.jsx';

function Index() {
  return (
    <div className="index-container">
      <Header />
      <div className="index-content">
        <Outlet /> 
      </div>
    </div>
  );
}

export default Index;
