import React, {Component} from 'react'
import { Col, Row, Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link} from "react-router-dom";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux'
import {getBugs, deleteBug} from '../actions/bugActions'
import {getProjectUsers} from '../actions/projectUsersActions'
import PropTypes from 'prop-types'

class BugsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
  }

  componentDidMount(){
    this.props.getProjectUsers(this.props.projectId);

    this.props.getBugs(this.props.projectId);
  }

  onDeleteClick = (id) => {
    this.props.deleteBug(id, this.props.projectId);
  }

  render() {
    let {isAuthenticated, projectUsers, userId, projectId} = this.props;
    projectUsers = projectUsers.map(i => i.id)
    let bugs = this.props.bug['bugs_'+projectId];
    console.log("projectUsers:", projectUsers)
    console.log("userId:", userId);
    if (bugs === undefined) bugs = [];
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="bugs-list">
            <ListGroupItem>
              <Row>
                <Col md="3" className="bug-name">Bug Name</Col>
                <Col md="7" className="bug-summary">Summary</Col>
                <Col md="1" className="edit-btn">Edit</Col>
                <Col md="1" className="remove-btn">Remove</Col>
              </Row>
            </ListGroupItem>
            {bugs.map(({bug_name, summary, id}) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Row>
                    <Col md="3" className="bug-name">{bug_name}</Col>
                    <Col md="7" className="bug-summary">{summary}</Col>
                    <Col md="1" className="edit-btn">
                      { isAuthenticated && projectUsers.includes(userId) ? (
                        <Link to={"/projects/"+projectId+"/add/"+id}>
                          <Button className="edit-btn" color="info" >&times;</Button>
                        </Link>
                      ) : null}
                    </Col>
                    <Col md="1" className="remove-btn">
                      { isAuthenticated && projectUsers.includes(userId) ? (
                        <Button className="remove-btn" color="danger"
                          onClick={this.onDeleteClick.bind(this, id)}>
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

BugsList.propTypes = {
  getBugs: PropTypes.func.isRequired,
  bug: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool,
  project_users: PropTypes.array,
  user_id: PropTypes.number
}

const mapStateToProps = state => ({
  bug: state.bug,
  isAuthenticated: state.auth.isAuthenticated,
  projectUsers: state.project_users.projectUsers,
  userId: state.auth.user ? state.auth.user.id : null
})

export default connect(mapStateToProps, {getBugs, deleteBug, getProjectUsers})(BugsList)
