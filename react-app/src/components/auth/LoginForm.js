import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { RxCross1 } from 'react-icons/rx'
import './LoginForm.css';

const LoginForm = ({exitModal, changePage}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const changeToSignUp = (e) => {
    changePage();
  };

  return (
    <div className="login-container">
      <button className="exit-icon" onClick={(e) => exitModal()}>
        <RxCross1 />
      </button>
      <span className="login-modal-heading">
        Sign in to start your journey
      </span>
      <form onSubmit={onLogin} className="signin-form">
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            className="login-input"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            className="login-input"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn-modal">
            Sign In
          </button>
        </div>
        <div className='change-to-signup'>
        <span>Don't have an account ?<button className="change-to-signup-btn" onClick={changeToSignUp}>Sign Up</button></span>
      </div>
      </form>
    </div>
  );
};

export default LoginForm;