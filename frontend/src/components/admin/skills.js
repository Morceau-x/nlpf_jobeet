import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";


import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Col,
    InputGroup,
    InputGroupAddon,
    Input
} from "reactstrap";
import { updateUser } from "../../actions/authActions";



class Skills extends Component {


    constructor() {
        super();
        this.state = {
            errors: {},
            techSkillsList: [],
            softSkillsList: [],
            editMode: false,
            inputSoft: "",
            inputTech: ""
        };
        this.removeSkill = this.removeSkill.bind(this);

    }

    componentWillMount() {
        axios
            .get('/getSkillsList')
            .then(response => (
                this.setState({
                    techSkillsList: response.data.filter(s => s.type === 1),
                    softSkillsList: response.data.filter(s => s.type === 2)
                })
            ))
    }


    onSubmit(e) {
        e.preventDefault();
        const updatedUser = {
            //techSkills: this.state.selectedTechSkills ? this.state.selectedTechSkills.map(s => s.name) : [],
            //softSkills: this.state.selectedSoftSkills ? this.state.selectedSoftSkills.map(s => s.name) : [],
        };
        //this.props.updateUser(updatedUser, this.props);
    }

    removeSkill(item) {
        if (item.type === 1) {//tech
            this.setState({
                techSkillsList: this.state.techSkillsList.filter(function (value, index, arr) {
                    return value.name !== item.name;
                })
            })
        }
        else {//soft
            this.setState({
                softSkillsList: this.state.softSkillsList.filter(function (value, index, arr) {
                    return value.name !== item.name;
                })
            })
        }
        axios
            .post('/removeSkill', {name : item.name})
            .then(response => (
                console.log(response)
            ))
    }

    editSkills = () => {
        this.setState({ editMode: !this.state.editMode });
    };

    updateSoftInput(evt) {
        this.setState({
            inputSoft: evt.target.value
        });
    }

    updateTechInput(evt) {
        this.setState({
            inputTech: evt.target.value
        });
    }

    createSkill(type) {
        if (type === 2) { //soft
            console.log(this.state.inputSoft)
            axios
            .post('/createSkill',
            {
                name : this.state.inputSoft,
                type: type
            })
            .then(response => (
                this.setState({
                    softSkillsList: this.state.softSkillsList.concat(response.data)
                })
            ))
        }
        else { //tech
            console.log(this.state.inputTech)
            axios
            .post('/createSkill',
            {
                name : this.state.inputTech,
                type: type
            })
            .then(response => (
                this.setState({
                    techSkillsList: this.state.techSkillsList.concat(response.data)
                })
            ))
        }

    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        return (
            <div className="container h-100">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <Card>
                            <CardHeader>Edit Skills</CardHeader>
                            <CardBody>
                                <div className="container">
                                    <div className="row">
                                        <div className="col ml-5">
                                            <p className="font-weight-bold">Soft Skills</p>

                                            {this.state.editMode ? <InputGroup>
                                                <Input value={this.state.inputSoft} onChange={evt => this.updateSoftInput(evt)} placeholder="Create soft skill" />
                                                <InputGroupAddon addonType="append">
                                                    <Button onClick={() => this.createSkill(2)} disabled={this.state.inputSoft === ''} color="success">+</Button>
                                                </InputGroupAddon>
                                            </InputGroup> : null}

                                            <ul>
                                                {this.state.softSkillsList.map((item, index) => (
                                                    <li key={index} item={item}>
                                                        {item.name}
                                                        {this.state.editMode ? <Button close onClick={() => this.removeSkill(item)} /> : null}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col ml-2">
                                            <p className="font-weight-bold">Technical Skills</p>

                                            {this.state.editMode ? <InputGroup>
                                                <Input value={this.state.inputTech} onChange={evt => this.updateTechInput(evt)} placeholder="Create technical skill" />
                                                <InputGroupAddon addonType="append">
                                                    <Button onClick={() => this.createSkill(1)} disabled={this.state.inputTech === ''} color="success">+</Button>
                                                </InputGroupAddon>
                                            </InputGroup> : null}

                                            <ul>
                                                {this.state.techSkillsList.map((item, index) => (
                                                    <li key={index} item={item}>
                                                        {item.name}
                                                        {this.state.editMode ? <Button close onClick={() => this.removeSkill(item)} /> : null}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <Col sm={{ size: 10, offset: 4 }} className="mt-5">
                                        {
                                            this.state.editMode ? <Button onClick={this.editSkills} className="ml-5" color="danger">Done</Button> :
                                            <Button className="ml-5" onClick={this.editSkills} disabled={this.state.editMode} color="primary">
                                                Edit
                                            </Button>
                                        }
                                    </Col>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}


Skills.propTypes = {
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
)(Skills);
