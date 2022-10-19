import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import avatar from '../../assets/avatar.png';
import hr6 from '../../assets/hr6.png';
import hr7 from '../../assets/hr7.png';
import hr8 from '../../assets/hr8.png';
import QueryModal from '../Modals/QueryModal';
import { useDispatch, useSelector } from 'react-redux';
import QueryService from '../../services/query';
import { createQuery, searchQuery } from '../../store/actions/query';
import OutletService from '../../services/outletService';
import { OutlinedInput } from '@mui/material';
import { getAllStations } from '../../store/actions/outlet';

const Query = () => {

    const [open, setOpen] = useState(false);
    const [defaultState, setDefault] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const queryData = useSelector(state => state.queryReducer.query);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);

    const handleQuery = () => {
        setOpen(true);
    }

    const getAllQueryData = useCallback(() => {
        const payload = {
            organisationID: user._id
        }
        QueryService.allQueryRecords(payload).then(data => {
            dispatch(createQuery(data.query));
        });

        OutletService.getAllOutletStations({organisation: user._id}).then(data => {
            dispatch(getAllStations(data.station));
        });
    }, [user._id, dispatch]);

    useEffect(()=>{
        getAllQueryData();
    },[getAllQueryData]);

    const changeMenu = (index, item ) => {
        setDefault(index);
    }

    const searchTable = (value) => {
        dispatch(searchQuery(value));
    }

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            {<QueryModal open={open} close={setOpen} refresh={getAllQueryData}/>}
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
                            <MenuItem onClick={handleQuery} value={20}>Add Query</MenuItem>
                            <MenuItem value={30}>Download PDF</MenuItem>
                            <MenuItem value={40}>Print</MenuItem>
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
                    <div style={{width:'100px'}} className='butt'>
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
                            onClick={handleQuery}
                            variant="contained"> Add Query
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
                        <div className='column'>Staff Name</div>
                        <div className='column'>Query Title</div>
                        <div className='column'>Description</div>
                        <div className='column'>Date Queried</div>
                        <div className='column'>Action</div>
                    </div>

                    {
                        queryData.length === 0?
                        <div style={place}>No data</div>:
                        queryData.map((item, index) => {
                            return(
                                <div key={index} className='row-container'>
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{item.employeeName}</div>
                                        <div className='column'>{item.queryTitle}</div>
                                        <div className='column'>
                                            <Button sx={{
                                                width:'80px', 
                                                height:'30px',  
                                                background: '#427BBE',
                                                borderRadius: '3px',
                                                fontSize:'10px',
                                                '&:hover': {
                                                    backgroundColor: '#427BBE'
                                                }
                                                }}  variant="contained"> View
                                            </Button>
                                        </div>
                                        <div className='column'>{item.createdAt.split('T')[0]}</div>
                                        <div className='column'>
                                            <div style={{width:'70px'}} className='actions'>
                                                <img style={{width:'27px', height:'27px'}} src={hr7} alt="icon" />
                                                <img style={{width:'27px', height:'27px'}} src={hr8} alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
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

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

const place = {
    width:'100%',
    textAlign:'center',
    fontSize:'14px',
    fontFamily:'Nunito-Regular',
    marginTop:'20px',
    color:'green'
}

export default Query;