import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import "./SignupForm.css";
import logo from "../../assets/logo.png";

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
            Local Guru
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
            Local Guru
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
            Local Guru
          </button>
        </div>
      );
    }
  }

  handleChoice = (boolean) => {
    // console.log(`Chose to be a guru?`, boolean);
    this.setState({
      guru: boolean,
    });
  };

  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh", width: "100vw" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src={logo} /> Sign Up with Local Guru
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="Name"
                  fluid
                  icon="user"
                  iconPosition="left"
                />
                <Form.Input
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email"
                  fluid
                  icon="user"
                  iconPosition="left"
                />
                <Form.Input
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Password"
                  type="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                />
                <Form.Input
                  name="passwordConf"
                  value={this.state.passwordConf}
                  onChange={this.handleChange}
                  placeholder="Confirm Password"
                  type="password"
                  fluid
                  icon="lock"
                  iconPosition="left"
                />

                {this.applyButtonClasses()}
                <br />
                <br />
                <br />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  disabled={this.isFormInvalid()}
                >
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              <Link to="/">Cancel</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default SignupForm;
