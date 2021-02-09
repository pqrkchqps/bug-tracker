import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {Image} from 'cloudinary-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux'
import {getProjects, deleteProject} from '../actions/projectActions'
import PropTypes from 'prop-types'

class ProjectsList extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const {user, isAuthenticated} = this.props.auth;
    if (isAuthenticated){
      this.props.getProjects(user.id);
    }
  }

  onDeleteClick = (id) => {
    this.props.deleteProject(id);
  }

  onTrackerClick = (id) => {
    this.props.deleteProject(id);
  }
  render() {
    const {projects} = this.props.project
    console.log(projects);
    return (
      <Container>
        <ListGroup className="projects-list">
          {projects.map(({name, id, image_name}) => (
            <ListGroupItem key={id} className="project-block">
              { this.props.auth.isAuthenticated ? (
                <Button className="remove-btn" color="danger" size="sm"
                  onClick={this.onDeleteClick.bind(this, id)}>
                  &times;
                </Button>
              ) : null}
              {name}
              <Image cloudName="hqds0bho9" publicId={image_name} width="300" crop="scale"/>
              <Link to={"/projects/"+id}>Project Tracker Page</Link>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

ProjectsList.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(mapStateToProps, {getProjects, deleteProject})(ProjectsList)
