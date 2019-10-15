import React, {Component} from "react";

import {Card, CardBody, Col, Form, FormGroup, Input, Label} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addCompany} from "../../actions/companyActions";


class EditCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    isRecruiter() {
        const {isAuthenticated, user} = this.props.auth;
        return isAuthenticated && user.role !== 1
    }

    componentWillMount() {
        if (!this.isRecruiter())
            this.props.history.push("/companies");
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isRecruiter()) {
            let company = {
                name: this.state.name,
                description: this.state.description
            };
            addCompany(company);
        }
        this.props.history.push("/companies");
    }

    onChange(e) {
        console.log(e.target.name + ": " + e.target.value);
        this.setState({[e.target.name]: e.target.value});

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
                                                placeholder="Company name"
                                            />
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label className="" for="desc" sm={2}>
                                            Company name
                                        </Label>
                                        <Col sm={10}>
                                            <textarea
                                                name="description"
                                                id="companyDescription"
                                                className="form-control"
                                                rows="20"
                                                defaultValue={this.state.description}
                                                onChange={this.onChange}
                                                placeholder="Company description" />
                                        </Col>
                                    </FormGroup>
                                    <button type="submit" className="btn btn-warning float-right"
                                            value="submit">Submit
                                    </button>
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
