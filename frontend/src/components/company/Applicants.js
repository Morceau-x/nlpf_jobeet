import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';

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
import { connect } from "react-redux";
import ApplicantOverview from "../ApplicantOverview";

class Applicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
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
            .post('/applicant/company', {
                company: company
            })
            .then(response => {
                console.log(response);
                //response.data.sort((a, b) => (a.matchPercentage[user.email] > b.matchPercentage[user.email]) ? -1 : 1)
                this.setState({ data: response.data });
            }).catch(err =>{
            console.log(err);
        });
    }


    render() {
        return (
            <Card>
                <CardBody>
                    <h4 className="card-title">List of all applicants to missions in the company</h4>
                    <div className="row mt-2">
                        {this.state.data.map((item, index) => (item ? <ApplicantOverview key={item.id} data={item}/> : null))}
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