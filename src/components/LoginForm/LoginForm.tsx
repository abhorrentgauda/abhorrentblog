import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from '../../hooks';
import { ILoginForm } from '../../types/interfaces';
import { setUser } from '../../store/authSlice';
import { useLoginUserMutation } from '../../store/blogApi';
import { isFetchBaseQueryError } from '../../helpers/errorHelper';
import { signUpPath } from '../../paths';

import './LoginForm.scss';

const LoginForm = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  const fromPage = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    const { email, password } = data;
    try {
      // Получаем респонс запроса, диспатчим полученный токен и заносим в локалсторедж
      const result = await loginUser({ email, password }).unwrap();
      dispatch(setUser({ token: result.user.token, username: result.user.username }));

      // уходим на главную страницу после удачного сабмита
      navigate(fromPage, { replace: true });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // Проверяем тип ошибки и ее статус, в случае 422 устанавливаем сообщение ошибки

        if (err.status === 422) setError('Invalid email or password');
      }
    }
  };

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
                onChange: () => setError(''),
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
              {...register('password', {
                required: 'Password is required',
                onChange: () => setError(''),
              })}
            />
            {errors.password && <p className="auth__error">{errors.password.message}</p>}
            {error && <p className="auth__error">{error}</p>}
          </label>
          <input className="login__button" type="submit" value="Login" />
        </form>
        <span className="login__signup">
          Don&#39;t have an account? <Link to={`/${signUpPath}`}>Sign Up</Link>.
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
