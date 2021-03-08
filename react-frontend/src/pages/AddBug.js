import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CreateBugForm from '../components/CreateBugForm'
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

class AddBug extends Component {
  constructor(props){
    super(props)
  }

  onClickLogout = () => {
    this.props.logout()
  }

  render() {
    return (
      <div>
        <Header />
        <Container>
          <Button >
            <Link to={"/projects/"+this.props.match.params.projectId}>
              Return To Project Tracker
            </Link>
          </Button>
        </Container>
        <CreateBugForm 
          projectId={this.props.match.params.projectId} 
          bugId={this.props.match.params.bugId}
        />
      </div>
    );
  }
}

const mapStateToProps= state => ({
});

export default connect(mapStateToProps, {logout})(AddBug)