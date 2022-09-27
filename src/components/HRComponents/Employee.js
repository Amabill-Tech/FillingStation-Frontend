import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import avatar from '../../assets/avatar.png';
import hr6 from '../../assets/hr6.png';
import StaffModal from '../Modals/CreateStaffModal';
import EmployeeDetails from '../Modals/EmployeeModal';
import OutlinedInput from '@mui/material/OutlinedInput';
import { getAllStations } from '../../store/actions/outlet';
import OutletService from '../../services/outletService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Employee = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [search, setSearch] = useState('');
    const [defaultState, setDefault] = useState(0);
    const [currrentStation, setCurrentStation] = useState();

    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const dispatch = useDispatch();
    console.log('current', currrentStation)

    const openModal = () => {
        setOpen(true);
    }

    const openEmployee = () => {
        setOpen2(true);
    }

    const getAllStationData = useCallback(() => {
        const payload = {
            organisation: user._id
        }
        OutletService.getAllOutletStations(payload).then(data => {
            dispatch(getAllStations(data.station));
        }).then(()=>{
            setCurrentStation(allOutlets[0]);
        });
    }, [user._id, dispatch]);

    useEffect(()=>{
        getAllStationData();
    },[getAllStationData]);

    const changeMenu = (index, item ) => {
        setDefault(index);
    }

    return(
        <div className='paymentsCaontainer'>
            {<StaffModal open={open} close={setOpen} />}
            {<EmployeeDetails open={open2} close={setOpen2} />}
            <div className='inner-pay'>
                <div className='action'>
                    <div style={{width:'150px'}} className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={{...selectStyle2, backgroundColor:"#F36A4C", color:'#fff'}}
                        >
                            <MenuItem value={10}>Add Staff</MenuItem>
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
                                value={defaultState}
                                sx={selectStyle2}
                            >
                                {
                                   allOutlets.map((item, index) => {
                                        return(
                                            <MenuItem onClick={()=>{changeMenu(index, item)}} value={index}>{item.outletName}</MenuItem>
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
                                    onChange={e => setSearch(e.target.value)}
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
                            onClick={openModal}
                            variant="contained"> Add Staff
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
                            <MenuItem value={10}>show 15 entries</MenuItem>
                            <MenuItem value={20}>show 30 entries</MenuItem>
                            <MenuItem value={30}>show 100 entries</MenuItem>
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
                        <div className='column'>Staff Image</div>
                        <div className='column'>Staff Name</div>
                        <div className='column'>Sex</div>
                        <div className='column'>Email</div>
                        <div className='column'>Phone Number</div>
                        <div className='column'>Date Employed</div>
                        <div className='column'>Job Title</div>
                        <div className='column'>Action</div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>
                                <img style={{width:'35px', height:'35px', borderRadius:'35px'}} src={avatar} alt="icon" />
                            </div>
                            <div className='column'>Wema bank</div>
                            <div className='column'>1524353625262</div>
                            <div className='column'>150,000</div>
                            <div className='column'>352,000</div>
                            <div className='column'>170,000</div>
                            <div className='column'>230,000</div>
                            <div className='column'>
                                <div style={{justifyContent:'center'}} className='actions'>
                                    <img onClick={openEmployee} style={{width:'27px', height:'27px'}} src={hr6} alt="icon" />
                                </div>
                            </div>
                        </div>
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

export default Employee;