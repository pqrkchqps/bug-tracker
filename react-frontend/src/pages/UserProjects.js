import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ProjectsList from '../components/ProjectsList'
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../actions/authActions'
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap'

class UserProjects extends Component {
  constructor(props){
    super(props)
    this.state = {
      isRedirect: false
    }
  }
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  onClickLogout = () => {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <Header />
        {
          this.props.auth.isAuthenticated ?
            <Container>
              <Button ><Link to="/projects/add">Add Project</Link></Button>
            </Container>
            : null
        }
        <ProjectsList />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(UserProjects)
