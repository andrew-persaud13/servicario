import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Faq from 'pages/Faq'
import Profile from 'pages/Profile'
import Services from 'pages/Services'
import Login from 'pages/Login'
import Register from 'pages/Register'
import ServiceDetail from 'pages/ServiceDetail'
import ServiceCreate from 'pages/services/ServiceCreate';
import UserServices from 'pages/services/UserServices';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path='/' component={Home}/>
      <Route exact path="/faq" component={Faq} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/services" component={Services} />
      <Route exact path="/services/new" component={ServiceCreate} />
      <Route exact path="/services/me" component={UserServices} />
      <Route path="/services/:id" component={ServiceDetail} />
    </Switch>
  );
};

export default Routes;