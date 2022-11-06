import { Button, MenuItem, OutlinedInput, Select } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import {DateRange, RateReview} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import LPOService from '../../services/lpo';
import { useDispatch, useSelector } from 'react-redux';
import { createLPOSales, searchLPOList } from '../../store/actions/lpo';
import LPOSalesReport from '../Reports/LPOSales';
import config from '../../constants';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const ListLPO = () => {

    const [entries, setEntries] = useState(10);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(15);
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const dispatch = useDispatch();
    const lpos = useSelector(state => state.lpoReducer.lpoSales);
    const [prints, setPrints] = useState(false);

    const getAllLPOData = useCallback(() => {
        const payload = {
            skip: skip * limit,
            limit: limit,
            lpoID: location.state.state._id,
            outletID: location.state.state.outletID, 
            organisationID: location.state.state.organizationID
        }

        LPOService.getAllLPOSales(payload).then((data) => {
            setTotal(data.lpo.count);
            dispatch(createLPOSales(data.lpo.lpo));
        })
    }, [dispatch, location.state.state.organizationID, location.state.state.outletID, location.state.state._id, skip, limit]);

    useEffect(()=>{
        getAllLPOData();
    },[getAllLPOData])

    const refresh = () => {
        const payload = {
            skip: skip * limit,
            limit: limit,
            lpoID: location.state.state._id,
            outletID: location.state.state.outletID, 
            organisationID: location.state.state.organizationID
        }

        LPOService.getAllLPOSales(payload).then((data) => {
            setTotal(data.lpo.count);
            dispatch(createLPOSales(data.lpo.lpo));
        })
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

    const searchList = (e) =>{
        dispatch(searchLPOList(e.target.value));
    }

    const printReport = () => {
        setPrints(true);
    }

    return(
        <div data-aos="zoom-in-down" style={{display:'flex', flexDirection:'column', padding:'10px'}} className='paymentsCaontainer'>
            { prints && <LPOSalesReport allOutlets={lpos} open={prints} close={setPrints}/>}
            <div className='toools'>
                <div>
                    <OutlinedInput 
                        sx={{
                            width:'100%',
                            height: '35px',  
                            background:'#EEF2F1', 
                            border:'1px solid #777777',
                            fontSize:'12px',
                        }} 
                        type='text'
                        onChange={searchList}
                        placeholder="Search" 
                    />
                </div>
                <div>
                    <div style={{width: mediaMatch.matches? '100%': '330px', display:'flex', justifyContent:'space-between', alignItems:'center'}} className='input-cont2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={entries}
                            sx={{...selectStyle2, 
                                width:'130px',
                                height:'32px',
                                display: mediaMatch.matches && 'none',
                            }}
                        >
                            <MenuItem style={menu} value={10}>Show entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(20, 15)}} style={menu} value={20}>15 entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(30, 30)}} style={menu} value={30}>30 entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(40, 100)}} style={menu} value={40}>100 entries</MenuItem>
                        </Select>
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
            </div>

            <div style={{marginTop:'10px'}} className='table-container'>
                <div className='table-head'>
                    <div className='column'>S/N</div>
                    <div className='column'>Date</div>
                    <div className='column'>Account Name</div>
                    <div className='column'>Truck No</div>
                    <div className='column'>Product</div>
                    <div className='column'>Litre</div>
                    <div className='column'>Attach Approval</div>
                </div>

                <div className='row-container'>
                    {
                        lpos.length === 0?
                        <div style={place}>No LPO Data </div>:
                        lpos.map((data, index) => {
                            return(
                                <div className='table-head2'>
                                    <div className='column'>{index + 1}</div>
                                    <div className='column'>{data.createdAt.split('T')[0]}</div>
                                    <div className='column'>{data.accountName}</div>
                                    <div className='column'>{data.truckNo}</div>
                                    <div className='column'>{data.productType}</div>
                                    <div className='column'>{data.litre}</div>
                                    <div className='column'>
                                        <a href={config.BASE_URL + data.attachApproval} target="_blank" rel="noreferrer">Attachment</a>
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

export default ListLPO;