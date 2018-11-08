import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Project Management Application</h1>
          <p>This app manages projects and allows managers to add developers</p>
        </div>
      </div>
    );
  }
}