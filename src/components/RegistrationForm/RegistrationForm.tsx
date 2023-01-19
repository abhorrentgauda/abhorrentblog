import { useEffect, useRef } from 'react';
import './RegistrationForm.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import { registerUser } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks';
import { IRefigsterAuth } from '../../types/interfaces';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRefigsterAuth>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const password = useRef({});
  password.current = watch('password', '');
  const onSubmit: SubmitHandler<IRefigsterAuth> = (data) => {
    const { username, email, password } = data;
    localStorage.setItem('password', data.password);
    dispatch(registerUser({ username, email, password }));
    navigate('/');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, []);

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
              })}
            />
            {errors?.username?.message && (
              <p className="registration__error">{errors.username.message}</p>
            )}
          </label>

          <label>
            Email address
            <input
              className={
                !errors.email
                  ? 'registration__email'
                  : 'registration__email registration__email--error'
              }
              placeholder="Email address"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Entered value does not match email format',
                },
              })}
            />
            {errors.email && <p className="registration__error">{errors.email.message}</p>}
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
            {errors.password && <p className="registration__error">{errors.password.message}</p>}
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
                validate: (value) => value === password.current || 'The passwords do not match',
              })}
            />
            {errors.repeatedPass && (
              <p className="registration__error">{errors.repeatedPass.message}</p>
            )}
          </label>

          <label className="registration__policy">
            I agree to the processing of my personal information
            <input
              type="checkbox"
              className="registration__policy-checkbox"
              {...register('isAgreed', { required: 'This field is required' })}
            />
            {errors.isAgreed && <p className="registration__error">{errors.isAgreed.message}</p>}
            <span className="registration__policy-name" />
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
