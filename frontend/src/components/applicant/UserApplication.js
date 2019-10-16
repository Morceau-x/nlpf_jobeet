import React, {Component} from "react";
import {withRouter} from 'react-router-dom';
import Offer from "./Offer";
import Profile from "../auth/Profile";
import axios from "axios";

class UserApplication extends Component {
    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            offer: query.get('offer'),
            user: query.get('user'),
            email: query.get('email'),
            accepted: query.get('accepted')
        };

        this.onAccept = this.onAccept.bind(this);
        this.onReject = this.onReject.bind(this);
    }

    onAccept() {
        axios.post('/applicant/accept', {
            offer: this.state.offer,
            user: this.state.user
        }).then(res => (this.setState({accepted: "true"}))).catch(err =>(console.log(err)))
    }

    onReject() {
        axios.post('/applicant/reject', {
            offer: this.state.offer,
            user: this.state.user
        }).then(res => (this.props.history.push('/company'))).catch(err =>(console.log(err)))
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-5">
                        <Profile email={this.state.email} headless={true}/>
                </div>
                <div className="row justify-content-center mt-5">
                    <Offer id={this.state.offer} headless={true}/>
                </div>
                <div className="row justify-content-center mt-5 mb-5">
                    <div className="col-auto">
                        {this.state.accepted.toLowerCase() === "true" ?
                            <button className="btn btn-success disabled">Already hired</button>
                            :
                            <button className="btn btn-primary" onClick={this.onAccept}>Accept application</button>
                        }
                    </div>
                    <div className="col-auto">
                        {this.state.accepted.toLowerCase() === "true" ?
                            null
                            :
                            <button className="btn btn-danger" onClick={this.onReject}>Reject application</button>
                        }
                    </div>
                </div>
            </div>

        );

    }
}

export default withRouter(UserApplication);
