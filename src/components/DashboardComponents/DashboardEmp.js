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
import { adminOutlet, getAllStations } from '../../store/actions/outlet';
import OutletService from '../../services/outletService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AdminUserService from '../../services/adminUsers';
import { searchStaffs, storeStaffUsers } from '../../store/actions/staffUsers';
import PrintStaffRecords from '../Reports/StaffRecord';
import { searchdashStaffs } from '../../store/actions/dashboard';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const DashboardEmployee = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [defaultState, setDefault] = useState(0);
    const [currentStaff, setCurrentStaff] = useState({});
    const [prints, setPrints] = useState(false);
    const [currentStation, setCurrentStation] = useState({});
    const [entries, setEntries] = useState(10);
    const [skip, setSkip] = useState(0);

    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const oneStationData = useSelector(state => state.outletReducer.adminOutlet);
    const staffUsers = useSelector(state => state.staffUserReducer.staffUsers);
    const employees = useSelector(state => state.dashboardReducer.employees);
    console.log(employees, "dashhhhhhhhhhhhhhhhhhhhhhhh")
    const dispatch = useDispatch();

    const openModal = () => {
        setOpen(true);
    }

    const openEmployee = (item) => {
        setCurrentStaff(item);
        setOpen2(true);
    }

    const getAllEmployeeData = useCallback(() => {

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
            });
        }else{
            OutletService.getOneOutletStation({outletID: user.outletID}).then(data => {
                dispatch(adminOutlet(data.station));
                setCurrentStation(data.station);
                return data.station;
            })
        }

    }, [user._id, user.userType, user.outletID, dispatch]);

    useEffect(()=>{
        getAllEmployeeData();
    },[getAllEmployeeData]);

    const printReport = () => {
        setPrints(true);
    }

    const searchTable = (value) => {
        dispatch(searchdashStaffs(value));
    }

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            {<StaffModal open={open} close={setOpen} allOutlets={allOutlets} refresh={getAllEmployeeData} />}
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
                            <MenuItem style={menu} value={30}>History</MenuItem>
                            <MenuItem onClick={printReport} style={menu} value={40}>Print</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='search2'>
                    <div className='butt2'>
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
                        <div className='column'>User Type</div>
                    </div>

                    <div className='row-container'>
                        {
                            employees.length === 0?
                            <div style={place}>No data </div>:
                            employees.map((item, index) => {
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
                                        <div className='column'>{item.userType}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='footer'>
                    <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>
                        
                    </div>
                    <div className='nav'>
                        
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

export default DashboardEmployee;