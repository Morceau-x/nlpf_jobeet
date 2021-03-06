import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from "reactstrap";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      role: 0,//0 admin, 1 applicant, 2 recruiter
      email: "",
      password: "",
      confirm_password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setRole(role) {
    this.setState({ role: role});
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      role: this.state.role,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confirm_password
    };

    console.log(this.state)
    console.log(newUser)

    this.props.registerUser(newUser, this.props.history);
    if (!this.state.errors.length > 0) {
      this.setState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirm_password: "",
        role: 0,
        errors: {}
      });
    }
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="container h-100">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card>
              <CardHeader>Register</CardHeader>
              <CardBody>
                {/* Form Starts Here */}
                <Form noValidate onSubmit={this.onSubmit}>
                  <FormGroup row>
                    <Label className="text-md-right" for="name" sm={4}>
                      Role
                    </Label>
                    <Col sm={8}>
                    <FormGroup check>
                        <Label check>
                          <Input
                            value={this.state.applicant}
                            type="radio"
                            name="radio1"
                            onClick={() => this.setRole(0)}
                            defaultChecked={this.state.role === 0}
                            />{' '}
                          Admin
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            value={this.state.applicant}
                            type="radio"
                            name="radio1"
                            onClick={() => this.setRole(1)}
                            defaultChecked={this.state.role === 1}
                            />{' '}
                          Applicant
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                          value={this.state.recruiter}
                          type="radio"
                          name="radio1"
                          onClick={() => this.setRole(2)}
                          defaultChecked={this.state.role === 2}
                          />{' '}
                          Recruiter
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="text-md-right" for="firstname" sm={4}>
                      Firstname
                    </Label>
                    <Col sm={8}>
                      <Input
                        invalid={errors.name}
                        type="firstname"
                        name="firstname"
                        id="firstname"
                        value={this.state.firstname}
                        onChange={this.onChange}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="text-md-right" for="lastname" sm={4}>
                      Lastname
                    </Label>
                    <Col sm={8}>
                      <Input
                        invalid={errors.name}
                        type="lastname"
                        name="lastname"
                        id="lastname"
                        value={this.state.lastname}
                        onChange={this.onChange}
                      />
                      <FormFeedback>{errors.name}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="text-md-right" for="email" sm={4}>
                      Email
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="email"
                        invalid={errors.email}
                        name="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="text-md-right" for="password" sm={4}>
                      Password
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="password"
                        invalid={errors.password}
                        name="password"
                        id="password"
                        value={this.state.password}
                        onChange={this.onChange}
                      />
                      <FormFeedback>{errors.password}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label
                      className="text-md-right"
                      for="confirm_password"
                      sm={4}
                    >
                      Confirm Password
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="password"
                        name="confirm_password"
                        invalid={errors.confirm_password}
                        id="confirm_password"
                        value={this.state.confirm_password}
                        onChange={this.onChange}
                      />
                      <FormFeedback>{errors.confirm_password}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 4 }}>
                      <Button color="primary">Register</Button>
                    </Col>
                  </FormGroup>
                </Form>

                {/* Form Ends Here */}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
