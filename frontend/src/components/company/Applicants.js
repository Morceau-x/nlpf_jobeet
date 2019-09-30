import React, {Component} from "react";

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
import Register from "../auth/Register";
import {Route} from "react-router-dom";

class Applicants extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <Card>
                <CardBody>
                    <h4 className="card-title">List of all applicants to missions in the company</h4>
                    TODO
                </CardBody>
            </Card>
        );
    }
}

export default Applicants;