import React, {Component} from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import UserProjects from '../pages/UserProjects';
import AddProject from '../pages/AddProject';
import AddBug from '../pages/AddBug';
import ProjectTracker from '../pages/ProjectTracker';
import ManageUsers from '../pages/ManageUsers';
import {connect} from 'react-redux';

class RedirectRouter extends Component {
  render(){
    const {isAuthenticated} = this.props.auth;
    return (
      <Router>
        <div>
          <Switch>
            {isAuthenticated?<Route path="/projects/add" component={AddProject} />:<Route path="/projects/add" component={Login} />}
            {isAuthenticated?<Route path="/projects/:projectId/add/:bugId" component={AddBug} />:<Route path="/projects/:projectId/add/:bugId" component={Login} />}
            {<Route path="/projects/:id" component={ProjectTracker} />}
            {isAuthenticated?<Route exact path="/projects" component={UserProjects} />:<Route path="/projects" component={Login} />}
            {isAuthenticated?<Route exact path="/projects_users/:projectId" component={ManageUsers} />:<Route path="/projects_users/:projectId" component={Login} />}
            {isAuthenticated?<Route path="/login" component={Home} />:<Route path="/login" component={Login} />}
            {isAuthenticated?<Route path="/signup" component={Home} />:<Route path="/signup" component={Signup} />}
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, {})(RedirectRouter);
