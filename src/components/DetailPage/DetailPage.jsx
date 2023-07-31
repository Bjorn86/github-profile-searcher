// IMPORT PACKAGES
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// IMPORT STYLES
import './DetailPage.scss';

// IMPORT COMPONENTS
import Preloader from '../Preloader/Preloader.jsx';
import NotFound from '../NotFound/NotFound.jsx';

// DETAIL PAGE COMPONENT
function DetailPage({ onLoad, setIsReturningFromDetail }) {
  // HOOKS
  const [card, setCard] = useState(null);
  const [isPreloaderActive, setPreloaderClass] = useState(true);
  const { userName } = useParams();
  const navigate = useNavigate();

  // HANDLE BUTTON BACK CLICK
  function handleBtnBackClick() {
    setIsReturningFromDetail(true);
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  }

  const handleSetCard = useCallback(async () => {
    setCard(null);
    const userData = await onLoad(userName);
    if (userData) {
      setCard(userData);
      setPreloaderClass(false);
    } else {
      setPreloaderClass(false);
    }
  }, [onLoad, userName]);

  useEffect(() => {
    handleSetCard();
  }, []);

  if (isPreloaderActive) {
    return <Preloader />;
  } else if (!card && !isPreloaderActive) {
    return <NotFound />;
  }

  return (
    <main className='detail-page'>
      <section className='detail-page__section'>
        <button className='detail-page__btn-back' onClick={handleBtnBackClick}>
          Назад
        </button>
        <article className='detail-page__wrapper'>
          <img
            src={card.avatar_url}
            alt={`Аватар пользователя ${card.login}`}
            className='detail-page__avatar'
          />
          <ul className='detail-page__list'>
            <li className='detail-page__list-item'>
              <h2 className='detail-page__text'>Login: {card.login}</h2>
            </li>
            {card.name && (
              <li className='detail-page__list-item'>
                <p className='detail-page__text'>Name: {card.name}</p>
              </li>
            )}
            {card.bio && (
              <li className='detail-page__list-item'>
                <p className='detail-page__text'>About me: {card.bio}</p>
              </li>
            )}
            <li className='detail-page__list-item'>
              <p className='detail-page__text'>Followers: {card.followers}</p>
            </li>
            {card.company && (
              <li className='detail-page__list-item'>
                <p className='detail-page__text'>Company: {card.company}</p>
              </li>
            )}
            {card.location && (
              <li className='detail-page__list-item'>
                <p className='detail-page__text'>Location: {card.location}</p>
              </li>
            )}
            {card.email && (
              <li className='detail-page__list-item'>
                <p className='detail-page__text'>
                  E-mail:{' '}
                  <a
                    href={`mailto:${card.email}`}
                    className='detail-page__link'
                  >
                    {card.email}
                  </a>
                </p>
              </li>
            )}
            {card.blog && (
              <li className='detail-page__list-item'>
                <p className='detail-page__text'>
                  Blog:{' '}
                  <a href={card.blog} className='detail-page__link'>
                    {card.blog}
                  </a>
                </p>
              </li>
            )}
            {card.twitter_username && (
              <li className='detail-page__list-item'>
                <p className='detail-page__text'>
                  Twitter:{' '}
                  <a
                    href={`https://twitter.com/${card.twitter_username}`}
                    className='detail-page__link'
                  >
                    {card.twitter_username}
                  </a>
                </p>
              </li>
            )}
            <li className='detail-page__list-item'>
              <p className='detail-page__text'>
                Public repositories: {card.public_repos}
              </p>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}

export default DetailPage;
