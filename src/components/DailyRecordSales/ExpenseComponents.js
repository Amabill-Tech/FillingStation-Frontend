import { Button } from "@mui/material";
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import hr8 from '../../assets/hr8.png';
import swal from 'sweetalert';
import axios from "axios";
import config from '../../constants';
import { passRecordSales } from "../../store/actions/dailySales";
import { useState } from "react";
import { useRef } from "react";
import ReactCamera from "../Modals/ReactCamera";

const ExpenseComponents = (props) => {

    const gallery = useRef();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const linkedData = useSelector(state => state.dailySalesReducer.linkedData);
    const formStation = useSelector(state => state.dailyRecordReducer.formStation);

    // payload data
    const [expenseName, setExpenseName] = useState("");
    const [description, setDescription] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [cam, setCam] = useState(null);
    const [gall, setGall] = useState(null);

    const deleteFromList = (index) => {
        const newList = {...linkedData};
        newList.head.data.payload.pop(index);
        dispatch(passRecordSales(newList));
    }

    const openCamera = () => {
        setOpen(true);
    }

    const openGallery = () => {
        gallery.current.click();
    }

    const pickFromGallery = (e) => {
        let file = e.target.files[0];

        const formData = new FormData();
        formData.append("file", file);
        const httpConfig = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": "Bearer "+ localStorage.getItem('token'),
            }
        };
        const url = `${config.BASE_URL}/360-station/api/upload`;
        axios.post(url, formData, httpConfig).then((data) => {
            setGall(data.data.path);
        });
    }

    const addDetailsToList = () => {
        if(formStation === null) return swal("Warning!", "please select station", "info");
        if(expenseName === "") return swal("Warning!", "Expense name field should not be empty", "info");
        if(description === "") return swal("Warning!", "Description field should not be empty", "info");
        if(expenseAmount === "") return swal("Warning!", "Expense amount field should not be empty", "info");
        if(typeof(gall) === "object" && typeof(cam) === "object") return swal("Warning!", "Please select a file", "info");

        const payload = {
            expenseName: expenseName,
            description: description,
            expenseAmount: expenseAmount,
            camera: cam,
            gallery: gall,
            outletID: formStation._id,
            organizationID: formStation.organisation,
        }

        const newList = {...linkedData};
        newList.head.data.payload.push(payload);
        dispatch(passRecordSales(newList));

        setExpenseAmount("");
        setDescription("");
        setExpenseName("");
        setCam(null);
        setGall(null);

    }

    return(
        <div style={{width:'98%', display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <ReactCamera open={open} close={setOpen} setDataUri={setCam} />

            <div className='inner-body'>
                <div className='left-supply'>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Expense Name</span>
                            <input value={expenseName} onChange={e => setExpenseName(e.target.value)} className='text-field' type={'text'} />
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Description</span>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} style={{height:'100px'}} className='text-field' type={'text'}> </textarea>
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Expense Amount</span>
                            <input value={expenseAmount} onChange={e => setExpenseAmount(e.target.value)} className='text-field' type={'text'} />
                        </div>
                    </div>

                    <div style={{marginTop:'30px'}} className='double-form'>
                        <div className='input-d'>
                            <Button 
                                variant="contained" 
                                onClick={openCamera}
                                sx={{
                                    width:'100%',
                                    height:'35px',
                                    background:'#216DB2',
                                    fontSize:'13px',
                                    borderRadius:'5px',
                                    textTransform:'capitalize',
                                    '&:hover': {
                                        backgroundColor: '#216DB2'
                                    }
                                }}
                            >
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                                <div>{typeof(cam) === "string"? "Image taken":<span>Take photo</span>}</div>
                            </Button>
                        </div>

                        <div className='input-d'>
                            <Button 
                                onClick={openGallery}
                                variant="contained" 
                                sx={{
                                    width:'100%',
                                    height:'35px',
                                    background:'#087B36',
                                    fontSize:'13px',
                                    borderRadius:'5px',
                                    textTransform:'capitalize',
                                    '&:hover': {
                                        backgroundColor: '#087B36'
                                    }
                                }}
                            >
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                                <div>{typeof(gall) === "string"? "File uploaded":<span>Upload</span>}</div>
                            </Button>
                        </div>
                    </div>

                    <div style={add}>
                        <Button sx={{
                            width:'140px', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'11px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  
                            onClick={addDetailsToList}
                            variant="contained"> 
                            <AddIcon sx={{marginRight:'10px'}} /> Add to List
                        </Button>
                        <input onChange={pickFromGallery} ref={gallery} style={{visibility:'hidden'}} type={'file'} />
                    </div>
                </div>

                <div className='right-supply'>
                    <div className="table-head">
                        <div className="col">S/N</div>
                        <div className="col">Expense Name</div>
                        <div className="col">Amount</div>
                        <div className="col">Action</div>
                    </div>

                    {
                        linkedData.head?.data?.payload.length === 0?
                        <div style={{marginTop:'10px'}}>No data</div>:
                        linkedData.head?.data?.payload.map((data, index) => {
                            return(
                                <div key={index} style={{background: '#fff', marginTop:'5px'}} className="table-head">
                                    <div style={{color:'#000'}} className="col">{index + 1}</div>
                                    <div style={{color:'#000'}} className="col">{data?.expenseName}</div>
                                    <div style={{color:'#000'}} className="col">{data?.expenseAmount}</div>
                                    <div style={{color:'#000'}} className="col">
                                        <img 
                                            onClick={()=>{deleteFromList(index)}} 
                                            style={{width:'22px', height:'22px'}} 
                                            src={hr8} 
                                            alt="icon" 
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const add = {
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:'30px'
}

export default ExpenseComponents;