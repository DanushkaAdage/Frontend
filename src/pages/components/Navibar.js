import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './../logo.png';
import Container from 'react-bootstrap/Container';
import { NavLink } from "react-router-dom";

function Navibar() {
    return (
        <div>
            {/* <Container>
                <Nav className="justify-content-end topbar">
                    <Nav.Link href="#tel:">On Call Support</Nav.Link>
                    <Nav.Link href="#link">Help</Nav.Link>
                </Nav>
            </Container> */}
            <Navbar className="nav-div" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                        alt="SafeEnviro"
                        src={Logo}
                        width="120"
                        className="d-inline-block align-top"
                        />{' '}
                    {/* SafeEnviro */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className=" justify-content-end"  id="basic-navbar-nav">
                        <Nav>
                            {/* <NavLink className="nav-link hover" activeClassName="active" to="/collectionform">Collection Form</NavLink>

                            <NavLink className="nav-link hover" activeClassName="active" to="/reviewform">Review Table</NavLink> */}

                            <NavLink className="nav-link hover" activeClassName="active" to="/analytics">Analytics</NavLink>

                            <NavLink className="nav-link" activeClassName="active" to="/login">
                                <button className="signin">SIGN IN</button>
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Navibar;