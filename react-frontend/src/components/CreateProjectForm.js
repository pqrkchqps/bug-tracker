import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {addProject} from '../actions/projectActions'
import { Redirect } from 'react-router-dom';

class CreateProjectForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      version: '',
      redirect: false,
    }
  }

  componentDidMount() {
    if (this.props.bugId !== "null") {
      this.props.getProjects(this.props.projectId);
    }
    this.props.getProjectUsers(this.props.projectId);
  }

  projectNameChangeHandler = (e) => {
    this.setState({name: e.target.value});
  }
  versionChangeHandler = (e) => {
    this.setState({version: e.target.value});
  }

  submitHandler = (e) => {
    e.preventDefault();
    const url = "https://api.cloudinary.com/v1_1/hqds0bho9/image/upload";

    const files = document.querySelector("[type=file]").files;
    let file = files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "urdfduv1");


    axios.post(url,formData)
    .then((data) => {
      console.log(data)
      const project = {...this.state, image_name: data.data.public_id};
      const {user} = this.props.auth;
      this.props.addProject(project);
      this.setState({redirect: true})
    });
  }
  /*
  Status and resolution - what state is the bug in (not even confirmed a bug to fix confirm)
  Assigned To, Created By
  Summary - a one-sentence summary of the problem
  Status whiteboard- place to add notes and tags to the bug
  Keywords to tag the bug for search?
  Version: The version of the software the bug was found in
  Severity: how important is the bug to fix
  CC list: A list of people who get mail when the bug changes
  Time Tracking: original estimate, current est, hours worked, % complete, deadline
  */
  render(){
    if (this.state.redirect){
      return <Redirect to="/projects" />
    }
    return (
      <form id="create-bug-form" onSubmit={this.submitHandler}>
        <h3 className="title">Create A New Project</h3>
        <div className="form-box">
          <label className="form-label">Project Name</label>
          <input className="form-input" onChange={this.projectNameChangeHandler} type="text" />
        </div>
        <input type="file" name="file" />
        <div className="form-box">
          <label className="form-label">Current Version</label>
          <input className="form-input" onChange={this.versionChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Submit</label>
          <input className="form-input" type="submit" />
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  project: state.project
})

export default connect(mapStateToProps, {addProject})(CreateProjectForm);
