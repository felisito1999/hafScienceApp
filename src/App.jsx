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
import PeriodicTable from './components/PeriodicTable';
import NavigationBar from './components/NavigationBar';
import PuzzleGame from './components/PuzzleGame';
import ErrorPage from './components/ErrorPage';
import Footer from './components/Footer';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [navbarShowing, setNavbarShowing] = useState(true);
    const [footerShowing, setFooterShowing] = useState(true);

    const reload = () => window.location.reload
    return (
        <Router>
            {navbarShowing ? <NavigationBar /> : null}
            <main>
                <Switch>
                    <Route exact path="/">
                        {loggedIn ? <Home /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/login">
                        {loggedIn ? (
                            <Redirect to="/" />
                        ) : (
                            <Login
                                setNavbarState={setNavbarShowing}
                                setLoginState={setLoggedIn}
                                setFooterState={setFooterShowing}
                            />
                        )}
                    </Route>
                    <Route path="/admin-usuarios">
                        <p>Este es el módulo de administración de usuarios</p>
                    </Route>
                    <Route path="/tabla-periodica">
                        <PeriodicTable />
                    </Route>
                    <Route path="/puzzle">
                        <PuzzleGame></PuzzleGame>
                    </Route>
                    <Route path="/puzzle.html" onEnter={reload} />
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
