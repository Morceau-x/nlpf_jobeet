import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";


import { Button, Card, CardHeader, CardBody } from 'reactstrap';


class Offer extends Component {
    constructor(props) {
        super(props);
        let query = null;
        if (this.props.location)
            query = new URLSearchParams(this.props.location.search);
        this.state = {
            offerID: this.props.id == null ? query.get('id') : this.props.id,
            offerName: "",
            company: "",
            recruiter: "",
            shortDesc: "",
            fullDesc: "",
            askedSkills: [],
            hiddenSkills: [],
            matchScore: [],
            errors: {},
            applied: false,
            removedOffer: false,
            headless: this.props.headless == null ? false : this.props.headless
        };

        this.isApplicant = this.isApplicant.bind(this)
    }

    componentWillMount() {
        const { isAuthenticated, user } = this.props.auth;

        axios
            .post('/getOfferById', {
                id: this.state.offerID
            })
            .then(res => {
                this.isApplicant();
                this.setState(
                    {
                        offerName: res.data.offerName,
                        company: res.data.company,
                        recruiter: res.data.recruiter,
                        shortDesc: res.data.shortDesc,
                        fullDesc: res.data.fullDesc,
                        askedSkills: res.data.askedSkills,
                        hiddenSkills: res.data.hiddenSkills,
                        matchScore: this.sortProperties(res.data.matchPercentage)
                    }
                );

                console.log(this.state)
            })
    }

    sortProperties(obj) {
        // convert object into array
        var sortable = [];
        for (var key in obj)
            if (obj.hasOwnProperty(key))
                sortable.push([key, obj[key]]); // each item is an array in format [key, value]

        // sort items by value
        sortable.sort(function (a, b) {
            return b[1] - a[1]; // compare numbers
        });
        return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
    }

    isRecruiter() {
        const { isAuthenticated, user } = this.props.auth;
        return isAuthenticated && user.role !== 1
    }


    isApplicant() {
        let user = this.props.auth.user;
        axios
            .post('/applicant/exist', {
                id: this.state.offerID,
                applicantEmail: user.email
            })
            .then(res => {
                this.setState(
                    {
                        applied: true,
                    }
                );
            }).catch(res => {
                this.setState(
                    {
                        applied: false
                    }
                );
            })
    }

    applyOffer = () => {
        const { isAuthenticated, user } = this.props.auth;
        axios
            .post('/applicant/add', {
                id: this.state.offerID,
                applicantEmail: user.email
            })
            .then(res => {
                this.setState(
                    {
                        applied: true,
                    }
                );
            }).catch(null)
    };

    removeOffer = () => {
        axios
            .post('/removeOffer', { id: this.state.offerID })
            .then(response => {
                if (response.status === 200) {
                    this.props.history.push("/company")
                }
            });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        let content = (
            <div className="row">
                <div className="col-2">
                    <h5 className="display-5">Skills required</h5>
                    <ul>
                        {this.state.askedSkills.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-6">
                    <h2 className="display-4">{this.state.offerName}
                        {this.isRecruiter() ?
                            null :
                            '-' + this.state.matchScore[user.email] + '%'
                        }
                    </h2>
                    <Link to={"/company?company=" + this.state.company}>
                        <h2 className="display-5">{this.state.company}</h2>
                    </Link>
                    <p>Added by {this.state.recruiter}</p>
                    <p className="lead">{this.state.shortDesc}</p>
                    <hr className="my-2" />
                    <p>{this.state.fullDesc}</p>
                    {this.isRecruiter() ?
                        null :
                        <div className="lead">
                            <div>
                                {
                                    this.state.applied ?
                                        <Button color="success">You already applied</Button>
                                        :
                                        <Button onClick={this.applyOffer} color="primary">Apply now !</Button>
                                }
                            </div>
                        </div>
                    }

                </div>
                <div className="col-3">
                    {
                        user.role === 2 && user.company === this.state.company && !this.state.headless ?
                            <div className="btn btn-outline-danger mt-3 ml-2" onClick={this.removeOffer}>Remove
                                offer</div> : null
                    }
                    {user.role === 2 && user.company === this.state.company ? Object.keys(this.state.matchScore).length > 0 ?

                        <div className="mb-4">
                            <hr className="style1 mt-5"></hr>

                            <h5 className="col-xs-1" >Suggested members for this offer</h5>
                            {this.state.matchScore.map((obj, i) => (
                                <div key={i} className="card bg-light mb-3">

                                    <div className="card-header">
                                        {obj[1]}% match with required skills
                                </div>
                                    <div className="d-flex flex-column card-body">
                                        <h5 className="card-title mt-2">{obj[0]}</h5>
                                        <div className="mt-auto">
                                            <Link to={"/profile?email=" + obj[0]}>
                                                <button className="btn btn-primary">See profile</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : <div className="row">
                            <div className="col-3 mb-5">
                            </div>
                            <h3 className="col-3 mb-5 p-2 border border-warning rounded text-center">
                                No members match the offer's skills required
                            </h3>
                            <div className="col-3 mb-5">
                            </div>
                        </div> : null
                    }

                </div>


            </div>
        );

        return this.state.headless ? content : (
            <div className="container">
                {content}
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