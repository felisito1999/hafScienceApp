import './styles/App.css';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';
import PeriodicTable from './components/PeriodicTable';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {loggedIn ? <PeriodicTable /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    <Login setLoginState={setLoggedIn}/>
                </Route>
                <Route>
                    <ErrorPage />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
