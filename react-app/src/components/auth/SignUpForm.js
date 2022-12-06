import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = ({exitModal, changePage}) => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, imageUrl, email, password));
      if (data) {
        setErrors(data)
      }
    }
    if (password !== repeatPassword) {
      setErrors(["password and confirm password must match"])
    }
  };

  const exitFromModal = (e) => {
    exitModal();
  }

  const changeToLogin = (e) => {
    changePage();
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signup-container">
      <button className="exit-icon" onClick={exitFromModal}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <span className="signup-modal-heading">Join Stickers + Stories</span>
      <form className="signup-form" onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className="signup-label">Your email</label>
          <input
            className="signup-input"
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </div>
        <div>
          <label className="signup-label">Username</label>
          <input
            className="signup-input"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div>
          <label className="signup-label">Profile Image Url</label>
          <input
            className="signup-input"
            type="text"
            name="profile_image_url"
            onChange={(e) => setImageUrl(e.target.value)}
            value={imageUrl}
          ></input>
        </div>
        <div>
          <label className="signup-label">Password</label>
          <input
            className="signup-input"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <div>
          <label className="signup-label">Confirm password</label>
          <input
            className="signup-input"
            type="password"
            name="repeat_password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type="submit" className="signup-btn-modal">
          Sign Up
        </button>
      </form>

      <div className='change-to-login'>
        <span>Already have an account ?<button className="change-to-signin-btn" onClick={changeToLogin}>Sign in</button></span>
      </div>
    </div>
  );
};

export default SignUpForm;
