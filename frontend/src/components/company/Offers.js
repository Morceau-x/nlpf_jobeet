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
import {Link, Route} from "react-router-dom";
import $ from 'jquery';


class Offers extends Component {
    constructor() {
        super();
        this.state = {
            offers: [{
                name: "this a test offer",
                short: "This is the description of a test offer",
                id: ""
            }, {}, {}, {}, {}, {}]
        };
    }

    makeCard(data) {
        return (
            <Card id={data.name} className="mb-5 btn btn-outline-dark text-left">
                <CardBody>
                    <h5 className="card-title">{data.name}</h5>
                    {data.short}
                </CardBody>
            </Card>

        )
    }

    render() {

        const items = [];

        for (let i = 0; i < this.state.offers.length; i++) {
            let data = this.state.offers[i];
            items.push(this.makeCard(data))
        }

        return (
            <Card>
                <CardBody>
                    <Link to='/offer/create'>
                        <button type="button" className="btn btn-warning float-right">Create offer</button>
                    </Link>
                    <h4 className="card-title mb-5">Offers of the company</h4>
                    <div>
                        {items}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

export default Offers;