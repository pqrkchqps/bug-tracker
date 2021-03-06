import React, {Component} from 'react'
import { Col, Row, Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux'
import {getBugs, deleteBug} from '../actions/bugActions'
import PropTypes from 'prop-types'

class BugsList extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getBugs(this.props.projectId);
  }

  onDeleteClick = (id) => {
    this.props.deleteBug(id, this.props.projectId);
  }

  render() {
    let bugs = this.props.bug['bugs_'+this.props.projectId];
    const {isAuthenticated, project_users, user_id} = this.props;
    console.log("project_users:", project_users)
    console.log("user_id:", user_id);
    if (bugs === undefined) bugs = [];
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="bugs-list">
            <ListGroupItem>
              <Row>
                <Col md="3" className="bug-name">Bug Name</Col>
                <Col md="8" className="bug-summary">Summary</Col>
                <Col md="1" className="remove-btn">Remove</Col>
              </Row>
            </ListGroupItem>
            {bugs.map(({bug_name, summary, id}) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Row>
                    <Col md="3" className="bug-name">{bug_name}</Col>
                    <Col md="8" className="bug-summary">{summary}</Col>
                    <Col md="1" className="remove-btn">
                      { isAuthenticated && project_users.includes(user_id) ? (
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
  project_users: state.bug.project_users,
  user_id: state.auth.user ? state.auth.user.id : null
})

export default connect(mapStateToProps, {getBugs, deleteBug})(BugsList)
