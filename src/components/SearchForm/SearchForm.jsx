//IMPORT PACKAGES
import { useState } from 'react';

// IMPORT STYLES
import './SearchForm.scss';

// SEARCH FORM COMPONENT
function SearchForm({ isLoading }) {
  // HOOKS
  const [searchQuery, setSearchQuery] = useState('');

  // HANDLER SUBMIT
  function handleSubmit(e) {
    e.preventDefault();
    console.log(searchQuery);
  }

  return (
    <form
      className='search-form'
      id='search-user'
      role='search'
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className='search-form__field'
        id='search'
        type='search'
        name='search'
        form='search-user'
        aria-label='Поиск пользователя'
        autoComplete='off'
        placeholder='Поиск пользователя'
        disabled={isLoading}
        value={searchQuery || ''}
        onChange={(evt) => setSearchQuery(evt.target.value)}
      />
      <button className='search-form__btn'>Найти</button>
    </form>
  );
}

export default SearchForm;
