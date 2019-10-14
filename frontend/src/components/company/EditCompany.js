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
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import {editCompany} from "../../actions/companyActions";


class EditCompany extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            old: this.props.name,
            name: this.props.name,
            description: this.props.description,
            current: "Offers",
            company: query.get('company'),
            owned: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    isRecruiter() {
        const {isAuthenticated, user} = this.props.auth;
        return isAuthenticated && user.role !== 1 && this.state.owned
    }

    componentWillMount() {
        const {isAuthenticated, user} = this.props.auth;
        let company = this.state.company;
        let owned = this.state.company === user.company;
        if (this.state.company == null || this.state.company === "" || this.state.company === "none") {
            company = user.company;
            owned = true
        }
        console.log(company);
        axios
            .get('/company?company=' + company)
            .then(response => {
                if (response != null && response.data != null) {
                    this.setState({
                        old: response.data.name,
                        name: response.data.name,
                        description: response.data.description,
                        owned: owned
                    });
                }
            });
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isRecruiter()) {
            let company = {
                old: this.state.old,
                name: this.state.name,
                description: this.state.description
            };
            editCompany(company);
        }
        this.props.history.push("/company");
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="container h-100 w-100">
                <div className="row w6100">
                    <div className="col-12 mb-5 mt-5">
                        <Card>
                            <CardBody>
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup row>
                                        <Label className="" for="name" sm={2}>
                                            Company name
                                        </Label>
                                        <Col sm={10}>
                                            <Input
                                                type="text"
                                                name="name"
                                                id="companyName"
                                                value={this.state.name}
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label className="" for="desc" sm={2}>
                                            Company name
                                        </Label>
                                        <Col sm={10}>
                                            <textarea
                                                name="desc"
                                                id="companyDesc"
                                                className="form-control"
                                                rows="20"
                                                value={this.state.description}
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                    </FormGroup>
                                    <button type="submit" className="btn btn-warning float-right" value="submit">Submit</button>
                                </Form>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}


EditCompany.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(EditCompany);
