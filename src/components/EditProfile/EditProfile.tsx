import { useForm, SubmitHandler } from 'react-hook-form';

import { IEditAuth } from '../../types/interfaces';
import { editUser } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks';

import './EditProfile.scss';

const EditProfile = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<IEditAuth>();
  const onSubmit: SubmitHandler<IEditAuth> = async (data) => {
    const { username, email, password, image } = data;
    const result = await dispatch(editUser({ username, email, password, image }));

    if (typeof result.payload !== 'string')
      reset({ username: '', email: '', image: '', password: '' });
  };

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
              {...register('username', { required: 'Username is required' })}
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
              })}
            />
            {errors.email && <p className="auth__error">{errors.email.message}</p>}
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
              })}
            />
            {errors.image && <p className="auth__error">{errors.image.message}</p>}
          </label>
          <input className="edit-profile__button" type="submit" value="Save" />
          {isSubmitted && <p className="auth__success">Profile was edited succesfully</p>}
        </form>
      </div>
    </div>
  );
};
export default EditProfile;
