import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router"


export default class OfferOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        };
    }

    handleClick = () => {
        this.setState({ isClicked: true })
    }

    render() {
        if (this.state.isClicked) {
            return <Redirect to={{
                pathname: '/offer',
                state: { id: this.props.offer._id }
            }} />
        }
        else {
            return (
                <div className="card bg-light mb-3" style={{maxWidth: 18 +'rem'}}>
                    <div className="card-header">{this.props.offer.company}</div>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.offer.offerName}</h5>
                        <p className="card-text">{this.props.offer.shortDesc}</p>
                        <a className="btn btn-primary" onClick={this.handleClick}>See offer</a>
                    </div>
                </div>
            );
        }
    }
}