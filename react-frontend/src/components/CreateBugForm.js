import React from 'react';
import {connect} from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import {addBug, getBugs, editBug} from '../actions/bugActions'
import {getProjectUsers} from '../actions/projectUsersActions'
import { AiFillCloseCircle } from 'react-icons/ai';
import { FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import {Collapse} from 'react-collapse';
import { DateTimePicker } from "@material-ui/pickers";
import { Progress, Alert } from 'reactstrap';


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
      stateLoaded: false,
      showDescription: false,
      Alertvisible: false,
      isBugAdded: false,
      hasBeenEdited: false,
      shouldRedirect: false,
      alertTimeout: null
    }
  }

  componentDidMount() {
    if (this.props.bugId !== "null") {
      this.props.getBugs(this.props.projectId);
    }
    this.props.getProjectUsers(this.props.projectId);
  }

  onCloseHandler = (e) => {
    if (this.state.hasBeenEdited && !this.state.bug.bug_name){
      this.setState({
        Alertvisible: true, 
        alertColor: 'danger', 
        message: 'Please Enter A Name For This Bug'},
        
        ()=> {
          this.state.alertTimeout && this.state.alertTimeout.clearTimeout && this.state.alertTimeout.clearTimeout();
          this.setState({alertTimeout: window.setTimeout(()=>{this.setState({Alertvisible:false})},3000)})
      });
    } else {
      this.setState({shouldRedirect: true})
    }
  }

  onChangeHandler = (e) => {
    const bug = {...this.state.bug, [e.target.name]: e.target.value}
    this.saveBug(bug);
  }
  
  onChangeHandlerDeadline = (date) => {
    console.log(date);
    const bug = {...this.state.bug, deadline: date}
    this.saveBug(bug);
  }

  toggleDescription = (e) => {
    this.setState({showDescription: !this.state.showDescription});
    console.log(this.state);
  }

  saveBug = (bug) => {
    console.log(this.state, bug);
    if (this.state.bug.id !== "null" || this.props.bugId !== "null") {
      this.props.editBug(bug, this.props.projectId);
    } else {
      if (!this.state.isBugAdded){
        this.setState({isBugAdded: true})
        this.props.addBug(bug, this.props.projectId);
      }
    }
    this.setState({
      bug,      
      Alertvisible: true, 
      alertColor: 'success', 
      message: 'Bug Saved',
      hasBeenEdited: true},
      
      ()=> {
        this.state.alertTimeout && this.state.alertTimeout.clearTimeout && this.state.alertTimeout.clearTimeout();
        this.setState({alertTimeout: window.setTimeout(()=>{this.setState({Alertvisible:false})},3000)})
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
    const lastAddedBug = this.props.bug.lastAddedBug;
    const bugs = this.props.bug['bugs_'+this.props.projectId] || [];
    let bug = bugs.filter(bug => bug.id == this.props.bugId);
    bug = bug.length ? bug[0] : null;

    if (this.props.bugId !== "null" && !this.state.stateLoaded && bug){
      this.setState({bug: {...this.state.bug, ...bug}, stateLoaded: true});
    } else if (this.state.bug.id === "null" && this.state.isBugAdded && lastAddedBug !== null) {
      this.setState({bug: {...this.state.bug, id: lastAddedBug.id, created_by: lastAddedBug.created_by}, stateLoaded: true, isBugAdded: false});
    }

    const projectUsers = this.props.projectUsers;
    const projectUserNames = projectUsers.map(user => user.name);
    console.log(projectUserNames)

    if (this.state.shouldRedirect){
      return <Redirect to={"/projects/"+this.props.projectId} ></Redirect>
    }

    return (
      <form id="create-bug-form" >
        <div className="detail-title-sticky">
          <Alert color={this.state.alertColor} isOpen={this.state.Alertvisible} toggle={(e) => this.setState({Alertvisible: false})}> {this.state.message} </Alert>
          <div className="title-top-container">
            <textarea 
                onChange={this.onChangeHandler} 
                type="text" 
                name="bug_name"
                id="bug_name"
                value={this.state.bug.bug_name}
            />
            <div className="title-top-buttons">
              <Link onClick={this.onCloseHandler}>
                <AiFillCloseCircle className="title-top-button" size="50px" />
              </Link>
            </div>
          </div>
          <div className="title-bottom">
            <p className="created_by">{"By "+this.state.bug.created_by}</p>
          </div>
        </div>
        <div className="form-box">
          <label className="form-label">Status</label>
          <select className="form-input" 
            onChange={this.onChangeHandler}  
            name="status"
            id="status"
            value={this.state.bug.status}
          >
            <option value="---">---</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="form-box">
          <div className="flex-row">
            {!this.state.showDescription ? <FiArrowDownCircle className="hide-show-button bright-button" onClick={this.toggleDescription}/> : null}
            {this.state.showDescription ? <FiArrowUpCircle className="hide-show-button bright-button" onClick={this.toggleDescription}/> : null}
            <label className="form-label-header">Description</label>
          </div>
          <Collapse isOpened={this.state.showDescription}>
            <TextareaAutosize className="form-input" 
              onChange={this.onChangeHandler}  
              name="summary"
              id="summary"
              value={this.state.bug.summary}
            />
          </Collapse>
        </div>
        <div className="form-box">
          <label className="form-label-header">Bug Information</label>
          <div className="flex-row bug-info-container">
            <label className="bug-info-label">Assigned To</label>
            <select className="bug-info-input" 
              onChange={this.onChangeHandler}  
              name="assigned_to"
              id="assigned_to"
              value={this.state.bug.assigned_to}
            >
              <option key={-99} value="---">---</option>
              <option key={-1} value="None">None</option>
              {projectUserNames.map((name, index) => <option key={index} value={name}>{name}</option>)}
            </select>
          </div>
          <div className="flex-row">
            <div className="flex-row bug-info-container">
              <label className="bug-info-label">Deadline</label>
              <div className="bug-info-input">
                <DateTimePicker
                  onChange={this.onChangeHandlerDeadline}  
                  name="deadline"
                  id="deadline"
                  value={this.state.bug.deadline ? this.state.bug.deadline : null }
                />
              </div>
            </div>
            <div className="flex-row bug-info-container">
              <label className="bug-info-label">Status</label>
              <select className="bug-info-input" 
                onChange={this.onChangeHandler}  
                name="status"
                id="status"
                value={this.state.bug.status}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="flex-row">
            <div className="flex-row bug-info-container">
              <label className="bug-info-label">Severity</label>
              <select className="bug-info-input"
                onChange={this.onChangeHandler}  
                name="severity"
                id="severity"
                value={this.state.bug.severity}
              >
                <option key={-99} value="---">---</option>
                <option value="None">None</option>
                <option value="Minor">Minor</option>
                <option value="Major">Major</option>
                <option value="Critical">Critical</option>
                <option value="Explosive">Explosive</option>
              </select>
            </div>
            <div className="flex-row bug-info-container">
              <label className="bug-info-label">Version (in)</label>
              <input className="bug-info-input" 
                onChange={this.onChangeHandler} 
                type="text" 
                name="version"
                id="version"
                value={this.state.bug.version}
              />
            </div>
          </div>
          <div className="flex-row">
            <div className="flex-row bug-info-container">
              <label className="bug-info-label">Time Estimate</label>
              <input className="bug-info-input" 
                onChange={this.onChangeHandler} 
                type="number"
                min="0"
                step="any"
                name="time_estimate"
                id="time_estimate"
                value={this.state.bug.time_estimate}
              />
            </div>
            <div className="flex-row bug-info-container">
              <label className="bug-info-label">Hours Worked</label>
              <input className="bug-info-input" 
                onChange={this.onChangeHandler} 
                type="number"
                min="0"
                step="any" 
                name="hours_worked"
                id="hours_worked"
                value={this.state.bug.hours_worked}
              />
            </div>
          </div>
        </div>
        <div className="form-box">
          <label className="form-label">Percent Complete</label>
          <Progress value={bug && bug.percent_complete}>
            {bug && bug.percent_complete}
          </Progress>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  bug: state.bug,
  projectUsers: state.project_users.projectUsers
})

export default connect(mapStateToProps, {addBug, editBug, getBugs, getProjectUsers})(CreateBugForm);
