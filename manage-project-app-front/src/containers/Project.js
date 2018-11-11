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
    
    this.count = 0;

    this.state = {
        isbool:true,
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
        //
        this.setState({ProjectDevelopers: this.fun(this.state.ProjectDevelopers)});
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

  fun(a){
      var x= a[0];
      for(var i=1 ; i < this.state.number; i++ ){
          x = x+"\n"+a[i]
      }
      return x;
  }
  
  //////////////////////////// handle submit 
  saveProject(project) {
    return API.put("manage-project-app", `/project/${this.props.match.params.id}`, {
      body: project
    });
  }
  
  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
    try {
      await this.saveProject({
        ProjectID : this.props.match.params.id,
        ProjectName: this.state.ProjectName,
        ProjectDescription: this.state.ProjectDescription,
        ProjectAdmin: this.state.ProjectAdmin,
        ProjectManager: this.state.ProjectManager,
        ProjectDevelopers: this.dev(this.state.ProjectDevelopers)
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }


  dev(a){
    return   a.split("\n");
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

  handleAdd = async event => {
    event.preventDefault();
    //ProjectDevelopers(this.state.developer);
    //this.setState({number : this.state.number + 1});
    this.setState({ProjectDevelopers: ""});
    this.count = this.count+1;
  }
  //////////////////////////////////

  renderDevelopers(){
    var indents = [];
    //for (var i = 0; i < this.state.number; i++) {
      indents.push(
        <FormGroup controlId="ProjectDevelopers">
        <ControlLabel>Project Developers List</ControlLabel>
          <FormControl
            onChange={this.handleChange}
            value={this.state.ProjectDevelopers}
            componentClass="textarea"
          />
        </FormGroup>
    
      );
    //}
    return <Fragment>{indents}</Fragment>;
  }


  render() {
      //this.componentDidMount();
    return (
      <div className="ProjectName">
        {this.state.ProjectName &&
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="ProjectName"  bsSize="large">
          <ControlLabel>Project Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.ProjectName}
              type="text"
            />
          </FormGroup>


          <FormGroup controlId="ProjectDescription">
          <ControlLabel>Description</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.ProjectDescription}
              componentClass="textarea"
            />
          </FormGroup>

          
          <FormGroup controlId="ProjectAdmin">
          <ControlLabel>Project Admin</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.ProjectAdmin}
              type="text"
            />
          </FormGroup>
          
          <FormGroup controlId="ProjectManager">
          <ControlLabel>Project Manager</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.ProjectManager}
              type="email"
            />
          </FormGroup>

          {this.renderDevelopers()}

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



/**
  renderDevelopers(){
    var indents = [];
    for (var i = 0; i < this.state.number; i++) {
      indents.push(
        <FormGroup controlId="ProjectDevelopers">
        <ControlLabel>Project Developer {i+1}</ControlLabel>
          <FormControl
            onChange={this.handleChangeDevelopers}
            value={this.state.ProjectDevelopers[i]}
            type="email"
          />
        </FormGroup>
    
      );
    }
    return <Fragment>{indents}</Fragment>;
  } */