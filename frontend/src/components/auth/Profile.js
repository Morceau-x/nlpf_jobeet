import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
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
import { updateUser } from "../../actions/authActions";

let techSkillsList = [

];

let softSkillsList = [

];

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      role: "",
      errors: {},
      disable: true,
      selectedTechSkills: [],
      selectedSoftSkills: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    axios
      .post('/current', {
          email: user.email
        }
      )
      .then(res => (
        this.setState(
          {
            email: res.data.email,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            role: res.data.role,
            selectedTechSkills: res.data.techSkills.map(s => {
              const skill = {};
              skill.label = s;
              skill.value = s;
              return skill;
          }),
            selectedSoftSkills: res.data.softSkills.map(s => {
              const skill = {};
              skill.label = s;
              skill.value = s;
              return skill;
          })
          },
        )
      ))
    axios
      .get('/getSkillsList')
      .then(response => (
        techSkillsList = response.data.filter(s => s.type === 1).map(s => {
          const skill = {};
          skill.label = s.name;
          skill.value = s.name;
          return skill;
      }),
        softSkillsList = response.data.filter(s => s.type === 2).map(s => {
          const skill = {};
          skill.label = s.name;
          skill.value = s.name;
          return skill;
      })
      ))
  }


  editProfile = () => {
    this.setState({ disable: false });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChangeTech = selectedTechSkills => {
    this.setState({ selectedTechSkills });
    console.log(`Tech Skills selected:`, this.state.selectedTechSkills);
  };
  handleChangeSoft = selectedSoftSkills => {
    this.setState({ selectedSoftSkills });
    console.log(`Soft Skills selected:`, this.state.selectedSoftSkills);
  };
  
  onSubmit(e) {
    e.preventDefault();
    const updatedUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      techSkills: this.state.selectedTechSkills ? this.state.selectedTechSkills.map(s => s.name) : [],
      softSkills: this.state.selectedSoftSkills ? this.state.selectedSoftSkills.map(s => s.name) : []
    };
    console.log(updatedUser)
    this.props.updateUser(updatedUser, this.props.history);
    this.setState({ disable: true });
  }

  render() {
    const { selectedTechSkills, selectedSoftSkills} = this.state;
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
                        disabled={true}
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
                        disabled={true}
                      />
                      <FormFeedback>{errors.password}</FormFeedback>
                    </Col>
                  </FormGroup>

                  <Select
                    value={this.state.selectedTechSkills}
                    isMulti
                    closeMenuOnSelect={false}
                    onChange={this.handleChangeTech}
                    isDisabled={this.state.disable}
                    options={techSkillsList}
                    className="basic-multi-select"
                    onInputChange={this.handleInputChange}
                    classNamePrefix="select-tech"
                    placeholder="Select technical skills..."
                  />

                  <Select
                    value={this.state.selectedSoftSkills}
                    isMulti
                    closeMenuOnSelect={false}
                    onChange={this.handleChangeSoft}
                    isDisabled={this.state.disable}
                    options={softSkillsList}
                    className="basic-multi-select"
                    classNamePrefix="select-soft"
                    placeholder="Select soft skills..."
                  />

                  <Col sm={{ size: 10, offset: 4 }}>
                    <Button className="mr-5" onClick={this.editProfile} disabled={!this.state.disable} color="primary">Edit</Button>
                    <Button disabled={this.state.disable} color="success" >Save</Button>
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
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateUser }
)(Profile);
