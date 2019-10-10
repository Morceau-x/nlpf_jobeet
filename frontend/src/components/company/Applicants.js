import React, { Component } from "react";
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

class Applicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            company: this.props.company
        };
    }

    componentWillMount() {
        const { user } = this.props.auth;

        let company = user.company;
        if (user.company == null || user.company === "" || user.company === "none")
            company = this.state.company;

        if (company == null || company === "" || company === "none")
            return;

        axios
            .get('/offers/company?company=' + company)
            .then(response => {
                this.setState({ offers: response.data });
            });
    }


    render() {
        return (
            <Card>
                <CardBody>
                    <h4 className="card-title">List of all applicants to missions in the company</h4>
                    <div className="row mt-2">
                        {this.state.offers.map((item, index) => (
                            <div className="col-4" key={index} item={item}>
                                <div className="">
                                    <Card id={item._id} className="btn btn-outline-dark text-left">
                                    <CardHeader>
                                        {item.offerName}
                                    </CardHeader>
                                        <CardBody>
                                        {item.applicants.map((item2, index2) => (
                                            <ul key={index2} item={item2}>
                                                <li>{item2}</li>
                                            </ul>
                                        ))}
                                        </CardBody>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

Applicants.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Applicants);