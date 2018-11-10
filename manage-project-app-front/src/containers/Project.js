import React, { Component, Fragment } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import config from "../config";
import "./Project.css";

export default class Notes extends Component {
  constructor(props) {
    super(props);

    this.buttonPress = false;
    
    this.state = {
        developers : new Array(),
        number: 0,
        isLoading: null,
  isDeleting: null,
      project: null,
      ProjectID: "",
      ProjectName: "",
      ProjectDescription: "",
      ProjectAdmin: "",
      ProjectManager: "",
      ProjectDevelopers: [],      
    };
  }

  async componentDidMount() {
    try {
      const project = await this.getProject();
      const { ProjectID, ProjectName, ProjectDescription, ProjectAdmin, ProjectManager, ProjectDevelopers, ProjectStatus } = project;
        
      this.setState({
       project, ProjectID, ProjectName, ProjectDescription, ProjectAdmin, ProjectManager, ProjectDevelopers, ProjectStatus
        });
    
        this.setState({number : this.state.ProjectDevelopers.length});
        this.setState({developers: this.state.ProjectDevelopers})
    } catch (e) {
      alert(e);
    }
  }

  

  getProject() {
    return API.get("manage-project-app", `/project/${this.props.match.params.id}`);
  }

  ///////
  validateForm() {
    return this.state.ProjectName.length > 0;
  }
  
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
  
  
    this.setState({ isLoading: true });
  }
  ////////////////////////// delete 
  handleDelete = async event => {
    event.preventDefault();
  
    const confirmed = window.confirm(
      "Are you sure you want to delete this Project?"
    );
  
    if (!confirmed) {
      return;
    }
  
    this.setState({ isDeleting: true });
  }
  //////////////////////////////////

  renderDevelopers(){
    var indents = [];
    for (var i = 0; i < this.state.number; i++) {
      indents.push(<FormGroup controlId="developer">
      <ControlLabel>Project Developer {i+1}</ControlLabel>
        <FormControl
          onChange={this.handleChange}
          value={this.state.ProjectDevelopers[i]}
          type="email"
        />
      </FormGroup>);
    }
    return <Fragment>{indents}</Fragment>;
  }


  render() {
      this.componentDidMount();
    return (
      <div className="ProjectName">
        {this.state.ProjectName &&
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name"  bsSize="large">
          <ControlLabel>Project Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.ProjectName}
              type="text"
            />
          </FormGroup>


          <FormGroup controlId="description">
          <ControlLabel>Description</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.ProjectDescription}
              componentClass="textarea"
            />
          </FormGroup>

          
          <FormGroup controlId="admin">
          <ControlLabel>Project Admin</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.ProjectAdmin}
              type="text"
            />
          </FormGroup>
          
          <FormGroup controlId="manager">
          <ControlLabel>Project Manager</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.ProjectManager}
              type="email"
            />
          </FormGroup>

          {this.renderDevelopers()}
          <button
          className="add developer"
          onClick={this.handleAdd}>add another developer</button>
     
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }  

}