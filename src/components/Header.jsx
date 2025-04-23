import { Link } from 'react-router';
import Logo from '../assets/hospital-region-logo.jpeg';
import QuitIcon from '../assets/exit-icon.webp';
import SettingsIcon from '../assets/settings-icon-2.png';
import AdminButton from './auth/AdminButton';
import '../styles/Header.css';

function Header() {
  return (
    <div className='header-container'>
      <div className='header-container-left'>
        <Link to='/' className='header-logo'>
          <img src={Logo} className='logo' alt='Logo' />
          <h1>
            Bornholms
            <br />
            Hospital
          </h1>
        </Link>

        <Link to='/' className='header-section-info'>
          <h1>202-1</h1>
          <h2>Kirurgisk afdeling</h2>
        </Link>
      </div>

      <div className='header-container-left'>
        <div className='header-container-left-actions'>
          <div className='flex gap-2 h-full'>
            <AdminButton />

            <div className='flex flex-col gap-1'>
              <Link to='/' className='header-settings'>
                <img src={SettingsIcon} className='logo' alt='Settings' />
              </Link>

              <Link to='/' className='header-quit'>
                <img src={QuitIcon} className='logo' alt='Log ud' />
              </Link>
            </div>
          </div>
        </div>

        <Link to='/' className='header-date-time'>
          <h1>Mandag 10-03</h1>
          <h2>15:00</h2>
        </Link>
      </div>
    </div>
  );
}
export default Header;
