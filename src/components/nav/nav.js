import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Label,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class AppNav extends Component {
  state = {
    isOpen: false
  };
  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <Navbar expand="lg" dark color="dark">
        <NavbarBrand href="/">Super Heros</NavbarBrand>
      </Navbar>
    );
  }
}

export default AppNav;
