import './LoginForm.scss';

const LoginForm = () => (
  <div className="container">
    <div className="login">
      <span className="login__title">Sign In</span>
      <label>Email address</label>
      <input placeholder="Email address" type="text" />
      <label>Password</label>
      <input placeholder="Password" type="text" />
      <button className="login__button" type="button">
        Login
      </button>
      <span className="login__signup">
        Don&apos;t have an account? <a>Sign Up</a>.
      </span>
    </div>
  </div>
);

export default LoginForm;
