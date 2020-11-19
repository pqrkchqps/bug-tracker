import React, {Component} from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Projects from '../pages/Projects';
import ProjectTracker from '../pages/ProjectTracker';
import {connect} from 'react-redux';

class RedirectRouter extends Component {
  render(){
    const {isAuthenticated} = this.props.auth;
    return (
      <Router>
        <div>
          <Switch>
            {<Route path="/projects/:id" component={ProjectTracker} />}
            {isAuthenticated?<Route exact path="/projects" component={Projects} />:<Route path="/projects" component={Login} />}
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
