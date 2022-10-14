import '../styles/components/Footer.scss';
const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">2022&copy; ModeHans</p>
      <nav className="footer__nav">
        <p>Sígueme en:</p>
        <ul className="footer__links">
          <li className="footer__list">
            <a
              href="https://github.com/modehans"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github-alt  fa-2x"></i>
            </a>
          </li>

          <li className="footer__list">
            <a
              href="https://www.linkedin.com/in/monicaglezsanch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin fa-2x"></i>
            </a>
          </li>

          <li className="footer__list">
            <a
              href="https://twitter.com/ModeHans"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter fa-2x"></i>
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
