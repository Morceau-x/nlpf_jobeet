import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from 'react-router-dom';


class OfferOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: this.props.offer
        };
    }

    render() {

        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card bg-light h-100 ">
                    <div className="card-header">{this.state.offer.company}</div>
                    <div className="d-flex flex-column card-body">
                        <h5 className="card-title mt-2">{this.state.offer.offerName}</h5>
                        <p className="card-text mt-2">{this.state.offer.shortDesc}</p>
                        <div className="mt-auto">
                            <Link to={"/offer?id=" + this.state.offer._id}>
                                <button className="btn btn-primary">See offer</button>
                            </Link>
                        </div>
                    </div>
                    <span>{new Date(this.props.offer.created_at).toLocaleDateString("fr-FR")}</span>
                </div>
            </div>
        );

    }
}

export default withRouter(OfferOverview);
