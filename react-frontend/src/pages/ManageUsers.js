import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import ProjectUsersList from '../components/ProjectUsersList'
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import {logout} from '../actions/authActions'
import {
  UncontrolledAlert,
  Container
} from 'reactstrap'
import ReactSearchBox from 'react-search-box'
import {getAllUsers} from '../actions/userActions'
import {addProjectUser} from '../actions/projectUsersActions'


class ManageUsers extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    project_users: PropTypes.array,
    user_id: PropTypes.number
  }
  state = {
    msg: null
  }

  componentDidMount () {
    this.props.getAllUsers();
  }

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error){
      this.setState({msg: error.msg})
    }
  }


  render() {
    console.log(this.props)
    const projectId = this.props.match.params.projectId;
    let {isAuthenticated, projectUsers, userId, users} = this.props;
    let currentProjectUser = projectUsers.filter(i => i.id === userId)
    currentProjectUser = currentProjectUser.length > 0 ? currentProjectUser[0] : currentProjectUser
    users = users.map(i => { return {key: i.name, value: i.email, id: i.id}})
    

    return (
      <div>
        <Header />
          <Container>
            {this.state.msg ? <UncontrolledAlert color="danger">{this.state.msg}</UncontrolledAlert> : null}
            {
              isAuthenticated && currentProjectUser.add_users ? (
                <ReactSearchBox
                  placeholder="type user's name to add"
                  data={users}
                  onSelect={u => {
                    this.props.addProjectUser(u.id, projectId)
                  }}
                  />
                ) : null
            }
          </Container>
        <ProjectUsersList projectId={projectId} />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  isAuthenticated: state.auth.isAuthenticated,
  projectUsers: state.project_users.projectUsers,
  userId: state.auth.user ? state.auth.user.id : null,
  users: state.user.users,
  error: state.error
});

export default connect(mapStateToProps, {getAllUsers, addProjectUser})(ManageUsers)
