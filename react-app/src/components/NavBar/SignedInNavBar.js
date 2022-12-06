import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import LogoutButton from '../auth/LogoutButton';
import DropDownMenu from './DropDown';
import './index.css';
import { useEffect } from 'react';

const SignedInNavBar = () => {
  const loggedInUser = useSelector(state => state.session.user);

  useEffect(() => {
    
  });

  return (
    <nav className='navbar'>
      <NavLink to='/'  exact={true}  className="sticker-stories-header" style={{ textDecoration: "none" }}>Stickers & Stories</NavLink>
      <ul className='nav-list'>
        <li className='nav-element'>
          <DropDownMenu location='shop' />
        </li>
        <li className='nav-element'>
          <DropDownMenu location='profile' user={loggedInUser}/>
        </li>
        <li className='nav-element'>
          <DropDownMenu location='store' user={loggedInUser}/>
        </li>
      </ul>
    </nav>
  );
}

export default SignedInNavBar;