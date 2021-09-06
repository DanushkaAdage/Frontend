import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './App.css';
import NavCol from './components/NavCol';

function ForgotPassword() {
  return (
    <div className="bg-light">
      <NavCol />
      <Container className="justify-content-center card-div">
        <Card className="home-card">
          <Card.Body>
            <Card.Title><h2>Forgot Password</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
            <Form className="wastecollectionform">
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>User Email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter your Email" name="username" />
                        </Form.Group>

                        <button className="btn-signin" type="submit">Reset Password</button>
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
    </div>
  );
}

export default ForgotPassword;
