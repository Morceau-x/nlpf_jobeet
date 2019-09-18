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
            Hello {user.name}
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Profile</DropdownItem>
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
    const candidatNav = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/dashboard">Offres</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/notifications">Notifications</NavLink>
        </NavItem>
      </Nav>
    );
    return (
      <div className="mb-2">
        <Navbar color="white" className="navbar-mern" light expand="md">
          <NavbarBrand href="/">Jobeet</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          {isAuthenticated ? candidatNav : null}
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
