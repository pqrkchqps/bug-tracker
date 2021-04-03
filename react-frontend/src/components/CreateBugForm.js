import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';
import {addBug, getBugs, editBug} from '../actions/bugActions'

class CreateBugForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      bug: {
        bug_name: '',
        summary: '',
        severity: '',
        status: '',
        created_by: '',
        assigned_to: '',
        version: '',
        time_estimate: '',
        deadline: '',
        hours_worked: '',
        percent_complete: '',
        id: "null"
      },
      stateLoaded: false
    }
  }

  componentDidMount() {
    if (this.props.bugId !== "null") {
      this.props.getBugs(this.props.projectId);
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
    if (this.props.bugId !== "null") {
      this.props.editBug(bug, this.props.projectId);
    } else {
      this.props.addBug(bug, this.props.projectId);
    }
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
    if (this.props.bugId !== "null") {
      const bugs = this.props.bug['bugs_'+this.props.projectId];
      if (!this.state.stateLoaded && bugs){
        const bug = bugs.filter(bug => bug.id == this.props.bugId)
        console.log("bugs: ",bugs)
        console.log("bug: ",bug[0], this.props.bugId)
        this.setState({bug: {...this.state.bug, ...bug[0]}, stateLoaded: true});
      }
    }

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
            name="bug_name"
            id="bug_name"
            value={this.state.bug.bug_name}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Summary</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="summary"
            id="summary"
            value={this.state.bug.summary}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Severity</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text"
            name="severity"
            id="severity"
            value={this.state.bug.severity}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Status</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="status"
            id="status"
            value={this.state.bug.status}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Created By</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="created_by"
            id="created_by"
            value={this.state.bug.created_by}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Assigned To</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="assigned_to"
            id="assigned_to"
            value={this.state.bug.assigned_to}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Version Found In</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="version"
            id="version"
            value={this.state.bug.version}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Time Estimate</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="time_estimate"
            id="time_estimate"
            value={this.state.bug.time_estimate}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Deadline</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="deadline"
            id="deadline"
            value={this.state.bug.deadline}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Hours Worked</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="hours_worked"
            id="hours_worked"
            value={this.state.bug.hours_worked}
          />
        </div>
        <div className="form-box">
          <label className="form-label">Percent Complete</label>
          <input className="form-input" 
            onChange={this.onChangeHandler} 
            type="text" 
            name="percent_complete"
            id="percent_complete"
            value={this.state.bug.percent_complete}
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

export default connect(mapStateToProps, {addBug, editBug, getBugs})(CreateBugForm);
