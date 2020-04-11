import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";
import "./SignupForm.css";

class SignupForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    passwordConf: "",
    guru: null,
  };

  handleChange = (e) => {
    this.props.updateMessage("");
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  };

  isFormInvalid() {
    return !(
      this.state.name &&
      this.state.email &&
      this.state.password === this.state.passwordConf &&
      this.state.guru !== null
    );
  }

  applyButtonClasses() {
    if (this.state.guru === null) {
      return (
        <div className="ui large buttons">
          <button
            className="ui button"
            type="button"
            onClick={() => this.handleChoice(false)}
          >
            Grubber
          </button>
          <div className="or"></div>
          <button
            className="ui button"
            type="button"
            onClick={() => this.handleChoice(true)}
          >
            Food Guru
          </button>
        </div>
      );
    }
    if (this.state.guru) {
      return (
        <div className="ui large buttons">
          <button
            className="ui button"
            type="button"
            onClick={() => this.handleChoice(false)}
          >
            Grubber
          </button>
          <div className="or"></div>
          <button
            className="ui button choiceButton"
            type="button"
            onClick={() => this.handleChoice(true)}
          >
            Food Guru
          </button>
        </div>
      );
    }
    if (this.state.guru === false) {
      return (
        <div className="ui large buttons">
          <button
            className="ui button choiceButton"
            type="button"
            onClick={() => this.handleChoice(false)}
          >
            Grubber
          </button>
          <div className="or"></div>
          <button
            className="ui button"
            type="button"
            onClick={() => this.handleChoice(true)}
          >
            Food Guru
          </button>
        </div>
      );
    }
  }

  handleChoice = (boolean) => {
    console.log(`Chose to be a guru?`, boolean);
    this.setState({
      guru: boolean,
    });
  };

  render() {
    return (
      <div>
        <header className="header-footer">Sign Up</header>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={this.state.passwordConf}
                name="passwordConf"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              {this.applyButtonClasses()}
              &nbsp;&nbsp;
              <button
                className="btn btn-default"
                disabled={this.isFormInvalid()}
              >
                Sign Up
              </button>
              &nbsp;&nbsp;
              <Link to="/">Cancel</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
