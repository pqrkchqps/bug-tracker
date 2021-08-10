import React, {Component, Fragment} from 'react'
import { Col, Row, Container, Button, Progress, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux'
import {getBugs, editBug, deleteBug} from '../actions/bugActions'
import {getProjectUsers} from '../actions/projectUsersActions'
import ReactDataGrid, {SelectColumn} from "react-data-grid";
import BugStatus from './bug/Status';
import BugAssignedTo from './bug/AssignedTo';
import BugDeadline from './bug/Deadline';
import BugSeverity from './bug/Severity';
import BugVersionIn from './bug/VersionIn';
import BugHoursWorked from './bug/HoursWorked';
import BugTimeEstimate from './bug/TimeEstimate';

class BugsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedRows:  new Set(),
      sortColumns: [],
      isDeadlinePopupOpen: false,
      isSeverityPopupOpen: false,
      isAssignedToPopupOpen: false,
      isStatusPopupOpen: false,
      isTimeEstimatePopupOpen: false,
      isHoursWorkedPopupOpen: false,
      isViewsDropdownOpen: false
    }
  }

  componentDidMount(){
    this.props.getBugs(this.props.projectId);
    this.props.getProjectUsers(this.props.projectId);
  }

  onDeadlineSelect = (date) => {
    this.state.selectedRows.forEach(row => {
      const bug = {...row, deadline: date}
      this.props.editBug(bug, this.props.projectId);
    })
    this.setState({isDeadlinePopupOpen: false})
  }

  onGenericSelectValueForRows = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    
    this.updateSelectedRows(name, value)
    this.resetSelectedRows()
  }

  onGenericSubmit = (e) => {
    const value = e.currentTarget.children[0].value
    const name = e.currentTarget.children[0].name

    this.updateSelectedRows(name, value)
    this.resetSelectedRows()
  }

  updateSelectedRows = (name, value) => {
    this.state.selectedRows.forEach(row => {
      const bug = {...row, [name]: value}
      this.props.editBug(bug, this.props.projectId);
    })
  }

  resetGroupSelectButtons = (popupOpenStates) => {
    const states = popupOpenStates ? popupOpenStates : []
    
    this.setState({
      isDeadlinePopupOpen: false, 
      isSeverityPopupOpen: false, 
      isAssignedToPopupOpen: false, 
      isStatusPopupOpen: false,
      isVersionPopupOpen: false,
      isTimeEstimatePopupOpen: false,
      isHoursWorkedPopupOpen: false,
      ...states
    })
  }

  resetSelectedRows = () => {
    this.resetGroupSelectButtons()
    this.setState({
      selectedRows: new Set()})
  }

  onDeleteClick = (e) => {
    this.state.selectedRows.forEach(row => {
      this.props.deleteBug(row.id, this.props.projectId);
    })
    this.setState({selectedRows: new Set()})
  }

  deadlineClickPopup = (e) => {
    e.preventDefault()
    this.setState({isDeadlinePopupOpen: !this.state.isDeadlinePopupOpen})
  }

  onGenericSelectValueForRowsGroupButtonPopup = (e) => {
    e.preventDefault()
    const isButtonOn = this.state[e.target.name]
    if (!isButtonOn) {
      let buttonToOpen = []
      buttonToOpen[e.target.name] = true
      this.resetGroupSelectButtons(buttonToOpen)
    } else {
      this.resetGroupSelectButtons()
    }
  }

  onGenericToggle = (e) => {
    e.preventDefault()
    const name = e.target.name
    const isButtonOn = this.state[name]
    this.setState({[name]: !isButtonOn})
  }

  onSelectViewDropdown = (e) => {
    e.preventDefault()
    const name = e.target.name
    console.log("eee", name)
    this.setState({view: name, isViewsDropdownOpen: false})
    this.resetSelectedRows()
  }
  

  rowKeyGetter = (row) => {
    return row;
  }

  getComparator(sortColumn) {
    switch (sortColumn) {
      case 'bug_name':
      case 'summary':
      case 'deadline':
      case 'version':
        return (a, b) => {
          return a[sortColumn].localeCompare(b[sortColumn]);
        };
      case 'assigned_to':
        return (a, b) => {
          const ab = [a,b]
          for (var i= 0; i < 2; i++)
          switch (ab[i][sortColumn]){
            case '---':
              this[i+"Num"] = "aaaaaaaaaaaaaa";
              break;
            case 'None':
              this[i+"Num"] = "aaaaaaaaaaaaab";
              break;
            default:
              this[i+"Num"] = ab[i][sortColumn];
          }
          return this["0Num"].localeCompare(this["1Num"])
        }
      case 'severity':
        return (a, b) => {
          const ab = [a,b]
          for (var i= 0; i < 2; i++)
          switch (ab[i][sortColumn]){
            case '---':
              this[i+"Num"] = 1;
              break;
            case 'None':
              this[i+"Num"] = 2;
              break;
            case 'Minor':
              this[i+"Num"] = 3;
              break;
            case 'Major':
              this[i+"Num"] = 4;
              break;
            case 'Critical':
              this[i+"Num"] = 5;
              break;
            case 'Explosive':
              this[i+"Num"] = 6;
              break;
            default:
              this[i+"Num"] = 0;
          }
          return this["0Num"] - this["1Num"]
        }
      case 'status':
        return (a, b) => {
          const ab = [a,b]
          for (var i= 0; i < 2; i++)
          switch (ab[i][sortColumn]){
            case '---':
              this[i+"Num"] = 1;
              break;
            case 'Open':
              this[i+"Num"] = 2;
              break;
            case 'In Progress':
              this[i+"Num"] = 3;
              break;
            case 'Closed':
              this[i+"Num"] = 4;
              break;
            default:
              this[i+"Num"] = 0;
          }
          return this["0Num"] - this["1Num"]
        }
      case 'created_by_id':
      case 'time_estimate':
      case 'hours_worked':
      case 'percent_complete':
        return (a, b) => {
          return a[sortColumn] - b[sortColumn];
        };
      default:
        throw new Error(`unsupported sortColumn: "${sortColumn}"`);
    }
  }

  render() {
    let {isAuthenticated, projectUsers, userId, projectId} = this.props;
    
    const projectUserNames = projectUsers.map(user => user.name);
    let currentProjectUser = projectUsers.filter(i => i.id === userId)[0]

    let bugs = this.props.bug['bugs_'+projectId];
    if (bugs === undefined) {
      bugs = [];
    }
    else { 
      switch (this.state.view){
        case "All Open":
          bugs = bugs.filter(bug => bug.status === "Open")
          break;
        case "All Closed":
          bugs = bugs.filter(bug => bug.status === "Closed")
          break;
      }
    }

    
    console.log("currentProjectUser:",currentProjectUser)
    console.log("userId:", userId);
    console.log("selectedRows:", this.state.selectedRows.values());

    const sortColumns = this.state.sortColumns;
    const sortedBugs = bugs.sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = this.getComparator(sort.columnKey);
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });

    const BugNameCellFormatter = ( {row} ) => {
      console.log(row)
      const {bug_name, id, created_by_id} = row;
      if (isAuthenticated && currentProjectUser && (currentProjectUser.edit_bugs || (currentProjectUser.edit_own_bugs && created_by_id === userId))) {
        return (
          <Link to={"/projects/"+projectId+"/add/"+id}>
            {bug_name}
          </Link>
        )
      }
      return bug_name;
    };

    const PercentCellFormatter = ( {row} ) => {
      const {percent_complete} = row;
      return (
        <Progress style={{marginTop:"15px"}} value={percent_complete}>
          {percent_complete}
        </Progress>
      )
    }

    let columns = [
      SelectColumn,
      { key: "bug_name", name: "Bug Name",  width: 200, formatter: BugNameCellFormatter },
      { key: "summary", name: "Summary", width: 300},
      { key: "deadline", name: "Deadline", width: 200},
      { key: "severity", name: "Severity", width: 100},
      { key: "assigned_to", name: "Assigned To", width: 100},
      { key: "status", name: "Status", width: 100},
      { key: "version", name: "Version (In)", width: 100},
      { key: "time_estimate", name: "Time Estimate", width: 50},
      { key: "hours_worked", name: "Hours Worked", width: 50},
      { key: "percent_complete", name: "Percent", width: 'auto', formatter: PercentCellFormatter }
    ];

    let isOwnSelectedRows = true;
    this.state.selectedRows.forEach(row => {
      if (row.created_by_id !== userId){
        isOwnSelectedRows = false
      }
    })

    return (  
      <Container fluid={true}>
        <TransitionGroup className="bugs-list">
          <Row>
            <Col>
              <ButtonDropdown isOpen={this.state.isViewsDropdownOpen} toggle={this.onGenericToggle}>
                <DropdownToggle name="isViewsDropdownOpen"  caret>
                  Views
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.onSelectViewDropdown} name="All">All</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onSelectViewDropdown} name="All Open">All Open</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onSelectViewDropdown} name="All Closed">All Closed</DropdownItem>
                </DropdownMenu>

              </ButtonDropdown>
            </Col>
            <Col className="text-right">
            { isAuthenticated && currentProjectUser && currentProjectUser.add_bugs ? (
                <Button ><Link to={"/projects/"+this.props.projectId+"/add/null"}>Add Bug</Link></Button>    
                ) : null
            }
            </Col>
          </Row>
          {(this.state.selectedRows.size !==0) ? (
            <div>
              <Row>
              {(isAuthenticated && currentProjectUser && (currentProjectUser.edit_bugs || (currentProjectUser.edit_own_bugs && isOwnSelectedRows))) && 
                <Fragment>
                  <Col md="1">
                    <Button name="isDeadlinePopupOpen" onClick={this.onGenericSelectValueForRowsGroupButtonPopup}>Deadline</Button>
                  </Col>
                  <Col md="1">
                    <Button name="isSeverityPopupOpen" onClick={this.onGenericSelectValueForRowsGroupButtonPopup}>Severity</Button>
                  </Col>
                  <Col md="1">
                    <Button name="isAssignedToPopupOpen" onClick={this.onGenericSelectValueForRowsGroupButtonPopup}>Assigned To</Button>
                  </Col>
                  <Col md="1">
                    <Button name="isStatusPopupOpen" onClick={this.onGenericSelectValueForRowsGroupButtonPopup}>Status</Button>
                  </Col>
                  <Col md="1">
                    <Button name="isVersionPopupOpen" onClick={this.onGenericSelectValueForRowsGroupButtonPopup}>Version</Button>
                  </Col>
                  <Col md="1">
                    <Button name="isTimeEstimatePopupOpen" onClick={this.onGenericSelectValueForRowsGroupButtonPopup}>Time Estimate</Button>
                  </Col>
                  <Col md="1">
                    <Button name="isHoursWorkedPopupOpen" onClick={this.onGenericSelectValueForRowsGroupButtonPopup}>Hours Worked</Button>
                  </Col>
                </Fragment>
              }
              { (isAuthenticated && currentProjectUser && currentProjectUser.remove_bugs) ? (
                <Col md="1">
                  <Button className="remove-btn" color="danger"
                    onClick={this.onDeleteClick}>
                    Remove
                  </Button>
                </Col>
              ) : null}
            </Row>
            <Row style={{width:"500px"}}>
              {this.state.isDeadlinePopupOpen &&
                <Col>
                  <BugDeadline onChangeHandler={this.onDeadlineSelect} defaultToNow={true}/>
                </Col>
              }
              {this.state.isSeverityPopupOpen &&
                <Col>
                  <BugSeverity onChangeHandler={this.onGenericSelectValueForRows} />
                </Col>
              }
              {this.state.isStatusPopupOpen &&
                <Col>
                  <BugStatus onChangeHandler={this.onGenericSelectValueForRows} />
                </Col>
              }
              {this.state.isAssignedToPopupOpen &&
                <Col>
                  <BugAssignedTo onChangeHandler={this.onGenericSelectValueForRows} projectUserNames={projectUserNames} />
                </Col>
              }
              {this.state.isVersionPopupOpen &&
                <Col>
                  <BugVersionIn onSubmit={this.onGenericSubmit} />
                </Col>
              }
              {this.state.isTimeEstimatePopupOpen &&
                <Col>
                  <BugTimeEstimate onSubmit={this.onGenericSubmit} />
                </Col>
              }
              {this.state.isHoursWorkedPopupOpen &&
                <Col>
                  <BugHoursWorked onSubmit={this.onGenericSubmit} />
                </Col>
              }
            </Row>
          </div> 
          ) : <div></div>}
          <ReactDataGrid
            rows={sortedBugs}
            columns={columns}
            rowHeight={50}
            style={{height: (bugs.length+1)*50+20}}
            headerRowHeight={50}
            enableCellAutoFocus={false}
            defaultColumnOptions={{
              sortable: true,
              resizable: true
            }}
            rowKeyGetter={this.rowKeyGetter}
            selectedRows={this.state.selectedRows}
            onSelectedRowsChange={rows => {
              this.setState({selectedRows: rows})
            }}
            sortColumns={this.state.sortColumns}
            onSortColumnsChange={sortColumns => {
              if (sortColumns.length === 0) {
                this.setState({sortColumns: [...sortColumns]})
              } else {
                const newSort = this.state.sortColumns.filter((sortCol) => sortCol.columnKey !== sortColumns[0].columnKey);
                this.setState({sortColumns: [...newSort, ...sortColumns]})
              }
            }}
          />
        </TransitionGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  bug: state.bug,
  isAuthenticated: state.auth.isAuthenticated,
  projectUsers: state.project_users.projectUsers,
  userId: state.auth.user ? state.auth.user.id : null
})

export default connect(mapStateToProps, {getBugs, editBug, deleteBug, getProjectUsers})(BugsList)
