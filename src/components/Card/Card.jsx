// IMPORT PACKAGES
import { Link } from 'react-router-dom';

// IMPORT STYLES
import './Card.scss';

// CARD COMPONENT
function Card({ card }) {
  return (
    <li className='card'>
      <Link to={`/${card.login}`} className='card__link'>
        <img
          src={card.avatar_url}
          alt={`Аватар пользователя ${card.login}`}
          className='card__avatar'
        />
        <p className='card__login'>{card.login}</p>
      </Link>
    </li>
  );
}

export default Card;
