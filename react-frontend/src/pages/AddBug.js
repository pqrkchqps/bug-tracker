import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CreateBugForm from '../components/CreateBugForm'
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import {logout} from '../actions/authActions'
import {
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
    const projectId = this.props.match.params.projectId;
    const bugId = this.props.match.params.bugId;
    return (
      <div>
        <Header />
        <Container>
          <CreateBugForm 
            projectId={projectId} 
            bugId={bugId}
          />
        </Container>
      </div>
    );
  }
}

const mapStateToProps= state => ({
});

export default connect(mapStateToProps, {logout})(AddBug)