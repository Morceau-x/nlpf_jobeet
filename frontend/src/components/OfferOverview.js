import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';


class OfferOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleClick = () => {
        this.props.history.push("/offer?id=" + this.props.offer._id);
    }

    render() {

        return (
            <div className="card bg-light mb-3" style={{ maxWidth: 18 + 'rem' }}>
                <div className="card-header">{this.props.offer.company} - {this.props.offer.matchPercentage}%</div>
                <div className="card-body">
                    <h5 className="card-title">{this.props.offer.offerName}</h5>
                    <p className="card-text">{this.props.offer.shortDesc}</p>
                    <button className="btn btn-primary" onClick={this.handleClick}>See offer</button>
                </div>
            </div>
        );

    }
}

export default withRouter(OfferOverview);
