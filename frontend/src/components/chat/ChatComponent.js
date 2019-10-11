import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {

        const bottomRight = {
            position: "fixed",
            bottom: 0,
            right: 0
        };

        return (
            <div className="w-25" style={bottomRight}>
                <div className="container">
                    <div className="row">
                        <Dropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle}
                                  className="col-12 p-0">
                            <DropdownToggle className="w-100 btn-info">
                                Chat
                            </DropdownToggle>
                            <DropdownMenu className="w-100" persist={true}>
                                <div className="container">
                                    <div className="row">
                                        <div className=" col-3 m-0 p-0">
                                            <div className="row m-0 p-0">
                                                <div className="border border-dark col-12 btn btn-light m-0 p-0">
                                                    <div className="row m-0 p-0">
                                                        <p className="col-9 p-0 m-0">Test</p>
                                                        <p className="col-3 p-0 m-0">></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row m-0 p-0">
                                                <div className="border border-dark col-12 btn btn-light m-0 p-0">
                                                    <div className="row m-0 p-0">
                                                        <p className="col-9 p-0 m-0">Test</p>
                                                        <p className="col-3 p-0 m-0">></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row m-0 p-0">
                                                <div className="border border-dark col-12 btn btn-light m-0 p-0">
                                                    <div className="row m-0 p-0">
                                                        <p className="col-9 p-0 m-0">Test</p>
                                                        <p className="col-3 p-0 m-0">></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-dark col-9 text-center font-italic rounded">
                                            This is the chat space
                                        </div>
                                    </div>
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>

            </div>
        )
    }
}

Chat.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Chat);