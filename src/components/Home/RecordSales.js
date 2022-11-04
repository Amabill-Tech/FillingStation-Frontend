import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/recordSales.scss';
import Button from '@mui/material/Button';
import { Switch, Route } from 'react-router-dom';
import Pumps from '../RecordSales/Pumps';
import LPO from '../RecordSales/LPO';
import Expenses from '../RecordSales/Expenses';
import Payments from '../RecordSales/Payment';
import TextField from '@mui/material/TextField';
import OutletService from '../../services/outletService';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStations } from '../../store/actions/outlet';
import Dipping from '../RecordSales/Dipping';

const RecordSales = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const pumpList = useSelector(state => state.outletReducer.pumpList);
    const [currentStation, setCurrentStation] = useState({});

    const handleTabs = (data) => {
        if(data === 'pump'){
            props.history.push('/home/record-sales');
        }else if(data === 'lpo'){
            props.history.push('/home/record-sales/lpo');
        }else if(data === 'expenses'){
            props.history.push('/home/record-sales/expenses');
        }else if(data === 'payment'){
            props.history.push('/home/record-sales/payment');
        }else if(data === 'dipping'){
            props.history.push('/home/record-sales/dipping');
        }
    }

    return(
        <div data-aos="zoom-in-down" className='salesContainer'>
            <div className='inner'>
                <div className='leftContainer'>
                    <div className='tabContainer'>
                        <Button sx={{
                            height:'35px',  
                            background: '#06805B',
                            borderRadius: '39px',
                            fontSize:'10px',
                            '&:hover': {
                                backgroundColor: '#06805B'
                            },
                            }}  
                            onClick={()=>{handleTabs('pump')}}
                            variant="contained"> Pump update
                        </Button>
                        <Button sx={{
                            height:'35px',  
                            background: '#06805B',
                            borderRadius: '39px',
                            fontSize:'10px',
                            marginLeft:'10px',
                            '&:hover': {
                                backgroundColor: '#06805B'
                            }
                            }}  
                            onClick={()=>{handleTabs('lpo')}}
                            variant="contained"> LPO
                        </Button>
                        <Button sx={{ 
                            height:'35px',  
                            background: '#06805B',
                            borderRadius: '39px',
                            fontSize:'10px',
                            marginLeft:'10px',
                            '&:hover': {
                                backgroundColor: '#06805B'
                            }
                            }} 
                            onClick={()=>{handleTabs('expenses')}} 
                            variant="contained"> Expenses
                        </Button>
                        <Button sx={{ 
                            height:'35px',  
                            background: '#06805B',
                            borderRadius: '39px',
                            fontSize:'10px',
                            marginLeft:'10px',
                            '&:hover': {
                                backgroundColor: '#06805B'
                            }
                            }} 
                            onClick={()=>{handleTabs('payment')}} 
                            variant="contained"> Payments
                        </Button>
                        <Button sx={{ 
                            height:'35px',  
                            background: '#06805B',
                            borderRadius: '39px',
                            fontSize:'10px',
                            marginLeft:'10px',
                            '&:hover': {
                                backgroundColor: '#06805B'
                            }
                            }} 
                            onClick={()=>{handleTabs('dipping')}} 
                            variant="contained"> Dipping
                        </Button>
                    </div>

                    <div className='tabs-content'>
                        <Switch>
                            <Route exact path='/home/record-sales/'>
                                <Pumps/>
                            </Route>
                            <Route path='/home/record-sales/lpo'>
                                <LPO/>
                            </Route>
                            <Route path='/home/record-sales/expenses'>
                                <Expenses/>
                            </Route>
                            <Route path='/home/record-sales/payment'>
                                <Payments/>
                            </Route>
                            <Route path='/home/record-sales/dipping'>
                                <Dipping/>
                            </Route>
                        </Switch>
                    </div>
                </div>
                <div className='rightContainer'>
                    {/* <div className='head'>Update Remark</div>
                    <TextField
                        id="filled-multiline-static"
                        multiline
                        rows={10}
                        sx={{
                            width:'100%',
                            background:'#FBFBFB',
                            border: '1px solid #000000',
                            borderRadius: '4px',
                            marginTop:'10px',
                            '&:focus':{
                                outline:'transparent',
                                border:'none'
                            }
                        }}
                        variant="filled"
                    />

                    <div style={{marginTop:'20px'}} className='head'>Update Remark</div>
                    <input style={{
                        width:'96%', 
                        height:'35px',
                        background: '#F4F3F3',
                        border: '1px solid #000000',
                        borderRadius: '4px',
                        paddingLeft:'2%',
                        paddingRight:'2%',
                    }} type={'date'} />

                    <Button sx={{
                        width:'100%',
                        height:'35px',  
                        background: '#06805B',
                        fontSize:'10px',
                        marginTop:'30px',
                        '&:hover': {
                            backgroundColor: '#06805B'
                        }
                        }}  
                        variant="contained"> Record Sales
                    </Button> */}
                </div>
            </div>
        </div>
    )
}

export default RecordSales;