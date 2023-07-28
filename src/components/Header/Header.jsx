// IMPORT PACKAGES
import { Link } from 'react-router-dom';
/* import clsx from 'clsx'; */

// IMPORT STYLES
import './Header.scss';

// HEADER COMPONENT
function Header() {
  return (
    <header className='header'>
      <div className='header__wrapper'>
        <Link to='/' className='header__link'>
          <h1 className='header__title'>GitHub Searcher</h1>
        </Link>
      </div>
    </header>
  );
}

export default Header;
