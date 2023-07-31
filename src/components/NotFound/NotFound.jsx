// IMPORT PACKAGES
import { Link } from 'react-router-dom';

// IMPORT STYLES
import './NotFound.scss';

// NOT FOUND COMPONENT
function NotFound() {
  return (
    <main className='not-found'>
      <section className='not-found__section'>
        <h2 className='not-found__title'>404 - Страница не найдена</h2>
        <p className='not-found__description'>
          Извините, страница которую вы ищите не найдена.
        </p>
        <Link to={'/'} className='not-found__link'>
          Вернуться на главную
        </Link>
      </section>
    </main>
  );
}

export default NotFound;
