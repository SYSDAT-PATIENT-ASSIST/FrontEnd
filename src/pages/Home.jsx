import { useTranslation } from 'react-i18next'
import { Link } from "react-router"
import Logo from '../assets/HospitalLogo.jpg'
import '../styles/Home.css'

function Home() {
  const { t } = useTranslation('home') // 'home' = namespace

  return (
    <>
      <div className="home__container">
        <div className="home__links">
          <Link to="/calendar"> <img src={Logo} /> <h1>{t('menuMealOrder')}</h1> </Link>
          <Link to="/calendar"> <img src={Logo} /> <h1>{t('menuExercises')}</h1> </Link>
          <Link to="/calendar"> <img src={Logo} /> <h1>{t('menuContact')}</h1> </Link>
          <Link to="/calendar"> <img src={Logo} /> <h1>{t('menuHospitalInfo')}</h1> </Link>
          <Link to="/calendar"> <img src={Logo} /> <h1>{t('menuEntertainment')}</h1> </Link>
          <Link to="/calendar"> <img src={Logo} /> <h1>{t('menuMySP')}</h1> </Link>
        </div>
      </div>
    </>
  )
}

export default Home
