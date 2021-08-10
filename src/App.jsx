import './styles/App.css';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import PeriodicTable from './components/PeriodicTable';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [navbarShowing, setNavbarShowing] = useState(true);
    const [footerShowing, setFooterShowing] = useState(true);
    return (
        <Router>
             {navbarShowing ? <NavigationBar/> : null}
            <Switch>
                <Route exact path="/">
                    {loggedIn ? <Home /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    {loggedIn ? <Redirect to="/" /> : <Login setNavbarState={setNavbarShowing} setLoginState={setLoggedIn} setFooterState={setFooterShowing}/>}
                </Route>
                <Route path="/tabla-periodica">
                    <PeriodicTable />
                </Route>
                <Route>
                    <ErrorPage />
                </Route>
            </Switch>
            {footerShowing ? <Footer /> : null}
        </Router>
    );
};

export default App;
