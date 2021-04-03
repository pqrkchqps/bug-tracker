import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ProjectsList from '../components/ProjectsList'
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../actions/authActions'
import {
  Button,
  UncontrolledAlert,
  Container
} from 'reactstrap'

class UserProjects extends Component {
  constructor(props){
    super(props)
    this.state = {
      msg: null
    }
  }
  
  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error){
      this.setState({msg: error.msg})
    }
  }

  onClickLogout = () => {
    this.props.logout()
  }

  render() {
    const {isAuthenticated} = this.props;
    
    return (
      <div>
        <Header />
        <Container>
          {this.state.msg ? <UncontrolledAlert color="danger">{this.state.msg}</UncontrolledAlert> : null}
          { isAuthenticated ? <Button ><Link to="/projects/add">Add Project</Link></Button> : null }
        </Container>
        <ProjectsList />
      </div>
    );
  }
}

const mapStateToProps= state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, {logout})(UserProjects)
