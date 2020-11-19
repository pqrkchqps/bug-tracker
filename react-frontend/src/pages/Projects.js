import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CreateProjectForm from '../components/CreateProjectForm'
import ProjectsList from '../components/ProjectsList'
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

class Projects extends Component {
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
    const { user } = this.props.auth
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}`: ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Button onClick={this.onClickLogout}>Logout</Button>
        </NavItem>
        <NavItem>
          <Link to="/projects">Projects Page</Link>
        </NavItem>
      </Fragment>
    )
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">DreamerAssist.fund</NavbarBrand>
            <Nav className="ml-auto" navbar>
              {authLinks}
            </Nav>
          </Container>
        </Navbar>
        <ProjectsList />
        <CreateProjectForm />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(Projects)
