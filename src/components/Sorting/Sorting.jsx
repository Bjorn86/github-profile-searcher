// IMPORT PACKAGES
import clsx from 'clsx';

// IMPORT STYLES
import './Sorting.scss';

// OTHER IMPORTS
import {
  SELECT_OPTIONS,
  ESCAPE_KEY,
  SPACE_BAR_KEY,
  ENTER_KEY,
  ARROW_UP_KEY,
  ARROW_DOWN_KEY,
  HOME_KEY,
  END_KEY,
} from '../../utils/constants';

// SORTING COMPONENT
function Sorting({
  isOptionsOpen,
  onOptionMenuClick,
  onOptionSelect,
  toSwitchOptions,
  selectedOption,
}) {
  // HANDLER KEY NAVIGATION
  function handleKeyDown(evt, index) {
    switch (evt.key) {
      case SPACE_BAR_KEY:
      case ENTER_KEY:
        evt.preventDefault();
        onOptionSelect(index);
        break;
      default:
        break;
    }
  }

  // HANDLER LIST KEY DOWN
  function handleListKeyDown(evt) {
    switch (evt.key) {
      case ESCAPE_KEY:
        evt.preventDefault();
        onOptionMenuClick(evt);
        break;
      case ARROW_UP_KEY:
        evt.preventDefault();
        toSwitchOptions(
          selectedOption - 1 >= 0
            ? selectedOption - 1
            : SELECT_OPTIONS.length - 1,
        );
        break;
      case ARROW_DOWN_KEY:
        evt.preventDefault();
        toSwitchOptions(
          selectedOption === SELECT_OPTIONS.length - 1 ? 0 : selectedOption + 1,
        );
        break;
      case HOME_KEY:
        evt.preventDefault();
        toSwitchOptions(0);
        break;
      case END_KEY:
        evt.preventDefault();
        toSwitchOptions(SELECT_OPTIONS.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div className='sorting'>
      <button
        className='sorting__btn'
        type='button'
        onClick={onOptionMenuClick}
        onKeyDown={handleListKeyDown}
        aria-haspopup='listbox'
        aria-expanded={isOptionsOpen}
      >
        {SELECT_OPTIONS[selectedOption]}
      </button>
      <ul
        className={clsx('sorting__list', { sorting__list_open: isOptionsOpen })}
        role='listbox'
        aria-activedescendant={SELECT_OPTIONS[selectedOption]}
        aria-labelledby={SELECT_OPTIONS[selectedOption]}
        tabIndex={0}
        onKeyDown={handleListKeyDown}
      >
        {SELECT_OPTIONS.map((option, index) => (
          <li
            className='sorting__item'
            id={option}
            key={index}
            role='option'
            aria-selected={selectedOption === index}
            tabIndex={0}
            onKeyDown={handleKeyDown(index)}
            onClick={() => {
              onOptionSelect(index);
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sorting;
