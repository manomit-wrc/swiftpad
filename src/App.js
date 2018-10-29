import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { getUser, setCurrentUser } from './actions/auth';
import asyncComponent from './Async';
import Blank from './components/layouts/Blank';
import Dashboard from './components/layouts/Dashboard';
import MainDashboard from './components/dashboard/Dashboard';
import AppRoutes from './components/hoc/AppRoutes';
import PrivateRoute from './components/hoc/PrivateRoute';
import StoryWrite from './components/main/StoryWrite';


const Login = asyncComponent(() => { return import('./components/login/Login'); });
const Signup = asyncComponent(() => { return import('./components/signup/Signup'); });
const Main = asyncComponent(() => { return import('./components/main/Main'); });


if(localStorage.data) {
  store.dispatch(setCurrentUser(localStorage.data));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <AppRoutes exact path="/" layout={Blank} component={Login} />
            <AppRoutes exact path="/signup" layout={Blank} component={Signup} />
            <PrivateRoute exact path="/dashboard" layout={Dashboard} component={MainDashboard} />
            <PrivateRoute exact path="/dashboard/story-write/:id" layout={Dashboard} component={StoryWrite} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
