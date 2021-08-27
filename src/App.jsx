import './styles/App.css';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import NavigationBar from './components/NavigationBar';
import GameSelector from './components/GameSelector';
import ErrorPage from './components/ErrorPage';
import Footer from './components/Footer';
import TestAttempt from './components/TestAttempt';
import { useEffect } from 'react';
import UsersDashboard from './components/UsersDashboard';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [navbarShowing, setNavbarShowing] = useState(true);
    const [footerShowing, setFooterShowing] = useState(true);

    const host = process.env.REACT_APP_HOST_NAME;

    return (
        <Router>
            {navbarShowing ? <NavigationBar /> : null}
            <main>
                <Switch>
                    <Route exact path={`${host}`}>
                        {loggedIn ? <Home /> : <Redirect to={`${host}login`} />}
                    </Route>
                    <Route path={`${host}login`}>
                        {loggedIn ? (
                            <Redirect to={`${host}`} />
                        ) : (
                            <Login
                                setNavbarState={setNavbarShowing}
                                setLoginState={setLoggedIn}
                                setFooterState={setFooterShowing}
                            />
                        )}
                    </Route>
                    <Route path={`${host}pruebas-diagnosticas`} component={TestAttempt} />
                    <Route path={`${host}juegos`} component={GameSelector} />
                    <Route path={`${host}admin-usuarios`} component={UsersDashboard} />
                    <Route>
                        <ErrorPage />
                    </Route>
                </Switch>
            </main>
            {footerShowing ? <Footer /> : null}
        </Router>
    );
};

export default App;
