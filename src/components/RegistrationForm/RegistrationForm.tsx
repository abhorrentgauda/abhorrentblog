import './RegistrationForm.scss';

const RegistrationForm = () => (
  <div className="container">
    <div className="registration">
      <span className="registration__title">Create new account</span>
      <label>Username</label>
      <input placeholder="Username" type="text" />
      <label>Email address</label>
      <input placeholder="Email address" type="text" />
      <label>Password</label>
      <input placeholder="Password" type="text" />
      <label>Repeat Password</label>
      <input placeholder="Password" type="text" />
      <label className="registration__policy">
        I agree to the processing of my personal information
        <input type="checkbox" className="registration__policy-checkbox" />
        <span className="registration__policy-name" />
      </label>
      <button className="registration__button" type="button">
        Create
      </button>
      <span className="registration__signin">
        Already have an account? <a>Sign In</a>.
      </span>
    </div>
  </div>
);

export default RegistrationForm;
