import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Route, Switch, Redirect } from "react-router-dom";
import userService from "./utils/userService";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import yelpfusion from "./api/yelpfusion";
import yelpfusionkey from "./api/yelpfusionkey";

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

  apiGrab = async () => {
    const response = await yelpfusion.get("/businesses/search", {
      params: {
        term: "food",
        latitude: this.state.coords.lat,
        longitude: this.state.coords.long,
        key: yelpfusionkey,
      },
    });
    console.log(response);

    /////////////////////////////////////////////////////////////

    // const yelp = require("yelp-fusion");
    // // Place holder for Yelp Fusion's API Key. Grab them
    // // from https://www.yelp.com/developers/v3/manage_app
    // const apiKey = yelpfusionkey;

    // const searchRequest = {
    //   term: "Four Barrel Coffee",
    //   location: "san francisco, ca",
    // };

    // const client = yelp.client(apiKey);

    // client
    //   .search(searchRequest)
    //   .then((response) => {
    //     const firstResult = response.jsonBody.businesses[0];
    //     const prettyJson = JSON.stringify(firstResult, null, 4);
    //     console.log(prettyJson);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
