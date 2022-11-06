import React, { useState } from 'react';
import '../../styles/recordSales.scss';
import Button from '@mui/material/Button';
import { Switch, Route } from 'react-router-dom';
import Pumps from '../RecordSales/Pumps';
import LPO from '../RecordSales/LPO';
import Expenses from '../RecordSales/Expenses';
import Payments from '../RecordSales/Payment';
import OutletService from '../../services/outletService';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPumps, getAllStations, oneStation } from '../../store/actions/outlet';
import Dipping from '../RecordSales/Dipping';
import { MenuItem, Select } from '@mui/material';
import { useCallback } from 'react';
import LPOService from '../../services/lpo';
import { createLPO } from '../../store/actions/lpo';
import { useEffect } from 'react';

const RecordSales = (props) => {
    const dispatch = useDispatch();
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const oneOutletStation = useSelector(state => state.outletReducer.oneStation);
    const user = useSelector(state => state.authReducer.user);
    const [defaultState, setDefault] = useState(0);

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

    const getAllStationData = useCallback(() => {
        OutletService.getAllOutletStations({organisation: user.userType === "superAdmin"? user._id : user.organisationID}).then(data => {
            dispatch(getAllStations(data.station));
            dispatch(oneStation(data.station[0]));
            setDefault(1);
            return data.station[0]
        }).then((data)=>{
            const payload = {
                outletID: data._id, 
                organisationID: data.organisation
            }
            
            OutletService.getAllStationPumps(payload).then(data => {
                dispatch(getAllPumps(data));
            });

            LPOService.getAllLPO(payload).then((data) => {
                dispatch(createLPO(data.lpo.lpo));
            });
        })
    }, [dispatch, user._id, user.userType, user.organisationID]);

    const refresh = () => {
        OutletService.getAllOutletStations({organisation: user.userType === "superAdmin"? user._id : user.organisationID}).then(data => {
            dispatch(getAllStations(data.station));
        }).then(()=>{

            const payload = {
                outletID: oneOutletStation._id, 
                organisationID: oneOutletStation.organisation
            }

            OutletService.getOneOutletStation(payload).then((data) => {console.log(data, 'updated one station')
                // dispatch(oneStation(data.station[0]));
            });
            
            OutletService.getAllStationPumps(payload).then(data => {
                dispatch(getAllPumps(data));
            });

            LPOService.getAllLPO(payload).then((data) => {
                dispatch(createLPO(data.lpo.lpo));
            });
        })
    }

    useEffect(()=>{
        getAllStationData()
    }, [getAllStationData])

    const changeMenu = (index, item ) => {
        setDefault(index);
        dispatch(oneStation(item));

        const payload = {
            outletID: item._id, 
            organisationID: item.organisation
        }

        OutletService.getAllStationPumps(payload).then(data => {
            dispatch(getAllPumps(data));
        });

        LPOService.getAllLPO(payload).then((data) => {
            dispatch(createLPO(data.lpo.lpo));
        });
    }

    return(
        <div data-aos="zoom-in-down" className='salesContainer'>
            <div className='inner'>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={defaultState}
                    sx={selectStyle2}
                >
                    <MenuItem style={menu} value={0}>Select station</MenuItem>
                    {
                        allOutlets.map((item, index) => {
                            return(
                                <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index + 1, item)}} value={index + 1}>{item.outletName +', '+ item.city}</MenuItem>
                            )
                        })  
                    }
                </Select>
                <div style={{width:'100%'}} className='leftContainer'>
                    <div className='tabContainer'>
                        <Button sx={{
                            height:'35px',  
                            background: '#06805B',
                            borderRadius: '39px',
                            fontSize:'12px',
                            textTransform:'capitalize',
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
                            fontSize:'12px',
                            textTransform:'capitalize',
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
                            fontSize:'12px',
                            textTransform:'capitalize',
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
                            fontSize:'12px',
                            textTransform:'capitalize',
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
                            fontSize:'12px',
                            textTransform:'capitalize',
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
                                <Pumps refresh = {refresh}/>
                            </Route>
                            <Route path='/home/record-sales/lpo'>
                                <LPO refresh = {refresh}/>
                            </Route>
                            <Route path='/home/record-sales/expenses'>
                                <Expenses refresh = {refresh}/>
                            </Route>
                            <Route path='/home/record-sales/payment'>
                                <Payments refresh = {refresh}/>
                            </Route>
                            <Route path='/home/record-sales/dipping'>
                                <Dipping refresh = {refresh}/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

const selectStyle2 = {
    width:'200px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none',
    marginTop:'10px',
    marginBottom:'20px'
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default RecordSales;