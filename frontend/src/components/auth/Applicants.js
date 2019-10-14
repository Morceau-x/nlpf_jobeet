import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';


import {
  Card,
  CardHeader,
  CardBody,

} from "reactstrap";
import { updateUser } from "../../actions/authActions";



class Applicants extends Component {


  constructor() {
    super();
    this.state = {
      errors: {},
      applicants: [],
    };

  }

  componentWillMount() {
    axios
      .get('/applicants')
      .then(response => (
        this.setState({
          applicants: response.data
        })
      ))
  }


  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <Card width="100%" className="btn text-left">
        <CardHeader>
          List of all applicant members on Jobeet
              </CardHeader>
        <CardBody>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Firstname</th>
                <th scope="col">Lastname</th>
                <th scope="col">Created at</th>
              </tr>
            </thead>
            <tbody>
              {this.state.applicants.map((item, index) => (
                <tr key="index">
                  <th scope="row">{index + 1}</th>
                  <td>
                    <Link to={"/profile?email=" + item.email}>
                      <a>{item.email}</a>
                    </Link></td>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{new Date(item.created_at).toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>

    );
  }
}


Applicants.propTypes = {
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
)(Applicants);
