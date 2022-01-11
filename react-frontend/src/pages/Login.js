import React, {Component} from "react";
import { Link } from 'react-router-dom';
import { Card, Logo, Form, Input, Button } from '../components/AuthForms';
import { UncontrolledAlert } from 'reactstrap';
import Header from '../components/Header'
import { connect } from 'react-redux';
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'


const logoImg = process.env.PUBLIC_URL+"/logo192.png";

class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: null
  }

  componentDidUpdate(prevProps){
    const { error } = this.props;
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
    return (
      <div>
        <Header />
        <Card>
          {this.state.msg ? <UncontrolledAlert color="danger">{this.state.msg}</UncontrolledAlert> : null}
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
