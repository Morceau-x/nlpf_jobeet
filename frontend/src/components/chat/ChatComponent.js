import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Dropdown, DropdownMenu, DropdownToggle, Input} from 'reactstrap';
import axios from "axios";
import $ from 'jquery';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            data: [],
            dropdownOpen: false,
            display: "",
            current: null,
            index: -1
        };

        this.enterFunction = this.enterFunction.bind(this);
        this.changeChat = this.changeChat.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    componentWillMount() {
        const {isAuthenticated, user} = this.props.auth;
        if (!isAuthenticated || user.role === 3)
            this.setState({display: "none"});

        axios
            .post('/applicant/user', {
                email: user.email
            })
            .then(response => {
                let data = response.data.filter(item => (item != null));
                let current = null;
                let chat = "";
                if (data.length > 0) {
                    current = data[0].id;
                    chat = data[0].chat;
                }
                this.setState({
                    data: data,
                    current: current,
                    chat: chat,
                    index: 0
                });
            }).catch(err => {
        });
    }

    enterFunction(event){
        if(event.keyCode === 13) {
            let input = document.getElementById("inputMessage");
            let text = input.value;
            input.value = "";
            if (text == null || text === "" || this.state.current == null)
                return;
            let user = this.props.auth.user;
            text = user.firstname + " " + user.lastname + ": " + text + "\n";
            axios.post("/message/send", {
                id: this.state.current,
                text: text
            }).then(resp => {
                let data = this.state.data;
                data[this.state.index].chat = this.state.chat + text;
                let chat = this.state.chat + text;
                this.setState({
                    chat: chat,
                    data: data
                })
            })
        }
    }

    changeChat(e) {
        let index = e.currentTarget.id;
        let current = null;
        let chat = "";
        if (index < this.state.data.length) {
            current = this.state.data[index].id;
            chat = this.state.data[index].chat;
        }
        this.setState({
            current: current,
            chat: chat,
            index: index
        });
    }

    render() {

        const bottomRight = {
            position: "fixed",
            bottom: 0,
            right: 0,
            display: this.state.display
        };

        const height50 = {
            height: "50px"
        };

        const height550 = {
            height: "550px"
        };

        return (
            <div className="w-50" style={bottomRight}>
                <div className="container">
                    <div className="row">
                        <Dropdown direction="up" isOpen={this.state.dropdownOpen} toggle={this.toggle}
                                  className="col-12 p-0">
                            <DropdownToggle className="w-100 btn-light btn-outline-primary">
                                Chat
                            </DropdownToggle>
                            <DropdownMenu className="w-100">
                                <div className="container h-100">
                                    <div className="row">
                                        <div className=" col-3 m-0 p-0">
                                            {this.state.data.map((item, index) => item == null ? null : (
                                                <div className="row m-0 p-0" key={item.id}>
                                                    <button
                                                        id={index}
                                                        className="col-12 btn btn-light btn-outline-primary m-0 p-0"
                                                        disabled={item.id === this.state.current}
                                                        onClick={this.changeChat}>
                                                        <div className="row m-0 p-0">
                                                            <p className="col-9 p-0 m-0">{item.offer.offerName + " - " + (this.props.auth.user.role === 1 ? item.offer.company : item.user.firstname + " " + item.user.lastname)}</p>
                                                            <p className="col-3 p-0 m-0">></p>
                                                        </div>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="border border-primary col-9 text-center font-italic rounded">
                                            <div className="row">
                                                <textarea className="w-100" disabled={true}
                                                          value={this.state.chat} style={height550}>

                                                </textarea>
                                            </div>
                                            <div className="row align-bottom">
                                                <input id="inputMessage"  className="form-control" style={height50} placeholder="Enter message here" onKeyDown={this.enterFunction}/>
                                            </div>
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