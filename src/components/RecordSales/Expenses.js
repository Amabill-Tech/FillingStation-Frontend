import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../../styles/expenses.scss';
import pluss from '../../assets/pluss.png';
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import Button from '@mui/material/Button';
import { MenuItem, Modal, Select } from '@mui/material';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import swal from 'sweetalert';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import config from '../../constants';
import ReactCamera from '../Modals/ReactCamera';

const Expenses = () => {

    const gallery = useRef();
    const [open, setOpen] = useState(false);
    const [cam, setCam] = useState(null);
    const [gall, setGall] = useState({});
    const oneOutletStation = useSelector(state => state.outletReducer.oneStation);

    const [date, setDate] = useState('');
    const [expenseName, setExpenseName] = useState('');
    const [description, setDescription] = useState('');
    const [expenseAmount, setExpenseAmount] = useState('');

    const uploadFromGallery = () => {
        gallery.current.click();
    }

    const getPictureFromCam = () => {
        setOpen(true);
    }

    const pickFromGallery = (e) => {
        let file = e.target.files[0];
        setGall(file);
    }

    const submitExpenses = () => {

        if((typeof(cam) === "string")){
            if(date === "") return swal("Warning!", "Expense date field cannot be empty", "info");
            if(expenseName === "") return swal("Warning!", "Expense name field cannot be empty", "info");
            if(description === "") return swal("Warning!", "Description field cannot be empty", "info");
            if(expenseAmount === "") return swal("Warning!", "Expense amount field cannot be empty", "info");
            if(cam === null) return swal("Warning!", "Please select a file", "info");

            const payload = {
                dateCreated: date,
                expenseName: expenseName,
                description: description,
                expenseAmount: expenseAmount,
                attachApprovalCam: cam,
                outletID: oneOutletStation._id,
                organisationID: oneOutletStation.organisation,
            }

            const url = config.BASE_URL + "/360-station/api/expenses/create";
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };
            axios.post(url, payload, httpConfig).then((data) => {
                console.log('form data', data);
            }).then(()=>{
                swal("Success!", "Expenses recorded successfully", "success"); 
            }); 

        }else{
            if(date === "") return swal("Warning!", "Expense date field cannot be empty", "info");
            if(expenseName === "") return swal("Warning!", "Expense name field cannot be empty", "info");
            if(description === "") return swal("Warning!", "Description field cannot be empty", "info");
            if(expenseAmount === "") return swal("Warning!", "Expense amount field cannot be empty", "info");
            if(typeof(gall.name) === "undefined") return swal("Warning!", "Please select a file", "info");

            const formData = new FormData();
            formData.append("dateCreated", date);
            formData.append("expenseName", expenseName);
            formData.append("description", description);
            formData.append("expenseAmount", expenseAmount);
            formData.append("attachApproval", gall);
            formData.append("outletID", oneOutletStation._id);
            formData.append("organisationID", oneOutletStation.organisation);
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };

            const url = config.BASE_URL + "/360-station/api/expenses/create";
            axios.post(url, formData, httpConfig).then((data) => {
                console.log('form data', data);
            }).then(()=>{
                swal("Success!", "Expenses recorded successfully", "success");
            });
        }
    }

    return(
        <div className='expensesContainer'>
            <ReactCamera open={open} close={setOpen} setDataUri={setCam} />
            <div className='lpos'>
                <div style={{marginTop: '20px'}} className='inputs'>
                    <div className='text'>Date Created</div>
                    <input className='date' type={'date'}  />
                </div>

                <div className='twoInputs'>
                    <div className='inputs2'>
                        <div className='text'>Expenses Name</div>
                        <input onChange={e => setExpenseName(e.target.value)} className='date' type={'text'}  />
                    </div>

                    <div className='inputs2'>
                        <div className='text'>Expenses Date</div>
                        <input onChange={e => setDate(e.target.value)} className='date' type={'date'}  />
                    </div>
                </div>

                <div style={{marginTop:'30px'}} className='inputs'>
                    <div className='text'>Description</div>
                    <textarea onChange={e => setDescription(e.target.value)} style={textAreaStyle} className='date' type={'date'}  />
                </div>

                <div style={{marginTop: '20px'}} className='inputs'>
                    <div className='text'>Expense Amount</div>
                    <input onChange={e => setExpenseAmount(e.target.value)} className='date' type={'number'}  />
                </div>

                <div style={{marginTop:'20px'}} className='inputs'>
                    <div className='text'>Expenses Invoice</div>
                    <div className='button-container'>
                        <Button onClick={getPictureFromCam} style={{background:'#216DB2', textTransform:'capitalize'}} className='buttons'>
                            <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                            <div>{typeof(cam) === "string"? "Image taken":<span>Take photo</span>}</div>
                        </Button>
                        <Button onClick={uploadFromGallery} style={{background:'#087B36', textTransform:'capitalize'}} className='buttons'>
                            <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                            <div>{typeof(gall) === "string"? "Upload":<span>File uploaded</span>}</div>
                        </Button>
                    </div>
                </div>
                <input onChange={pickFromGallery} ref={gallery} type={'file'} style={{visibility:'hidden'}} />

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
                        onClick={submitExpenses}
                        variant="contained"> Submit
                    </Button>
                </div>

                <div style={{width:'100%', height:'50px'}}></div>
            </div>
        </div>
    )
}

const textAreaStyle = {
    height:'150px',
    paddingTop:'10px',
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
    marginTop:'10px'
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default Expenses;