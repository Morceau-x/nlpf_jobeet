import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Offer from "./applicant/Offer"
class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <Offer></Offer>
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
