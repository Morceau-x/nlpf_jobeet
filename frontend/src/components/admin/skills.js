import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Select from "react-select";
import axios from "axios";


import {
    Card,
    CardHeader,
    CardBody,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    FormFeedback,
    Input
} from "reactstrap";
import {updateUser} from "../../actions/authActions";



class Profile extends Component {


    constructor(props) {
        super(props);
        const query = new URLSearchParams(this.props.location.search);
        this.state = {
            errors: {},
            techSkillsList : [],
            softSkillsList : [],
            };

    }

    componentWillMount() {
        const {isAuthenticated, user} = this.props.auth;

        axios
            .get('/getSkillsList')
            .then(response => (
                this.setState({
                    techSkillsList : response.data.filter(s => s.type === 1),
                    softSkillsList : response.data.filter(s => s.type === 2)
                })  
            ))
    }

    handleChangeTech = selectedTechSkills => {
        this.setState({selectedTechSkills});
        console.log(`Tech Skills selected:`, this.state.selectedTechSkills);
    };

    handleChangeSoft = selectedSoftSkills => {
        this.setState({selectedSoftSkills});
        console.log(`Soft Skills selected:`, this.state.selectedSoftSkills);
    };

    onSubmit(e) {
        e.preventDefault();
        const updatedUser = {
            //techSkills: this.state.selectedTechSkills ? this.state.selectedTechSkills.map(s => s.name) : [],
            //softSkills: this.state.selectedSoftSkills ? this.state.selectedSoftSkills.map(s => s.name) : [],
        };
        //this.props.updateUser(updatedUser, this.props);
    }

    render() {
        const {errors} = this.state;
        const {isAuthenticated, user} = this.props.auth;

        return (
            <div className="container h-100">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <Card>
                            <CardHeader>Skills</CardHeader>
                            <CardBody>
                                {/* Form Starts Here */}
                                <Form onSubmit={this.onSubmit}>
                                    <FormGroup row>
                                        <Label className="text-md-right" for="firstname" sm={4}>
                                            Firstname
                                        </Label>

                                    
                                        <Label className="text-md-right" for="lastname" sm={4}>
                                            Lastname
                                        </Label>
                                        
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label className="text-md-right" for="email" sm={4}>
                                            Email
                                        </Label>
                                        
                                    
                                        <Label className="text-md-right" for="password" sm={4}>
                                            Role
                                        </Label>
                                    </FormGroup>

                                    <FormGroup>
                                        <ul>
                                            {this.state.techSkillsList.map((item, index) => (
                                                <li key={index} item = {item.name} />
                                            ))}
                                        </ul>
                                    </FormGroup>

                                    <FormGroup>
                                        <ul>
                                            {this.state.softSkillsList.map((item, index) => (
                                                <li key={index} item = {item.name} />
                                            ))}
                                        </ul>
                                    </FormGroup>

                                    {this.state.otherProfile ? <p></p> :
                                        <Col sm={{size: 10, offset: 4}} className="mt-5">
                                            <Button className="mr-5" onClick={this.editProfile}
                                                    disabled={!this.state.disable} color="primary">Edit</Button>
                                            <Button disabled={this.state.disable} color="success">Save</Button>
                                        </Col>
                                    }
                                </Form>

                                {/* Form Ends Here */}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}


Profile.propTypes = {
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
    {updateUser}
)(Profile);
