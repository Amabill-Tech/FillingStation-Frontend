import React, { useRef, useState } from 'react';
import '../../styles/expenses.scss';
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import axios from 'axios';
import config from '../../constants';
import { useSelector } from 'react-redux';
import ReactCamera from '../Modals/ReactCamera';

const Payments = () => {

    const [switchTab, setSwitchTab] = useState(false);
    const [open, setOpen] = useState(false);
    const gallery1 = useRef();
    const oneOutletStation = useSelector(state => state.outletReducer.oneStation);

    const [bankName, setBankName] = useState('');
    const [tellerNumber, setTellerNumber] = useState('');
    const [posName, setPosName] = useState('');
    const [terminalID, setTerminalID] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [cam, setCam] = useState(null);
    const [gall, setGall] = useState({});

    const handleSwitchTab = () => {
        setSwitchTab(false);
    }

    const handleSwitchTab2 = () => {
        setSwitchTab(true);
    }

    const pickFromGallery = () => {
        gallery1.current.click();
    }

    const takeFromCamera = () => {
        setOpen(true);
    }

    const getFileFromGallery = (e) => {
        let file = e.target.files[0];
        setGall(file);
    }

    const submitPayment = () => {
        if((typeof(cam) === "string")){
            if(date === "") return swal("Warning!", "Payment date field cannot be empty", "info");
            if(bankName === "") return swal("Warning!", "Bank name field cannot be empty", "info");
            if(tellerNumber === "") return swal("Warning!", "Teller Number field cannot be empty", "info");
            if(amount === "") return swal("Warning!", "Amount field cannot be empty", "info");
            if(cam === null) return swal("Warning!", "Please select a file", "info");

            const payload = {
                dateCreated: null,
                bankName: bankName,
                tellerNumber: tellerNumber,
                amountPaid: amount,
                paymentDate: date,
                attachApprovalCam: cam,
                outletID: oneOutletStation._id,
                organisationID: oneOutletStation.organisation,
            }

            const url = config.BASE_URL + "/360-station/api/payment/create";
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };
            axios.post(url, payload, httpConfig).then((data) => {
                console.log('form data', data);
            }).then(()=>{
                setCam('');
                setGall({});
                swal("Success!", "Expenses recorded successfully", "success"); 
            }); 

        }else{
            if(date === "") return swal("Warning!", "Payment date field cannot be empty", "info");
            if(bankName === "") return swal("Warning!", "Bank name field cannot be empty", "info");
            if(tellerNumber === "") return swal("Warning!", "Teller Number field cannot be empty", "info");
            if(amount === "") return swal("Warning!", "Amount field cannot be empty", "info");
            if(typeof(gall.name) === "undefined") return swal("Warning!", "Please select a file", "info");

            const formData = new FormData();
            formData.append("dateCreated", null);
            formData.append("bankName", bankName);
            formData.append("tellerNumber", tellerNumber);
            formData.append("amountPaid", amount);
            formData.append("paymentDate", date);
            formData.append("attachApproval", gall);
            formData.append("outletID", oneOutletStation._id);
            formData.append("organisationID", oneOutletStation.organisation);
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };

            const url = config.BASE_URL + "/360-station/api/payment/create";
            axios.post(url, formData, httpConfig).then((data) => {
                console.log('form data', data);
            }).then(()=>{
                setCam('');
                setGall({});
                swal("Success!", "Expenses recorded successfully", "success");
            });
        }
    }

    const submitPOSpayment = () => {
        if((typeof(cam) === "string")){
            if(date === "") return swal("Warning!", "Payment date field cannot be empty", "info");
            if(posName === "") return swal("Warning!", "Bank name field cannot be empty", "info");
            if(terminalID === "") return swal("Warning!", "Teller Number field cannot be empty", "info");
            if(amount === "") return swal("Warning!", "Amount field cannot be empty", "info");
            if(cam === null) return swal("Warning!", "Please select a file", "info");

            const payload = {
                dateCreated: null,
                posName: posName,
                terminalID: terminalID,
                amountPaid: amount,
                paymentDate: date,
                attachApprovalCam: cam,
                outletID: oneOutletStation._id,
                organisationID: oneOutletStation.organisation,
            }

            const url = config.BASE_URL + "/360-station/api/pos-payment/create";
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };
            axios.post(url, payload, httpConfig).then((data) => {
                console.log('form data', data);
            }).then(()=>{
                setCam('');
                setGall({});
                swal("Success!", "Expenses recorded successfully", "success"); 
            }); 

        }else{
            if(date === "") return swal("Warning!", "Payment date field cannot be empty", "info");
            if(posName === "") return swal("Warning!", "Bank name field cannot be empty", "info");
            if(terminalID === "") return swal("Warning!", "Teller Number field cannot be empty", "info");
            if(amount === "") return swal("Warning!", "Amount field cannot be empty", "info");
            if(typeof(gall.name) === "undefined") return swal("Warning!", "Please select a file", "info");

            const formData = new FormData();
            formData.append("dateCreated", null);
            formData.append("posName", posName);
            formData.append("terminalID", terminalID);
            formData.append("amountPaid", amount);
            formData.append("paymentDate", date);
            formData.append("attachApproval", gall);
            formData.append("outletID", oneOutletStation._id);
            formData.append("organisationID", oneOutletStation.organisation);
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };

            const url = config.BASE_URL + "/360-station/api/pos-payment/create";
            axios.post(url, formData, httpConfig).then((data) => {
                console.log('form data', data);
            }).then(()=>{
                setCam('');
                setGall({});
                swal("Success!", "Expenses recorded successfully", "success");
            });
        }
    }

    return(
        <div style={{background:'#fff'}} className='lpos'>
            <ReactCamera open={open} close={setOpen} setDataUri={setCam} />
            <div style={inner}> 
                <div className='tabs'>
                    <Button sx={switchTab? inactive : active}
                        onClick={handleSwitchTab}  
                        variant="contained"> Bank Payment
                    </Button>
                    <Button sx={switchTab? active : inactive} 
                        onClick={handleSwitchTab2}  
                        variant="contained"> POS Payment
                    </Button>
                </div>

                {!switchTab?
                    <div className='cashPayment'>
                        <div style={{marginTop:'25px'}} className='inputs'>
                            <div className='text'>Date Created</div>
                            <input className='date' type={'date'}  />
                        </div>

                        <div className='twoInputs'>
                            <div className='inputs2'>
                                <div className='text'>Bank Name</div>
                                <input onChange={e => setBankName(e.target.value)} className='date' type={'text'}  />
                            </div>

                            <div className='inputs2'>
                                <div className='text'>Teller Number</div>
                                <input onChange={e => setTellerNumber(e.target.value)} className='date' type={'text'}  />
                            </div>
                        </div>

                        <div className='twoInputs'>
                            <div className='inputs2'>
                                <div className='text'>Amount Paid</div>
                                <input onChange={e => setAmount(e.target.value)} className='date' type={'text'}  />
                            </div>

                            <div className='inputs2'>
                                <div className='text'>Payment Date</div>
                                <input onChange={e => setDate(e.target.value)} className='date' type={'date'}  />
                            </div>
                        </div>

                        <div style={{marginTop:'20px'}} className='inputs'>
                            <div className='text'>Upload Teller slip</div>
                            <div className='button-container'>
                                <Button onClick={takeFromCamera} style={{background:'#216DB2'}} className='buttons'>
                                    <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                                    <div>Take Photo</div>
                                </Button>
                                <Button onClick={pickFromGallery} style={{background:'#087B36'}} className='buttons'>
                                    <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                                    <div>Upload</div>
                                </Button>
                            </div>
                        </div>
                        <input onChange={getFileFromGallery} ref={gallery1} type={'file'} style={{visibility:'hidden'}} />

                        <div className='submit'>
                            <Button sx={{
                                width:'120px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'11px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }}  
                                onClick={submitPayment}
                                variant="contained"> Submit
                            </Button>
                        </div>
                    </div>:
        
                    <div className='cashPayment'>
                    <div style={{marginTop:'25px'}} className='inputs'>
                        <div className='text'>Date Created</div>
                        <input className='date' type={'date'}  />
                    </div>

                    <div className='twoInputs'>
                        <div className='inputs2'>
                            <div className='text'>POS Name</div>
                            <input onChange={e => setPosName(e.target.value)} className='date' type={'text'}  />
                        </div>

                        <div className='inputs2'>
                            <div className='text'>Terminal ID</div>
                            <input onChange={e => setTerminalID(e.target.value)} className='date' type={'text'}  />
                        </div>
                    </div>

                    <div className='twoInputs'>
                        <div className='inputs2'>
                            <div className='text'>Amount Paid</div>
                            <input onChange={e => setAmount(e.target.value)} className='date' type={'text'}  />
                        </div>

                        <div className='inputs2'>
                            <div className='text'>Payment Date</div>
                            <input onChange={e => setDate(e.target.value)} className='date' type={'date'}  />
                        </div>
                    </div>

                    <div style={{marginTop:'20px'}} className='inputs'>
                        <div className='text'>Upload Teller slip</div>
                        <div className='button-container'>
                            <Button onClick={takeFromCamera} style={{background:'#216DB2'}} className='buttons'>
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                                <div>Take Photo</div>
                            </Button>
                            <Button onClick={pickFromGallery} style={{background:'#087B36'}} className='buttons'>
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                                <div>Upload</div>
                            </Button>
                        </div>
                    </div>
                    <input onChange={getFileFromGallery} ref={gallery1} type={'file'} style={{visibility:'hidden'}} />

                    <div className='submit'>
                        <Button sx={{
                            width:'120px', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'11px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  
                            onClick={submitPOSpayment}
                            variant="contained"> Submit
                        </Button>
                    </div>
                    </div>
                }

                <div style={{width:'100%', height:'5px'}}></div>
            </div>
        </div>
    )
}

const active = {
    width:'130px', 
    height:'30px',  
    background: '#06805B',
    borderRadius: '39px',
    fontSize:'11px',
    marginRight:'10px',
    marginTop:'20px',
    '&:hover': {
        backgroundColor: '#06805B'
    }
}

const inactive = {
    width:'130px', 
    height:'30px',  
    fontSize:'11px',
    background: '#F0F9F7',
    border: '1px solid #5B5B5B',
    borderRadius: '39px',
    color:'#000',
    marginTop:'20px',
    marginRight:'10px',
    '&:hover': {
        backgroundColor: '#F0F9F7'
    }
}

const textAreaStyle = {
    height:'150px',
    paddingTop:'10px',
}

const inner = {
    margin:'20px',
}

const selectStyle2 = {
    width:'200px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none',
    marginTop:'20px'
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default Payments;