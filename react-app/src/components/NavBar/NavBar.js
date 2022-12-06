import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './index.css';
import SplashNavBar from './SplashNavBar';
import SignedInNavBar from './SignedInNavBar';

const NavBar = () => {
  const loggedInUser = useSelector(state => state.session.user);
  return (
    <div>
    {
      !loggedInUser ? <SplashNavBar /> : <SignedInNavBar />
    }
    </div>
  );
}

export default NavBar;
