// IMPORT PACKAGES
import { useState } from 'react';
/* import clsx from 'clsx'; */

// IMPORT STYLES
import './App.scss';

// IMPORT COMPONENTS
import Header from '../Header/Header.jsx';
import Search from '../Search/Search.jsx';

// OTHER IMPORTS
import { SELECT_OPTIONS, ESCAPE_KEY } from '../../utils/constants';

// APP CORE COMPONENT
function App() {
  // HOOKS
  const [isOptionsOpen, setOptionsClass] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);

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
    setSelectedOption(index);
    setOptionsClass(false);
  }

  return (
    <div className='app__content'>
      <Header />
      <Search
        isOptionsOpen={isOptionsOpen}
        onOptionMenuClick={toggleOptionMenu}
        onOptionSelect={setOptionAndClose}
        toSwitchOptions={optionSwitch}
        selectedOption={selectedOption}
      />
    </div>
  );
}

export default App;
