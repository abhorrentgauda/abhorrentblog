import { Outlet } from 'react-router-dom';

import './Layout.scss';

const Layout = () => (
  <>
    <header className="header">
      <span className="header-name">Realworld Blog</span>
      <div>
        <button type="button" className="header-button header-button--sign-in">
          Sign In
        </button>
        <button type="button" className="header-button header-button--sign-up">
          Sign Up
        </button>
      </div>
    </header>

    <Outlet />
  </>
);

export default Layout;
