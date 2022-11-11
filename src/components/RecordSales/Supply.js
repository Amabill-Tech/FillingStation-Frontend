import React, {  useState } from 'react';
import '../../styles/expenses.scss';
import Button from '@mui/material/Button';
import { MenuItem, Modal, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SupplyService from '../../services/supplyService';
import swal from 'sweetalert';
import { ThreeDots } from 'react-loader-spinner';
import IncomingService from '../../services/IncomingService';
import { createIncomingOrder } from '../../store/actions/incomingOrder';
import OutletService from '../../services/outletService';
import { getAllOutletTanks } from '../../store/actions/outlet';

const Supply = () => {

    const [open, setOpen] = useState(false);
    const [defaultState1, setDefaultState1] = useState(0);
    const [defaultState2, setDefaultState2] = useState(0);
    const dispatch = useDispatch();
    const oneOutletStation = useSelector(state => state.outletReducer.oneStation);
    const incomingOrder = useSelector(state => state.incomingOrderReducer.incomingOrder);
    const tankList = useSelector(state => state.outletReducer.tankList);

    const [defaults, setDefault] = useState(10);
    const [loading, setLoading] = useState(false);
    const [productType, setProductType] = useState('PMS');
    const [incoming, setIncoming] = useState({});
    const [tanks, setTanks] = useState({});
    const [transportationName, setTransportationName] = useState('');
    const [truckNo, setTruckNo] = useState('');
    const [wayBillNo, setWayBillNo] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shortage, setShortage] = useState('');
    const [overage, setOverage] = useState('');
    const [date, setDate] = useState('');

    const setProduct = (value, data) => {
        setDefault(value);
        setProductType(data)

        const payload = {
            productType: data,
            outletID: oneOutletStation._id, 
            organisationID: oneOutletStation.organisation
        }
        
        IncomingService.getAllIncoming2(payload).then((data) => {
            dispatch(createIncomingOrder(data.incoming.incoming));
        });

        OutletService.getAllOutletTanks2(payload).then(data => {
            dispatch(getAllOutletTanks(data.stations));
        });
    }

    const submitSupply = () => {
        if(transportationName === "") return swal("Warning!", "Transportation name field cannot be empty", "info");
        if(truckNo === "") return swal("Warning!", "Truck no field cannot be empty", "info");
        if(wayBillNo === "") return swal("Warning!", "Waybill no field cannot be empty", "info");
        if(quantity === "") return swal("Warning!", "Quantity field cannot be empty", "info");
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

    const changeMenu1 = (index, item) => {
        setDefaultState1(index);
        setIncoming(item);
        console.log(item, 'selected incoming')
    }

    const changeMenu2 = (index, item) => {
        if('product' in incoming){
            setDefaultState2(index);
            setTanks(item);
            console.log(item, 'selected tank')

            let room = Number(item.tankCapacity) - Number(item.currentLevel);
            if(incoming.quantity <= room){
                setQuantity(incoming.quantity);
                setShortage(Number(room) - Number(incoming.quantity));
                setOverage('None');
            }else{
                setQuantity(Number(room));
                setShortage("None");
                setOverage(Number(incoming.quantity) - Number(room));
            }
        }else{
            swal("Warning!", "Please select an incoming order first", "info");
        }
    }

    const addSupplyToList = () => {
        const payload = {
            quantity: quantity,
            shortage: shortage,
            overage: overage
        }

        console.log(payload);
    }

    return(
        <div className='expensesContainer'>
            <div style={{height:'auto', marginTop:'0px'}} className='lpos'>

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
                        <MenuItem style={menu} value={10}>Select product type</MenuItem>
                        <MenuItem onClick={()=>{setProduct(20, "PMS")}} style={menu} value={20}>PMS</MenuItem>
                        <MenuItem onClick={()=>{setProduct(30, "AGO")}} style={menu} value={30}>AGO</MenuItem>
                        <MenuItem onClick={()=>{setProduct(40, "DPK")}} style={menu} value={40}>DPK</MenuItem>
                    </Select>
                </div>

                <div style={{marginTop:'20px'}} className='inputs'>
                    <div className='text'>Incoming Order</div>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={defaultState1}
                        sx={selectStyle2}
                    >
                        <MenuItem style={menu} value={0}>Select Order</MenuItem>
                        {
                            incomingOrder.map((item, index) => {
                                return(
                                    <MenuItem key={index} style={menu} onClick={()=>{changeMenu1(index + 1, item)}} value={index + 1}>{item.depotStation}</MenuItem>
                                )
                            })  
                        }
                    </Select>
                </div>

                <div style={{marginTop:'20px'}} className='inputs'>
                    <div className='text'>Product Tanks</div>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={defaultState2}
                        sx={selectStyle2}
                    >
                        <MenuItem style={menu} value={0}>Select Host Tank</MenuItem>
                        {
                            tankList.map((item, index) => {
                                return(
                                    <MenuItem key={index} style={menu} onClick={()=>{changeMenu2(index + 1, item)}} value={index + 1}>{item.tankName}</MenuItem>
                                )
                            })  
                        }
                    </Select>
                </div>

                <div className='twoInputs'>
                    <div className='inputs2'>
                        <div className='text'>Quantity Loaded</div>
                        <input value={quantity} onChange={e => setQuantity(e.target.value)} className='date' type={'text'}  />
                    </div>

                    <div className='inputs2'>
                        <div className='text'>Date</div>
                        <input onChange={e => setDate(e.target.value)} className='date' type={'date'}  />
                    </div>
                </div>

                <div className='twoInputs'>
                    <div className='inputs2'>
                        <div className='text'>Shortage</div>
                        <input value={shortage} onChange={e => setShortage(e.target.value)} className='date' type={'text'}  />
                    </div>

                    <div className='inputs2'>
                        <div className='text'>Overage</div>
                        <input value={overage} onChange={e => setOverage(e.target.value)} className='date' type={'text'}  />
                    </div>
                </div>

                <div style={{marginBottom:'0px'}} className='submit'>
                    <Button sx={{
                        width:'180px', 
                        height:'30px',  
                        background: '#427BBE',
                        borderRadius: '3px',
                        fontSize:'11px',
                        marginBottom:'20px',
                        '&:hover': {
                            backgroundColor: '#427BBE'
                        }
                        }}  
                        onClick={addSupplyToList}
                        variant="contained"> Add supply to list
                    </Button>
                </div>
            </div>

            <div className='right'>
                <div className='headers'>
                    <div className='headText'>S/N</div>
                    <div className='headText'>Transporter</div>
                    <div className='headText'>Product</div>
                    <div className='headText'>Quality</div>
                    <div className='headText'>Action</div>
                </div>

                <div className='rows'>
                    <div className='headText'>S/N</div>
                    <div className='headText'>Transporter</div>
                    <div className='headText'>Product</div>
                    <div className='headText'>Quality</div>
                    <div className='headText'>Action</div>
                </div>

                <div className='rows'>
                    <div className='headText'>S/N</div>
                    <div className='headText'>Transporter</div>
                    <div className='headText'>Product</div>
                    <div className='headText'>Quality</div>
                    <div className='headText'>Action</div>
                </div>

                <div className='rows'>
                    <div className='headText'>S/N</div>
                    <div className='headText'>Transporter</div>
                    <div className='headText'>Product</div>
                    <div className='headText'>Quality</div>
                    <div className='headText'>Action</div>
                </div>

                <div style={{marginBottom:'0px', width:'100%', height:'30px', justifyContent:'space-between'}} className='submit'>
                    <div>
                        <ThreeDots 
                            height="60" 
                            width="50" 
                            radius="9"
                            color="#076146" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{position:'absolute', zIndex:'30'}}
                            wrapperClassName=""
                            visible={false}
                        />
                    </div>
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
            </div>
        </div>
    )
}

const selectStyle2 = {
    width:'100%', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default Supply;