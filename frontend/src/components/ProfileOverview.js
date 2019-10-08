import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from 'react-router-dom';
import axios from "axios";


class OfferOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            firstname: "",
            lastname: "",
            company: ""
        };
    }

    componentWillMount() {
        axios
            .post('/current', {
                    email: this.state.email
                }
            )
            .then(res => {
                this.setState(
                    {
                        firstname: res.data.firstname,
                        lastname: res.data.lastname,
                        company: res.data.company
                    }
                )
            });
    }

    render() {
        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card bg-light h-100 ">
                    <div className="card-header">{this.state.company}</div>
                    <div className="d-flex flex-column card-body">
                        <h5 className="card-title mt-2">{this.state.email}</h5>
                        <p className="card-text mt-2">{this.state.firstname + " " + this.state.lastname.toUpperCase()}</p>
                        <div className="mt-auto">
                            <Link to={"/profile?email=" + this.state.email}>
                                <button className="btn btn-primary">See profile</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(OfferOverview);
