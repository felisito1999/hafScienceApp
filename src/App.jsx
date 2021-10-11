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

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [navbarShowing, setNavbarShowing] = useState(false);
    const [footerShowing, setFooterShowing] = useState(false);

    const history = useHistory();
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
    }, [history]);

    return (
        <Router>
            {navbarShowing ? (
                <NavigationBar handleLogout={handleLogout} />
            ) : null}
            <main>
                <Switch>
                    <ProtectedRoute exact path={`${host}`} component={Home} />
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
                        component={TestAttempt}
                    />
                    <ProtectedRoute
                        path={`${host}juegos`}
                        component={GameSelector}
                    />
                    <ProtectedRoute
                        path={`${host}admin-usuarios`}
                        component={UsersDashboard}
                    />
                    <ProtectedRoute
                        path={`${host}admin-centros`}
                        component={SchoolsDashboard}
                    />
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
