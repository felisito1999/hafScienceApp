import './styles/App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import GameSelector from './components/GameSelector';
import Footer from './components/Footer';
import TestAttempt from './components/TestAttempt';
import UsersDashboard from './components/UsersDashboard';
import authService from './services/authService';
import SchoolsDashboard from './components/SchoolsDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LoginRoute from './components/LoginRoute';
import NotFound from './components/NotFound';
import TeachersSessionsDashboard from './components/TeachersSessionsDashboard';
import UserProfile from './components/UserProfile';
import LandingPage from './components/LandingPage';
import ResetPassword from './components/ResetPassword';
import CreateTest from './components/CreateTest';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [navbarShowing, setNavbarShowing] = useState(false);
  const [footerShowing, setFooterShowing] = useState(false);

  const host = process.env.REACT_APP_HOST_NAME;

  const handleLogout = () => {
    // authService.logout();
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    setLoggedIn(false);
    setNavbarShowing(false);
    setFooterShowing(false);
  };

  //Checks if the user is logged in when loading the App component.
  useEffect(() => {
    const checkIsLoggedIn = async () => {
      const loginState = await authService.isSignedIn();
      if (
        loginState.value === true &&
        localStorage.getItem('token') != null &&
        localStorage.getItem('userData') != null
      ) {
        setLoggedIn(true);
        setNavbarShowing(true);
        setFooterShowing(true);
      } else {
        localStorage.removeItem('userData');
        localStorage.removeItem('token');

        setLoggedIn(false);
        setNavbarShowing(false);
        setFooterShowing(false);
      }
    };
    checkIsLoggedIn();
  }, []);

  return (
    <Router>
      {navbarShowing ? <NavigationBar handleLogout={handleLogout} /> : null}
      <main>
        <Switch>
          <Route exact path={`${host}`}>
            {loggedIn ? <Home /> : <LandingPage />}
          </Route>
          <ProtectedRoute
            exact
            path={`${host}/home`}
            isLoggedIn={loggedIn}
            component={Home}
          />
          <ProtectedRoute
            path={`${host}perfil`}
            isLoggedIn={loggedIn}
            component={UserProfile}
          />
          <LoginRoute
            path={`${host}login`}
            component={Login}
            isLoggedIn={loggedIn}
            setNavbarState={setNavbarShowing}
            setLoginState={setLoggedIn}
            setFooterState={setFooterShowing}
          />
          <ProtectedRoute
            path={`${host}pruebas-diagnosticas`}
            isLoggedIn={loggedIn}
            component={CreateTest}
          />
          {/* <ProtectedRoute
            path={`${host}crear-prueba-diagnostica`}
            isLoggedIn={loggedIn}
            component={CreateTest}
          /> */}
          <ProtectedRoute
            path={`${host}juegos`}
            isLoggedIn={loggedIn}
            component={GameSelector}
          />
          <ProtectedRoute
            path={`${host}admin-usuarios`}
            isLoggedIn={loggedIn}
            component={UsersDashboard}
          />
          <ProtectedRoute
            path={`${host}admin-centros`}
            isLoggedIn={loggedIn}
            component={SchoolsDashboard}
          />
          {/* <ProtectedRoute 
                        path={`${host}admin-sesiones`}
                        component={SessionsDashboard}
                    /> */}
          <ProtectedRoute
            path={`${host}prof-sesiones`}
            isLoggedIn={loggedIn}
            component={TeachersSessionsDashboard}
          />
          <Route
            path={`${host}prueba-diagnostica-development`}
            component={CreateTest}
          />
          <Route path={`${host}reset-password`} component={ResetPassword} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
      {footerShowing ? <Footer /> : null}
    </Router>
  );
};

export default App;
