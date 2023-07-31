// IMPORT PACKAGES
import { Outlet } from 'react-router-dom';

// IMPORT COMPONENTS
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';

// APP LAYOUT COMPONENT
function AppLayout({ lastElement }) {
  return (
    <>
      <Header />
      <Outlet />
      <Footer lastElement={lastElement} />
    </>
  );
}

export default AppLayout;
