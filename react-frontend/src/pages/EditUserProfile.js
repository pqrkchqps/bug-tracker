import React, {Component} from "react";
import { Link } from 'react-router-dom';
//import { Card, Form, Input, Button } from '../components/AuthForms';
import { UncontrolledAlert, Card, Form, Input, Button, Label } from 'reactstrap';
import Header from '../components/Header'
import { connect } from 'react-redux';
import { clearErrors } from '../actions/errorActions'
import { getAllUsers, updateUserInfo } from "../actions/userActions";


class EditUserProfile extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    msg: null
  }

  componentDidMount() {
   this.props.getAllUsers();
   const {currentUser} = this.props;
   const {name, email} = currentUser;
   this.setState({
    name,
    email
   })
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

    const {name, email, password} = this.state;
    const user = {
      name,
      email,
      password
    }

    //attempt to login
    this.props.updateUserInfo(user)
  }

  render () {
    const {currentUser} = this.props;
    console.log(currentUser)
    return (
      <div>
        <Header />
        <Card className="profile-form">
          {this.state.msg ? <UncontrolledAlert color="danger">{this.state.msg}</UncontrolledAlert> : null}
          <Form> 
            <div className="flex-row profile-info-container">
              <Label for="name" className="profile-info-label">Name</Label>
              <Input
                type="text"
                name="name"
                value={this.state.name}
                id="name"
                onChange={this.onChange}
              />
            </div>
            <div className="flex-row profile-info-container">
              <Label for="email" className="profile-info-label">Email</Label>
              <Input
                type="email"
                name="email"
                value={this.state.email}
                id="email"
                onChange={this.onChange}
              />
            </div>
            <div className="flex-row profile-info-container">
              <Label for="password" className="profile-info-label">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={this.onChange}
              />
            </div>
            <div className="flex-row profile-info-container bottom-profile-info-container">
              <Button onClick={this.onSubmit}>Submit</Button>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.auth.user,
    error: state.error
})

export default connect(mapStateToProps, {getAllUsers, clearErrors, updateUserInfo})(EditUserProfile);