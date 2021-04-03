import React, { Component, Fragment } from 'react';
import { Link, Redirect } from "react-router-dom";
import ProjectsList from '../components/ProjectsList'
import Header from '../components/Header'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap'
import {logout} from '../actions/authActions'
import {
  Alert
} from 'reactstrap'

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      msg: null
    }
  }
  
  onClickLogout = () => {
    this.props.logout()
  }

  componentDidUpdate(prevProps){
    const { error } = this.props;
    if(error !== prevProps.error){
      this.setState({msg: error.msg})
    }
  }

  render() {
     return (
      <div>
        <Header />                                    
        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
        <ProjectsList home="true"/>
      </div>
    );
  }
}

const mapStateToProps= state => ({
  error: state.error
});

export default connect(mapStateToProps, {logout})(Home)
