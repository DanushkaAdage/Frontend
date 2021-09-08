import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './App.css';
import { DataGrid } from '@mui/x-data-grid';
import NavCol from './components/NavCol';


function Analytics() {

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            width: 95,
            sortable: true,
        },
        {
          field: 'collectionpoint',
          headerName: 'Collection Point',
          width: 181,
          sortable: true,
        },
        {
          field: 'collectedby',
          headerName: 'Collected By',
          width: 160,
          sortable: true,
        },
        {
          field: 'wastetype',
          headerName: 'Waste Type',
          width: 155,
          sortable: true,
        },
        {
          field: 'collectingequipment',
          headerName: 'Collecting Equipment',
          width: 215,
          sortable: true,
        },
        {
          field: 'quantity',
          headerName: 'Quantity',
          width: 140,
          sortable: true,
        },
        {
          field: 'dateandtime',
          headerName: 'Date & Time',
          width: 155,
          sortable: true,
        },
        {
          field: 'tippingpoint',
          headerName: 'Tipping Point',
          width: 165,
          sortable: true,
        },
        {
          field: 'blockid',
          headerName: 'Block ID',
          width: 160,
          sortable: true,
        },
    ];
   
    // const [show, setshow] = useState(false);
    const [reviewData, setreviewData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/analytics').then(
            (response) => {
                setreviewData( response.data.result);
            }
        ).catch(
            (err) => {
                console.log(err);
                // setshow(true);
                // setreviewStatus(err.message);
            }
        )
    },[reviewData])

      
    return (
        <div className="bg-light">
            <NavCol />
            <Container fluid className="col-lg-12 col-md-12 col-sm-12 card-div">
                <Card className="w-100">
                
                    <DataGrid autoHeight 
                        rows={reviewData}
                        columns={columns}
                        pageSize={10}
                    />

                    {/* <Row className="mt-3">
                        {show && 
                            <Alert variant="danger" className="alert-div">
                                {reviewStatus}
                            </Alert>
                            
                        }
                    </Row> */}

                </Card>
            </Container>
        </div>
    );
}

export default Analytics;
