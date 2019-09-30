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


class EditCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Company name",
            description: "Company description",
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
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

export default EditCompany;
