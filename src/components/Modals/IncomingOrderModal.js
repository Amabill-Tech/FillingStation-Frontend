import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import '../../styles/lpo.scss';
import IncomingService from '../../services/IncomingService';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const IncomingOrderModal = (props) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.authReducer.user);

    const [depotStation, setDepotStation] = useState('');
    const [destination, setDestination] = useState('');
    const [product, setProduct] = useState('PMS');
    const [quantity, setQuantity] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [productOrderID, setProductOrderID] = useState('');
    const [truckNo, setTruckNo] = useState('');
    const [wayBillNo, setWayBillNo] = useState('');
    const [val, setVal] = useState(1);

    const handleClose = () => props.close(false);

    const submit = () => {
        if(depotStation === "") return swal("Warning!", "Depot station field cannot be empty", "info");
        if(destination === "") return swal("Warning!", "Destination field cannot be empty", "info");
        if(product === "") return swal("Warning!", "Product field cannot be empty", "info");
        if(quantity === "") return swal("Warning!", "Quantity field cannot be empty", "info");
        if(dateCreated === "") return swal("Warning!", "Date created field cannot be empty", "info");
        if(productOrderID === "") return swal("Warning!", "Product order ID field cannot be empty", "info");
        if(truckNo === "") return swal("Warning!", "Truck No cannot be empty", "info");
        if(wayBillNo === "") return swal("Warning!", "WWybill No cannot be empty", "info");

        setLoading(true);

        const payload = {
            depotStation: depotStation,
            destination: destination,
            product: product,
            quantity: quantity,
            dateCreated: dateCreated,
            productOrderID: productOrderID,
            truckNo: truckNo,
            wayBillNo: wayBillNo,
            organizationID: user._id
        }

        IncomingService.createIncoming(payload).then((data) => {
            swal("Success", "Product order created successfully!", "success");
        }).then(()=>{
            setLoading(false);
            props.refresh();
            handleClose();
        })
    }

    const menuSelection = (e) => {
        if(Number(e.target.dataset.value) === 1) setProduct('PMS');
        if(Number(e.target.dataset.value) === 2) setProduct('AGO');
        if(Number(e.target.dataset.value) === 3) setProduct('DPK');
        setVal(e.target.dataset.value);
    }

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
                <div className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'>Create Incoming Order</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <div className='inputs'>
                                <div className='head-text2'>Depot station</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setDepotStation(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Destination</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setDestination(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>Product</div>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={val}
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }}
                                >
                                    <MenuItem onClick={(e) => {menuSelection(e)}} style={menu} value={1}>PMS</MenuItem>
                                    <MenuItem onClick={(e) => {menuSelection(e)}} style={menu} value={2}>AGO</MenuItem>
                                    <MenuItem onClick={(e) => {menuSelection(e)}} style={menu} value={3}>DPK</MenuItem>
                                </Select>
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Quantity</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='number'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Date created</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='date'
                                    onChange={e => setDateCreated(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Product Order ID</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setProductOrderID(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Truck No</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setTruckNo(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Waybill No</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setWayBillNo(e.target.value)}
                                />
                            </div>
                       </div>

                        <div style={{marginTop:'10px'}} className='butt'>
                            <Button sx={{
                                width:'100px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'10px',
                                marginTop:'0px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }} 
                                onClick={submit}
                                variant="contained"> Save
                            </Button>

                            {loading?
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#076146" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />: null
                            }
                        </div>
                        
                    </div>
                </div>
        </Modal>
    )
}

const inner = {
    width:'100%',
    height:'500px',
    overflowY: 'scroll'
}


const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default IncomingOrderModal;