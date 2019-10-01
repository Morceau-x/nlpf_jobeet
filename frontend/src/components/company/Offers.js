import React, {Component} from "react";
import {Link, Route} from "react-router-dom";
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


class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offers: []
        };
    }

    isRecruiter() {
        const {isAuthenticated, user} = this.props.auth;

        return isAuthenticated && user.role !== 1
    }

    componentWillMount() {

        axios
            .get('/offers/company')
            .then(response => {
                this.setState({offers: response.data});
                console.log(response.data);
            });
    }

    static makeCard(data) {
        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <Card id={data._id} className="btn btn-outline-dark text-left">
                    <CardBody>
                        <h5 className="card-title">{data.offerName}</h5>
                        {data.shortDesc}
                    </CardBody>
                </Card>
            </div>
        )
    }

    render() {

        const items = [];

        for (let i = 0; i < this.state.offers.length; i++) {
            let data = this.state.offers[i];
            items.push(Offers.makeCard(data))
        }

        return (
            <Card>
                <CardBody>
                    {this.isRecruiter() ?
                        <Link to='/offer/create'>
                            <button type="button" className="btn btn-warning float-right">Create offer</button>
                        </Link> : <p></p>
                    }

                    <h4 className="card-title mb-5">Offers of the company</h4>
                    <div className="row">
                        {items}
                    </div>
                </CardBody>
            </Card>
        );
    }
}

Offers.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Offers);