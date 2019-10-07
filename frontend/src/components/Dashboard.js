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
      activePage: 1,
      sortOrder: "high"
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
        this.sortOffers(this.state.sortOrder)
      ))
  }

  setItemCount = (e) => {
    this.setState({ itemsCountPerPage: Number(e.target.value) })
    let startIndex = Number(e.target.value) * (this.state.activePage - 1);
    let buffArray = [].concat(this.state.offersList);
    this.setState({ displayedList: buffArray.splice(startIndex, Number(e.target.value)) });
  }

  handlePageChange = (pageNumber) => {
    console.log(pageNumber)
    this.setState({ activePage: pageNumber });
    let startIndex = this.state.itemsCountPerPage * (pageNumber - 1);
    let buffArray = [].concat(this.state.offersList);
    this.setState({ displayedList: buffArray.splice(startIndex, this.state.itemsCountPerPage) });
  }

  sortOffers = (e) => {
    if (e === "high" || e.target.value === "high") {
      this.setState({
        sortOrder: "high",
        offersList: this.state.offersList.sort((a, b) => (a.matchPercentage > b.matchPercentage) ? -1 : 1)
      })
      let startIndex = this.state.itemsCountPerPage * (this.state.activePage - 1);
      let buffArray = [].concat(this.state.offersList);
      this.setState({ displayedList: buffArray.splice(startIndex, this.state.itemsCountPerPage) });
    }
    else if (e === "low" || e.target.value === "low") {
      this.setState({
        sortOrder: "low",
        offersList: this.state.offersList.sort((a, b) => (a.matchPercentage > b.matchPercentage) ? 1 : -1)
      })
      let startIndex = this.state.itemsCountPerPage * (this.state.activePage - 1);
      let buffArray = [].concat(this.state.offersList);
      this.setState({ displayedList: buffArray.splice(startIndex, this.state.itemsCountPerPage) });
    }
    else {
      this.setState({
        sortOrder: "last",
        offersList: this.state.offersList.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at)) ? -1 : 1)
      })
    }
  }


  render() {
    return (
      <div className="container">
        <div className="row ">
          <div className="col-4 dropdown">
            Sort by
           <select className="ml-1 mr-1" id="lang" onChange={this.sortOffers} value={this.state.sortOrder}>
              <option value="high">Highest Match Percentage</option>
              <option value="low">Lowest Match Percentage</option>
              <option value="last">Last added</option>
            </select>
          </div>
          <div className="ml-auto dropdown">
            Show
           <select className="ml-1 mr-1" id="lang" onChange={this.setItemCount} value={this.state.itemsCountPerPage}>
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="24">24</option>
            </select>
            entries
        </div>
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
