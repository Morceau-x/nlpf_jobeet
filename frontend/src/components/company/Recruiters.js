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
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";

class Recruiters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: this.props.company,
            recruiters: []
        };
    }

    componentWillMount() {
        const {isAuthenticated, user} = this.props.auth;

        let company = user.company;
        if (user.company == null || user.company === "" || user.company === "none")
            company = this.state.company;

        if (company == null || company === "" || company === "none")
            return;

        axios
            .get('/recruiters?company=' + company)
            .then(response => {
                this.setState({recruiters: response.data});
            });
    }

    static makeCard(data) {
        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <Link to={"/profile?email=" + data.email}>
                    <Card id={data.email} className="btn btn-outline-dark text-left">
                        <CardBody>
                            <h5 className="card-title">{data.email}</h5>
                            {data.firstname + " " + data.lastname}
                        </CardBody>
                    </Card>
                </Link>
            </div>
        )
    }

    render() {

        const items = [];

        for (let i = 0; i < this.state.recruiters.length; i++) {
            let data = this.state.recruiters[i];
            items.push(Recruiters.makeCard(data))
        }

        return (
            <Card>
                <CardBody>
                    <h4 className="card-title mb-5">Recuiters of the company</h4>
                    <div className="row">
                        {items}
                    </div>
                </CardBody>
            </Card>
        );
    }
}


Recruiters.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Recruiters);
