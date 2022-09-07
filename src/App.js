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
          <ProtectedRoute exact path='/' component={HomeScreen}/>
          <Route path='/daily-sales' component={HomeScreen} />
          <Route path='/expenses' component={HomeScreen} />
          <Route path='/hr' component={HomeScreen} />
          <Route path='/inc-orders' component={HomeScreen} />
          <Route path='/outlets' component={HomeScreen} />
          <Route path='/payments' component={HomeScreen} />
          <Route path='/product-orders' component={HomeScreen} />
          <Route path='/record-sales' component={HomeScreen} />
          <Route path='/regulatory' component={HomeScreen} />
          <Route path='/tank' component={HomeScreen} />
          <Route path='/settings' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route render = {() => <h1>404 page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
