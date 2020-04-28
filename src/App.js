import React from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Route, Switch } from "react-router-dom";
import userService from "./utils/userService";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import MessagesPage from "./pages/MessagesPage/MessagesPage";
import LocationsPage from "./pages/LocationsPage/LocationsPage";
import { routeToYelp } from "./utils/yelpService";
import * as locationService from "./utils/locationService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SAVED_LOCATIONS_PAGE_KEY = "/locations";

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
      savedLocationsObjs: [],
    };
  }

  async componentDidMount() {
    const { location: { pathname = "" } = {} } = this.props;
    console.log(pathname);
    if (pathname === SAVED_LOCATIONS_PAGE_KEY) {
      const { user: { email = "" } = {} } = this.state;
      const user = await userService.getUserByEmail(email);
      const savedLocationsObjs = user.savedLocations;
      this.setState({ user, savedLocationsObjs });
    }
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
    const { user: { email = "" } = {} } = this.state;
    const user = await userService.getUserByEmail(email);
    const savedLocationsObjs = user.savedLocations;
    this.setState({ user, savedLocationsObjs });
  };

  syncLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        this.succesfulSyncAnimation();
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

  searchRequest = async (term) => {
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

  addToLocations = async (locationAdded) => {
    if (!this.state.user) {
      this.loginToAddAnimation();
      return;
    }
    let query = {
      user: this.state.user,
      locationAdded,
    };
    const user = await locationService.addLocation(query);
    this.setState({
      user,
      savedLocationsObjs: user.savedLocations,
    });
    this.addLocationAnimation();
  };

  addLocationAnimation = () => {
    toast("Added Location! 🍔", {
      className: "custom-toast",
      type: toast.TYPE.SUCCESS,
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  loginToAddAnimation = () => {
    toast("Login to add locations... 🍔", {
      type: toast.TYPE.ERROR,
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  succesfulSyncAnimation = () => {
    toast("Location Sync Succesful!", {
      className: "custom-toast",
      type: toast.TYPE.SUCCESS,
      draggable: true,
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  deleteFromLocations = async (locationRemoved) => {
    let query = {
      user: this.state.user,
      locationRemoved,
    };
    const user = await locationService.deleteLocation(query);
    this.setState({
      user,
      savedLocationsObjs: user.savedLocations,
    });
  };

  render() {
    return (
      <div className="App">
        <>
          <ToastContainer />
        </>

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
                searchRequest={this.searchRequest}
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
                searchRequest={this.searchRequest}
                lat={this.state.coords.lat}
                clearYelpGrabs={this.clearYelpGrabs}
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
                searchRequest={this.searchRequest}
                lat={this.state.coords.lat}
                clearYelpGrabs={this.clearYelpGrabs}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
