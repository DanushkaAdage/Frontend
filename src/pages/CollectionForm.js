import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import CollectorNavbar from './components/CollectorNavbar';
import './App.css';


function CollectionForm() {

  const [collectionPoint, setcollectionPoint] = useState("");
  const [wasteType, setwasteType] = useState("");
  const [quantity, setquantity] = useState("");
  const [collectedBy, setcollectedBy] = useState("");
  const [collectingEquipment, setcollectingEquipment] = useState("");
  const [date, setdate] = useState("");
  const [collectionStatus, setcollectionStatus] = useState("");

  const collection = e => {
    e.preventDefault();
    const data ={
      collectionpoint : collectionPoint,
      wastetype : wasteType,
      quantity : quantity,
      collectedby : collectedBy,
      collectingequipment : collectingEquipment,
      date : date
    };
    console.log(data);
    axios.post('http://localhost:3001/collectionform', data).then(
      (response) => {
        console.log(response);
        if(response.data.message){
          console.log(response);
          setcollectionStatus(response.data.message);
        }else{
          console.log(response);
          // setcollectionStatus(response);
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }


  return (
    <div className="bg-light">
      <CollectorNavbar />
      <Container className="justify-content-end col-lg-9 col-md-11 col-sm-12 card-div">
        <Card>
          <Card.Body>
            <Card.Title><h2>Waste collection form</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
            <Form className="wastecollectionform" onSubmit={collection}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="collectionPoint">
                    <Form.Label>Collection point</Form.Label>
                    <Form.Control required type="text" placeholder="Collection point" name="collectionPoint"
                      onChange={e => {setcollectionPoint(e.target.value)}} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="wasteType">
                    <Form.Label>Waste type</Form.Label>
                    <Form.Select required aria-label="Default select example" name="wasteType"
                      onChange={e => {setwasteType(e.target.value)}} >
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control required type="text" placeholder="Quantity" name="quantity"
                      onChange={e => {setquantity(e.target.value)}} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="collectedBy">
                    <Form.Label>Collected by</Form.Label>
                    <Form.Control required type="text" placeholder="Collected by" name="collectedBy"
                      onChange={e => {setcollectedBy(e.target.value)}} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="collectingEquipment">
                    <Form.Label>Collecting equipment</Form.Label>
                    <Form.Control required type="text" placeholder="Collected equipment" name="collectingEquipment"
                      onChange={e => {setcollectingEquipment(e.target.value)}} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date & time</Form.Label>
                    <Form.Control required placeholder="Date & time" name="date"
                      onChange={e => {setdate(e.target.value)}} />
                  </Form.Group>

                  <button className="btn-submit" type="submit">SUBMIT FORM</button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
        <h1>{collectionStatus}</h1>
      </Container>
    </div>
  );
}

export default CollectionForm;
