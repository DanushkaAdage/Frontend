import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navibar from './components/Navibar';
import './App.css';


function Login(){
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [LoginStatus, setLoginStatus] = useState("");
  const [auth,setauth] = useState(false);
  const [show, setshow] = useState(false);
  
  axios.defaults.withCredentials = true;

  const login = e => {
    e.preventDefault();
    const data ={
      username : username,
      password : password
    };
    axios.post('http://localhost:3001/login', data).then(
      (response) => {
        if(!response.data.auth){
          setshow(true);
          setLoginStatus(response.data.message);
        }else{
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("user", response.data.result[0].username);
          sessionStorage.setItem("acctype", response.data.result[0].type);
          sessionStorage.setItem("isAuth", response.data.auth);
          setauth(true);
        }
      }
    ).catch(
      (err) => {
        setLoginStatus(err.message);
        setshow(true);
      }
    )
  }

  useEffect(() => {
    axios.get('http://localhost:3001/login').then(
      (response) => {
        if ( response.data.loggedIn === true){
          setauth(true);
        }else{
          console.log(response);
        }
      }
    )
  },[])

  return (
    <div className="bg-light">
      <Navibar />
      <Container className="justify-content-center card-div">
        <Card className="home-card">
          <Card.Body>
            <Card.Title><h2>Sign in to your account</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
            <Form className="wastecollectionform" onSubmit={login}>
                <Row>
                    <Col>
                        {show && 
                          <Alert variant="danger" className="alert-div">
                            {LoginStatus}
                          </Alert>
                        }
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control required type="text" placeholder="User Name" name="username"
                              onChange={e => {setusername(e.target.value)}} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" name="password" autoComplete="username current-password"
                              onChange={e => {setpassword(e.target.value)}} />
                        </Form.Group>

                        <p className="bottom-para">
                          Forgot the password? <Link to="/forgotpassword">Reset</Link>
                        </p>
                        
                        <button className="btn-signin" type="submit">SIGN IN</button>
                    </Col>
                </Row>
                <Row>
                    <p className="bottom-para mt-3">
                            Don't have an account? <Link to="/signup">Signup</Link>
                    </p>
                </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      {auth && <Redirect exact to="/loginconfirm" />}
    </div>
  );
}

export default Login;