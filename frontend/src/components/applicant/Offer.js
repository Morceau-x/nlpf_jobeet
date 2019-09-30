import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";


import { Jumbotron, Button } from 'reactstrap';



class Offer extends Component {
    constructor() {
        super();
        this.state = {
            offerName: "",
            company: "",
            recruiter: "",
            shortDesc: "",
            fullDesc: "",
            askedSkills: [],
            hiddenSkills: [],
            errors: {},
        };
    }

    componentWillMount() {
        const { isAuthenticated, user } = this.props.auth;

        this.setState({
            offerName: "Développeur Front End React JS",
            company: "EPITA",
            recruiter: user.firstname,
            shortDesc: "Réalisation d'un site",
            fullDesc: "Site suivant les specs techniques suivantes ...",
            askedSkills: ['React', 'Vue JS'],
        })
    }


    applyOffer = () => {
        console.log("Applying to offer")
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <h5 className="display-5">Skills required</h5>
                        <ul>
                            {this.state.askedSkills.map((item, index) => (
                                <li key={index} item={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-8">
                        <h2 className="display-4">{this.state.offerName}</h2>
                        <h2 className="display-5">{this.state.company}</h2>
                        <p>Ajoutée par {this.state.recruiter}</p>
                        <p className="lead">{this.state.shortDesc}</p>
                        <hr className="my-2" />
                        <p>{this.state.fullDesc}</p>
                        <p className="lead">
                            <Button color="primary">Apply now !</Button>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

Offer.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Offer);