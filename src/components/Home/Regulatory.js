import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import PaymentModal from '../Modals/PaymentModal';
import { useDispatch, useSelector } from 'react-redux';
import { adminOutlet, getAllStations } from '../../store/actions/outlet';
import OutletService from '../../services/outletService';
import PaymentService from '../../services/paymentService';
import { createPayment, searchPayment } from '../../store/actions/payment';
import ViewPayment from '../Modals/ViewPayment';
import RegulatoryReports from '../Reports/RegulatoryReports';
import config from '../../constants';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const Regulatory = () => {

    const [open, setOpen] = useState(false);
    const [defaultState, setDefault] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const oneStationData = useSelector(state => state.outletReducer.adminOutlet);
    const payment = useSelector(state => state.paymentReducer.payment);
    const [currentStation, setCurrentStation] = useState({});
    const [entries, setEntries] = useState(10);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(15);
    const [total, setTotal] = useState(0);
    const [prints, setPrints] = useState(false);
    const [openPayment, setOpenPayment] = useState(false);
    const [description, setDescription] = useState(false);

    const openPaymentModal = () => {
        setOpen(true);
    }

    const getTankData = useCallback(() => {

        const payload = {
            organisation: user._id
        }

        if(user.userType === "superAdmin"){
            OutletService.getAllOutletStations(payload).then(data => {
                dispatch(getAllStations(data.station));
                setDefault(1);
                setCurrentStation(data.station[0]);
                return data.station[0];
            }).then((data)=>{
                const payload = {
                    skip: skip * limit,
                    limit: limit,
                    outletID: data._id, 
                    organisationID: data.organisation
                }
                PaymentService.getAllPayment(payload).then((data) => {
                    setTotal(data.count);
                    dispatch(createPayment(data.pay));
                });
            });
        }else{
            OutletService.getOneOutletStation({outletID: user.outletID}).then(data => {
                dispatch(adminOutlet(data.station));
                setCurrentStation(data.station);
                return data.station;
            }).then((data)=>{
                const payload = {
                    skip: skip * limit,
                    limit: limit,
                    outletID: data._id, 
                    organisationID: data.organisation
                }
                PaymentService.getAllPayment(payload).then((data) => {
                    setTotal(data.count);
                    dispatch(createPayment(data.pay));
                });
            });
        }
    }, [user._id, user.userType, user.outletID, dispatch, skip, limit]);

    useEffect(()=>{
        getTankData();
    },[getTankData]);

    const refresh = () => {
        const payload = {
            skip: skip * limit,
            limit: limit,
            outletID: currentStation._id, 
            organisationID: currentStation.organisation
        }
        PaymentService.getAllPayment(payload).then((data) => {
            setTotal(data.count);
            dispatch(createPayment(data.pay));
        });
    }

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);
        
        const payload = {
            skip: skip * limit,
            limit: limit,
            outletID: item._id, 
            organisationID: item.organisation
        }
        PaymentService.getAllPayment(payload).then((data) => {
            setTotal(data.count);
            dispatch(createPayment(data.pay));
        });
    }

    const searchTable = (value) => {
        dispatch(searchPayment(value));
    }

    const nextPage = () => {
        if(!(skip < 0)){
            setSkip(prev => prev + 1)
        }
        refresh();
    }

    const prevPage = () => {
        if(!(skip <= 0)){
            setSkip(prev => prev - 1)
        } 
        refresh();
    }

    const entriesMenu = (value, limit) => {
        setEntries(value);
        setLimit(limit);
        getTankData();
    }

    const printReport = () => {
        setPrints(true);
    }

    const viewDescription = (data)=> {
        setOpenPayment(true);
        setDescription(data.description)
    }

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            { <PaymentModal station={currentStation} open={open} close={setOpen} refresh={refresh} /> }
            { prints && <RegulatoryReports allOutlets={payment} open={prints} close={setPrints}/>}
            {openPayment && <ViewPayment open={openPayment} close={setOpenPayment} desc={description} />}
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
                            <MenuItem onClick={openPaymentModal} value={20}>Register Payment</MenuItem>
                            <MenuItem value={30}>Download PDF</MenuItem>
                            <MenuItem value={40}>Print</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='search'>
                    <div className='input-cont'>
                        <div className='second-select'>
                            {oneStationData.hasOwnProperty("outletName") ||
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={defaultState}
                                    sx={selectStyle2}
                                >
                                    <MenuItem style={menu} value={0}>Select Station</MenuItem>
                                    {
                                        allOutlets.map((item, index) => {
                                            return(
                                                <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index + 1, item)}} value={index + 1}>{item.outletName+ ', ' +item.city}</MenuItem>
                                            )
                                        })  
                                    }
                                </Select>
                            }
                            {oneStationData.hasOwnProperty("outletName") &&
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={0}
                                    sx={selectStyle2}
                                    disabled
                                >
                                    <MenuItem style={menu} value={0}>{oneStationData.hasOwnProperty("outletName")?oneStationData.outletName+", "+oneStationData.city: "No station created"}</MenuItem>
                                </Select>
                            }
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
                    <div style={{width:'140px'}} className='butt'>
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
                            variant="contained"> Register Payment
                        </Button>
                    </div>
                </div>

                <div className='search2'>
                    <div className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={entries}
                            sx={selectStyle2}
                        >
                            <MenuItem style={menu} value={10}>Show entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(20, 15)}} style={menu} value={20}>15 entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(30, 30)}} style={menu} value={30}>30 entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(40, 100)}} style={menu} value={40}>100 entries</MenuItem>
                        </Select>
                    </div>
                    <div style={{width: mediaMatch.matches? '100%': '190px'}} className='input-cont2'>
                        <Button sx={{
                            width: mediaMatch.matches? '100%': '100px', 
                            height:'30px',  
                            background: '#58A0DF',
                            borderRadius: '3px',
                            fontSize:'10px',
                            display: mediaMatch.matches && 'none',
                            marginTop: mediaMatch.matches? '10px': '0px',
                            '&:hover': {
                                backgroundColor: '#58A0DF'
                            }
                            }}  variant="contained"> History
                        </Button>
                        <Button sx={{
                            width: mediaMatch.matches? '100%': '80px', 
                            height:'30px',  
                            background: '#F36A4C',
                            borderRadius: '3px',
                            fontSize:'10px',
                            display: mediaMatch.matches && 'none',
                            marginTop: mediaMatch.matches? '10px': '0px',
                            '&:hover': {
                                backgroundColor: '#F36A4C'
                            }
                            }}  
                            onClick={printReport}
                            variant="contained"> Print
                        </Button>
                    </div>
                </div>

                <div className='table-container'>
                    <div className='table-head'>
                        <div className='column'>S/N</div>
                        <div className='column'>Organisation Name</div>
                        <div className='column'>Description</div>
                        <div className='column'>Amount</div>
                        <div className='column'>Contact Person</div>
                        <div className='column'>Attachment (Certificate)</div>
                        <div className='column'>Payment reciept</div>
                    </div>

                    <div className='row-container'>
                        {
                            payment.length === 0?
                            <div style={place}>No payment data</div>:
                            payment.map((item, index) => {
                                return(
                                    <div style={{height:'50px', display:'flex', justifyContent:'center', alignItems:'center'}} className='table-head2'>
                                        <div className='column'>{Number(index) + 1}</div>
                                        <div className='column'>{item.organisationalName}</div>
                                        <div style={{textAlign:'left', lineHeight:'20px'}} className='column'>
                                            <Button sx={{
                                                width:'80px', 
                                                height:'30px',  
                                                background: '#F36A4C',
                                                borderRadius: '3px',
                                                fontSize:'10px',
                                                '&:hover': {
                                                    backgroundColor: '#F36A4C'
                                                }
                                                }}  
                                                onClick={()=>{viewDescription(item)}}
                                                variant="contained"> View
                                            </Button>
                                        </div>
                                        <div className='column'>{item.amount}</div>
                                        <div className='column'>{item.contactPerson}</div>
                                        <div className='column'>
                                            <a href={config.BASE_URL + item.attachCertificate} target="_blank" rel="noreferrer">DPRCertificate</a>
                                        </div>
                                        <div className='column'>
                                            <a href={config.BASE_URL + item.paymentReceipt} target="_blank" rel="noreferrer">DPRReceip</a>
                                        </div>
                                    </div> 
                                )
                            })
                        }
                    </div>
                </div>

                <div className='footer'>
                    <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>
                        Showing {((skip + 1) * limit) - (limit-1)} to {(skip + 1) * limit} of {total} entries
                    </div>
                    <div className='nav'>
                        <button onClick={prevPage} className='but'>Previous</button>
                        <div className='num'>{skip + 1}</div>
                        <button onClick={nextPage} className='but2'>Next</button>
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

export default Regulatory;