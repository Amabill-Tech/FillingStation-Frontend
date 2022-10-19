import './App.scss';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProtectedRoute from './screens/ProtectedRoute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AOS from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react';

function App() {

  useEffect(()=>{
    AOS.init();
    AOS.refresh();
  }, [])

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
          <Route path='/home/outlets/tanks' component={HomeScreen} />
          <Route path='/home/outlets/pumps' component={HomeScreen} />
          <Route path='/home/outlets/sales' component={HomeScreen} />
          <Route path='/home/payments' component={HomeScreen} />
          <Route path='/home/product-orders' component={HomeScreen} />
          <Route path='/home/record-sales' component={HomeScreen} />
          <Route path='/home/record-sales/lpo' component={HomeScreen} />
          <Route path='/home/record-sales/expenses' component={HomeScreen} />
          <Route path='/home/record-sales/payment' component={HomeScreen} />
          <Route path='/home/regulatory' component={HomeScreen} />
          <Route path='/home/analysis' component={HomeScreen} />
          <Route path='/home/lpo' component={HomeScreen} />
          <Route path='/home/supply' component={HomeScreen} />
          <Route path='/home/tank' component={HomeScreen} />
          <Route path='/home/settings' component={HomeScreen} />
          <Route path='/home/hr/manager' component={HomeScreen} />
          <Route path='/home/hr/employee' component={HomeScreen} />
          <Route path='/home/hr/salary' component={HomeScreen} />
          <Route path='/home/hr/query' component={HomeScreen} />
          <Route path='/home/hr/recruitment' component={HomeScreen} />
          <Route path='/home/hr/attendance' component={HomeScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route render = {() => <h1>404 page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
