import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { IEditProfile } from '../../types/interfaces';
import { useAppDispatch } from '../../hooks';
import { useEditUserMutation } from '../../store/userApi';
import { setToken } from '../../store/authSlice';
import { isFetchBaseQueryError } from '../helpers/errorHelper';

import './EditProfile.scss';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const [editUser] = useEditUserMutation();
  const [error, setError] = useState('');
  const [succesfullMsg, setSuccesfullMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEditProfile>();

  const onSubmit: SubmitHandler<IEditProfile> = async (data) => {
    const { username, email, password, image } = data;
    try {
      // Получаем респонс запроса, диспатчим полученный токен и заносим в локалсторедж
      const result = await editUser({ username, email, password, image }).unwrap();
      dispatch(setToken({ token: result.user.token }));
      localStorage.setItem('token', result.user.token);

      // очистка полей и установка сообщения об удачном сабмите
      reset();
      setSuccesfullMsg('Profile was edited succesfully');
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        // Проверяем тип ошибки
        const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);

        // у errMsg тип string, поэтому проверяю методом includes наличие слов
        // по которым можно распознать ошибку
        if (errMsg.includes('email')) {
          setError('Email is already taken');
        }
      }
    }
  };

  // функция для очистки стейтов, когда пользователь будет заново вводить данные после
  // успешного/неудачного сабмита
  const clearStateMessages = () => {
    setError('');
    setSuccesfullMsg('');
  };

  const emailError = errors.email ? (
    <p className="auth__error">{errors.email.message}</p>
  ) : error.includes('Email') ? (
    <p className="auth__error">{error}</p>
  ) : null;

  return (
    <div className="container">
      <div className="edit-profile">
        <span className="edit-profile__title">Edit Profile</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Username
            <input
              className="edit-profile__username"
              placeholder="Username"
              type="text"
              {...register('username', {
                required: 'Username is required',
                onChange: () => clearStateMessages(),
              })}
            />
            {errors.username && <p className="auth__error">{errors.username.message}</p>}
          </label>
          <label>
            Email address
            <input
              placeholder="Email address"
              type="email"
              className="edit-profile__email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'You should enter valid email address',
                },
                onChange: () => clearStateMessages(),
              })}
            />
            {emailError}
          </label>
          <label>
            New password
            <input
              placeholder="New password"
              type="password"
              className="edit-profile__password"
              {...register('password', {
                required: 'You must specify a password',
                minLength: { value: 4, message: 'Password should be at least 4 characters' },
                maxLength: {
                  value: 40,
                  message: 'Password can not be longer than 40 characters',
                },
                onChange: () => clearStateMessages(),
              })}
            />
            {errors.password && <p className="auth__error">{errors.password.message}</p>}
          </label>
          <label>
            Avatar image (url)
            <input
              placeholder="Avatar image"
              type="url"
              className="edit-profile__image"
              {...register('image', {
                required: 'Image address is required',
                pattern: {
                  value:
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
                  message: 'You should enter valid image address',
                },
                onChange: () => clearStateMessages(),
              })}
            />
            {errors.image && <p className="auth__error">{errors.image.message}</p>}
          </label>
          <input className="edit-profile__button" type="submit" value="Save" />
          {succesfullMsg && <p className="auth__success">{succesfullMsg}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
