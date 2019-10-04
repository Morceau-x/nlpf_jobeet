import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OfferOverview from "./OfferOverview"
import axios from "axios";
import Pagination from "react-js-pagination";


class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      offersList: [],
      displayedList: [],
      itemsCountPerPage: 10,
      activePage: 1
    };
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    axios
      .post('/getAllOffers', {
        email: user.email
      })
      .then(response => (
        console.log(response),
        this.setState({
          offersList: response.data
        }),
        this.handlePageChange(1)
      ))
  }

  handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    this.setState({activePage: pageNumber});
    let startIndex = this.state.itemsCountPerPage * (pageNumber - 1);
    let buffArray = [].concat(this.state.offersList);
    this.setState({displayedList: buffArray.splice(startIndex, this.state.itemsCountPerPage)});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.displayedList.map((item, index) => (
            <div className="col-4" key={index} item={item}>
              <OfferOverview offer={item} />
            </div>
          ))}
        </div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.itemsCountPerPage}
          totalItemsCount={this.state.offersList.length}
          pageRangeDisplayed={3}
          onChange={this.handlePageChange}
        />
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
