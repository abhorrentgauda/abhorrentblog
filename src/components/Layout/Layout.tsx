import { Link, Outlet } from 'react-router-dom';

import './Layout.scss';

const Layout = () => (
  <>
    <header className="header">
      <Link to="/" className="header-name">
        Realworld Blog
      </Link>
      <div>
        <Link to="login" className="header-button header-button--sign-in">
          Sign In
        </Link>
        <Link to="register" className="header-button header-button--sign-up">
          Sign Up
        </Link>
      </div>
    </header>

    <Outlet />
  </>
);

export default Layout;
