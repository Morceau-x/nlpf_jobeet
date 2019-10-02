import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import store from "./store";
import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Welcome from "./components/Welcome";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./common/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Profile from "./components/auth/Profile"
import Company from "./components/company/Company";
import EditCompany from "./components/company/EditCompany";
import Offer  from "./components/applicant/Offer"
import Skills from "./components/admin/skills";

const SweetAlert = require("react-bootstrap-sweetalert");
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Header />
            <ToastContainer />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/company" component={Company} />
            <Route exact path="/company/edit" component={EditCompany} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/offer" component={Offer} />
              <PrivateRoute exact path="/skills" component={Skills} />
            </Switch>
            {/* <Footer /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
