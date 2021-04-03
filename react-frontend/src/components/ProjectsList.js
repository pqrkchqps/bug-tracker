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
    const {isAuthenticated} = this.props;
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

  render() {
    const {projects} = this.props.project;
    const {isAuthenticated, projectUsers, userId} = this.props;
    let currentProjectUser = projectUsers.filter(i => i.id === userId)
    currentProjectUser = currentProjectUser.length > 0 ? currentProjectUser[0] : currentProjectUser

    return (
      <Container>
        <ListGroup className="projects-list">
          {projects.map(({name, id, image_name}) => (
            <ListGroupItem key={id} className="project-block">
              <h1 className="project-name">{name}</h1>
              <div className="project-image-holder">
              <Image className="project-image" cloudName="hqds0bho9" publicId={image_name} width="300" height="200" crop="limit"/>
              </div>
              <Link className="project-btn" to={"/projects/"+id}><Button>Project Tracker</Button></Link>
              { isAuthenticated && !this.props.home ? (
                <React.Fragment>
                  {currentProjectUser.add_users || currentProjectUser.remove_users || currentProjectUser.edit_users || currentProjectUser.edit_own_users ? (
                    <Link className="project-btn" to={"/projects_users/"+id}><Button>Manage Users</Button></Link>
                  ) : null }
                  {currentProjectUser.delete_project ? (
                    <Button className="remove-btn" color="danger" size="sm"
                    onClick={this.onDeleteClick.bind(this, id)}>
                    &times;
                  </Button>
                  ) : null }
                </React.Fragment>
              ) : null}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  project: state.project,
  isAuthenticated: state.auth.isAuthenticated,
  projectUsers: state.project_users.projectUsers,
  userId: state.auth.user ? state.auth.user.id : null
})

export default connect(mapStateToProps, {getAllProjects, getUserProjects, deleteProject})(ProjectsList)
