import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import LogoutButton from '../auth/LogoutButton';
import SignUpModal from '../auth/SignUpModal/index';
import LoginModal from '../auth/LoginModal/index';
import DemoLogin from '../auth/DemoLogin';
import DropDownMenu from './DropDown';
import './index.css';

const SplashNavBar = () => {
  const loggedInUser = useSelector(state => state.session.user);
  return (
    <nav className='navbar'>
        <NavLink to='/'  exact={true} className="sticker-stories-header" style={{ textDecoration: "none" }}>Stickers & Stories</NavLink>
      <ul className='nav-list'>
        <li className='nav-element'>
          <DemoLogin />
        </li>
        <li className='nav-element'>
          <DropDownMenu location='shop' />
        </li>
        <li className='nav-element'>
          <LoginModal />
        </li>
        <li className='nav-element'>
          <SignUpModal />
        </li>
      </ul>
    </nav>
  );
}

export default SplashNavBar;
