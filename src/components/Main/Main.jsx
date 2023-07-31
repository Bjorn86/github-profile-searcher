// IMPORT STYLES
import './Main.scss';

// IMPORT COMPONENTS
import CardsList from '../CardsList/CardsList.jsx';
import Search from '../Search/Search.jsx';

// MAIN COMPONENT
function Main({
  onSearchSubmit,
  onSearchChange,
  searchQuery,
  queryError,
  isLoading,
  isOptionsOpen,
  onOptionMenuClick,
  onOptionSelect,
  toSwitchOptions,
  selectedOption,
  userCards,
  isCardsNotFound,
  serverErrorText,
}) {
  return (
    <main className='main'>
      <Search
        onSearchSubmit={onSearchSubmit}
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
        queryError={queryError}
        isLoading={isLoading}
        isOptionsOpen={isOptionsOpen}
        onOptionMenuClick={onOptionMenuClick}
        onOptionSelect={onOptionSelect}
        toSwitchOptions={toSwitchOptions}
        selectedOption={selectedOption}
      />
      <CardsList
        userCards={userCards}
        isCardsNotFound={isCardsNotFound}
        serverErrorText={serverErrorText}
      />
    </main>
  );
}

export default Main;
