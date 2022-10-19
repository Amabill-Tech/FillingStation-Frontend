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
import AdminUserService from '../../services/adminUsers';
import { searchStaffs, storeStaffUsers } from '../../store/actions/staffUsers';
import PrintStaffRecords from '../Reports/StaffRecord';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const Employee = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [defaultState, setDefault] = useState(0);
    const [currentStaff, setCurrentStaff] = useState({});
    const [prints, setPrints] = useState(false);

    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const staffUsers = useSelector(state => state.staffUserReducer.staffUsers);
    const dispatch = useDispatch();

    const openModal = () => {
        setOpen(true);
    }

    const openEmployee = (item) => {
        setCurrentStaff(item);
        setOpen2(true);
    }

    const getAllStationData = useCallback(() => {
        const payload = {
            organisation: user._id
        }
        OutletService.getAllOutletStations(payload).then(data => {
            dispatch(getAllStations(data.station));
        });

        AdminUserService.allStaffUserRecords(payload).then(data => {
            dispatch(storeStaffUsers(data.staff));
        });
    }, [user._id, dispatch]);

    useEffect(()=>{
        getAllStationData();
    },[getAllStationData]);

    const changeMenu = (index, item ) => {
        setDefault(index);
    }

    const printReport = () => {
        setPrints(true);
    }

    const searchTable = (value) => {
        dispatch(searchStaffs(value));
    }

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            {<StaffModal open={open} close={setOpen} allOutlets={allOutlets} refresh={getAllStationData} />}
            {<EmployeeDetails open={open2} close={setOpen2} data={currentStaff} />}
            { prints && <PrintStaffRecords allOutlets={staffUsers} open={prints} close={setPrints}/>}
            <div className='inner-pay'>
                <div className='action'>
                    <div style={{width:'150px'}} className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={{...selectStyle2, backgroundColor:"#06805B", color:'#fff'}}
                        >
                            <MenuItem style={menu} value={10}>Action</MenuItem>
                            <MenuItem onClick={openModal} style={menu} value={20}>Add Staff</MenuItem>
                            <MenuItem style={menu} value={30}>Download PDF</MenuItem>
                            <MenuItem onClick={printReport} style={menu} value={40}>Print</MenuItem>
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
                            <MenuItem style={menu} value={10}>show 15 entries</MenuItem>
                            <MenuItem style={menu} value={20}>show 30 entries</MenuItem>
                            <MenuItem style={menu} value={30}>show 100 entries</MenuItem>
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
                        {
                            staffUsers.length === 0?
                            <div style={place}>No data </div>:
                            staffUsers.map((item, index) => {
                                return(
                                    <div key={index} className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>
                                            <img style={{width:'35px', height:'35px', borderRadius:'35px'}} src={avatar} alt="icon" />
                                        </div>
                                        <div className='column'>{item.staffName}</div>
                                        <div className='column'>{item.sex}</div>
                                        <div className='column'>{item.email}</div>
                                        <div className='column'>{item.phone}</div>
                                        <div className='column'>{item.dateEmployed}</div>
                                        <div className='column'>{item.jobTitle}</div>
                                        <div className='column'>
                                            <div style={{justifyContent:'center'}} className='actions'>
                                                <img onClick={()=>{openEmployee(item)}} style={{width:'27px', height:'27px'}} src={hr6} alt="icon" />
                                            </div>
                                        </div>
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

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
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

export default Employee;