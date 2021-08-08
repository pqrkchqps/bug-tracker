import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import CreateBugForm from '../components/CreateBugForm'
import BugsList from '../components/BugsList.js'
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import {logout} from '../actions/authActions'
import {getProjectUsers} from '../actions/projectUsersActions'

import {
  UncontrolledAlert,
  Container
} from 'reactstrap'

class ProjectTracker extends Component {
  state = {
    msg: null
  }

  onClickLogout = () => {
    this.props.logout()
  }

  componentDidMount () {
    this.props.getProjectUsers(this.props.match.params.id);
  }

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error){
      this.setState({msg: error.msg})
    }
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
        {this.state.msg ? <UncontrolledAlert color="danger">{this.state.msg}</UncontrolledAlert> : null}
        </Container>
        <BugsList projectId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  isAuthenticated: state.auth.isAuthenticated,
  projectUsers: state.project_users.projectUsers,
  userId: state.auth.user ? state.auth.user.id : null,
  error: state.error
});

export default connect(mapStateToProps, {logout, getProjectUsers})(ProjectTracker)
