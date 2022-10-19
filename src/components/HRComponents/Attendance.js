import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AttendanceModal from '../Modals/Attendance';
import AtendanceService from '../../services/attendance';
import { useDispatch, useSelector } from 'react-redux';
import { createAttendance, searchAttendance } from '../../store/actions/attendance';
import OutletService from '../../services/outletService';
import { getAllStations } from '../../store/actions/outlet';
import { OutlinedInput } from '@mui/material';
import AdminUserService from '../../services/adminUsers';
import { storeStaffUsers } from '../../store/actions/staffUsers';
import ClockOutModal from '../Modals/AttendanceClockOut';

const Attendance = () => {
    
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [defaultState, setDefault] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const attendanceData = useSelector(state => state.attendanceReducer.attendance);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const [total, setTotal] = useState(0);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(15);
    const [entries, setEntries] = useState(10);

    const openModal = () => {
        setOpen(true);
    }

    const openModal2 = () => {
        setOpen2(true);
    }

    const getAllAtendanceData = useCallback(() => {

        if(user.userType === 'staff'){
            const payload = {
                skip: skip * limit,
                limit: limit,
                outletID: user.outletID,
                organisationID: user.organisationID,
            }

            AdminUserService.allStaffUserRecords(payload).then(data => {
                dispatch(storeStaffUsers(data.staff));
            });

            AtendanceService.allAttendanceRecords(payload).then(data => {
                setTotal(data.attendance.count)
                dispatch(createAttendance(data.attendance.attendance));
            });
    
            OutletService.getOneOutletStation({organisation: user.organisationID, outletID: user.outletID}).then(data => {
                dispatch(getAllStations([data.station]));
            });
        }else{
            /*OutletService.getAllOutletStations({organisation: user._id}).then(data => {
                dispatch(getAllStations(data.station));
            });*/
        }
        
    }, [user.organisationID, user.outletID, user.userType, limit, skip, dispatch]);

    useEffect(()=>{
        getAllAtendanceData();
    },[getAllAtendanceData]);

    const changeMenu = (index, item ) => {
        setDefault(index);
    }

    const searchTable = (value) => {
        dispatch(searchAttendance(value));
    }

    const convertToMinutes = (time) => {
        const [hour, minutes] = time.split(':');
        if(hour[0] === '0') return Number(hour.split('')[1]) * 60 + Number(minutes);
        if(hour[0] !== '0') return Number(hour) * 60 + Number(minutes);
    }

    const computeTime = (timeIn, timeOut, workingHour) => {
        const diff = convertToMinutes(timeOut) - convertToMinutes(timeIn);
        if(diff > Number(workingHour * 60)) return true;
        if(diff < Number(workingHour * 60)) return false;
    }

    const nextPage = () => {
        if(!(skip < 0)){
            setSkip(prev => prev + 1)
        }
        getAllAtendanceData();
    }

    const prevPage = () => {
        if(!(skip <= 0)){
            setSkip(prev => prev - 1)
        } 
        getAllAtendanceData();
    }

    const entriesMenu = (value, limit) => {
        setEntries(value);
        setLimit(limit);
        getAllAtendanceData();
    }

    return(
        <div className='paymentsCaontainer'>
            {<AttendanceModal open={open} close={setOpen} refresh={getAllAtendanceData} />}
            {<ClockOutModal open={open2} close={setOpen2} refresh={getAllAtendanceData} />}
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
                            <MenuItem style={menu} onClick={openModal} value={20}>Post Attendance</MenuItem>
                            <MenuItem style={menu} value={30}>Download PDF</MenuItem>
                            <MenuItem style={menu} value={40}>Print</MenuItem>
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
                                        background:'#054834', 
                                        fontSize:'12px',
                                        color:'#fff'
                                    }} 
                                    type='date'
                                    placeholder="Search" 
                                    onChange={(e) => {searchTable(e.target.value)}}
                                />
                        </div>
                    </div>
                    <div style={{width:'140px'}} className='butt'>
                        {user.userType === "staff" &&
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
                                variant="contained"> Post Attendance
                            </Button>
                        }
                    </div>
                </div>

                <div className='search2'>
                    <div className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={entries}
                            sx={selectStyle2}
                        >
                            <MenuItem style={menu} value={10}>Show entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(20, 15)}} style={menu} value={20}>15 entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(30, 30)}} style={menu} value={30}>30 entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(40, 100)}} style={menu} value={40}>100 entries</MenuItem>
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
                        <div className='column'>Clock in</div>
                        <div className='column'>Clock out</div>
                        <div className='column'>Working Hour</div>
                        <div className='column'>Status</div>
                        <div className='column'>Actions</div>
                    </div>

                    {
                        attendanceData.length === 0?
                        <div style={place}>No data</div>:
                        attendanceData.map((item, index) => {
                            return(
                                <div key={index} className='row-container'>
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{item.employeeName}</div>
                                        <div className='column'>{item.timeIn}</div>
                                        <div className='column'>{item.timeOut}</div>
                                        <div className='column'>{item.workingHour}</div>
                                        {item.timeOut === '-- : --'?
                                            <div style={{color:'green'}} className='column'>Pending</div>:
                                            computeTime(item.timeIn, item.timeOut, item.workingHour)?
                                            <div className='column'>Punctual</div>:
                                            <div style={{color:'red'}} className='column'>Unpunctual</div>
                                        }
                                        <div className='column'>
                                            <div style={{width:'95px'}} className='actions'>
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
                                                    disabled={item.timeOut === "-- : --"? false: true}
                                                    onClick={openModal2}
                                                    variant="contained"> Clock out
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

                <div className='footer'>
                    <div 
                        style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}
                    >
                        Showing {((skip + 1) * limit) - (limit-1)} to {(skip + 1) * limit} of {total} entries
                    </div>
                    <div className='nav'>
                        <button onClick={prevPage} className='but'>Previous</button>
                        <div className='num'>{skip + 1}</div>
                        <button onClick={nextPage} className='but2'>Next</button>
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

export default Attendance;