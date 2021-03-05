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
                      { this.props.isAuthenticated ? (
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
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  bug: state.bug,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getBugs, deleteBug})(BugsList)
