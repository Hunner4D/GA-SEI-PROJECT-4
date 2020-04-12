import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Route, Switch, Redirect } from "react-router-dom";
import userService from "./utils/userService";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { routeToYelp } from "./utils/yelpService";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      coords: {
        lat: null,
        long: null,
      },
    };
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  syncLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          coords: {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          },
        });
        console.log("current state", this.state);
      },
      (err) => console.log(err)
    );
  };

  apiGrab = async (query) => {
    console.log("query: ", query);
    const yelpRequest = await routeToYelp();
    console.log("logged back to App: ", yelpRequest);
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <LandingPage
                user={this.state.user}
                handleSignupOrLogin={this.handleSignupOrLogin}
                handleLogout={this.handleLogout}
                syncLocation={this.syncLocation}
                apiGrab={this.apiGrab}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={({ history }) => (
              <SignupPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={({ history }) => (
              <LoginPage
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
