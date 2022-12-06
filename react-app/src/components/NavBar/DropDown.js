import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { BsPerson, BsShop } from 'react-icons/bs';
import { deleteAStore, getSingleStore } from '../../store/stores';
import CreateStoreModal from '../StoreCreate+Edit/CreateStoreModal';


function DropDownMenu({user, location}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isMenuShown, setIsMenuShown] = useState(false);

    const showMenu = () => {
        setIsMenuShown(!isMenuShown)
    };

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };
    
    let DropDown;

    if(location === 'profile'){
        DropDown = <>
                    {/* <button className='nav-item' onClick={showMenu}> */}
                    <BsPerson onClick={showMenu}/>
                   {/* </button> */}
                   {isMenuShown && (
                       <ul className='profile-dropdown'>
                           <li>{user?.username}</li>
                           <li>{user?.email}</li>
                           <li>
                               <button className="logout" onClick={logout}>Log Out</button>
                           </li>
                   </ul>
            )}
        </>
    }

    if(location === 'store'){
        DropDown = <>
            {user?.store_id !== 'null' ? 
                <>
                    {/* <button className='nav-item' onClick={showMenu}> */}
                    <BsShop   onClick={showMenu}/>
                    {/* <FaStore className='fa-5x' onClick={showMenu} /> */}
                   {/* </button> */}
                   {isMenuShown && (
                       <ul className='store-dropdown'>
                            <li>
                                <NavLink className='store-link' to={`/stores/${user?.store_id}`}>My Store</NavLink>
                            </li>
                           <li>
                                <NavLink className='store-link' to={'/new-item'}>Add Item</NavLink>
                           </li>
                           <li>
                               <p className='store-link' onClick={async () => await dispatch(deleteAStore(user?.store_id)).then(() => {dispatch(sessionActions.authenticate())}).then(() => {history.push('/')})}>Delete Store</p>
                           </li>
                   </ul>
                )}
            </> : <CreateStoreModal />
        }
        </>
    }

    // if(location === 'shop'){
    //     DropDown = <>
    //             <p className='nav-item' onClick={showMenu}>Shop
    //                </p>
    //                {isMenuShown && (
    //                    <ul className='shop-dropdown'> 
    //                    {/* these all probably need to be navlinks */}
    //                         <NavLink to='/'>Shop All</NavLink>
    //                        <li>stories</li>
    //                        <li>stickers</li>
    //                </ul>
    //     )}
    //     </>
    // }

    useEffect(() => {
        //this makes sure the click event listener is only activated 
        //if the menu is open 
        if(!isMenuShown) return;

        const hideMenu = () => {
            setIsMenuShown(false);
        };

        //while the menu is open there is an event listener 
        //listening to see if the user clicks away from the menu 
        //if so the menu should close
        document.addEventListener('click', hideMenu);

        //clean up function
        return () => document.removeEventListener('click', hideMenu);
    }, [isMenuShown]);


    return (
        <>{DropDown}</>
    );
};

export default DropDownMenu;