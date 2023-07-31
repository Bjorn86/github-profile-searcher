// IMPORT PACKAGES
import { useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import useScrollObserver from '../../hooks/useScrollObserver.jsx';

// IMPORT STYLES
import './App.scss';

// IMPORT COMPONENTS
import AppLayout from '../AppLayout/AppLayout.jsx';
import Main from '../Main/Main.jsx';
import DetailPage from '../DetailPage/DetailPage.jsx';

// IMPORT API'S
import * as api from '../../utils/api';

// IMPORT VARIABLES
import { ESCAPE_KEY } from '../../utils/constants';

// IMPORT UTILS
import { getPageCount } from '../../utils/utils';

// APP CORE COMPONENT
function App() {
  // HOOKS
  const [userCards, setUserCards] = useState([]);
  const [isOptionsOpen, setOptionsClass] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isCardsNotFound, setCardsNotFound] = useState(false);
  const [serverErrorText, setServerErrorText] = useState('');
  const [queryError, setQueryError] = useState('');
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [isSorting, setSorting] = useState(false);
  const [isReturningFromDetail, setIsReturningFromDetail] = useState(false);
  const lastElement = useRef();
  const prevSelectedOption = useRef();
  const location = useLocation();
  const observer = useScrollObserver(handleScroll);

  // GET USERS
  async function getUsers(searchQuery, selectedOption, page) {
    setLoading(true);
    setCardsNotFound(false);
    setServerErrorText('');
    try {
      const usersData = await api.searchUsers(
        searchQuery,
        selectedOption,
        page,
      );
      if (usersData) {
        isSorting
          ? setUserCards(usersData.items)
          : setUserCards([...userCards, ...usersData.items]);
        setTotalPage(getPageCount(usersData.total_count, 36));
        if (!usersData.items.length) {
          setCardsNotFound(true);
        }
      }
    } catch (err) {
      console.error(err);
      setServerErrorText(err);
    } finally {
      setLoading(false);
      setSorting(false);
    }
  }

  // GET USER
  async function getUser(userName) {
    setLoading(true);
    try {
      const userData = await api.getUser(userName);
      if (userData) {
        return userData;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // HANDLER SCROLL
  function handleScroll() {
    if (page < totalPage && !isReturningFromDetail) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  // HANDLE SEARCH CHANGE
  function handleSearchChange(input) {
    setSearchQuery(input);
  }

  // HANDLER SEARCH
  function handleSearch() {
    if (searchQuery) {
      getUsers(searchQuery, selectedOption, page);
      sessionStorage.setItem('searchQuery', searchQuery);
    } else {
      setQueryError('Поисковый запрос не должен быть пустым');
    }
  }

  // TOGGLE OPEN\CLOSE MENU OPTIONS
  function toggleOptionMenu(evt) {
    if (evt.key === ESCAPE_KEY) {
      setOptionsClass(false);
    } else {
      setOptionsClass(!isOptionsOpen);
    }
  }

  // OPTION SWITCH
  function optionSwitch(index) {
    setSelectedOption(index);
  }

  // SET SELECTED OPTION AND CLOSE DROPDOWN MENU
  function setOptionAndClose(index) {
    prevSelectedOption.current = selectedOption;
    const savedSearchQuery = sessionStorage.getItem('searchQuery');
    if (prevSelectedOption.current !== index) {
      setSelectedOption(index);
      if (searchQuery || savedSearchQuery) {
        setSorting(true);
        setPage(1);
      }
    }
    setOptionsClass(false);
  }

  // PAGINATION OBSERVER
  useEffect(() => {
    if (location.pathname === '/') {
      if (isLoading) return;
      if (isReturningFromDetail) {
        setIsReturningFromDetail(false);
        return;
      }
      if (observer.current) observer.current.disconnect();
      observer.current.observe(lastElement.current);
    }
  }, [isLoading, location, observer, isReturningFromDetail]);

  // DEPENDENCIES ON THE RENDER OF USER CARDS
  useEffect(() => {
    if (location.pathname === '/' && !isReturningFromDetail) {
      if (userCards.length) {
        const savedSearchQuery = sessionStorage.getItem('searchQuery');
        getUsers(savedSearchQuery, selectedOption, page);
      }
    }
  }, [page, selectedOption, location]);

  // RESET AN EMPTY REQUEST ERROR
  useEffect(() => {
    setQueryError('');
  }, [searchQuery]);

  // RESET STORAGE
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className='app__content'>
      <Routes>
        <Route path='/' element={<AppLayout lastElement={lastElement} />}>
          <Route
            index
            element={
              <Main
                onSearchSubmit={handleSearch}
                onSearchChange={handleSearchChange}
                searchQuery={searchQuery}
                queryError={queryError}
                isLoading={isLoading}
                isOptionsOpen={isOptionsOpen}
                onOptionMenuClick={toggleOptionMenu}
                onOptionSelect={setOptionAndClose}
                toSwitchOptions={optionSwitch}
                selectedOption={selectedOption}
                userCards={userCards}
                isCardsNotFound={isCardsNotFound}
                serverErrorText={serverErrorText}
              />
            }
          />
          <Route
            path=':userName'
            element={
              <DetailPage
                onLoad={getUser}
                setIsReturningFromDetail={setIsReturningFromDetail}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
