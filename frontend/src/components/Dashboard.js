import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
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
        console.disableYellowBox = true;
    }

    componentWillMount() {
        const {isAuthenticated, user} = this.props.auth;
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

    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});
        let startIndex = this.state.itemsCountPerPage * (pageNumber - 1);
        let buffArray = [].concat(this.state.offersList);
        this.setState({displayedList: buffArray.splice(startIndex, this.state.itemsCountPerPage)});
    }

    render() {
        console.log(this.state.displayedList);
        return (
            <div className="container">
                <div className="row">
                    {this.state.displayedList.map((item) => (
                        <OfferOverview key={item._id} offer={item}/>
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
