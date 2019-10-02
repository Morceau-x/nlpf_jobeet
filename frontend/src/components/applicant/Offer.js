import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";


import { Button } from 'reactstrap';


class Offer extends Component {
    constructor() {
        super();
        this.state = {
            offerID: "",
            offerName: "",
            company: "",
            recruiter: "",
            shortDesc: "",
            fullDesc: "",
            askedSkills: [],
            hiddenSkills: [],
            applicants: [],
            errors: {},
        };
    }

    componentWillMount() {
        const { isAuthenticated, user } = this.props.auth;
        const query = new URLSearchParams(this.props.location.search);
        axios
            .post('/getOfferById', {
                id: query.get('id')
            })
            .then(res => (
                this.setState(
                    {
                        offerID: query.get('id'),
                        offerName: res.data.offerName,
                        company: res.data.company,
                        recruiter: res.data.recruiter,
                        shortDesc: res.data.shortDesc,
                        fullDesc: res.data.fullDesc,
                        askedSkills: res.data.askedSkills,
                        hiddenSkills: res.data.hiddenSkills,
                        applicants: res.data.applicants
                    }
                )
            ))
    }


    applyOffer = () => {
        const { isAuthenticated, user } = this.props.auth;
        axios
            .post('/apply', {
                id: this.state.offerID,
                applicantEmail: user.email
            })
            .then(res => (
                console.log(res),
                this.setState(
                    {
                        applicants: res.data,
                    }
                )
            ))
    }

    removeCandidate = () => {
        const { isAuthenticated, user } = this.props.auth;
        console.log(this.offerID)
        axios
            .post('/removeCandidate', {
                id: this.state.offerID,
                applicantEmail: user.email
            })
            .then(res => (
                console.log(res),
                this.setState(
                    {
                        applicants: res.data,
                    }
                )
            ))
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        console.log(this.state.applicants.includes(user.email))
        const removeApply = (
            <Button onClick={this.removeCandidate} color="danger">
                Don't apply anymore
            </Button>
        )

        const beCandidate = (
            <Button onClick={this.applyOffer} color="primary">
                Apply now !
            </Button>
        )

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
                            {(this.state.applicants.includes(user.email)) ? removeApply : beCandidate}
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