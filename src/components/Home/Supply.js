import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SupplyModal from '../Modals/SupplyModal';
import { createSupply, searchSupply } from '../../store/actions/supply';
import SupplyService from '../../services/supplyService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import { adminOutlet, getAllStations } from '../../store/actions/outlet';
import { OutlinedInput } from '@mui/material';
import PrintSupplyRecords from '../Reports/SupplyRecords';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const Supply = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [defaultState, setDefault] = useState(0);
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const oneStationData = useSelector(state => state.outletReducer.adminOutlet);
    const supply = useSelector(state => state.supplyReducer.supply);
    const [prints, setPrints] = useState(false);
    const [currentStation, setCurrentStation] = useState({});
    const [entries, setEntries] = useState(10);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(15);
    const [total, setTotal] = useState(0);

    const openPaymentModal = () => {
        setOpen(true);
    }

    const getAllSupplyData = useCallback(() => {

        const payload = {
            organisation: user._id
        }

        if(user.userType === "superAdmin"){
            OutletService.getAllOutletStations(payload).then(data => {
                dispatch(getAllStations(data.station));
                if(data.station.length !== 0){
                    setDefault(1);
                }
                setCurrentStation(data.station[0]);
                return data.station[0];
            }).then((data)=>{
                const payload = {
                    skip: skip * limit,
                    limit: limit,
                    outletID: data._id, 
                    organisationID: data.organisation
                }
    
                SupplyService.getAllSupply(payload).then((data) => {
                    setTotal(data.count);
                    dispatch(createSupply(data.supply));
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
    
                SupplyService.getAllSupply(payload).then((data) => {
                    setTotal(data.count);
                    dispatch(createSupply(data.supply));
                });
            });
        }

    }, [user._id, user.userType, user.outletID, dispatch, skip, limit]);

    useEffect(()=>{
        getAllSupplyData();
    },[getAllSupplyData])

    const refresh = () => {
        const payload = {
            skip: skip * limit,
            limit: limit,
            outletID: currentStation._id, 
            organisationID: currentStation.organisation
        }

        SupplyService.getAllSupply(payload).then((data) => {
            setTotal(data.count);
            dispatch(createSupply(data.supply));
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

        SupplyService.getAllSupply(payload).then((data) => {
            setTotal(data.count);
            dispatch(createSupply(data.supply));
        });
    }

    const searchTable = (value) => {
        dispatch(searchSupply(value));
    }

    const printReport = () => {
        setPrints(true);
    }

    const entriesMenu = (value, limit) => {
        setEntries(value);
        setLimit(limit);
        refresh();
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

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            { <SupplyModal station={currentStation} open={open} close={setOpen} refresh={refresh} />}
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
                    <div style={{width:'130px'}} className='butt'>
                        {/* <Button sx={{
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
                            variant="contained"> Add Supply
                        </Button> */}
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
                        <div className='column'>Date</div>
                        <div className='column'>Transporter</div>
                        <div className='column'>Truck No</div>
                        <div className='column'>Waybill No</div>
                        <div className='column'>Station</div>
                        <div className='column'>Product Supply</div>
                        <div className='column'>Quantity</div>
                        <div className='column'>Shortage</div>
                        <div className='column'>Overage</div>
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
                                        <div className='column'>{data.outletName}</div>
                                        <div className='column'>{data.productType}</div>
                                        <div className='column'>{data.quantity}</div>
                                        <div className='column'>{data.shortage}</div>
                                        <div className='column'>{data.overage}</div>
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

export default Supply;