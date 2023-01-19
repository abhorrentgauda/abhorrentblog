import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

import { loginUser, removeUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './Layout.scss';

const Layout = () => {
  const {
    user: {
      user: { username, token, image },
    },
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('password')) {
      if (localStorage.getItem('email')) {
        const emailStorage = localStorage.getItem('email') || '';
        const passwordStorage = localStorage.getItem('password') || '';
        dispatch(
          loginUser({
            email: emailStorage,
            password: passwordStorage,
          }),
        );
      }
    }
  });

  const header = token ? (
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
