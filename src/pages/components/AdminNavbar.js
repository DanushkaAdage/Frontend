import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Logo from './../logo.png';
import Container from 'react-bootstrap/Container';
import { NavLink, Redirect } from "react-router-dom";
import Web3 from 'web3';
import swal from 'sweetalert';
import metalogo from '../metamask.svg';


function AdminNavbar() {

    const [refresh, setrefresh] = useState(0);
    const [conweb,setconweb] = useState(true);
    const [isMetaMask, setisMetaMask] = useState(false)
    const loadWeb3 = () => {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable().then(
                (response) => {
                    swal({
                        title: "Connected to MetaMask!",
                        text: "Successfully connected",
                        icon: "success",
                    });
                    setconweb(false);
                }
            ).catch(
                (err) => {
                    swal({
                        title: "Not Connected to MetaMask!",
                        text: err.message,
                        icon: "warning",
                    });
                    setconweb(true);
                }
            )
        } else {
            swal({
            title: "Non ethereum browser detected!",
            text: "Please check and reconnect",
            icon: "warning",
            buttons: true,
            });
            setconweb(true);
        }
        // localStorage.setItem("conweb", conweb);
    };

    useEffect(() => {
        loadWeb3();
        if(refresh === 1) {
            setrefresh(0);
        }
    }, [refresh]);

    // const w3 = typeof web3;
    // useEffect(() => {
    //     if(typeof web3 == 'undefined'){
    //         setconweb(true);   
    //     }else{
    //         setisMetaMask(window.web3.currentProvider.isMetaMask); 
    //         setconweb(false); 
    //     }
    //     console.log(w3);
        
    // },[w3]);

    const [islogout, setislogout] = useState(false);
    const logout = () =>{
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
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
                    <Navbar.Brand href="/analytics">
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
                            {conweb && <button className="conweb" onClick={loadWeb3}><img className="metalogo" alt="Meta Mask" src={metalogo} /></button>}
                            
                            <NavLink className="nav-link hover" activeClassName="active" to="/analytics">Analytics</NavLink>

                            <NavLink className="nav-link hover" activeClassName="active" to="/reviewform">Review Table</NavLink>

                            <button className="signin" onClick={logout}>SIGN OUT</button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {islogout && <Redirect to="/logoutconfirm" />}
        </div>
    );
}

export default AdminNavbar;