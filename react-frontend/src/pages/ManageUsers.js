import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import ProjectUsersList from '../components/ProjectUsersList'
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import {logout} from '../actions/authActions'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
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

  componentDidMount () {
    this.props.getAllUsers();
  }


  render() {
    console.log(this.props)
    const projectId = this.props.match.params.projectId;
    let {isAuthenticated, projectUsers, userId, users} = this.props;
    projectUsers = projectUsers.map(i => i.id)
    users = users.map(i => { return {key: i.name, value: i.email, id: i.id}})
    

    return (
      <div>
        <Header />
        {
          isAuthenticated && projectUsers.includes(userId) ? (
            <Container>
              <ReactSearchBox
                placeholder="type user's name to add"
                data={users}
                onSelect={u => {
                  this.props.addProjectUser(u.id, projectId)
                }}
                />
            </Container>
            ) : null
        }
        <ProjectUsersList projectId={projectId} />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  isAuthenticated: state.auth.isAuthenticated,
  projectUsers: state.project_users.projectUsers,
  userId: state.auth.user ? state.auth.user.id : null,
  users: state.user.users
});

export default connect(mapStateToProps, {getAllUsers, addProjectUser})(ManageUsers)
