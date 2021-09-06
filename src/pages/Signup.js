import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import NavCol from './components/NavCol';
import './App.css';

function Signup() {

  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [accounttype, setaccounttype] = useState("");
  const [SigninStatus, setSigninStatus] = useState("");
  const [RegStatus, setRegStatus] = useState(false);
  const [show, setshow] = useState(false);
  

  const signup = (e) => {
      e.preventDefault();
      const data ={
        username : username,
        email : email,
        password : password,
        type : accounttype
      };
      console.log(data);
      axios.post('http://localhost:3001/signup', data).then(
        (response) => {
          console.log(response);
          if(!response.err){
            if(response.data.err){
              setSigninStatus("This User Name is already in use.");
              setRegStatus(false);
              setshow(true);
            } else {
              setRegStatus(true);
            }
          } else {
            setSigninStatus(response.data.err);
            setRegStatus(false);
            setshow(true);
          }
        }
      ).catch(
        (err) => {
          console.log(err.message);
          setshow(true);
        }
      )
    
  }

  return (
    <div className="bg-light">
      <NavCol />
      <Container className="justify-content-center card-div">
        <Card className="home-card">
          <Card.Body>
            <Card.Title><h2>Create an account</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
            <Form className="wastecollectionform"  onSubmit={signup}>
                <Row>
                    <Col>
                        {show && 
                          <Alert variant="danger" className="alert-div">
                            {SigninStatus}
                          </Alert>
                        }
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Your Email" name="email" 
                              onChange={e => {setemail(e.target.value)}} />
                              <Form.Control.Feedback type="invalid">
                              Please use a valid Email
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control required type="text" placeholder="User Name" name="name" 
                              onChange={e => {setusername(e.target.value)}} />
                            <Form.Control.Feedback type="invalid">
                              Please choose a user name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="Password" name="password" autoComplete="new-password"
                              onChange={e => {setpassword(e.target.value)}} />
                            <Form.Control.Feedback type="invalid">
                              Please choose a Password.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="accounttype">
                            <Form.Label>Account Type</Form.Label>
                            <Form.Select required aria-label="Default select example" name="accounttype"
                              onChange={e => {setaccounttype(e.target.value)}} value={accounttype} >
                                <option value="" disabled defaultValue>Account Type</option>
                                <option value="Admin">Admin</option>
                                <option value="Collector">Collector</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Please choose the User Account Type.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <button className="btn-signin" type="submit">SIGN UP</button>
                    </Col>
                </Row>
                <Row>
                    <p className="bottom-para my-3">
                            Already have an account? <Link to="/login">Signin</Link>
                    </p>
                </Row>
            </Form>
          </Card.Body>
        </Card>

        {RegStatus && <Redirect to="/signupconfirm" />}
      </Container>
    </div>
  ); 
}
export default Signup;
