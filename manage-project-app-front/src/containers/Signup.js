import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { Auth } from "aws-amplify";
import { API } from "aws-amplify";

import LoaderButton from "./LoaderButton";
import "./Signup.css";
import config from "../config";


export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      email: "",
      password: "",
      name: "",
      role: "",
      number: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }
  
    this.setState({ isLoading: false });
  }

  createUser(user) {
    return API.post("manage-project-app", "/user", {
      body: user
    });
  }
  
  handleConfirmationSubmit = async event => {
    event.preventDefault();
  
    this.setState({ isLoading: true });
  
    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      await this.createUser({
        userEmail: this.state.email,
        userNumber: this.state.number,
        userRole: this.state.role,
        userName: this.state.name
      });
      this.props.userHasAuthenticated(true);
      // create page 
      this.props.history.pop("/signup")
      this.props.history.push("/projectdisplay");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>

        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            value={this.state.name}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        
        <FormGroup controlId="role" bsSize="large">
          <ControlLabel>Role</ControlLabel>
          <FormControl
            value={this.state.role}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        
        <FormGroup controlId="number" bsSize="large">
          <ControlLabel>Phone Number</ControlLabel>
          <FormControl
            value={this.state.number}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        

        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}