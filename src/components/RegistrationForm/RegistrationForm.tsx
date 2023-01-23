import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useRegisterUserMutation } from '../../store/blogApi';
import { IRefigsterAuth } from '../../types/interfaces';
import { isFetchBaseQueryError } from '../../helpers/errorHelper';
import { useAppDispatch } from '../../hooks';
import { setUser } from '../../store/authSlice';

import './RegistrationForm.scss';

const RegistrationForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRefigsterAuth>();

  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit: SubmitHandler<IRefigsterAuth> = async (data) => {
    const { username, email, password } = data;
    try {
      // Получаем респонс запроса, диспатчим полученный токен и заносим в локалсторедж
      const result = await registerUser({ username, email, password }).unwrap();
      dispatch(setUser({ token: result.user.token, username: result.user.username }));

      // уходим на главную страницу после удачного сабмита
      navigate('/');
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // Проверяем тип ошибки
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

        // у errMsg тип string, поэтому проверяю методом includes наличие слов
        // по которым можно распознать ошибку
        if (errMsg.includes('username')) {
          setError('Username is already taken');
        }
        if (errMsg.includes('email')) {
          setError('Email is already taken');
        }
      }
    }
  };

  const usernameError = errors.username ? (
    <p className="auth__error">{errors.username.message}</p>
  ) : error.includes('Username') ? (
    <p className="auth__error">{error}</p>
  ) : null;

  const emailError = errors.email ? (
    <p className="auth__error">{errors.email.message}</p>
  ) : error.includes('Email') ? (
    <p className="auth__error">{error}</p>
  ) : null;

  return (
    <div className="container">
      <div className="registration">
        <span className="registration__title">Create new account</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Username
            <input
              className={
                !errors.username
                  ? 'registration__username'
                  : 'registration__username registration__username--error'
              }
              placeholder="Username"
              type="text"
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'Username should be at least 3 characters' },
                maxLength: {
                  value: 20,
                  message: 'Username can not be longer than 20 characters',
                },
                onChange: () => setError(''),
              })}
            />
            {usernameError}
          </label>

          <label>
            Email address
            <input
              className={
                !(errors.email || error.includes('Email'))
                  ? 'registration__email'
                  : 'registration__email registration__email--error'
              }
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
            {emailError}
          </label>

          <label>
            Password
            <input
              className={
                !errors.password
                  ? 'registration__password'
                  : 'registration__password registration__password--error'
              }
              placeholder="Password"
              type="password"
              {...register('password', {
                required: 'You must specify a password',
                minLength: { value: 4, message: 'Password should be at least 4 characters' },
                maxLength: {
                  value: 40,
                  message: 'Password can not be longer than 40 characters',
                },
              })}
            />
            {errors.password && <p className="auth__error">{errors.password.message}</p>}
          </label>

          <label>
            Repeat Password
            <input
              className={
                !errors.repeatedPass
                  ? 'registration__rep-password'
                  : 'registration__rep-password registration__rep-password--error'
              }
              placeholder="Password"
              type="password"
              {...register('repeatedPass', {
                required: 'You must repeat password',
                validate: (value) => value === password.current || 'Passwords do not match',
              })}
            />
            {errors.repeatedPass && <p className="auth__error">{errors.repeatedPass.message}</p>}
          </label>

          <label className="registration__policy">
            I agree to the processing of my personal information
            <input
              type="checkbox"
              className="registration__policy-checkbox"
              {...register('isAgreed', { required: 'This field is required' })}
            />
            {errors.isAgreed && <p className="auth__error">{errors.isAgreed.message}</p>}
            <span
              className={
                !errors.isAgreed
                  ? 'registration__policy-name'
                  : 'registration__policy-name registration__policy-name--error'
              }
            />
          </label>
          <input className="registration__button" type="submit" value="Create" />
        </form>
        <span className="registration__signin">
          Already have an account? <Link to="/sign-in">Sign In</Link>.
        </span>
      </div>
    </div>
  );
};

export default RegistrationForm;
