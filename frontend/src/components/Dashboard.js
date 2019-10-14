import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import OfferOverview from "./OfferOverview";
import Pagination from "react-js-pagination";
import axios from "axios";


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
        console.disableYellowBox = true;
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
                this.sortOffers(this.state.sortOrder),
                console.log(this.state.offersList)
            ))
    }

    setItemCount = (e) => {
        this.setState({ itemsCountPerPage: Number(e.target.value) });
        let startIndex = Number(e.target.value) * (this.state.activePage - 1);
        let buffArray = [].concat(this.state.offersList);
        this.setState({ displayedList: buffArray.splice(startIndex, Number(e.target.value)) });
    };

    handlePageChange = (pageNumber) => {
        console.log(pageNumber);
        this.setState({ activePage: pageNumber });
        let startIndex = this.state.itemsCountPerPage * (pageNumber - 1);
        let buffArray = [].concat(this.state.offersList);
        this.setState({ displayedList: buffArray.splice(startIndex, this.state.itemsCountPerPage) });
    };

    sortOffers = (e) => {
        const { isAuthenticated, user } = this.props.auth;
        if (e === "high" || e.target.value === "high") {
            console.log("high")
            this.setState({
                sortOrder: "high",
                offersList: this.state.offersList.sort((a, b) => (a.matchPercentage[user.email] > b.matchPercentage[user.email]) ? -1 : 1)
            });
        } else if (e === "low" || e.target.value === "low") {
            console.log("low")

            this.setState({
                sortOrder: "low",
                offersList: this.state.offersList.sort((a, b) => (a.matchPercentage[user.email] > b.matchPercentage[user.email]) ? 1 : -1)
            });

        } else {
            this.setState({
                sortOrder: "last",
                offersList: this.state.offersList.sort((a, b) => (new Date(a.created_at) > new Date(b.created_at)) ? -1 : 1)
            })
        }
        let startIndex = this.state.itemsCountPerPage * (this.state.activePage - 1);
        let buffArray = [].concat(this.state.offersList)
        this.setState({ displayedList: buffArray.splice(startIndex, this.state.itemsCountPerPage) });
        console.log(this.state.displayedList)
    };

    isRecruiter() {
        const { isAuthenticated, user } = this.props.auth;
        return isAuthenticated && user.role !== 1
    }
    render() {
        const { isAuthenticated, user } = this.props.auth;
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        Sort by
                        <select className="dropdown-toggle ml-1 mr-1" id="lang" onChange={this.sortOffers} value={this.state.sortOrder}>
                            <option value="high">Highest Match Percentage</option>
                            <option value="low">Lowest Match Percentage</option>
                            <option value="last">Last added</option>
                        </select>
                    </div>
                    <div className="ml-auto">
                        Show
                        <select className="dropdown-toggle ml-1 mr-1" id="lang" onChange={this.setItemCount}
                            value={this.state.itemsCountPerPage}>
                            <option value="6">6</option>
                            <option value="12">12</option>
                            <option value="24">24</option>
                        </select>
                        entries
                    </div>
                </div>
                <div className="row mt-4">
                    {this.state.displayedList.map((item, index) => (
                        <OfferOverview key={index} isRecruiter={this.isRecruiter()} user={user} offer={item} />
                    ))}
                </div>
                <Pagination linkClass="page-link"
                    itemClass="page-item"
                    prevPageText="<"
                    firstPageText="<<"
                    nextPageText=">"
                    lastPageText=">>"
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.offersList.length}
                    pageRangeDisplayed={3}
                    onChange={this.handlePageChange}
                />
            </div>
        )
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
