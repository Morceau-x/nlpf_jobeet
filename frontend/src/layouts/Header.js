import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class Header extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Nav className="ml-auto" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            {user.firstname} {user.lastname}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <NavLink href="/profile">Profile</NavLink>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.onLogoutClick.bind(this)}>
              Logout
                        </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/register">Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      </Nav>
    );
    const applicantNav = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/dashboard">Offers</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/notifications">Notifications</NavLink>
        </NavItem>
      </Nav>
    );
    const recruiterNav = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/company">Company</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/notifications">Notifications</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/skills">Skills</NavLink>
        </NavItem>
      </Nav>
    );
    return (
      <div className="mb-2">
        <Navbar color="white" className="navbar-mern" light expand="md">
          <NavbarBrand href="/" className="d-inline pr-2 pl-2">
            <img
              alt=""
              src="favicon.ico"
              width="40"
              height="40"
              className="d-inline-block mr-2"
            />
            <h4 className="d-inline-block mr-2" >Jobeet</h4>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          {(isAuthenticated && user.role === 1) ? applicantNav : (isAuthenticated && user.role === 2) ? recruiterNav : null}
          <Collapse isOpen={this.state.isOpen} navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
