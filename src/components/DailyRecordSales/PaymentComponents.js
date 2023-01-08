import { Button } from "@mui/material"
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import { passRecordSales } from "../../store/actions/dailySales";
import ReactCamera from "../Modals/ReactCamera";
import AddIcon from '@mui/icons-material/Add';
import hr8 from '../../assets/hr8.png';
import swal from 'sweetalert';
import config from '../../constants';

const PaymentsComponents = (props) => {

    const [selected, setSelected] = useState(false);
    const dispatch = useDispatch();
    const gallery = useRef();
    const [open, setOpen] = useState(false);
    const linkedData = useSelector(state => state.dailySalesReducer.linkedData);
    const oneStationData = useSelector(state => state.outletReducer.adminOutlet);

    // payload data
    const [bankName, setBankName] = useState(null);
    const [posName, setPosName] = useState(null);
    const [terminalID, setTerminalID] = useState(null);
    const [tellerID, setTellerID] = useState(null);
    const [amountPaid, setAmountPaid] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [cam, setCam] = useState(null);
    const [gall, setGall] = useState(null);

    const switchPay = (data) => {
        if(data === "bank") setSelected(false);
        if(data === "pos") setSelected(true);
    }

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
        if(oneStationData === null) return swal("Warning!", "please select station", "info");
        if(typeof(bankName) === "object" && typeof(posName) === "object") return swal("Warning!", "Please add bank or pos name", "info");
        if(typeof(tellerID) === "object" && typeof(terminalID) === "object") return swal("Warning!", "Please add teller or terminal ID", "info");
        if(amountPaid === "") return swal("Warning!", "Amount field should not be empty", "info");
        if(paymentDate === "") return swal("Warning!", "Payment date field should not be empty", "info");
        if(typeof(gall) === "object" && typeof(cam) === "object") return swal("Warning!", "Please select a file", "info");

        const payload = {
            bankName: bankName,
            tellerNumber: tellerID,
            posName: posName,
            terminalID: terminalID,
            amountPaid: amountPaid,
            paymentDate: paymentDate,
            camera: cam,
            gallery: gall,
            outletID: oneStationData?._id,
            organizationID: oneStationData?.organisation,
        }

        const newList = {...linkedData};
        newList.head.data.payload.push(payload);
        dispatch(passRecordSales(newList));

        setBankName(null);
        setTellerID(null);
        setPosName(null);
        setTerminalID(null);
        setAmountPaid("");
        setPaymentDate("");
        setCam(null);
        setGall(null);

        console.log(payload, "jjjjjjjjjj")
    }

    return(
        <div style={{width:'98%', display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <ReactCamera open={open} close={setOpen} setDataUri={setCam} />

            <div className='inner-body'>
                <div className='left-supply'>
                    <div className="butts">
                        <Button 
                            variant="contained" 
                            sx={selected? active: inactive}
                            onClick={()=>{switchPay("bank")}}
                        >
                            Bank Payment
                        </Button>

                        <Button 
                            variant="contained" 
                            sx={selected? inactive: active}
                            onClick={()=>{switchPay("pos")}}
                        >
                            POS Payment
                        </Button>
                    </div>

                    {selected ||
                        <div style={{marginTop:'20px'}} className='double-form'>
                            <div className='input-d'>
                                <span>Bank Name</span>
                                <input onChange={e => setBankName(e.target.value)} className='text-field' type={'text'} />
                            </div>

                            <div className='input-d'>
                                <span>Teller ID</span>
                                <input onChange={e => setTellerID(e.target.value)} className='text-field' type={'text'} />
                            </div>
                        </div>
                    }

                    {selected &&
                        <div style={{marginTop:'20px'}} className='double-form'>
                            <div className='input-d'>
                                <span>Pos Name</span>
                                <input onChange={e => setPosName(e.target.value)} className='text-field' type={'text'} />
                            </div>

                            <div className='input-d'>
                                <span>Terminal ID</span>
                                <input onChange={e => setTerminalID(e.target.value)} className='text-field' type={'text'} />
                            </div>
                        </div>
                    }

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Amount Paid</span>
                            <input value={amountPaid} onChange={e => setAmountPaid(e.target.value)} className='text-field' type={'text'} />
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Payment Date</span>
                            <input value={paymentDate} onChange={e => setPaymentDate(e.target.value)} className='text-field' type={'date'} />
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
                        <div className="col">Bank/POS</div>
                        <div className="col">Date</div>
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
                                    <div style={{color:'#000'}} className="col">{data?.bankName === null? data?.posName: data?.bankName}</div>
                                    <div style={{color:'#000'}} className="col">{data?.paymentDate}</div>
                                    <div style={{color:'#000'}} className="col">{data?.amountPaid}</div>
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

const active = {
    width:'130px',
    height:'35px',
    fontSize:'13px',
    background:'#F0F9F7',
    color:'#000',
    border: '1.80345px solid #646363',
    borderRadius: '27.9534px',
    marginLeft:'10px',
    textTransform:'capitalize',
    '&:hover': {
        backgroundColor: '#F0F9F7'
    }
}

const inactive = {
    width:'130px',
    height:'35px',
    fontSize:'13px',
    textTransform:'capitalize',
    marginLeft:'10px',
    background: '#06805B',
    border: '1.80345px solid #646363',
    borderRadius: '27.9534px',
    '&:hover': {
        backgroundColor: '#06805B'
    }
}

const add = {
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:'30px'
}

export default PaymentsComponents;