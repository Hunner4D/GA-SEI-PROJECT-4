import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import userService from "../../utils/userService";

class LoginPage extends Component {
  state = {
    email: "",
    pw: "",
  };

  handleChange = (e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert("Invalid Credentials!");
    }
  };

  render() {
    return (
      <div>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image src="/logo.png" /> Log-in to your account
            </Header>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  name="pw"
                  value={this.state.pw}
                  onChange={this.handleChange}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                <Button color="teal" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/signup">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>

        {/* <div className="LoginPage">
          <header className="header-footer">Log In</header>
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
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
                  value={this.state.pw}
                  name="pw"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-12 text-center">
                <button className="btn btn-default">Log In</button>
                &nbsp;&nbsp;&nbsp;
                <Link to="/">Cancel</Link>
              </div>
            </div>
          </form>
        </div> */}
      </div>
    );
  }
}

export default LoginPage;
