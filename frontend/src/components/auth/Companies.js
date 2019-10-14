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



class Companies extends Component {


  constructor() {
    super();
    this.state = {
      errors: {},
      companies: [],
    };

  }

  componentWillMount() {
    axios
      .get('/companies')
      .then(response => (
        this.setState({
          companies: response.data
        })
      ))
  }


  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
            <Card width="100%" className="btn text-left">
              <CardHeader>
                List of all companies on Jobeet
              </CardHeader>
              <CardBody>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.companies.map((item, index) => (
                      <tr key="index">
                        <th scope="row">{index + 1}</th>
                        <td>
                          <Link to={"/company?company=" + item.name}>
                            <a>{item.name}</a>
                          </Link></td>
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


Companies.propTypes = {
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
)(Companies);
