import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {addBug} from '../actions/bugActions'

class CreateBugForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      bug: {
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
      },
      redirect: false
    }
  }
  onChangeHandler = (e) => {
    this.setState({bug: {...this.state.bug, [e.target.name]: e.target.value}});
    console.log(this.state);
  }

  submitHandler = (e) => {
    e.preventDefault();
    const bug = this.state.bug;
    console.log(this.props, bug);
    this.props.addBug(bug, this.props.projectId);
    this.setState({redirect: true})
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
      return <Redirect to={"/projects/"+this.props.projectId} />
    }
    return (
      <form id="create-bug-form" onSubmit={this.submitHandler}>
        <h3 className="title">Create A New Bug</h3>
        <div className="form-box">
          <label className="form-label">Bug Name</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="bugName"
            id="bugName"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Summary</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="summary"
            id="summary"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Severity</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text"
            name="severity"
            id="severity"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Status</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="status"
            id="status"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Created By</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="createdBy"
            id="createdBy"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Assigned To</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="assignedTo"
            id="assignedTo"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Version Found In</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="version"
            id="version"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Time Estimate</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="timeEstimate"
            id="timeEstimate"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Deadline</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="deadline"
            id="deadline"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Hours Worked</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="hoursWorked"
            id="hoursWorked"
          />
        </div>
        <div className="form-box">
          <label className="form-label">Percent Complete</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="percentComplete"
            id="percentComplete"
          />
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
  bug: state.bug
})

export default connect(mapStateToProps, {addBug})(CreateBugForm);
