import React from 'react'
//import Component from 'react'

class CreateBugForm extends React.Component {
  constructor(props){
    super(props);

    //this.state
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
      <form id="create-bug-form">
        <h3 class="title">Create A New Bug</h3>
        <div class="form-box">
          <label class="form-label">Bug Name</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Summary</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Severity</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Status</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Created By</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Assigned To</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Version Found In</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Time Estimate</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Deadline</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Hours Worked</label>
          <input class="form-input" type="text" />
        </div>
        <div class="form-box">
          <label class="form-label">Percent Complete</label>
          <input class="form-input" type="text" />
        </div>
      </form>
    )
  }
}

export default CreateBugForm;
