import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './../logo.png';
import Container from 'react-bootstrap/Container';
import { NavLink, Redirect } from "react-router-dom";


function AdminNavbar() {
    const [islogout, setislogout] = useState(false);
    const logout = () =>{
        localStorage.clear();
        sessionStorage.clear();
        setislogout(true);
    }
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
                    <Navbar.Brand href="/reviewform">
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

                            <NavLink className="nav-link hover active" activeClassName="active" to="/reviewform">Review Table</NavLink>

                            <button className="signin" onClick={logout}>SIGN OUT</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {islogout && <Redirect to="/login" />}
        </div>
    );
}

export default AdminNavbar;