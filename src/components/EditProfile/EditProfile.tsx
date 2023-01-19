import { useEffect, useState } from 'react';
import './EditProfile.scss';
import { useNavigate } from 'react-router-dom';

import { editUser } from '../../store/userSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user.user);

  const handleEdit = (username: string, email: string, password: string, image: string) => {
    if (!username) username = user.username;
    if (!email) username = user.email;
    if (!password) password = localStorage.getItem('password') || '';
    if (!image) image = user.image;

    dispatch(editUser({ username, email, password, image }));

    setUsername('');
    setEmail('');
    setPassword('');
    setImage('');
  };

  useEffect(() => {
    if (!user.token) navigate('/');
  }, [user.token]);

  return (
    <div className="container">
      <div className="edit-profile">
        <span className="edit-profile__title">Edit Profile</span>
        <label>Username</label>
        <input
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email address</label>
        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <label>New password</label>
        <input
          placeholder="New password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Avatar image (url)</label>
        <input
          placeholder="Avatar image"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          className="edit-profile__button"
          type="button"
          onClick={() => handleEdit(username, email, password, image)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
