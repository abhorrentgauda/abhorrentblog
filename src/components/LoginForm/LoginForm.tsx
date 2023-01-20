import './LoginForm.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { loginUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ILoginAuth } from '../../types/interfaces';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginAuth>();

  const { token } = useAppSelector((state) => state.user.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginAuth> = (data) => {
    const { email, password } = data;
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <div className="container">
      <div className="login">
        <span className="login__title">Sign In</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Email address
            <input
              className="login__email"
              placeholder="Email address"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'You should enter valid email address',
                },
              })}
            />
            {errors.email && <p className="auth__error">{errors.email.message}</p>}
          </label>
          <label>
            Password
            <input
              className="login__password"
              placeholder="Password"
              type="password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="auth__error">{errors.password.message}</p>}
          </label>
          <input className="login__button" type="submit" value="Login" />
        </form>
        <span className="login__signup">
          Don&#39;t have an account? <Link to="/sign-up">Sign Up</Link>.
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
