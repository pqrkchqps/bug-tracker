import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import CreateBugForm from '../components/CreateBugForm'
import BugsList from '../components/BugsList'
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

class ProjectTracker extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    project_users: PropTypes.array,
    user_id: PropTypes.number
  }

  onClickLogout = () => {
    this.props.logout()
  }

  render() {
    const {isAuthenticated, project_users, user_id} = this.props;

    return (
      <div>
        <Header />
        {
          isAuthenticated && project_users.includes(user_id) ? (
            <Container>
              <Button ><Link to={"/projects/"+this.props.match.params.id+"/add"}>Add Bug</Link></Button>
            </Container>
            ) : null
        }
        <BugsList projectId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  isAuthenticated: state.auth.isAuthenticated,
  project_users: state.bug.project_users,
  user_id: state.auth.user ? state.auth.user.id : null
});

export default connect(mapStateToProps, {logout})(ProjectTracker)
