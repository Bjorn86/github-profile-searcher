// IMPORT STYLES
import './SearchForm.scss';

// SEARCH FORM COMPONENT
function SearchForm({
  onSearchSubmit,
  onSearchChange,
  searchQuery,
  queryError,
  isLoading,
}) {
  return (
    <form
      className='search-form'
      id='search-user'
      role='search'
      noValidate
      onSubmit={(evt) => {
        evt.preventDefault();
        onSearchSubmit();
      }}
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
        onChange={(evt) => onSearchChange(evt.target.value)}
      />
      <button className='search-form__btn'>Найти</button>
      <span className='search-form__error'>{queryError}</span>
    </form>
  );
}

export default SearchForm;
