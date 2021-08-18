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

    const reload = () => window.location.reload
    const host = process.env.REACT_APP_HOST_NAME;
    const devHost = '/'

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
                    <Route path={`${host}pruebas-diagnosticas`}>
                        <TestAttempt />
                    </Route>
                    <Route path={`${host}juegos`}>
                        <GameSelector />
                    </Route>
                    <Route path="/admin-usuarios">
                        <p>Este es el módulo de administración de usuarios</p>
                    </Route>
                    <Route path={`${host}mostrar-usuarios`} component={UsersDashboard} />
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
