import { useTranslation } from 'react-i18next';
import { Link } from "react-router";
import Logo from '../assets/hospital-region-logo.jpeg';
import QuitIcon from '../assets/exit-icon.webp';
import SettingsIcon from '../assets/settings-icon-2.png';
import AdminButton from './auth/AdminButton';
import '../styles/Header.css';

function Header() {
  const { t } = useTranslation(); // Access the translation function

  return (
    <>
      <div className="header__panel">
        <div className="header__panel-left">
          <Link to="/" className="header__panel-left-logo">
            <img src={Logo} className="logo" alt="Logo" />
            <h1>{t('headerHospitalName')}</h1> {/* Use translation keys here */}
          </Link>
          
          <Link to="/" className="header__panel-left-location">
            <h1>{t('headerLocationCode')}</h1> {/* Use translation keys here */}
            <h2>{t('headerDepartmentName')}</h2> {/* Use translation keys here */}
          </Link>
        </div>
        
        <div className="header__panel-right">
        <AdminButton />

          <div className="header__panel-right-actions">

    
            <Link to="/" className="header__panel-right-actions-quit"> 
              <img src={QuitIcon} className="logo" alt={t('quit')} /> {/* Dynamic alt text */}
            </Link>

            <Link to="/Settings" className="header__panel-right-actions-settings"> 
              <img src={SettingsIcon} className="logo" alt={t('settings')} /> {/* Dynamic alt text */}
            </Link>
          </div>
          
          <Link to="/calendar" className="header__panel-right-date_time">
            <h1>{t('headerDay')}</h1> {/* Use translation keys here */}
            <h2>{t('headerTime')}</h2> {/* Use translation keys here */}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;