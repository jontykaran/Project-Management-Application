import React, { Component } from "react";
import "./Home.css";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {withRouter } from "react-router-dom";


 class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isbool: true,
      isLoading: true,
      project: []
    };
  }

  
  renderLander() {
    return (
     <div className="Home">
        <div className="lander">
          <h1>Project Management App</h1>
          <p>Now create your own project and manage it withing your organization easily</p>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }
  
    try {
      const notes = await this.projects();
      this.setState({ project: notes });
      console.log(notes);

    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
    this.setState({isbool: false});
  }
  
  projects() {
    return API.get("manage-project-app", "/project")
  }

  renderProjectList(projects) {
    return [{}].concat(projects).map(
      (project, i) =>
        i !== 0
          ? <LinkContainer
              key={project.ProjectID}
              to={`/project/${project.ProjectID}`}
            >
              <ListGroupItem header={project.ProjectName.trim().split("\n")[0]}>
                {"Description: " + project.ProjectDescription}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/project/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new project
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }

  renderProjects() {
    return (
      <div className="projects">
        <PageHeader>Your Project</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderProjectList(this.state.project)}
        </ListGroup>
      </div>
    );
  }

  render() {
    if(this.state.isbool)
    {this.componentDidMount();}

    //console.log(this.state.project);
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderProjects() : this.renderLander()}
      </div>
    );
  }
}

export default withRouter(Home);
