import React, { Component , Fragment} from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import { API } from "aws-amplify";

import config from "../config";
import "./NewProject.css";

export default class NewProject extends Component {
    
  constructor(props) {
    super(props);

    this.buttonPress = false;
    this.developers = new Array();
    this.state = {
        number: 1,
      isLoading: null,
      name: "",
      admin: "",
      developer: "",
      description: "",
      manager: "",
      status: "On"
    };
  }

  validateForm() {
    return this.state.name.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
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
          className="add developer"
          onClick={this.handleAdd}>add another developer</button>


          
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