import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Card, Logo, Form, Input, Button } from '../components/AuthForms';
import Header from '../components/Header'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import {
  FormGroup,
  Alert
} from 'reactstrap';


const logoImg = process.env.PUBLIC_URL+"/logo192.png";


class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if(error !== prevProps.error){
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({msg: error.msg.msg})
      } else {
        this.setState({msg: null})
      }
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("submitting new user")

    const { name, email, password } = this.state;

    const newUser = {
      name,
      email,
      password
    }

    //attempt to register
    this.props.register(newUser);
  }

  render() {
    return (
      <div>
        <Header />
        <Card>
          <Logo src={logoImg} />
          {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
              <Form>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button
                  color="dark
                  style={{marginTop: '2rem'}}"
                  block
                  onClick={this.onSubmit}>Signup</Button>
              </Form>
          <Link to="/login">Already have an account?</Link>
        </Card>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, {register, clearErrors})(Signup);
