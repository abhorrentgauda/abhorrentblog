import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { getUser, removeUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './Layout.scss';

const Layout = () => {
  const {
    user: {
      user: { username, email, image },
    },
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getUser(token));
    }
  });

  const header = email ? (
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
            {username}
            <img
              src={image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
              alt=""
            />
          </Link>
        </div>
        <Link
          type="button"
          to="/"
          className="header-button header-button--log-out"
          onClick={() => dispatch(removeUser())}
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
