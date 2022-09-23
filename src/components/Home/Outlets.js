import React, {useCallback} from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import tan from '../../assets/tan.png';
import eye from '../../assets/eye.png';
import filling from '../../assets/filling.png';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useSelector } from 'react-redux';
import { openModal, getAllStations } from '../../store/actions/outlet';
import { useDispatch } from 'react-redux';
import Tank from '../Outlet/Tanks';
import Pumps from '../Outlet/Pumps';
import Sales from '../Outlet/Sales';
import { Switch, Route } from 'react-router-dom';
import CreateFillingStation from '../Modals/CreateStationModal';
import AddTankSuccess from '../Modals/AddTankSuccess';
import AddPumpSuccess from '../Modals/AddPumpSuccess';
import AddPumpMore from '../Modals/AddMorePumps';
import OutletService from '../../services/outletService';
import { useEffect } from 'react';

const Outlets = (props) => {

    const open = useSelector(state => state.outletReducer.openModal);
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const dispatch = useDispatch();

    const handleOpenModal = (value) => dispatch(openModal(value))

    const goToSales = () => {
        props.history.push('/home/outlets/sales');
    }

    const goToTanks = (item) => {
        props.history.push('/home/outlets/tanks', {state: item});
    }

    const goToPumps = (item) => {
        props.history.push('/home/outlets/pumps', {state: item});
    }

    const getAllStationData = useCallback(() => {
        const payload = {
            organisation: user._id
        }
        OutletService.getAllOutletStations(payload).then(data => {
            dispatch(getAllStations(data.station));
        });
    }, [user._id, dispatch]);

    useEffect(()=>{
        getAllStationData();
    },[getAllStationData]);


    return(
        <>
            {props.activeRoute.split('/').length === 3 &&
                <div className='paymentsCaontainer'>
                    <div className='inner-pay'>
                        { open ===1 && <CreateFillingStation getStations={getAllStationData} /> }
                        { open ===4 && <AddTankSuccess /> }
                        { open ===5 && <AddPumpSuccess /> }
                        { open ===6 && <AddPumpMore /> }
                        <div className='action'>
                            <div style={{width:'150px'}} className='butt2'>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={10}
                                    sx={{...selectStyle2, backgroundColor:"#F36A4C", color:'#fff'}}
                                >
                                    <MenuItem value={10}>Create new filling station</MenuItem>
                                    <MenuItem value={20}>Download PDF</MenuItem>
                                    <MenuItem value={30}>Print</MenuItem>
                                </Select>
                            </div>
                        </div>
        
                        <div className='search'>
                            <div className='input-cont'>
                                <div className='second-select'>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={10}
                                        sx={selectStyle2}
                                    >
                                        <MenuItem value={10}>07 August, 2022</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </div>
                                <div className='second-select'>
                                    <OutlinedInput 
                                        placeholder="Search" 
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
                            <div style={{width:'195px'}} className='butt'>
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
                                    onClick={()=>{handleOpenModal(1)}} 
                                    variant="contained"> Create new filling station
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
                                <div className='column'>Licence Code</div>
                                <div className='column'>Name</div>
                                <div className='column'>Outlet Code</div>
                                <div className='column'>No of Tanks</div>
                                <div className='column'>No of Pumps</div>
                                <div className='column'>State</div>
                                <div className='column'>City/Town</div>
                                <div className='column'>Actions</div>
                            </div>
        
                            {
                                allOutlets.length === 0?
                                <div style={place}>No data</div>:
                                allOutlets.map((item, index) => {
                                    return(
                                        <div key={index} className='row-container'>
                                            <div className='table-head2'>
                                                <div className='column'>{index + 1}</div>
                                                <div className='column'>{item.licenseCode}</div>
                                                <div className='column'>{item.outletName}</div>
                                                <div className='column'>{item._id}</div>
                                                <div className='column'>{item.noOfTanks}</div>
                                                <div className='column'>{item.noOfPumps}</div>
                                                <div className='column'>{item.city}</div>
                                                <div className='column'>{item.state}</div>
                                                <div className='column'>
                                                    <div className='actions'>
                                                        <img onClick={goToSales} style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                                        <img onClick={()=>{goToPumps(item)}} style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                                        <img onClick={()=>{goToTanks(item)}} style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
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
            }

            { props.activeRoute.split('/').length === 4 &&
                <div style={contain}>
                    <Switch>
                        <Route path='/home/outlets/sales'>
                            <Sales/>
                        </Route>
                        <Route path='/home/outlets/tanks'>
                            <Tank/>
                        </Route>
                        <Route path='/home/outlets/pumps'>
                            <Pumps/>
                        </Route>
                    </Switch>
                </div>
            }
        </>
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

const contain = {
    width:'96%',
    height:'89%',

}

const place = {
    width:'100%',
    textAlign:'center',
    fontSize:'14px',
    fontFamily:'Nunito-Regular',
    marginTop:'20px',
    color:'green'
}

export default Outlets;