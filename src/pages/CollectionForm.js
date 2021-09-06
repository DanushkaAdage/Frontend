import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
// import crypto from 'cryptojs';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NavCol from './components/NavCol';


function CollectionForm() {

  const [startDate, setStartDate] = useState(new Date());
  const [collectionPoint, setcollectionPoint] = useState("");
  const [wasteType, setwasteType] = useState("");
  const [quantity, setquantity] = useState("");
  const [collectedBy, setcollectedBy] = useState("");
  const [collectingEquipment, setcollectingEquipment] = useState("");
  const [collectionStatus, setcollectionStatus] = useState("");
  const [showDanger, setshowDanger] = useState(false);
  const [showSuccess, setshowSuccess] = useState(false);

  

  useEffect(() => {
    const formdata = window.localStorage.getItem('collection-data');
    const savedValues = (JSON.parse(formdata));
    if(savedValues){
      setcollectionPoint(savedValues.collectionPoint);
      setwasteType(savedValues.wasteType);
      setquantity(savedValues.quantity);
      setcollectedBy(savedValues.collectedBy);
      setcollectingEquipment(savedValues.collectingEquipment);
    }
    
  }, []);

  useEffect(() => {
    const formValues = {collectionPoint, wasteType, quantity,collectedBy, collectingEquipment}
    window.localStorage.setItem('collection-data', JSON.stringify(formValues));
  });

  const formReset = e =>{
    setcollectionPoint("");
    setwasteType("");
    setquantity("");
    setcollectedBy("");
    setcollectingEquipment("");
  }

  const collection = e => {
    e.preventDefault();
    const data ={
      collectionpoint : collectionPoint,
      wastetype : wasteType,
      quantity : quantity,
      collectedby : collectedBy,
      collectingequipment : collectingEquipment,
      date : startDate
    };
    console.log(data);
    axios.post('http://localhost:3001/collectionform', data).then(
      (response) => {
        console.log(response);
        if(!response.err){
          if(response.data.err){
            setcollectionStatus(response.data.err.sqlMessage);
            setshowDanger(true);
          } else {
            localStorage.clear();
            formReset();
            setcollectionStatus(response.data.message);
            setshowSuccess(true);
          }
        } else {
          setcollectionStatus(response.data.err);
          setshowDanger(false);
        }
      }
    ).catch(
      (err) => {
        console.log(err);
        setcollectionStatus(err.message);
        setshowDanger(true);
      }
    )
  }


  return (
    <div className="bg-light">
      <NavCol />
      <Container className="justify-content-center col-lg-9 col-md-10 col-sm-12 card-div">
        <Card className="w-100">
          <Card.Body>
            <Card.Title><h2>Waste collection form</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
            <Form className="wastecollectionform" onSubmit={collection}>
              <Row>
                <Col lg={6} md={6} sm={12}> 

                  <Form.Group className="mb-3" controlId="collectionPoint">
                    <Form.Label>Collection point</Form.Label>
                    <Form.Control required type="text" placeholder="Collection point" name="collectionPoint"
                      onChange={e => setcollectionPoint(e.target.value)} value={collectionPoint}  />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="wasteType">
                    <Form.Label>Waste type</Form.Label>
                    <Form.Select required aria-label="Default select example" name="wasteType"
                      onChange={e => {setwasteType(e.target.value)}} value={wasteType} >
                      <option value="" disabled defaultValue>Waste Type</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Food">Food</option>
                      <option value="Paper">Paper</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Label>Quantity</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control id="quantity" required type="number" min="0" step="any" placeholder="Quantity" name="quantity" aria-label="quantity" aria-describedby="quantity"
                      onChange={e => {setquantity(e.target.value)}} value={quantity} />
                    <InputGroup.Text id="quantity">Kg</InputGroup.Text>
                  </InputGroup>

                </Col>
                <Col  lg={6} md={6} sm={12}>

                  <Form.Group className="mb-3" controlId="collectedBy">
                    <Form.Label>Collected by</Form.Label>
                    <Form.Control required type="text" placeholder="Collected by" name="collectedBy"
                      onChange={e => {setcollectedBy(e.target.value)}} value={collectedBy} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="collectingEquipment">
                    <Form.Label>Collecting equipment</Form.Label>
                    <Form.Control required type="text" placeholder="Collected equipment" name="collectingEquipment"
                      onChange={e => {setcollectingEquipment(e.target.value)}} value={collectingEquipment} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date & time</Form.Label>
                    <DatePicker className="form-control" required name="date" selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp" />
                  </Form.Group>
                  
                </Col>
              </Row>
              <Row className="btn-div">
                <button className="btn-submit w-45 mb-3" type="submit">SUBMIT FORM</button>
                {showDanger && 
                  <Alert variant="danger" className="alert-div">
                    {collectionStatus}
                  </Alert>
                }
                {showSuccess && 
                  <Alert variant="success" className="alert-div">
                    {collectionStatus}
                  </Alert>
                }
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default CollectionForm;
