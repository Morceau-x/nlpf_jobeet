import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OfferOverview from "./OfferOverview"
import axios from "axios";


class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      offersList: []
    };
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    axios
      .post('/getAllOffers', {
        email: user.email
      })
      .then(response => (
        this.setState({
          offersList: response.data
        })
      ))
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.offersList.map((item, index) => (
            <div className="col-4" key={index} item={item}>
              <OfferOverview offer={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
