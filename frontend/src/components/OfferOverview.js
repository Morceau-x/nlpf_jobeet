import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import {
    Button,
} from "reactstrap";
import axios from "axios"

class OfferOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offer: this.props.offer,
            isRecruiter: this.props.isRecruiter,
            user: this.props.user,
            applied: false
        };
        this.removeOffer=this.removeOffer.bind(this);
        this.isApplicant = this.isApplicant.bind(this);
    }

    removeOffer() {
        axios
            .post('/removeOffer', { id : this.props.offer._id })
            .then(response => {
                if (response.status === 200) {
                    this.props.removeOffer(this.props.offer._id)
                }
            });
    }

    componentWillMount() {
        this.isApplicant()
    }

    isApplicant() {
        if (!this.state || !this.state.user)
            return;
        axios
            .post('/applicant/exist', {
                id: this.state.offer._id,
                applicantEmail: this.state.user.email
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

    render() {

        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card bg-light h-100 ">
                    <div className="card-header">
                        {this.state.offer.company}
                        {
                            this.state.isRecruiter ? null :  <span className="ml-1"> - {this.state.offer.matchPercentage[this.state.user.email]}%</span>
                        }
                    </div>
                    <div className="d-flex flex-column card-body">
                        <h5 className="card-title mt-2">{this.state.offer.offerName}</h5>
                        <p className="card-text mt-2">{this.state.offer.shortDesc}</p>
                        <div className="mt-auto w-100">
                            <Link to={"/offer?id=" + this.state.offer._id}>
                                <button className="btn btn-primary">See offer</button>
                            </Link>
                            <div className="btn btn-outline-info btn-light disabled border-info ml-2">{new Date(this.props.offer.created_at).toLocaleDateString("fr-FR")}</div>
                            { this.state.applied ? <div className="btn btn-outline-success btn-light disabled border-success ml-2">Applied</div> : null }
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default withRouter(OfferOverview);
