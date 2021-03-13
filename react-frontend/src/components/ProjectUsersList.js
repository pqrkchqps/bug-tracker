import React, {Component} from 'react'
import { Col, Row, Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux'
import {getProjectUsers, deleteProjectUser} from '../actions/projectUsersActions'
import PropTypes from 'prop-types'

class ProjectUsersList extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
  }

  componentDidMount(){
    this.props.getProjectUsers(this.props.projectId);
  }

  onDeleteClick = (id) => {
    this.props.deleteProjectUser(this.props.projectId, id);
  }

  render() {
    let bugs = this.props.bug['bugs_'+this.props.projectId];
    const {isAuthenticated, projectUsers, userId} = this.props;
    const projectUsersId = projectUsers.map(i => i.id)
    console.log("project_users:", projectUsers)
    console.log("user_id:", userId);
    if (bugs === undefined) bugs = [];
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="project-users-list">
            <ListGroupItem>
              <Row>
                <Col md="3" className="user-name">User Name</Col>
                <Col md="3" className="user-email">User Email</Col>
                <Col md="5" className="project-user-id">Project User Id</Col>
                <Col md="1" className="remove-btn">Remove</Col>
              </Row>
            </ListGroupItem>
            {projectUsers.map(({name, project_user_id, email}) => (
              <CSSTransition key={project_user_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Row>
                    <Col md="3" className="user-name">{name}</Col>
                    <Col md="3" className="user-email">{email}</Col>
                    <Col md="5" className="project-user-id">{project_user_id}</Col>
                    <Col md="1" className="remove-btn">
                      { isAuthenticated && projectUsersId.includes(userId) ? (
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
      </Container>
    );
  }
}

ProjectUsersList.propTypes = {
  getProjectUsers: PropTypes.func.isRequired,
  bug: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  projectUsers: PropTypes.array,
  userId: PropTypes.number
}

const mapStateToProps = state => ({
  bug: state.bug,
  isAuthenticated: state.auth.isAuthenticated,
  projectUsers: state.project_users.projectUsers,
  userId: state.auth.user ? state.auth.user.id : null
})

export default connect(mapStateToProps, {getProjectUsers, deleteProjectUser})(ProjectUsersList)
