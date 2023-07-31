// IMPORT STYLES
import './CardsList.scss';

// IMPORT COMPONENTS
import Card from '../Card/Card.jsx';

// CARDS LIST COMPONENT
function CardsList({ userCards, isCardsNotFound, serverErrorText }) {
  return (
    <section
      className='cards-list'
      aria-label='Секция с карточками пользователей'
    >
      {isCardsNotFound && <p className='cards-list__info'>Ничего не найдено</p>}
      {!isCardsNotFound && !userCards.length && !serverErrorText && (
        <p className='cards-list__info'>Введите поисковый запрос</p>
      )}
      {serverErrorText && <p className='cards-list__info'>{serverErrorText}</p>}
      <ul className='cards-list__list'>
        {userCards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </ul>
    </section>
  );
}

export default CardsList;
