import './LoginForm.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { loginUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.token) navigate('/');
  }, [user.token]);

  const handleLogin = (email: string, password: string) => {
    if (email) {
      if (password) {
        localStorage.setItem('password', password);
        dispatch(loginUser({ email, password }));
      }
    }
  };

  return (
    <div className="container">
      <div className="login">
        <span className="login__title">Sign In</span>
        <label>Email address</label>
        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <label>Password</label>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login__button"
          type="button"
          onClick={() => handleLogin(email, password)}
        >
          Login
        </button>
        <span className="login__signup">
          Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>.
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
