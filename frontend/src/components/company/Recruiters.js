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

class Recruiters extends Component {
    constructor() {
        super();
    }


    render() {
        return (
            <Card>
                <CardBody>
                    <h4 className="card-title">List of all recruiters of the company</h4>
                    TODO
                </CardBody>
            </Card>
        );
    }
}

export default Recruiters;