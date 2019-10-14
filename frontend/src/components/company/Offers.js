import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
import axios from "axios";

import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    FormFeedback,
    Input
} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Pagination from "react-js-pagination";
import OfferOverview from "../OfferOverview"
import Register from "../auth/Register";
//import $ from 'jquery';


class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            display: [],
            company: this.props.company,
            owned: this.props.owned,
            nbPerPage: 6,
            activePage: 1
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.removeOffer = this.removeOffer.bind(this)
    }

    isRecruiter() {
        const {isAuthenticated, user} = this.props.auth;
        return isAuthenticated && user.role !== 1 && this.state.owned
    }

    componentWillMount() {
        const {isAuthenticated, user} = this.props.auth;

        let company = user.company;
        if (user.company == null || user.company === "" || user.company === "none")
            company = this.state.company;

        if (company == null || company === "" || company === "none")
            return;

        axios
            .get('/offers/company?company=' + company)
            .then(response => {
                this.setState({offers: response.data});
                this.onPageChange(1);
            });
    }

    onPageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        let startIndex = this.state.nbPerPage * (pageNumber - 1);
        let buffArray = [].concat(this.state.offers);
        this.setState({display: buffArray.splice(startIndex, this.state.nbPerPage)});
    }

    removeOffer(id) {
        console.log(this.state)
        let buffArray = [].concat(this.state.offers).filter(function(obj){
            return obj._id !== id;
    })
    this.setState({
        offers: buffArray
    })
    this.onPageChange(this.state.activePage)
}

    render() {
        return (
            <Card>
                <CardBody>
                    {this.isRecruiter() ?
                        <Link to='/offer/create'>
                            <button type="button" className="btn btn-warning float-right">Create offer</button>
                        </Link> : <p></p>
                    }

                    <h4 className="card-title mb-5">Offers of the company</h4>
                    <div className="row">

                    {
                        this.state.offers.length === 0 ? "No offers created yet" :
                        this.state.display.map((item) => (
                            <OfferOverview key={item._id} removeOffer={this.removeOffer} isRecruiter={true} offer={item}>
                            </OfferOverview>
                        ))
                    }

                        
                    </div>
                    <Pagination linkClass="page-link"
                                itemClass="page-item"
                                prevPageText="<"
                                firstPageText="<<"
                                nextPageText=">"
                                lastPageText=">>"
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.nbPerPage}
                                totalItemsCount={this.state.offers.length}
                                pageRangeDisplayed={3}
                                onChange={this.onPageChange}
                    />
                </CardBody>
            </Card>
        );
    }
}

Offers.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Offers);