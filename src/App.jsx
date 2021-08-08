import './styles/App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PeriodicTable from './components/PeriodicTable';
import Login from './components/Login'

const App = () => {
    return (
      <Router>
        <Switch>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path="/">
              <PeriodicTable/>
          </Route>
        </Switch>
      </Router>
    );
};

export default App;
