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
      itemsCountPerPage: 6,
      activePage: 1
    };
    this.setItemCount = this.setItemCount.bind(this);
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
        }),
        this.handlePageChange(1)
      ))
  }

  setItemCount = (e) => {
    console.log("value", Number(e.target.value))
    this.setState({ itemsCountPerPage: Number(e.target.value) })
    let startIndex = Number(e.target.value) * (this.state.activePage - 1);
    let buffArray = [].concat(this.state.offersList);
    this.setState({ displayedList: buffArray.splice(startIndex, Number(e.target.value)) });
    console.log("After", this.state)

  }

  handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    this.setState({ activePage: pageNumber });
    let startIndex = this.state.itemsCountPerPage * (pageNumber - 1);
    let buffArray = [].concat(this.state.offersList);
    this.setState({ displayedList: buffArray.splice(startIndex, this.state.itemsCountPerPage) });
  }

  render() {
    return (
      <div className="container">
        <div className="dropdown">
          Show
           <select className="ml-1 mr-1" id="lang" onChange={this.setItemCount} value={this.state.itemsCountPerPage}>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
          entries
        </div>
        <div className="row mt-2">
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
