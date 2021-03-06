import React, {useEffect, useState, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import './App.css';
import { useTable, useRowSelect } from 'react-table';
import { Checkbox } from './components/Checkbox';
import NavCol from './components/NavCol';
import swal from 'sweetalert';
import CryptoJS from 'crypto-js';
// import {scrypt, randomFill, createCipheriv } from 'crypto';
import Storehash from './../contracts/Storehash.json';
import Web3 from 'web3';
import { stringify } from 'uuid';



function Reviewform() {

    // function encryptData(data){
    //     const iv = CryptoJS.enc.Base64.parse("");
    //     const key = CryptoJS.SHA256("message");
    //     if(typeof data == "string") {
    //         data = data.slice();
    //         const encryptString = CryptoJS.AES.encrypt( data, key, {
    //             iv: iv,
    //             mode: CryptoJS.mode.CBC,
    //             padding: CryptoJS.pad.pkcs7
    //         });
    //         return(encryptString.toString());
    //     } else {
    //         const encryptString = CryptoJS.AES.encrypt(JSON.stringify('0x', data), key, {
    //             iv: iv,
    //             mode: CryptoJS.mode.CBC,
    //             padding: CryptoJS.pad.pkcs7
    //         });
    //         return(encryptString.toString());
    //     }
        
    // }

    const [wasteHash, setWasteHash] = useState();
    const [retrieve, setRetrieve] = useState();
    const [Account, setAccount] = useState();
    const loadBlockchain = async () => { //contract delpoyed with ganach
        // setLoading(true);
        if(typeof window.ethereum == "undefined") {
            return;
        }
        const web3 = new Web3(window.ethereum);
    
        const accounts = await web3.eth.getAccounts();
        //setCurrentAccount(account);
    
        if (accounts.length === 0) {
            return;
        }
        setAccount(accounts[0]);
        const networkId = await web3.eth.net.getId();
        const networkData = Storehash.networks[networkId];
        const Address = networkData["address"];
    
        if (networkId === 5777) { // if we use current netorkId it deploy. if not like id == 42 it will not work
        //   setLoading(false);
            console.log(Address);
            const StoreHashContract = new web3.eth.Contract(Storehash.abi, Address);
            
            const data = selectedFlatRows.map((row) => row.original);

            // const hash = encryptData(data);
            // console.log(hash);
            const hash = web3.utils.soliditySha3({type: 'string', value: "data"}); 
            const wasteHash = await StoreHashContract.methods.store(hash).call();
            // const wasteHash = await StoreHashContract.methods.store(data).send({from: accounts[0] , value: data });

            // setWasteHash(wasteHash);
            const retrieve = await StoreHashContract.methods.retrieve().call();
            // setRetrieve(retrieve);
        } else {
            swal({
                title: "Network Error!",
                text: "The contract is not detected by the network",
                icon: "warning",
                buttons: true,
            });
        }
        console.log(wasteHash);
        console.log(retrieve);
        console.log(Account);
    };
    


    // Create an editable cell renderer
    const EditableCell = ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData, // This is a custom function that we supplied to our table instance
    }) => {
        // We need to keep and update the state of the cell normally
        const [value, setValue] = useState(initialValue)

        const onChange = e => {
        setValue(e.target.value)
        }

        // We'll only update the external data when the input is blurred
        const onBlur = () => {
        updateMyData(index, id, value)
        }

        // If the initialValue is changed external, sync it up with our state
        useEffect(() => {
        setValue(initialValue)
        }, [initialValue])

        return <input className="tipP" placeholder="Insert Tipping Point" value={value} onChange={onChange} onBlur={onBlur} />
    }

    // Set our editable cell renderer as the default Cell renderer
    // const defaultColumn = {
    //     Cell: EditableCell,
    // }

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
            Cell : EditableCell
        },
    ]
   
    const [showDanger, setshowDanger] = useState(false);
    const [showSuccess, setshowSuccess] = useState(false);
    const [reviewStatus, setreviewStatus] = useState("");
    const [reviewData, setreviewData] = useState([]);
    const [originalData,setoriginalData] = useState([]);
    const [skipPageReset, setSkipPageReset] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/reviewform').then(
            (response) => {
                setreviewData( response.data.result);
                setoriginalData( response.data.result);
            }
        ).catch(
            (err) => {
                console.log(err);
                setshowDanger(true);
                setreviewStatus(err.message);
            }
        )
    },[])

    
    
    

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true)
        setreviewData(old =>
            old.map((row, index) => {
            if (index === rowIndex) {
                return {
                ...old[rowIndex],
                [columnId]: value,
                }
            }
            return row
            })
        )
    }
    
    useEffect(() => {
    setSkipPageReset(false)
    }, [reviewData])

    // Let's add a data resetter/randomizer to help
    // illustrate that flow...
    const resetData = () => setreviewData(originalData);

    const columns = useMemo(() => COLUMNS, []);
    // const data = useMemo(() => reviewData, []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows
    } = useTable({
        columns,
        data:reviewData,
        autoResetPage: !skipPageReset,
        updateMyData,
    },
    useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                
                return [
                    ...columns,
                    {
                        id: 'selection',
                        Header : ({ getToggleAllRowsSelectedProps }) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox {...row.getToggleRowSelectedProps()} />
                        )
                    }
                ]
            })
        }
    );

    // const algorithm = 'aes-192-cbc';
    // const password = 'Password used to generate key';

    // scrypt(password, 'salt', 24, (err, key) => {
    // if (err) throw err;
    
    //     randomFill(new Uint8Array(16), (err, iv) => {
    //         if (err) throw err;

    //         const cipher = createCipheriv(algorithm, key, iv);

    //         let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
    //         encrypted += cipher.final('hex');
    //         console.log(encrypted);
    //     });
    // });

    
    

    const submitdata = e => {
        e.preventDefault();
        const data =  selectedFlatRows.map((row) => row.original);
        console.log(data);
        axios.post('http://localhost:3001/reviewsubmit', data).then(
            (response) => {
            console.log(response);
            if(!response.err){
                if(response.data.err){
                    if(response.data.err.sqlMessage){
                        setreviewStatus(response.data.err.sqlMessage);
                        setshowDanger(true);
                    }else{
                        setreviewStatus(response.data.err);
                        setshowDanger(true);
                    }
                    
                } else {
                    localStorage.clear();
                    setreviewStatus(response.data.message);
                    setshowSuccess(true);
                    refresh();
                    setshowDanger(false);
                }
            } else {
                setreviewStatus(response.data.err);
                setshowDanger(true);
            }
            }
        ).catch(
            (err) => {
            console.log(err);
            setreviewStatus(err.message);
            setshowDanger(true);
            }
        )
    }


    const removedata = e => {
        e.preventDefault();
        const data =  selectedFlatRows.map((row) => row.original);
        console.log(data);
        if(data.length === 0){
            setreviewStatus("Select data to be removed!");
            setshowDanger(true);
            setTimeout(function(){setshowDanger(false)},5000);
        } else {
            swal({
                title: "Are you sure?",
                text: "Once deleted, this data can not be recovered!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    axios.post('http://localhost:3001/removedata', data).then(
                        (response) => {
                            console.log(response);
                            if(!response.err){
                                if(response.data.err){
                                    if(response.data.err.sqlMessage){
                                        setreviewStatus(response.data.err.sqlMessage);
                                        setshowDanger(true);
                                        setTimeout(function(){setshowDanger(false)},5000);
                                    }else{
                                        setreviewStatus(response.data.err);
                                        setshowDanger(true);
                                        setTimeout(function(){setshowDanger(false)},5000);
                                    }
                                    
                                } else {
                                    setreviewStatus(response.data.message);
                                    setshowSuccess(true);
                                    // setTimeout(function(){setshowSuccess(false)},5000);
                                    refresh();
                                    setshowDanger(false);
                                }
                            } else {
                                setreviewStatus(response.data.err);
                                setshowDanger(true);
                                setTimeout(function(){setshowDanger(false)},5000);
                            }
                        }
                    ).catch(
                        (err) => {
                        console.log(err);
                        setreviewStatus(err.message);
                        setshowDanger(true);
                        setTimeout(function(){setshowDanger(false)},5000);
                        }
                    )
                } else {
                    setreviewStatus("Your data is safe!");
                    setshowSuccess(true);
                    setTimeout(function(){setshowSuccess(false)},5000);
                }
            });
        }
        
    }


    const refresh = () => {
        setTimeout(function(){window.location.reload()},3500);
    }
      
    return (
        <div className="bg-light">
            <NavCol />
            <Container className="justify-content-center col-lg-9 col-md-10 col-sm-12 card-div">
            <Card className="w-100">
                <Card.Body>
                <Card.Title><h2>Waste collection review form</h2></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">.</Card.Subtitle>
                <Form className="wastereviewform" onSubmit={submitdata}>
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
                    <Row>
                        <Col className="flex justify-content-start">
                            <button className="btn-reset" type="reset" onClick={resetData}>RESET</button>
                        </Col>
                        <Col className="flex justify-content-end">
                            <button className="btn-rem" onClick={removedata}>REMOVE DATA</button>
                            <button className="btn-sub" type="submit">SUBMIT FORM</button>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {showDanger && 
                            <Alert variant="danger" className="alert-div">
                                {reviewStatus}
                            </Alert>
                            
                        }
                        {showSuccess && 
                            <Alert variant="success" className="alert-div">
                                {reviewStatus}
                            </Alert>
                        }
                    </Row>
                </Form>
                </Card.Body>
            </Card>
            </Container>
            {/* <pre>
                <code>
                    {JSON.stringify(
                        {
                            selectedFlatRows: selectedFlatRows.map((row) => row.original),
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
        </div>
    );
}

export default Reviewform;
