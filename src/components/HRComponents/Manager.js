import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import avatar from '../../assets/avatar.png';
import hr6 from '../../assets/hr6.png';
import EmployeeDetails from '../Modals/EmployeeModal';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createAdminUser } from '../../store/actions/adminUser';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ManagerModal from '../Modals/ManagerModal';
import AdminUserService from '../../services/adminUsers';

const Manager = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [search, setSearch] = useState('');

    const user = useSelector(state => state.authReducer.user);
    const adminUsers = useSelector(state => state.adminUserReducer.adminUsers);
    const dispatch = useDispatch();

    const openModal = () => {
        setOpen(true);
    }

    const openEmployee = () => {
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

    return(
        <div className='paymentsCaontainer'>
            {<ManagerModal open={open} close={setOpen} refresh={getAllUserData} />}
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
                        <div style={{width:'200px'}} className='second-select'>
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
                            variant="contained"> Add Manager
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
                    <div style={{width:'170px'}} className='input-cont2'>
                            <Button sx={{
                                width:'80px', 
                                height:'30px',  
                                background: '#58A0DF',
                                borderRadius: '3px',
                                fontSize:'10px',
                                '&:hover': {
                                    backgroundColor: '#58A0DF'
                                }
                                }}  variant="contained"> .Xlsx
                            </Button>
                            <Button sx={{
                                width:'80px', 
                                height:'30px',  
                                background: '#F36A4C',
                                borderRadius: '3px',
                                fontSize:'10px',
                                '&:hover': {
                                    backgroundColor: '#F36A4C'
                                }
                                }}  variant="contained"> PDF
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
                            <div style={place}>No admin user created</div>:
                            adminUsers.map((data, index) => {
                                return(
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>
                                            <img style={{width:'35px', height:'35px', borderRadius:'35px'}} src={avatar} alt="icon" />
                                        </div>
                                        <div className='column'>{data.bankName}</div>
                                        <div className='column'>{data.sex}</div>
                                        <div className='column'>{data.email}</div>
                                        <div className='column'>{data.phone}</div>
                                        <div className='column'>{data.dateEmployed}</div>
                                        <div className='column'>{data.jobTitle}</div>
                                        <div className='column'>
                                            <div style={{justifyContent:'center'}} className='actions'>
                                                <img onClick={openEmployee} style={{width:'27px', height:'27px'}} src={hr6} alt="icon" />
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

export default Manager;