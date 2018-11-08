import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./NavigationBar.css";

class App extends Component {

    constructor(props) {
        super(props);
      }

  render() {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                        <a href="#home">Project Management Application</a>
                </Navbar.Brand>
            </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight>
            {this.state.isAuthenticated
  ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
  : <Fragment>
      <LinkContainer to="/signup">
        <NavItem>Signup</NavItem>
      </LinkContainer>
      <LinkContainer to="/login">
        <NavItem>Login</NavItem>
      </LinkContainer>
    </Fragment>
}
            </Nav>
        </Navbar.Collapse>
        </Navbar>

        );
  }
}

export default App;