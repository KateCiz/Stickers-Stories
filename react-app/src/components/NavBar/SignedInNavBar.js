import React from 'react';
import { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import LogoutButton from '../auth/LogoutButton';
import DropDownMenu from './DropDown';
import { BsCart } from 'react-icons/bs';
import './index.css';
import { getSingleCart } from '../../store/carts';

const SignedInNavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedInUser = useSelector(state => state.session.user);
  
  useEffect(() => {
    dispatch(getSingleCart(loggedInUser?.current_cart?.id))
  },[dispatch]);
  
  const current_cart = useSelector(state => state.cartState.currentCart);

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
        <li className='nav-element' onClick={() => history.push(`/carts/${current_cart?.id}`)}>
          {current_cart?.Items?.length > 0 && <span className='cart-item-count'>{current_cart?.Items?.length}</span>}
          <BsCart className='cart-icon'/>
        </li>
      </ul>
    </nav>
  );
}

export default SignedInNavBar;