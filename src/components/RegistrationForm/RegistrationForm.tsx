import { useState, useEffect } from 'react';
import './RegistrationForm.scss';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const RegistrationForm = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPass, setRepeatedPass] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (user.token) navigate('/');
  }, [user.token]);

  const handleRegister = (
    username: string,
    email: string,
    password: string,
    repeatedPass: string,
    isAgreed: boolean,
  ) => {
    if (username && email) {
      if (isAgreed) {
        if (password === repeatedPass) {
          localStorage.setItem('password', password);
          dispatch(registerUser({ username, email, password }));
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="registration">
        <span className="registration__title">Create new account</span>
        <label>Username</label>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
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
        <label>Repeat Password</label>
        <input
          placeholder="Password"
          type="password"
          value={repeatedPass}
          onChange={(e) => setRepeatedPass(e.target.value)}
        />
        <label className="registration__policy">
          I agree to the processing of my personal information
          <input
            type="checkbox"
            className="registration__policy-checkbox"
            checked={isAgreed}
            onChange={() => setIsAgreed((prev) => !prev)}
          />
          <span className="registration__policy-name" />
        </label>
        <button
          className="registration__button"
          type="button"
          onClick={() => handleRegister(username, email, password, repeatedPass, isAgreed)}
        >
          Create
        </button>
        <span className="registration__signin">
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </span>
      </div>
    </div>
  );
};

export default RegistrationForm;
