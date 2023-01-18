import './EditProfile.scss';

const EditProfile = () => (
  <div className="container">
    <div className="edit-profile">
      <span className="edit-profile__title">Edit Profile</span>
      <label>Username</label>
      <input placeholder="Username" type="text" />
      <label>Email address</label>
      <input placeholder="Email address" type="text" />
      <label>New password</label>
      <input placeholder="New password" type="text" />
      <label>Avatar image (url)</label>
      <input placeholder="Avatar image" type="text" />
      <button className="edit-profile__button" type="button">
        Save
      </button>
    </div>
  </div>
);

export default EditProfile;
