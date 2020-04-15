import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Route, Switch } from "react-router-dom";
import userService from "./utils/userService";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import LocationsPage from "./pages/LocationsPage/LocationsPage";
import { routeToYelp, routeToYelpSpecific } from "./utils/yelpService";
import * as locationService from "./utils/locationService";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: userService.getUser(),
      coords: {
        lat: null,
        long: null,
      },
      yelpGrabs: [],
      savedLocations: [],
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
      },
      (err) => console.log(err)
    );
  };

  apiGrab = async (term) => {
    if (this.state.coords.lat === null) {
      alert("Sync Location to find local Gurb!");
      return;
    }
    let query = {
      term: term,
      lat: this.state.coords.lat,
      long: this.state.coords.long,
    };
    // console.log("query: ", query);
    const yelpRequest = await routeToYelp(query);
    console.log("logged back to App: ", yelpRequest);
    this.setState({
      yelpGrabs: yelpRequest,
    });
  };

  clearYelpGrabs = () => {
    this.setState({
      yelpGrabs: [],
    });
  };

  addToLocations = async (obj) => {
    let query = {
      user: this.state.user,
      locAlias: obj.alias,
    };
    const updatedUser = await locationService.addLocation(query);
    // console.log("Response back to website: ", updatedUser);
    this.setState({
      user: updatedUser,
    });
    // console.log("current state: ", this.state);
  };

  showAllLocations = async () => {
    if (!this.state.user) return;
    const allLocationAlias = await locationService.allLocations(
      this.state.user
    );
    //transform location alias' into entire objects through api grab
    // and store them into array below
    let locations = [];
    allLocationAlias.map(async (e) => {
      const search = { query: e };
      const location = await routeToYelpSpecific(search);
      locations.push(location);
    });
    return locations;
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
                yelpGrabs={this.state.yelpGrabs}
                clearYelpGrabs={this.clearYelpGrabs}
                addToLocations={this.addToLocations}
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
          {/* If NO USER restrict below */}
          <Route
            exact
            path="/messages"
            render={({ history }) => (
              <MessagesPage
                history={history}
                user={this.state.user}
                handleLogout={this.handleLogout}
              />
            )}
          />
          <Route
            exact
            path="/locations"
            render={({ history }) => (
              <LocationsPage
                history={history}
                user={this.state.user}
                handleLogout={this.handleLogout}
                showAllLocations={this.showAllLocations}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
