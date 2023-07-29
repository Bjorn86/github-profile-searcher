// IMPORT STYLES
import './Search.scss';

// IMPORT COMPONENTS
import SearchForm from '../SearchForm/SearchForm.jsx';
import Sorting from '../Sorting/Sorting.jsx';

// SEARCH COMPONENT
function Search({
  isOptionsOpen,
  onOptionMenuClick,
  onOptionSelect,
  toSwitchOptions,
  selectedOption,
}) {
  return (
    <section className='search' aria-label='Поиск и сортировка'>
      <div className='search__wrapper'>
        <SearchForm />
        <Sorting
          isOptionsOpen={isOptionsOpen}
          onOptionMenuClick={onOptionMenuClick}
          onOptionSelect={onOptionSelect}
          toSwitchOptions={toSwitchOptions}
          selectedOption={selectedOption}
        />
      </div>
    </section>
  );
}

export default Search;
