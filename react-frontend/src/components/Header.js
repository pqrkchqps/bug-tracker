import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
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

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  onClickLogout = () => {
    this.props.logout()
  }

  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}`: ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Button><Link to="/projects">Your Projects</Link></Button>
        </NavItem>
        <NavItem>
          <Button onClick={this.onClickLogout}>Logout</Button>
        </NavItem>
      </Fragment>
    )

    const guestLinks = (
        <Fragment>
          <NavItem>
            <Link to="/login">Login</Link>
          </NavItem>
        </Fragment>
    )

    return (
        <Navbar color="dark" dark expand="sm" className="mb-3">
            <Container>
            <NavbarBrand href="/">Dreamer Assist</NavbarBrand>
            <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
            </Nav>
            </Container>
        </Navbar>
    );
  }
}

const mapStateToProps= state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(Header)