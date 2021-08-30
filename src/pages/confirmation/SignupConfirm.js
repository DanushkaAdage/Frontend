import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Navibar from '../components/Navibar';
import img from '../img.png'
import '../App.css';

function SignupConfirm() {
  return (
    <div className="bg-light">
      <Navibar />
      <Container className="justify-content-center card-div">
        <Card className="home-card">
            <Card.Body>
                <Card.Title align="center">
                    <img alt="Complete" src={img} width="60" className="pb-3" /> <br />
                    You Successfully Signed Up!
                </Card.Title>
                <Card.Subtitle align="center" className="mb-2 text-muted size-12">Please go to Sign In page to login.</Card.Subtitle>
                <Form className="wastecollectionform">
                    <Row>
                        <Col>
                          <Link to="/login">
                            <button className="btn-backtosignin" type="submit">SIGN IN</button>
                          </Link>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default SignupConfirm;
