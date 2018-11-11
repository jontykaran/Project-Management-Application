import React, { Component , Fragment} from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import { API, Auth} from "aws-amplify";

import config from "../config";
import "./NewProject.css";

export default class NewProject extends Component {
    
  constructor(props) {
    super(props);

    this.us = "a";
    this.buttonPress = false;
    this.developers = new Array();
    this.state = {
        number: 1,
      isLoading: null,
      role: "",
      name: "",
      admin: "",
      developer: "",
      description: "",
      manager: "",
      status: "Commencing"
    };
  }


  //

  async componentDidMount() {
    try {
      const user = await this.user();
      const  r = user.role;
       console.log(user); 
       var y;
       var x = Auth.currentAuthenticatedUser().then(function(u) {
         return u;
      });
       console.log(this.us);
      this.setState({role : r
        });
    
    } catch (e) {
      alert(e);
    }
  }

  user() {
    return API.get("manage-project-app", "/user")
  }
  //
  validateForm() {
    return this.state.name.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleChangeCheck = event => {
    this.setState({
      status: event.target.value
    });
  }

///////////////
  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
  
    try {

      
      await this.createProject({
        ProjectAdmin: this.state.ProjectAdmin,
        ProjectDescription: this.state.description,
        ProjectDevelopers: this.developers,
        ProjectManager: this.state.manager,
        ProjectName: this.state.name,
        ProjectStatus: this.state.status
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  createProject(project) {
    return API.post("manage-project-app", "/project", {
        body: project
      });
  }
  ////////
  handleAdd = async event => {
    event.preventDefault();
    this.developers.push(this.state.developer);
    this.setState({number : this.state.number + 1});
    this.setState({developer: ""});
  }

  renderDevelopers()
  {
    var indents = [];
    for (var i = 0; i < this.state.number; i++) {
      indents.push(<FormGroup controlId="developer">
      <ControlLabel>Project Developer {i+1}</ControlLabel>
        <FormControl
          onChange={this.handleChange}
          value={this.developers[i]}
          type="email"
        />
      </FormGroup>);
    }
    return <Fragment>{indents}</Fragment>;
    }


  render() {
    return (
      <div className="NewProject">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name"  bsSize="large">
          <ControlLabel>Project Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
            />
          </FormGroup>


          <FormGroup controlId="description">
          <ControlLabel>Description</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.description}
              componentClass="textarea"
            />
          </FormGroup>

          
          <FormGroup controlId="admin">
          <ControlLabel>Project Admin</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.admin}
              type="text"
            />
          </FormGroup>
          
          <FormGroup controlId="manager">
          <ControlLabel>Project Manager</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.manager}
              type="email"
            />
          </FormGroup>

        {this.renderDevelopers()}

        <button
          className="add_developer"
          onClick={this.handleAdd}>add another developer</button>


           
          <FormGroup>
          <ControlLabel>Project Status</ControlLabel>
          <div>
          <label>
            <input
              type="radio"
              value="Completed"
              checked={this.state.status === "Completed"}
              onChange={this.handleChangeCheck}
            />
            Completed  
          </label>
          
          <label>
            <input
              type="radio"
              value="Active"
              checked={this.state.status === "Active"}
              onChange={this.handleChangeCheck}
            />
            Active  
          </label>
          <label>
            <input
              type="radio"
              value="Commencing"
              checked={this.state.status === "Commencing"}
              onChange={this.handleChangeCheck}
            />
            Commencing  
          </label>

          </div>
        
    </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}