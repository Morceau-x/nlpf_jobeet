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
            isRecruiter: this.props.isRecruiter
        };
        this.removeOffer=this.removeOffer.bind(this);
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

    render() {

        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card bg-light h-100 ">
                    <div className="card-header">
                        {this.state.offer.company}
                        {
                            this.state.isRecruiter ? <Button close onClick={this.removeOffer}/> : null
                        }
                    </div>
                    <div className="d-flex flex-column card-body">
                        <h5 className="card-title mt-2">{this.state.offer.offerName}</h5>
                        <p className="card-text mt-2">{this.state.offer.shortDesc}</p>
                        <div className="mt-auto">
                            <Link to={"/offer?id=" + this.state.offer._id}>
                                <button className="btn btn-primary">See offer</button>
                            </Link>
                        </div>
                    </div>
                    <span>{new Date(this.props.offer.created_at).toLocaleDateString("fr-FR")}</span>
                </div>
            </div>
        );

    }
}

export default withRouter(OfferOverview);
