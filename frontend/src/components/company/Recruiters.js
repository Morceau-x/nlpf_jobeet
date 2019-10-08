import React, {Component} from "react";

import {Card, CardBody} from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import ProfileOverview from "../ProfileOverview"
import Pagination from "react-js-pagination";

class Recruiters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: this.props.company,
            recruiters: [],
            display: [],
            nbPerPage: 6,
            activePage: 1
        };
    }

    componentWillMount() {
        const {isAuthenticated, user} = this.props.auth;

        let company = user.company;
        if (user.company == null || user.company === "" || user.company === "none")
            company = this.state.company;

        if (company == null || company === "" || company === "none")
            return;

        axios
            .get('/recruiters?company=' + company)
            .then(response => {
                this.setState({recruiters: response.data});
            });
    }

    render() {
        return (
            <Card>
                <CardBody>
                    <h4 className="card-title mb-5">Recruiters of the company</h4>
                    <div className="row">
                        {this.state.recruiters.map((item) => (
                            <ProfileOverview key={item.email} email={item.email}/>
                        ))}
                    </div>
                    <Pagination linkClass="page-link"
                                itemClass="page-item"
                                prevPageText="<"
                                firstPageText="<<"
                                nextPageText=">"
                                lastPageText=">>"
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.nbPerPage}
                                totalItemsCount={this.state.recruiters.length}
                                pageRangeDisplayed={3}
                                onChange={this.onPageChange}
                    />
                </CardBody>
            </Card>
        );
    }
}


Recruiters.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Recruiters);
