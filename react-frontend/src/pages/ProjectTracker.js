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
              <Button ><Link to={"/projects/"+this.props.match.params.id+"/add"}>Add Bug</Link></Button>
            </Container>
            : null
        }
        <BugsList projectId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {logout})(ProjectTracker)
