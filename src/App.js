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
// import history from "./history";

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
      savedLocationsObjs: [],
    };
  }

  async componentDidMount() {
    const locationsObjs = await this.showAllLocations();
    this.setState({
      savedLocationsObjs: locationsObjs,
    });
  }

  // const locationsObjsPromises = await this.showAllLocations();
  //   const locationsObjs = await Promise.all(locationsObjsPromises);
  //   this.setState({
  //     savedLocationsObjs: locationsObjs,
  //   });

  // const locationsObjs = await this.showAllLocations();
  // this.setState({
  //   savedLocationsObjs: locationsObjs,
  // });

  async componentDidUpdate() {
    const locationsObjsPromises = await this.showAllLocations();
    const locationsObjs = await Promise.all(locationsObjsPromises);
    this.setState({
      savedLocationsObjs: locationsObjs,
    });
  }

  handleLogout = () => {
    userService.logout();
    this.setState({
      user: null,
      savedLocationsObjs: [],
    });
  };

  handleSignupOrLogin = async () => {
    this.setState({
      user: userService.getUser(),
    });
    const locationsObjs = await this.showAllLocations();
    this.setState({
      savedLocationsObjs: locationsObjs,
    });
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
    this.setState({
      yelpGrabs: [],
    });
    let query = {
      term: term,
      lat: this.state.coords.lat,
      long: this.state.coords.long,
    };
    const yelpRequest = await routeToYelp(query);
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
    const updatedUserLocations = await locationService.addLocation(query);
    this.setState({
      user: updatedUserLocations,
      savedLocations: updatedUserLocations.savedLocations,
    });
  };

  deleteFromLocations = async (obj) => {
    // history.push("/");
    let query = {
      user: this.state.user,
      locAlias: obj.alias,
    };
    // history.push("/locations");
    const updatedUserLocations = await locationService.deleteLocation(query);
    this.setState({
      user: updatedUserLocations,
      savedLocations: updatedUserLocations.savedLocations,
    });
  };

  showAllLocations = async () => {
    if (!this.state.user) {
      return [];
    }
    const allLocationAlias = await locationService.allLocations(
      this.state.user
    );
    //transform location alias' into entire objects through api grab
    // and store them into array below
    const allLocations = allLocationAlias.map((e) => {
      const search = { query: e };
      return routeToYelpSpecific(search);
    });
    const locations = await Promise.all(allLocations);
    return locations;
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={({ history }) => (
              <LandingPage
                history={history}
                user={this.state.user}
                handleSignupOrLogin={this.handleSignupOrLogin}
                handleLogout={this.handleLogout}
                syncLocation={this.syncLocation}
                apiGrab={this.apiGrab}
                yelpGrabs={this.state.yelpGrabs}
                clearYelpGrabs={this.clearYelpGrabs}
                addToLocations={this.addToLocations}
                lat={this.state.coords.lat}
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
                syncLocation={this.syncLocation}
                apiGrab={this.apiGrab}
                lat={this.state.coords.lat}
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
                savedLocationsObjs={this.state.savedLocationsObjs}
                deleteFromLocations={this.deleteFromLocations}
                syncLocation={this.syncLocation}
                apiGrab={this.apiGrab}
                lat={this.state.coords.lat}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
