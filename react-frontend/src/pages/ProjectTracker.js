import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import CreateBugForm from '../components/CreateBugForm'
import BugsList from '../components/BugsList'
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import {logout} from '../actions/authActions'
import {getProjectUsers} from '../actions/projectUsersActions'

import {
  Alert,
  Container
} from 'reactstrap'

class ProjectTracker extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    project_users: PropTypes.array,
    user_id: PropTypes.number
  }

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
    const {isAuthenticated, projectUsers, userId} = this.props;
    let currentProjectUser = projectUsers.filter(i => i.id === userId)
    currentProjectUser = currentProjectUser.length > 0 ? currentProjectUser[0] : currentProjectUser
    console.log(currentProjectUser)
    return (
      <div>
        <Header />
        <Container>
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        {
          isAuthenticated && currentProjectUser.add_bugs ? (
            <Button ><Link to={"/projects/"+this.props.match.params.id+"/add/null"}>Add Bug</Link></Button>    
            ) : null
        }
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
