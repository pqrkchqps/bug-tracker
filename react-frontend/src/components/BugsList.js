import React, {Component} from 'react'
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import axios from 'axios'

class BugsList extends Component {
  constructor(props){
    super(props)
    this.state = {
      bugs: []
    }
  }

  componentDidMount(){
    axios.get('/api/bugs')
    .then(res => {
      console.log(res.data);
      this.setState({bugs: res.data})
    })
  }

  render() {
    const { bugs } = this.state;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {bugs.map((bug) => (
              <CSSTransition key={bug.id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {bug.bug_name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default BugsList
