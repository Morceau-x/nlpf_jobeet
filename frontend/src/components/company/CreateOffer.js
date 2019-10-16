import React, { Component } from "react";

import {
  Card,
  CardBody,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input
} from "reactstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { editCompany } from "../../actions/companyActions";
import Select from "react-select";


class CreateOffer extends Component {
  constructor() {
    super();
    this.state = {
      offerName: "",
      fullDesc: "",
      shortDesc: "",
      skills: [],
      askedSkills: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  isRecruiter() {
    const { isAuthenticated, user } = this.props.auth;
    return isAuthenticated && user.role !== 1 && this.state.owned
  }

  componentWillMount() {
    const { isAuthenticated, user } = this.props.auth;
    axios
      .get('/getSkillsList')
      .then(response => (
        this.setState({
          skills: response.data
        })
      ))
  }

  onSubmit(e) {
    e.preventDefault();
    const { isAuthenticated, user } = this.props.auth;
    let offer = {
      offerName: this.state.offerName,
      fullDesc: this.state.fullDesc,
      shortDesc: this.state.shortDesc,
      askedSkills: this.state.askedSkills,
      company: user.company,
      recruiter: user.email
    };
    console.log(offer)
    axios
      .post('/createOffer', offer)
      .then(res => {
        this.props.history.push("/company");
      }).catch(res => {
        console.log(res)
      })
  }

  selectChange = (e) => {
    let select = this.refs.multiii;
    let values = [].filter.call(select.options, o => o.selected).map(o => o.value);
    this.setState({ askedSkills : values })
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
                      Offer title
                                        </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="offerName"
                        id="offerName"
                        value={this.state.name}
                        onChange={this.onChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="" for="desc" sm={2}>
                      Description
                                        </Label>
                    <Col sm={10}>
                      <textarea
                        name="fullDesc"
                        id="fullDesc"
                        className="form-control"
                        rows="10"
                        value={this.state.description}
                        onChange={this.onChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="" for="desc" sm={2}>
                      Short description
                                        </Label>
                    <Col sm={10}>
                      <textarea
                        name="shortDesc"
                        id="shortDesc"
                        className="form-control"
                        rows="5"
                        value={this.state.description}
                        onChange={this.onChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label className="" for="desc" sm={2}>
                      Skills required
                                        </Label>
                    <Col sm={10}>
                      <select multiple ref="multiii" className="form-control" id="exampleFormControlSelect2" onChange={this.selectChange}>
                        {this.state.skills.map((object, index) => (
                          <option key={index}>{object.name}</option>
                        ))}
                      </select>
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


CreateOffer.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(CreateOffer);
