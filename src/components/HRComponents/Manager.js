import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import avatar from '../../assets/avatar.png';
import navigateStaff from '../../assets/navigateStaff.png';
import hr6 from '../../assets/hr6.png';
import EmployeeDetails from '../Modals/EmployeeModal';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createAdminUser, searchadmins } from '../../store/actions/adminUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ManagerModal from '../Modals/ManagerModal';
import AdminUserService from '../../services/adminUsers';
import PrintUserRecords from '../Reports/UserRecords';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const Manager = (props) => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [prints, setPrints] = useState(false);
    const [empData, setEmpData] = useState({});

    const user = useSelector(state => state.authReducer.user);
    const adminUsers = useSelector(state => state.adminUserReducer.adminUsers);
    const dispatch = useDispatch();

    const openModal = () => {
        setOpen(true);
    }

    const openEmployee = (item) => {
        setEmpData(item);
        setOpen2(true);
    }

    const getAllUserData = useCallback(() => {
        const payload = {
            organisation: user._id
        }
        AdminUserService.allAdminUserRecords(payload).then(data => {
            dispatch(createAdminUser(data.users));
        });
    }, [user._id, dispatch]);

    useEffect(()=>{
        getAllUserData();
    },[getAllUserData]);

    const printReport = () => {
        setPrints(true);
    }

    const goToEmployee = () => {
        props.history.push('/home/hr/employee');
    }

    const searchTable = (value) => {
        dispatch(searchadmins(value));
    }

    return(
        <div className='paymentsCaontainer'>
            {<ManagerModal open={open} close={setOpen} refresh={getAllUserData} />}
            {<EmployeeDetails open={open2} close={setOpen2} data={empData} />}
            { prints && <PrintUserRecords allOutlets={adminUsers} open={prints} close={setPrints}/>}
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
                            <MenuItem style={menu} onClick={openModal} value={20}>Add Staff</MenuItem>
                            <MenuItem style={menu} value={30}>History</MenuItem>
                            <MenuItem style={menu} onClick={printReport} value={40}>Print</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='search'>
                    <div className='input-cont'>
                        <div style={{width: mediaMatch.matches? '100%': '200px', }} className='second-select'>
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
                    <div style={{width:'120px'}} className='butt'>
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
                            variant="contained"> Create Admin
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
                            adminUsers.length === 0?
                            <div style={place}>No Admin Record</div>:
                            adminUsers.map((data, index) => {
                                return(
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>
                                            <img style={{width:'35px', height:'35px', borderRadius:'35px'}} src={avatar} alt="icon" />
                                        </div>
                                        <div className='column'>{data.staffName}</div>
                                        <div className='column'>{data.sex}</div>
                                        <div className='column'>{data.email}</div>
                                        <div className='column'>{data.phone}</div>
                                        <div className='column'>{data.dateEmployed}</div>
                                        <div className='column'>{data.jobTitle}</div>
                                        <div className='column'>
                                            <div style={{justifyContent:'center'}} className='actions'>
                                                <img onClick={()=>{openEmployee(data)}} style={{width:'27px', height:'27px'}} src={hr6} alt="icon" />
                                                <img onClick={goToEmployee} style={{width:'27px', height:'27px', marginLeft:'10px'}} src={navigateStaff} alt="icon" />
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

export default Manager;