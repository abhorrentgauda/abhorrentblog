import { Link, Outlet } from 'react-router-dom';

import { useGetUserQuery } from '../../store/userApi';
import './Layout.scss';

const Layout = () => {
  const { data } = useGetUserQuery();

  const header = data ? (
    <header className="header">
      <Link to="/" className="header-name">
        Realworld Blog
      </Link>
      <div className="header-buttons">
        <Link to="/" className="header-button header-button--create-article">
          Create article
        </Link>
        <div className="header-user">
          <Link to="profile">
            {data.user.username}
            <img
              src={data.user.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
              alt=""
            />
          </Link>
        </div>
        <Link
          type="button"
          to="/"
          className="header-button header-button--log-out"
          onClick={() => localStorage.removeItem('token')}
        >
          Log Out
        </Link>
      </div>
    </header>
  ) : (
    <header className="header">
      <Link to="/" className="header-name">
        Realworld Blog
      </Link>
      <div>
        <Link to="sign-in" className="header-button header-button--sign-in">
          Sign In
        </Link>
        <Link to="sign-up" className="header-button header-button--sign-up">
          Sign Up
        </Link>
      </div>
    </header>
  );
  return (
    <>
      {header}
      <Outlet />
    </>
  );
};

export default Layout;
