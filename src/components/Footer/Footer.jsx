// IMPORT STYLES
import './Footer.scss';

// FOOTER COMPONENT
function Footer({ lastElement }) {
  return (
    <footer className='footer' ref={lastElement}>
      <div className='footer__wrapper'>
        <p className='footer__text'>
          &copy; {new Date().getFullYear()} Данила Легкобытов
        </p>
      </div>
    </footer>
  );
}

export default Footer;
