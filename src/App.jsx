import './styles/App.css';
import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
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
import StudentsSessionsDashboard from './components/StudentsSessionsDashboard';
import StudentSessionDetails from './components/StudentSessionDetails';
import TeachersCreateSessions from './components/TeachersCreateSessions';
import SessionDetails from './components/SessionDetails';
import UpdateSessions from './components/UpdateSessions';
import TeacherTestAttempts from './components/TeacherTestAttempts';
import StudentSessionAverage from './components/StudentSessionAverage';

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
            exact
            path={`${host}pruebas-diagnosticas`}
            isLoggedIn={loggedIn}
            component={CreateTest}
          />
          <ProtectedRoute
            path={`${host}prueba-diagnostica/:prueba/:session`}
            isLoggedIn={loggedIn}
            component={TestAttempt}
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
            exact
            path={`${host}prof-sesiones`}
            isLoggedIn={loggedIn}
            component={TeachersSessionsDashboard}
          />
          <ProtectedRoute
            exact
            path={`${host}prof-sesiones/agregar`}
            component={TeachersCreateSessions}
          />
          <ProtectedRoute
            exact
            path={`${host}prof-sesiones/:sessionId`}
            component={SessionDetails}
          />
          <ProtectedRoute
            exact
            path={`${host}prof-sesiones/actualizar/:sessionId`}
            component={UpdateSessions}
          />
          <ProtectedRoute
            exact
            path={`${host}est-sesiones`}
            isLoggedIn={loggedIn}
            component={StudentsSessionsDashboard}
          />
          <ProtectedRoute
            exact
            path={`${host}est-sesiones/:sessionId`}
            component={StudentSessionDetails}
          />
          <ProtectedRoute 
            exact 
            path={`${host}prof-sesiones/calificaciones-prueba/:sessionId/:pruebaId`}
            component={TeacherTestAttempts}
          />
          <ProtectedRoute
            exact 
            path={`${host}prof-sesiones/promedio-estudiante/:sessionId/:studentId`}
            component={StudentSessionAverage}
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
