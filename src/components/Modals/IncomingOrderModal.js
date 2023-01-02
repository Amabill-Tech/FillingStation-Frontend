import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import ProductService from '../../services/productService';
import { createProductOrder } from '../../store/actions/productOrder';
import { Radio } from '@mui/material';

const IncomingOrderModal = (props) => {
    const [loading, setLoading] = useState(false);
    const [updateQantityLoaded, setUpdateQuantityLoaded] = useState("");
    const [updateCurrentBalance, setUpdateCurrentBalance] = useState("");
    const [defaultState, setDefault] = useState(0);
    const productOrder = useSelector(state => state.productOrderReducer.productOrder);
    const dispatch = useDispatch();
    const [productType, setProductType] = useState('available');
    const [quantityOrdered, setQuantityOrdered] = useState("");
    const [previousBalance, setPreviousBalance] = useState("");

    const [depotStation, setDepotStation] = useState('');
    const [destination, setDestination] = useState('');
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [dateCreated, setDateCreated] = useState('');
    const [productOrderID, setProductOrderID] = useState('');
    const [truckNo, setTruckNo] = useState('');
    const [wayBillNo, setWayBillNo] = useState('');
    const [transporter, setTransporter] = useState('');
    const [driverName, setDriverName] = useState('');
    const [phoneNo, setPhoneNumber] = useState('');
    const [val, setVal] = useState(1);

    const handleClose = () => props.close(false);

    const submit = () => {
        if(transporter === "") return swal("Warning!", "Transporter cannot be empty", "info");
        if(depotStation === "") return swal("Warning!", "Depot station field cannot be empty", "info");
        if(destination === "") return swal("Warning!", "Destination field cannot be empty", "info");
        if(product === "") return swal("Warning!", "Product field cannot be empty", "info");
        if(quantity === "") return swal("Warning!", "Quantity field cannot be empty", "info");
        if(dateCreated === "") return swal("Warning!", "Date created field cannot be empty", "info");
        if(productOrderID === "") return swal("Warning!", "Product order ID field cannot be empty", "info");
        if(truckNo === "") return swal("Warning!", "Truck No cannot be empty", "info");
        if(driverName === "") return swal("Warning!", "Driver name cannot be empty", "info");
        if(phoneNo === "") return swal("Warning!", "Phone no cannot be empty", "info");

        if(isNaN(Number(quantity))) return swal("Warning!", "Quantity field is not a number", "info");

        setLoading(true);

        const payload = {
            depotStation: depotStation,
            destination: destination,
            product: product,
            quantity: quantity,
            updateCurrentBalance: updateCurrentBalance,
            updateQantityLoaded: updateQantityLoaded,
            dateCreated: dateCreated,
            productOrderID: productOrderID,
            truckNo: truckNo,
            transporter: transporter,
            wayBillNo: wayBillNo,
            driverName: driverName,
            phoneNo: phoneNo,
            outletName: props.station.outletName,
            outletID: props.station._id,
            organizationID: props.station.organisation
        }

        IncomingService.createIncoming(payload).then((data) => {
            swal("Success", "Product order created successfully!", "success");
        }).then(()=>{
            setLoading(false);
            props.refresh();
            handleClose();
        })
    }

    const menuSelection = (e, item) => {
        if(e === 2) setProduct('PMS');
        if(e === 3) setProduct('AGO');
        if(e === 4) setProduct('DPK');
        setVal(e);
        
        const payload = {
            productType: item,
            outletID: props.station._id,
            organisationID: props.station.organisation
        }

        ProductService.getAllProductOrder2(payload).then((data) => {
            dispatch(createProductOrder(data.product.product));
        });
    }

    const changeMenu = (index, item) => {
        setDefault(index);
        setDepotStation(item.depot);
        setPreviousBalance(item.currentBalance);
        setQuantityOrdered(item.quantity);
        setProductOrderID(item._id);
    }

    const loadedQuantity = (e) => {
        setQuantity(e);
        if(quantityOrdered !== ""){
            
            if(Number(previousBalance) <= 0){
                setQuantity("");
                swal("Warning!", "This product order is fully loaded!", "info");
            }else if(Number(e) > Number(previousBalance)){
                setQuantity("");
                swal("Warning!", "Quantity loaded exceeds current Balance!", "info");
            }else{
                const loaded = Number(quantityOrdered) - Number(previousBalance) + Number(e);
                const balance = Number(quantityOrdered) - Number(loaded);

                setUpdateCurrentBalance(balance);
                setUpdateQuantityLoaded(loaded);
            }
        }else{
            swal("Warning!", "Quantity field cannot be empty!", "info");
        }
    }

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
                <div className='modalContainer2'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'>Create Incoming Order</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <div style={{marginTop:'15px'}} className='inputs'>
                                    <div className='head-text2'>Choose Order Type</div>
                                    <div className='radio'>
                                        <div className='rad-item'>
                                            <Radio onClick={()=>{setProductType('available')}} checked={productType === 'available'? true: false} />
                                            <div className='head-text2' style={{marginRight:'5px'}}>Available Order</div>
                                        </div>

                                        <div className='rad-item'>
                                            <Radio onClick={()=>{setProductType('new')}} checked={productType === 'new'? true: false} />
                                            <div className='head-text2' style={{marginRight:'5px'}}>New Order</div>
                                        </div>
                                    </div>
                                </div>
                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>Product Type</div>
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
                                    <MenuItem style={menu} value={1}>Select Product</MenuItem>
                                    <MenuItem onClick={() => {menuSelection(2, "PMS")}} style={menu} value={2}>PMS</MenuItem>
                                    <MenuItem onClick={() => {menuSelection(3, "AGO")}} style={menu} value={3}>AGO</MenuItem>
                                    <MenuItem onClick={() => {menuSelection(4, "DPK")}} style={menu} value={4}>DPK</MenuItem>
                                </Select>
                            </div>

                            {productType === 'available' &&
                                <div className='inputs'>
                                    <div className='head-text2'>Product Order </div>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={defaultState}
                                        sx={selectStyle2}
                                    >
                                        <MenuItem style={menu} value={0}>Select Product Order</MenuItem>
                                        {
                                            productOrder.map((item, index) => {
                                                return(
                                                    <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index + 1, item)}} value={index + 1}>{item.depot}</MenuItem>
                                                )
                                            })  
                                        }
                                    </Select>
                                </div>
                            }

                            <div className='inputs'>
                                <div className='head-text2'>Loading Depot</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    value={depotStation}
                                    type='text'
                                    onChange={e => setDepotStation(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Transporter</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    value={transporter}
                                    type='text'
                                    onChange={e => setTransporter(e.target.value)}
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
                                    value={destination}
                                    onChange={e => setDestination(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Quantity Orderd (ltr)</div>
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
                                    disabled
                                    value={quantityOrdered}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Current Balance (ltr)</div>
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
                                    disabled
                                    value={previousBalance}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Quantity Loaded</div>
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
                                    value={quantity}
                                    onChange={e => loadedQuantity(e.target.value)}
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
                                    value={dateCreated}
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
                                    disabled
                                    value={productOrderID}
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
                                    value={truckNo}
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
                                    value={wayBillNo}
                                    onChange={e => setWayBillNo(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Driver's Name</div>
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
                                    value={driverName}
                                    onChange={e => setDriverName(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Phone Number</div>
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
                                    value={phoneNo}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                />
                            </div>
                       </div>

                        <div style={{marginTop:'10px', height:'30px'}} className='butt'>
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
    fontSize:'12px',
    fontFamily:'Nunito-Regular'
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

export default IncomingOrderModal;