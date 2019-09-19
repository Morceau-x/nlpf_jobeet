import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

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
class Profile extends Component {
  constructor() {
    super();
    this.state = {
     email: "",
     firstname: "",
     lastname: "",
     role: "",
     errors: {},
     disable: true
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
   const { isAuthenticated, user } = this.props.auth;
   this.setState(
    {
     email: user.email,
     firstname: user.firstname,
     lastname: user.lastname,
     role: user.role
    }
   )
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  editProfile = () => {
   this.setState({ disable : false} );
}

  render() {
    const { errors } = this.state;
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className="container h-100">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card>
              <CardHeader>Profile</CardHeader>
              <CardBody>
                {/* Form Starts Here */}
                <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                    <Label className="text-md-right" for="firstname" sm={4}>
                      Firstname
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="firstname"
                        name="firstname"
                        id="firstname"
                        value={this.state.firstname}
                        onChange={this.onChange}
                        disabled={this.state.disable}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="text-md-right" for="lastname" sm={4}>
                      Lastname
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="lastname"
                        name="lastname"
                        id="lastname"
                        value={this.state.lastname}
                        onChange={this.onChange}
                        disabled={this.state.disable}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
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
                        disabled={this.state.disable}
                      />
                      <FormFeedback>{errors.email}</FormFeedback>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="text-md-right" for="password" sm={4}>
                      Role
                    </Label>
                    <Col sm={8}>
                      <Input
                        type="text"
                        name="role"
                        id="role"
                        value={this.state.role === 1 ? "Applicant" : "Recruiter"}
                        onChange={this.onChange}
                        disabled="true"
                      />
                      <FormFeedback>{errors.password}</FormFeedback>
                    </Col>
                  </FormGroup>

                    <Col sm={{ size: 10, offset: 4 }}>
                      <Button className="mr-5" onClick={this.editProfile} disabled={!this.state.disable} color="primary">Edit</Button>
                      <Button disabled={this.state.disable} color="success">Save</Button>
                    </Col>
                    
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

Profile.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Profile);
