import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import ItemFormPage from './components/ItemCreate+Edit/ItemFormPage';
import ItemPageFull from './components/ItemPage/ItemPageFull';
import StorePage from './components/StorePage/StorePage';
import { authenticate } from './store/session';
import ShopAllFeed from './components/ItemFeed/ShopAllFeed';
import Footer from './components/Footer/footer';
import AboutMe from './components/AboutPage/AboutMe';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Footer />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/new-item" exact={true}>
          <ItemFormPage itemPage={"create"} />
        </ProtectedRoute>
        <ProtectedRoute path="/edit-item/:itemId" exact={true}>
          <ItemFormPage itemPage={"edit"}/>
        </ProtectedRoute>
        <Route path="/items/:itemId" exact={true}>
          <ItemPageFull />
        </Route>
        <Route path="/stores/:storeId" exact={true}>
          <StorePage />
        </Route>
        <Route path='/' exact={true} >
          <ShopAllFeed />
        </Route> 
        <Route path='/about' exact={true}>
          <AboutMe />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
