import React, {  useState } from 'react';
import '../../styles/expenses.scss';
import Button from '@mui/material/Button';
import { MenuItem, Modal, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ReactCamera from '../Modals/ReactCamera';
import SupplyService from '../../services/supplyService';
import swal from 'sweetalert';

const Supply = () => {

    const [open, setOpen] = useState(false);
    const oneOutletStation = useSelector(state => state.outletReducer.oneStation);

    const [defaults, setDefault] = useState(10);
    const [loading, setLoading] = useState(false);
    const [productType, setProductType] = useState('PMS');
    const [transportationName, setTransportationName] = useState('');
    const [truckNo, setTruckNo] = useState('');
    const [wayBillNo, setWayBillNo] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shortage, setShortage] = useState('');
    const [date, setDate] = useState('');

    const setProduct = (value, data) => {
        setDefault(value);
        setProductType(data)
    }

    const submitSupply = () => {
        if(transportationName === "") return swal("Warning!", "Transportation name field cannot be empty", "info");
        if(truckNo === "") return swal("Warning!", "Truck no field cannot be empty", "info");
        if(wayBillNo === "") return swal("Warning!", "Waybill no field cannot be empty", "info");
        if(quantity === "") return swal("Warning!", "Quantity field cannot be empty", "info");
        if(shortage === "") return swal("Warning!", "Shortage field cannot be empty", "info");
        if(date === "") return swal("Warning!", "Date field cannot be empty", "info");

        setLoading(true);

        const payload = {
            transportationName: transportationName,
            wayBillNo: wayBillNo,
            truckNo: truckNo,
            quantity: quantity,
            productType: productType,
            shortage: shortage,
            date: date,
            outletID: oneOutletStation._id,
            organizationID: oneOutletStation.organisation
        }

        SupplyService.createSupply(payload).then((data) => { 
            swal("Success", "Supply created successfully!", "success");
        }).then(()=>{
            setLoading(false);
        })
    }

    return(
        <div className='expensesContainer'>
            <div className='lpos'>

                <div className='twoInputs'>
                    <div className='inputs2'>
                        <div className='text'>Transporter</div>
                        <input onChange={e => setTransportationName(e.target.value)} className='date' type={'text'}  />
                    </div>

                    <div className='inputs2'>
                        <div className='text'>Truck No</div>
                        <input onChange={e => setTruckNo(e.target.value)} className='date' type={'text'}  />
                    </div>
                </div>

                <div style={{marginTop: '20px'}} className='inputs'>
                    <div className='text'>Waybill No</div>
                    <input onChange={e => setWayBillNo(e.target.value)} className='date' type={'text'}  />
                </div>

                <div style={{marginTop:'20px'}} className='inputs'>
                    <div className='text'>Product Type</div>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={defaults}
                        sx={{
                            width:'100%',
                            height:'40px',
                            marginTop:'10px',
                            fontSize:'12px',                                 
                            background: 'rgba(229, 240, 237, 0.6)',
                            border: '0.938659px solid #606060',
                            borderRadius: '5.63195px',
                        }}
                    >
                        <MenuItem onClick={()=>{setProduct(10, "PMS")}} style={menu} value={10}>PMS</MenuItem>
                        <MenuItem onClick={()=>{setProduct(20, "AGO")}} style={menu} value={20}>AGO</MenuItem>
                        <MenuItem onClick={()=>{setProduct(30, "DPK")}} style={menu} value={30}>DPK</MenuItem>
                    </Select>
                </div>

                <div className='twoInputs'>
                    <div className='inputs2'>
                        <div className='text'>Quantity Loaded</div>
                        <input onChange={e => setQuantity(e.target.value)} className='date' type={'text'}  />
                    </div>

                    <div className='inputs2'>
                        <div className='text'>Date</div>
                        <input onChange={e => setDate(e.target.value)} className='date' type={'date'}  />
                    </div>
                </div>

                <div style={{marginTop: '20px'}} className='inputs'>
                    <div className='text'>Shortage/Overage</div>
                    <input onChange={e => setShortage(e.target.value)} className='date' type={'text'}  />
                </div>

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
                        onClick={submitSupply}
                        variant="contained"> Submit
                    </Button>
                </div>

                <div style={{width:'100%', height:'50px'}}></div>
            </div>
        </div>
    )
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default Supply;