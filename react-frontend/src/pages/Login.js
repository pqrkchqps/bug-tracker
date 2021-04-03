import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { Card, Logo, Form, Input, Button } from '../components/AuthForms';
import { Alert } from 'reactstrap';
import Header from '../components/Header'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'


const logoImg = process.env.PUBLIC_URL+"/logo192.png";

class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps){
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error){
      this.setState({msg: error.msg})
    }
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {email, password} = this.state;
    const user = {
      email,
      password
    }

    //attempt to login
    this.props.login(user)
  }

  render () {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      //return <Redirect to="/" />
    }

    return (
      <div>
        <Header />
        <Card>
          {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
          <Logo src={logoImg} />
          <Form>
            <Input
              type="email"
              name="email"
              placeholder="email"
              id="email"
              onChange={this.onChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="password"
              id="password"
              onChange={this.onChange}
            />
            <Button onClick={this.onSubmit}>Sign In</Button>
          </Form>
          <Link to="/signup">Don't have an account?</Link>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, {login, clearErrors})(Login);
