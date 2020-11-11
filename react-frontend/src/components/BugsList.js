import React, {Component} from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux'
import {getBugs, deleteBug} from '../actions/bugActions'
import PropTypes from 'prop-types'

class BugsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      bugs: []
    }
  }

  componentDidMount(){
    this.props.getBugs();
  }

  onDeleteClick = (id) => {
    this.props.deleteBug(id);
  }

  render() {
    const {bugs} = this.props.bug
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {bugs.map(({bug_name, id}) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this,id)}
                  >&times;</Button>
                  {bug_name}
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
  bug: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  bug: state.bug
})

export default connect(mapStateToProps, {getBugs, deleteBug})(BugsList)
