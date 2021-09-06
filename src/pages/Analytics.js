import React, {useEffect, useState, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import AdminNavbar from './components/AdminNavbar';
import axios from 'axios';
import './App.css';
import { useTable, useRowSelect } from 'react-table';



function Analytics() {
    
    const COLUMNS =[
        {
            Header : 'Id',
            accessor: 'collectionid'
        },
        {
            Header : 'Collection Point',
            accessor: 'collectionpoint'
        },
        {
            Header : 'Collected By',
            accessor: 'collectedby'
        },
        {
            Header : 'Waste Type',
            accessor: 'wastetype'
        },
        {
            Header : 'Collecting Equipment',
            accessor: 'collectingequipment'
        },
        {
            Header : 'Quantity',
            accessor: 'quantity'
        },
        {
            Header : 'Date & Time',
            accessor: 'dateandtime'
        },
        {
            Header: 'Tipping Point',
            accessor: 'tippingpoint',
        },
    ]
   
    const [show, setshow] = useState(false);
    const [reviewStatus, setreviewStatus] = useState("");
    const [reviewData, setreviewData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/analytics').then(
            (response) => {
                setreviewData( response.data.result);
            }
        ).catch(
            (err) => {
                console.log(err);
                setshow(true);
                setreviewStatus(err.message);
            }
        )
    },[reviewData])

    const columns = useMemo(() => COLUMNS, []);
    // const data = useMemo(() => reviewData, []);

   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        row

    } = useTable({
        columns,
        data:reviewData,
    },
    useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    ...columns,
                    {
                        id: 'blockid',
                        Header : 'Block Id',
                        Cell: ({ row }) => (
                            <p className="mb-0">{row.id}</p>
                        )
                    }
                ]
            })
        }
    );
      
    return (
        <div className="bg-light">
            <AdminNavbar />
            <Container className="justify-content-center col-lg-9 col-md-10 col-sm-12 card-div">
            <Card className="w-100">
                <Card.Body>
                <Card.Title><h2>Analytics</h2></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
                <Form className="wastereviewform">
                    <Row>
                        <Col>
                            <Table id="review-table" bordered hover responsive size="sm" {...getTableProps}>
                                <thead>
                                    {(headerGroups.map((headerGroup) =>(
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                            ))}
                                        </tr>
                                        )))
                                    }
                                </thead>
                                <tbody className="reviewtbody" {...getTableBodyProps}> 
                                    { rows.length > 0 ? (
                                            rows.map((row) => {
                                                prepareRow(row)
                                                return (
                                                    <tr {...row.getRowProps()}>
                                                        {row.cells.map((cell) =>{
                                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                                        })}
                                                    </tr>
                                                );
                                            })
                                        ):(
                                            <tr>
                                                <td colSpan="9">
                                                    <Alert variant="danger" className="alert-div mb-0">
                                                        This Table doesn't have any data for now. 
                                                    </Alert>
                                                </td>
                                                
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {show && 
                            <Alert variant="danger" className="alert-div">
                                {reviewStatus}
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

export default Analytics;
