import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SupplyModal from '../Modals/SupplyModal';
import { createSupply } from '../../store/actions/supply';
import SupplyService from '../../services/supplyService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import { getAllStations } from '../../store/actions/outlet';
import { OutlinedInput } from '@mui/material';
import PrintSupplyRecords from '../Reports/SupplyRecords';

const Supply = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [defaultState, setDefault] = useState(0);
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const supply = useSelector(state => state.supplyReducer.supply);
    const [prints, setPrints] = useState(false);

    const openPaymentModal = () => {
        setOpen(true);
    }

    const getAllSupplyData = useCallback(() => {

        const payload = {
            organizationID: user._id
        }

        SupplyService.getAllSupply(payload).then((data) => {
            dispatch(createSupply(data));
        });

        OutletService.getAllOutletStations({organisation: user._id}).then(data => {
            dispatch(getAllStations(data.station));
        });
    }, [dispatch, user._id]);

    useEffect(()=>{
        getAllSupplyData();
    },[getAllSupplyData])

    const changeMenu = (index, item ) => {
        setDefault(index);
    }

    const searchTable = (value) => {
        //dispatch(searchQuery(value));
    }

    const printReport = () => {
        setPrints(true);
    }

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            { <SupplyModal open={open} close={setOpen} refresh={getAllSupplyData} />}
            { prints && <PrintSupplyRecords allOutlets={supply} open={prints} close={setPrints}/>}
            <div className='inner-pay'>
                <div className='action'>
                    <div style={{width:'150px'}} className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={{...selectStyle2, backgroundColor:"#06805B", color:'#fff'}}
                        >
                            <MenuItem value={10}>Action</MenuItem>
                            <MenuItem onClick={openPaymentModal} value={20}>Add Payments</MenuItem>
                            <MenuItem value={30}>History</MenuItem>
                            <MenuItem onClick={printReport} value={40}>Print</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='search'>
                    <div className='input-cont'>
                        <div className='second-select'>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={defaultState}
                                sx={selectStyle2}
                            >
                                {
                                   allOutlets.map((item, index) => {
                                        return(
                                            <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index, item)}} value={index}>{item.outletName}</MenuItem>
                                        )
                                   })  
                                }
                            </Select>
                        </div>
                        <div className='second-select'>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px',  
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} 
                                    type='text'
                                    placeholder="Search" 
                                    onChange={(e) => {searchTable(e.target.value)}}
                                />
                        </div>
                    </div>
                    <div className='butt'>
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
                            onClick={openPaymentModal}
                            variant="contained"> Add Payment
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
                                }}  variant="contained"> History
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
                                }}  
                                onClick={printReport}
                                variant="contained"> Print
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='table-container'>
                    <div className='table-head'>
                        <div className='column'>S/N</div>
                        <div className='column'>Date</div>
                        <div className='column'>Transporter</div>
                        <div className='column'>Truck No</div>
                        <div className='column'>Waybill No (Amount)</div>
                        <div className='column'>Product Supply</div>
                        <div className='column'>Quantity</div>
                        <div className='column'>Shortage/Overage</div>
                    </div>

                    <div className='row-container'>
                        {
                            supply.length === 0?
                            <div style={place}>No supply data</div>:
                            supply.map((data, index) => {
                                return(
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{data.date}</div>
                                        <div className='column'>{data.transportationName}</div>
                                        <div className='column'>{data.truckNo}</div>
                                        <div className='column'>{data.wayBillNo}</div>
                                        <div className='column'>{data.productType}</div>
                                        <div className='column'>{data.quantity}</div>
                                        <div className='column'>{data.shortage}</div>
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

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default Supply;