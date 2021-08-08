import React, {Component} from 'react'
import { Col, Row, Container, ListGroup, ListGroupItem, Button, Input } from 'reactstrap';
import { Link} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux'
import {getProjectUsers, deleteProjectUser, updateProjectUsers} from '../actions/projectUsersActions'
import PropTypes from 'prop-types'

class ProjectUsersList extends Component {
  constructor(props){
    super(props)
    this.state = {
      projectUsersEdits: []
    }
  }

  componentDidMount(){
    this.props.getProjectUsers(this.props.projectId);
  }

  onDeleteClick = (id) => {
    this.props.deleteProjectUser(id, this.props.projectId);
  }

  onChangeCheckbox = (id) => {
    return ((e) => {
      const {name, checked} = e.target;
      console.log(name, id, checked)
      this.setState({projectUsersEdits: {[id]: {...this.state.projectUsersEdits[id], [name]: checked}}})
    })
  }

  onSaveClick = () => {
    console.log(this.state.projectUsersEdits)
    this.props.updateProjectUsers(this.state.projectUsersEdits, this.props.projectId)
  }

  isPermissionDisabledOnCurrentProjectUserWithCreatedBy = (permisssionName, currentProjectUser, created_by_id) => {
    if (currentProjectUser.edit_users) {
      return !currentProjectUser[permisssionName]
    }
    if (currentProjectUser.edit_own_users){
      return !currentProjectUser[permisssionName] || created_by_id !== this.props.userId
    }
    return true;
  }

  render() {
    const {isAuthenticated, projectUsers, userId} = this.props;
    const currentProjectUser = projectUsers.filter(i => i.id === userId)[0]
    console.log("project_users:", projectUsers)
    console.log("currentProjectUser:", currentProjectUser)
    console.log("user_id:", userId);
    console.log(this.state)
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="project-users-list">
            <ListGroupItem>
              <Row>
                <Col md="2" className="user-email">User Email</Col>
                <Col md="1" className="edit-project-page">Edit Project Page</Col>
                <Col md="1" className="add-users">Add Users</Col>
                <Col md="1" className="remove-users">Remove Users</Col>
                <Col md="1" className="edit-users">Edit Users</Col>
                <Col md="1" className="edit-own-users">Edit Own Users</Col>
                <Col md="1" className="add-bugs">Add Bugs</Col>
                <Col md="1" className="remove-bugs">Remove Bugs</Col>
                <Col md="1" className="edit-bugs">Edit Bugs</Col>
                <Col md="1" className="edit-own-bugs">Edit Own Bugs</Col>
                <Col md="1" className="remove-btn">Remove</Col>
              </Row>
            </ListGroupItem>
            {projectUsers.map(({
              created_by_id, 
              project_user_id, 
              email,
              edit_project_page,
              add_users,
              remove_users,
              edit_users,
              edit_own_users,
              add_bugs,
              remove_bugs,
              edit_bugs,
              edit_own_bugs
            }) => (
              <CSSTransition key={project_user_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Row>
                    <Col md="2" className="user-email">{email}</Col>
                    <Col md="1" className="edit-project-page">
                       <div class="custom-control custom-checkbox">
                        <Input
                          type="checkbox"
                          name="edit_project_page"
                          defaultChecked={edit_project_page}
                          disabled={this.isPermissionDisabledOnCurrentProjectUserWithCreatedBy("edit_project_page", currentProjectUser, created_by_id)}
                          onChange={this.onChangeCheckbox(project_user_id)}
                        />
                      </div>
                    </Col>
                    <Col md="1" className="add-users">
                      <div class="custom-control custom-checkbox">
                        <Input
                          type="checkbox"
                          name="add_users"
                          defaultChecked={add_users}
                          disabled={this.isPermissionDisabledOnCurrentProjectUserWithCreatedBy("add_users", currentProjectUser, created_by_id)}
                          onChange={this.onChangeCheckbox(project_user_id)}
                        />
                      </div>
                    </Col>
                    <Col md="1" className="remove-users">
                      <div class="custom-control custom-checkbox">
                        <Input
                          type="checkbox"
                          name="remove_users"
                          defaultChecked={remove_users}
                          disabled={this.isPermissionDisabledOnCurrentProjectUserWithCreatedBy("remove_users", currentProjectUser, created_by_id)}
                          onChange={this.onChangeCheckbox(project_user_id)}
                        />
                      </div>
                    </Col>
                    <Col md="1" className="edit-users">
                      <div class="custom-control custom-checkbox">
                        <Input
                          type="checkbox"
                          name="edit_users"
                          defaultChecked={edit_users}
                          disabled={this.isPermissionDisabledOnCurrentProjectUserWithCreatedBy("edit_users", currentProjectUser, created_by_id)}
                          onChange={this.onChangeCheckbox(project_user_id)}
                        />
                      </div>
                    </Col>
                    <Col md="1" className="edit-own-users">
                      <div class="custom-control custom-checkbox">
                        <Input
                          type="checkbox"
                          name="edit_own_users"
                          defaultChecked={edit_own_users}
                          disabled={this.isPermissionDisabledOnCurrentProjectUserWithCreatedBy("edit_own_users", currentProjectUser, created_by_id)}
                          onChange={this.onChangeCheckbox(project_user_id)}
                        />
                      </div>
                    </Col>
                    <Col md="1" className="add-bugs">
                      <div class="custom-control custom-checkbox">
                        <Input
                          type="checkbox"
                          name="add_bugs"
                          defaultChecked={add_bugs}
                          disabled={this.isPermissionDisabledOnCurrentProjectUserWithCreatedBy("add_bugs", currentProjectUser, created_by_id)}
                          onChange={this.onChangeCheckbox(project_user_id)}
                        />
                      </div>
                    </Col>
                    <Col md="1" className="remove-bugs">
                      <div class="custom-control custom-checkbox">
                        <Input
                          type="checkbox"
                          name="remove_bugs"
                          defaultChecked={remove_bugs}
                          disabled={this.isPermissionDisabledOnCurrentProjectUserWithCreatedBy("remove_bugs", currentProjectUser, created_by_id)}
                          onChange={this.onChangeCheckbox(project_user_id)}
                        />
                      </div>
                    </Col>
                    <Col md="1" className="edit-bugs">
                      <div class="custom-control custom-checkbox">
                        <Input
                          type="checkbox"
                          name="edit_bugs"
                          defaultChecked={edit_bugs}
                          disabled={this.isPermissionDisabledOnCurrentProjectUserWithCreatedBy("edit_bugs", currentProjectUser, created_by_id)}
                          onChange={this.onChangeCheckbox(project_user_id)}
                        />
                      </div>
                    </Col>
                    <Col md="1" className="edit-own-bugs">
                      <div class="custom-control custom-checkbox">
                        <Input
                          type="checkbox"
                          name="edit_own_bugs"
                          defaultChecked={edit_own_bugs}
                          disabled={this.isPermissionDisabledOnCurrentProjectUserWithCreatedBy("edit_own_bugs", currentProjectUser, created_by_id)}
                          onChange={this.onChangeCheckbox(project_user_id)}
                        />
                      </div>
                    </Col>
                    <Col md="1" className="remove-btn">
                      { isAuthenticated && currentProjectUser.remove_users ? (
                        <Button className="remove-btn" color="danger"
                          onClick={this.onDeleteClick.bind(this, project_user_id)}>
                          &times;
                        </Button>
                      ) : null}
                    </Col>
                  </Row>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        <Button color="info" onClick={this.onSaveClick} >
          Save
        </Button>
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

export default connect(mapStateToProps, {getProjectUsers, deleteProjectUser, updateProjectUsers})(ProjectUsersList)
