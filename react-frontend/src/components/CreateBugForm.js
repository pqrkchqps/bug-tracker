import React from 'react'
import axios from 'axios';

class CreateBugForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      bugName: '',
      summary: '',
      severity: '',
      status: '',
      createdBy: '',
      assignedTo: '',
      version: '',
      timeEstimate: '',
      deadline: '',
      hoursWorked: '',
      percentComplete: ''
    }
  }
  bugNameChangeHandler = (e) => {
    this.setState({bugName: e.target.value});
  }
  summaryChangeHandler = (e) => {
    this.setState({summary: e.target.value});
  }
  severityChangeHandler = (e) => {
    this.setState({severity: e.target.value});
  }
  createdByChangeHandler = (e) => {
    this.setState({createdBy: e.target.value});
  }
  statusChangeHandler = (e) => {
    this.setState({status: e.target.value});
  }
  assignedToChangeHandler = (e) => {
    this.setState({assignedTo: e.target.value});
  }
  versionChangeHandler = (e) => {
    this.setState({version: e.target.value});
  }
  timeEstimateChangeHandler = (e) => {
    this.setState({timeEstimate: e.target.value});
  }
  deadlineChangeHandler = (e) => {
    this.setState({deadline: e.target.value});
  }
  hoursWorkedChangeHandler = (e) => {
    this.setState({hoursWorked: e.target.value});
  }
  percentCompleteChangeHandler = (e) => {
    this.setState({percentComplete: e.target.value});
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    const bug = this.state;
    axios.post('http://localhost:5000/api/bug', bug)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })
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
    return (
      <form id="create-bug-form" onSubmit={this.submitHandler}>
        <h3 className="title">Create A New Bug</h3>
        <div className="form-box">
          <label className="form-label">Bug Name</label>
          <input className="form-input" onChange={this.bugNameChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Summary</label>
          <input className="form-input" onChange={this.summaryChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Severity</label>
          <input className="form-input" onChange={this.severityChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Status</label>
          <input className="form-input" onChange={this.statusChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Created By</label>
          <input className="form-input" onChange={this.createdByChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Assigned To</label>
          <input className="form-input" onChange={this.assignedToChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Version Found In</label>
          <input className="form-input" onChange={this.versionChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Time Estimate</label>
          <input className="form-input" onChange={this.timeEstimateChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Deadline</label>
          <input className="form-input" onChange={this.deadlineChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Hours Worked</label>
          <input className="form-input" onChange={this.hoursWorkedChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Percent Complete</label>
          <input className="form-input" onChange={this.percentCompleteChangeHandler} type="text" />
        </div>
        <div className="form-box">
          <label className="form-label">Submit</label>
          <input className="form-input" type="submit" />
        </div>
      </form>
    )
  }
}

export default CreateBugForm;
