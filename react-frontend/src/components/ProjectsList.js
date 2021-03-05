import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import {Image} from 'cloudinary-react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {connect} from 'react-redux'
import {getAllProjects, getUserProjects, deleteProject} from '../actions/projectActions'
import PropTypes from 'prop-types'

class ProjectsList extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const {user, isAuthenticated} = this.props.auth;
    console.log(this.props.home)
    if (!this.props.home && isAuthenticated){
      this.props.getUserProjects();
    }
    else if (this.props.home){
      this.props.getAllProjects();
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
              <h1 className="project-name">{name}</h1>
              <div className="project-image-holder">
              <Image className="project-image" cloudName="hqds0bho9" publicId={image_name} width="300" height="200" crop="limit"/>
              </div>
              <Link to={"/projects/"+id}>Project Tracker Page</Link>
              { this.props.auth.isAuthenticated && !this.props.home ? (
                <Button className="remove-btn" color="danger" size="sm"
                  onClick={this.onDeleteClick.bind(this, id)}>
                  &times;
                </Button>
              ) : null}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

ProjectsList.propTypes = {
  getAllProjects: PropTypes.func.isRequired,
  getUserProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  project: state.project,
  auth: state.auth
})

export default connect(mapStateToProps, {getAllProjects, getUserProjects, deleteProject})(ProjectsList)
