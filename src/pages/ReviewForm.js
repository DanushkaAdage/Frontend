import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import AdminNavbar from './components/AdminNavbar';
import './App.css';

function Reviewform() {
  return (
    <div className="bg-light">
      <AdminNavbar />
      <Container className="justify-content-center col-lg-9 col-md-10 col-sm-12 card-div">
        <Card className="w-100">
          <Card.Body>
            <Card.Title><h2>Waste collection review form</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
            <Form className="wastereviewform">
                <Row>
                    <Col>
                        <Table id="review-table" bordered hover responsive size="sm">
                            <thead>
                                <tr>
                                    <th className="py-2 px-2"></th>
                                    <th>Collection point</th>
                                    <th>Collected by</th>
                                    <th>Waste type</th>
                                    <th>Equipment</th>
                                    <th>Quantity</th>
                                    <th className="tipP">Tipping point</th>
                                    <th>Check</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>124 pt</td>
                                    <td>Robinson</td>
                                    <td>Plastic</td>
                                    <td>Bin</td>
                                    <td>24 Kg</td>
                                    <td>
                                        <Form.Control className="tipP" required type="text" placeholder="Tipping point" name="tippingPoint"  />
                                    </td>
                                    <td>
                                    {['checkbox'].map((type) => (
                                        <div key={type}>
                                            <Form.Check type={type} id={`check-api-${type}`}>
                                                <Form.Check.Input type={type} isValid />
                                            </Form.Check>
                                        </div>
                                    ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>124 pt</td>
                                    <td>Robinson</td>
                                    <td>Plastic</td>
                                    <td>Bin</td>
                                    <td>24 Kg</td>
                                    <td>
                                        <Form.Control className="tipP" required type="text" placeholder="Tipping point" name="tippingPoint"  />
                                    </td>
                                    <td>
                                    {['checkbox'].map((type) => (
                                        <div key={type}>
                                            <Form.Check type={type} id={`check-api-${type}`}>
                                                <Form.Check.Input type={type} isValid />
                                            </Form.Check>
                                        </div>
                                    ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>124 pt</td>
                                    <td>Robinson</td>
                                    <td>Plastic</td>
                                    <td>Bin</td>
                                    <td>24 Kg</td>
                                    <td>
                                        <Form.Control className="tipP" required type="text" placeholder="Tipping point" name="tippingPoint"  />
                                    </td>
                                    <td>
                                    {['checkbox'].map((type) => (
                                        <div key={type}>
                                        <Form.Check type={type} id={`check-api-${type}`}>
                                            <Form.Check.Input type={type} isValid />
                                        </Form.Check>
                                        </div>
                                    ))}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col className="flex justify-content-end">
                        <button className="btn-save" type="save">SAVE</button>
                        <button className="btn-sub" type="submit">SUBMIT FORM</button>
                    </Col>
                </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Reviewform;
