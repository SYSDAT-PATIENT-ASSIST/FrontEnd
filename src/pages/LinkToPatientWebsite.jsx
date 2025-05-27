import '../styles/LinkToPatientWebsites.css'
import Logo from '../assets/HospitalLogo.jpg'



function LinkToPatientWebsite() {
  const links = [
    { name: 'MinSundhedsplatform', url: 'https://www.sundhed.dk/borger/min-side/' },
    { name: 'Min Læge',            url: 'https://minlaegeapp.dk/' },
    { name: 'Sundhed.dk',          url: 'https://minsundhedsplatform.dk/mychartppr1/Authentication/Login' },
  ];
      // Opens the given URL in a new browser tab.
      // - '_blank'      → new tab/window
      // - 'noopener'    → the new page can’t access window.opener (protects against certain phishing attacks)
      // - 'noreferrer'  → the Referer header is stripped (hides the URL of your app)
      const openLink = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };
      return (
        <div className="link_page">
          <div className="link_header">
            <img src={Logo} alt="Min Sundhed" className="link_icon" />
            <h1 className="link_title">Min Sundhed</h1>
            <p className="link_description">
              Klik nedenfor for at se test resultater og andre journal-informationer
            </p>
          </div>
          {links.map((link) => (
            <button
              key={link.url}
              className="link_button"
              onClick={() => openLink(link.url)}
            >
              {link.name}
            </button>
          ))}
        </div>
      );
    }
    
    export default LinkToPatientWebsite;