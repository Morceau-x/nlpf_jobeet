import React, {Component} from "react";
import {Link, withRouter} from 'react-router-dom';

class ApplicantOverview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render() {

        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card bg-light h-100 ">
                    <div className="card-header">
                        {this.state.data.user.firstname + " " + this.state.data.user.lastname.toUpperCase()}
                    </div>
                    <div className="d-flex flex-column card-body">
                        <h5 className="card-title mt-2">{this.state.data.offer.offerName}</h5>
                        <p className="card-text mt-2">{this.state.data.offer.shortDesc}</p>
                        <div className="mt-auto w-100">
                            <Link to={"/user/application?offer=" + this.state.data.offer._id + "&user=" + this.state.data.user._id + "&email=" + this.state.data.user.email + "&accepted=" + this.state.data.companyAccepted}>
                                <button className="btn btn-primary">See application</button>
                            </Link>
                            { this.state.data.matchPercentage > 80 ?
                                <div className="btn btn-outline-success btn-light disabled border-success ml-2">{this.state.data.matchPercentage}%</div>
                                :
                                <div className="btn btn-outline-danger btn-light disabled border-danger ml-2">{this.state.data.matchPercentage}%</div>
                            }
                            { this.state.data.companyAccepted ? <div className="btn btn-outline-success btn-light disabled border-success ml-2">Hired</div> : null }
                        </div>
                    </div>
                </div>
                { /*                              <div className="col-4" key={index} item={item}>
                                {item.applicants.length === 0 ? null :
                                    <Card id={item._id} className="btn btn-outline-dark text-left">
                                        <CardHeader>
                                            {item.offerName}
                                        </CardHeader>
                                        <CardBody>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Matching</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.applicants.map((item2, index2) => (
                                                        <tr>
                                                            <th scope="row">{item.applicants.indexOf(item2) + 1}</th>
                                                            <td>
                                                                <Link to={"/profile?email=" + item2}>
                                                                    <a>{item2}</a>
                                                                </Link></td>
                                                            <td>{item.matchPercentage[item2]}%</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </CardBody>
                                    </Card>
                                }
                            </div>*/}
            </div>
        );

    }
}

export default withRouter(ApplicantOverview);
