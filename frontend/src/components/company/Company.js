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


class Company extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Company name",
            description: "Company description",
            current: "Offers"
        };

        this.companyFillZone = this.companyFillZone.bind(this)
    }

    companyFillZone(next) {
        this.setState({current: next});
    }

    render() {
        return (
            <div className="container h-100 w-100">
                <div className="row w6100">
                    <div className="col-12 mb-5 mt-5">
                        <Card>
                            <CardBody>
                                <Link to='/company/edit'>
                                    <button type="button" className="btn btn-warning float-right">Edit</button>
                                </Link>
                                <h4 className="card-title">{this.state.name}</h4>
                                {this.state.description}
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className={"nav-link " + (this.state.current === "Offers" ? "active" : "")}
                                   onClick={() => this.companyFillZone("Offers")} href="#">Offers</a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + (this.state.current === "Recruiters" ? "active" : "")}
                                   onClick={() => this.companyFillZone("Recruiters")} href="#">Recruiters</a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link " + (this.state.current === "Applicants" ? "active" : "")}
                                   onClick={() => this.companyFillZone("Applicants")} href="#">Applicants</a>
                            </li>
                        </ul>
                    </div>
                    <div id="companyFillZone" className="col-12 mb-5">
                        {this.state.current === "Offers" ? <Offers/> : (this.state.current === "Recruiters" ?
                            <Recruiters/> : <Applicants/>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default Company;
