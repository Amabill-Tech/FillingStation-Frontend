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

const Attendance = () => {
    
    const [open, setOpen] = useState(false);
    const [defaultState, setDefault] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const attendanceData = useSelector(state => state.attendanceReducer.attendance);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);

    const openModal = () => {
        setOpen(true);
    }

    const getAllAtendanceData = useCallback(() => {
        const payload = {
            organisationID: user._id
        }
        AtendanceService.allAttendanceRecords(payload).then(data => {
            dispatch(createAttendance(data.attendance));
        });

        OutletService.getAllOutletStations({organisation: user._id}).then(data => {
            dispatch(getAllStations(data.station));
        });
    }, [user._id, dispatch]);

    useEffect(()=>{
        getAllAtendanceData();
    },[getAllAtendanceData]);

    const changeMenu = (index, item ) => {
        setDefault(index);
    }

    const searchTable = (value) => {
        dispatch(searchAttendance(value));
    }

    return(
        <div className='paymentsCaontainer'>
            {<AttendanceModal open={open} close={setOpen} refresh={getAllAtendanceData} />}
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
                            <MenuItem onClick={openModal} value={20}>Post Attendance</MenuItem>
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
                    <div style={{width:'140px'}} className='butt'>
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
                                        <div className='column'>Punctual</div>
                                        <div className='column'>
                                            <div style={{width:'100px'}} className='actions'>
                                                <Button sx={{
                                                    width:'100%', 
                                                    height:'30px',  
                                                    background: '#427BBE',
                                                    borderRadius: '3px',
                                                    fontSize:'10px',
                                                    '&:hover': {
                                                        backgroundColor: '#427BBE'
                                                    }
                                                    }}  variant="contained"> Clock out
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

export default Attendance;