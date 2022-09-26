import React, {useState, useCallback, useEffect} from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import IncomingOrderModal from '../Modals/IncomingOrderModal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {createIncomingOrder} from '../../store/actions/incomingOrder';
import IncomingService from '../../services/IncomingService';

const IncomingOrder = () => {

    const user = useSelector(state => state.authReducer.user);
    const incomingOrder = useSelector(state => state.incomingOrderReducer.incomingOrder);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const openCreateModal = () => {
        setOpen(true);
    }

    const getAllIncomingOrder = useCallback(() => {

        const payload = {
            organizationID: user._id
        }

        IncomingService.getAllIncoming(payload).then((data) => {
            dispatch(createIncomingOrder(data));
        })
    }, [dispatch, user._id]);

    useEffect(()=>{
        getAllIncomingOrder();
    },[getAllIncomingOrder])

    return(
        <div className='paymentsCaontainer'>
            { <IncomingOrderModal open={open} close={setOpen} refresh={getAllIncomingOrder} />}
            <div className='inner-pay'>
                <div className='action'>
                    <div style={{width:'150px'}} className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={{...selectStyle2, backgroundColor:"#F36A4C", color:'#fff'}}
                        >
                            <MenuItem value={10}>Create Incoming Order</MenuItem>
                            <MenuItem value={20}>Download PDF</MenuItem>
                            <MenuItem value={30}>Print</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='search'>
                    <div className='input-cont'>
                        <div className='second-select'>
                            <OutlinedInput 
                                placeholder="Search for expenses" 
                                sx={{
                                    width:'100%', 
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }} 
                            />
                        </div>
                    </div>
                    <div style={{width:'180px'}} className='butt'>
                        <Button sx={{
                            width:'100%', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'10px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  
                            onClick={openCreateModal}
                            variant="contained"> Create Incoming Order
                        </Button>
                    </div>
                </div>

                <div className='search2'>
                    <div className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={selectStyle2}
                        >
                            <MenuItem value={10}>Show entries</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </div>
                    <div style={{width:'210px'}} className='input-cont2'>
                        <div className='second-select2'>
                            <Button sx={{
                                width:'100%', 
                                height:'30px',  
                                background: '#58A0DF',
                                borderRadius: '3px',
                                fontSize:'10px',
                                '&:hover': {
                                    backgroundColor: '#58A0DF'
                                }
                                }}  variant="contained"> Download PDF
                            </Button>
                        </div>
                        <div className='second-select3'>
                            <Button sx={{
                                width:'100%', 
                                height:'30px',  
                                background: '#F36A4C',
                                borderRadius: '3px',
                                fontSize:'10px',
                                '&:hover': {
                                    backgroundColor: '#F36A4C'
                                }
                                }}  variant="contained"> Print
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='table-container'>
                    <div className='table-head'>
                        <div className='column'>S/N</div>
                        <div className='column'>Date Created</div>
                        <div className='column'>Depot Station</div>
                        <div className='column'>Destination</div>
                        <div className='column'>Products</div>
                        <div className='column'>Quantity</div>
                        <div className='column'>Product Order ID</div>
                        <div className='column'>Truck No</div>
                        <div className='column'>Waybill No</div>
                        <div className='column'>Divert status</div>
                    </div>

                    <div className='row-container'>

                        {
                            incomingOrder.length === 0?
                            <div style={place}>No Incoming Data</div>:
                            incomingOrder.map((data, index) => {
                                return(
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{data.dateCreated}</div>
                                        <div className='column'>{data.depotStation}</div>
                                        <div className='column'>{data.destination}</div>
                                        <div className='column'>{data.product}</div>
                                        <div className='column'>{data.quantity}</div>
                                        <div className='column'>{data.productOrderID}</div>
                                        <div className='column'>{data.TruckNo}</div>
                                        <div className='column'>{data.wayBillNo}</div>
                                        <div className='column'>{data.divertStatus}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='footer'>
                    <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>Showing 1 to 11 of 38 entries</div>
                    <div className='nav'>
                        <button className='but'>Previous</button>
                        <div className='num'>1</div>
                        <button className='but2'>Next</button>
                    </div>
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

const place = {
    width:'100%',
    textAlign:'center',
    fontSize:'14px',
    fontFamily:'Nunito-Regular',
    marginTop:'20px',
    color:'green'
}

export default IncomingOrder;