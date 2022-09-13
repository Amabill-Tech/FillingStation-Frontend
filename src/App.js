import './App.scss';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProtectedRoute from './screens/ProtectedRoute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path='/home' component={HomeScreen}/>
          <Route path='/home/daily-sales' component={HomeScreen} />
          <Route path='/home/expenses' component={HomeScreen} />
          <Route path='/home/hr' component={HomeScreen} />
          <Route path='/home/inc-orders' component={HomeScreen} />
          <Route path='/home/outlets' component={HomeScreen} />
          <Route path='/home/payments' component={HomeScreen} />
          <Route path='/home/product-orders' component={HomeScreen} />
          <Route path='/home/record-sales' component={HomeScreen} />
          <Route path='/home/regulatory' component={HomeScreen} />
          <Route path='/home/tank' component={HomeScreen} />
          <Route path='/home/settings' component={HomeScreen} />
          <Route path='/home/employee' component={HomeScreen} />
          <Route path='/home/salary' component={HomeScreen} />
          <Route path='/home/query' component={HomeScreen} />
          <Route path='/home/recruitment' component={HomeScreen} />
          <Route path='/home/attendance' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route render = {() => <h1>404 page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
