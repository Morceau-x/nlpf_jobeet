import React, {Component} from "react";
import {Link} from 'react-router-dom'

import Offers from "./Offers";
import Recruiters from "./Recruiters";
import Applicants from "./Applicants";

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
import axios from "axios";


class Company extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            name: this.props.name,
            description: this.props.description,
            current: "Offers",
            company: query.get('company')
        };

        this.companyFillZone = this.companyFillZone.bind(this)
    }

    isRecruiter() {
        const {isAuthenticated, user} = this.props.auth;
        return isAuthenticated && user.role !== 1
    }

    componentWillMount() {
        const {isAuthenticated, user} = this.props.auth;
        let company = user.company;
        if (user.company == null || user.company === "" || user.company === "none")
            company = this.state.company;

        axios
            .get('/company?company=' + company)
            .then(response => {
                if (response != null && response.data != null) {
                    this.setState({
                        name: response.data.name,
                        description: response.data.description
                    });
                }
            });
    }

    companyFillZone(next) {
        this.setState({current: next});
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        return (
            <div className="container h-100 w-100">
                <div className="row w6100">
                    <div className="col-12 mb-5 mt-5">
                        <Card>
                            <CardBody>
                                {this.isRecruiter() ?
                                    <Link to='/company/edit'>
                                        <button type="button" className="btn btn-warning float-right">Edit</button>
                                    </Link> : <p></p>
                                }
                                <h4 className="card-title">{this.state.name}</h4>
                                {this.state.description}
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12">
                        <ul className="nav nav-tabs">
                            <li className="nav-item col-4 p-0 m-0 text-center">
                                <a className={"nav-link " + (this.state.current === "Offers" ? "active" : "")}
                                   onClick={() => this.companyFillZone("Offers")} href="#">Offers</a>
                            </li>
                            {this.isRecruiter() ?
                            <li className="nav-item col-4 p-0 m-0 text-center">
                                <a className={"nav-link " + (this.state.current === "Recruiters" ? "active" : "")}
                                   onClick={() => this.companyFillZone("Recruiters")} href="#">Recruiters</a>
                            </li>
                                : <p></p>
                            } {this.isRecruiter() ?
                            <li className="nav-item col-4 p-0 m-0 text-center">
                                <a className={"nav-link " + (this.state.current === "Applicants" ? "active" : "")}
                                   onClick={() => this.companyFillZone("Applicants")} href="#">Applicants</a>
                            </li>
                                : <p></p>
                            }
                        </ul>
                    </div>
                    <div id="companyFillZone" className="col-12 mb-5">
                        {this.state.current === "Offers" ? <Offers company={this.state.company} /> : (this.state.current === "Recruiters" ?
                            <Recruiters company={this.state.company} /> : <Applicants/>)}
                    </div>
                </div>
            </div>
        );
    }
}

Company.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Company);
