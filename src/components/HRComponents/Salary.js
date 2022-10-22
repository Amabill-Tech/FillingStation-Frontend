import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import hr7 from '../../assets/hr7.png';
import hr8 from '../../assets/hr8.png';
import SalaryModal from '../Modals/SalaryModal';
import SalaryService from '../../services/salary';
import { createSalary, searchSalary } from '../../store/actions/salary';
import { useDispatch, useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import { OutlinedInput } from '@mui/material';
import { getAllStations } from '../../store/actions/outlet';
import UpdateSalary from '../Modals/UpdateSalary';
import swal from 'sweetalert';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const Salary = () => {

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [defaultState, setDefault] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const salaryData = useSelector(state => state.salaryReducer.salary);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const [currentSalary, setCurrentSalary] = useState(false);
    const [currentStation, setCurrentStation] = useState({});
    const [entries, setEntries] = useState(10);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(15);
    const [total, setTotal] = useState(0);

    const openSalaryModal = () => {
        setOpen(true);
    }

    const getAllSalaryData = useCallback(() => {

        OutletService.getAllOutletStations({organisation: user.organisationID}).then(data => {
            dispatch(getAllStations(data.station));
            setCurrentStation(data.station[0]);
            return data.station[0]
        }).then((data)=>{console.log(data, 'teaaha')
            const payload = {
                skip: skip * limit,
                limit: limit,
                outletID: data._id, 
                organisationID: data.organisation
            }
            SalaryService.allSalaryRecords(payload).then(data => {
                setTotal(data.salary.count);
                dispatch(createSalary(data.salary.salary));
            });
        })
    }, [user.organisationID, limit, skip, dispatch]);

    useEffect(()=>{
        getAllSalaryData();
    },[getAllSalaryData]);

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);

        const payload = {
            skip: skip * limit,
            limit: limit,
            outletID: item._id, 
            organisationID: item.organisation
        }
        SalaryService.allSalaryRecords(payload).then(data => {
            setTotal(data.salary.count);
            dispatch(createSalary(data.salary.salary));
        });
    }

    const searchTable = (value) => {
        dispatch(searchSalary(value));
    }

    const updateSalary = (item) => {
        setOpen2(true);
        setCurrentSalary(item)
    }

    const deleteSalary = (item) => {
        swal({
            title: "Alert!",
            text: "Are you sure you want to delete this salary?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                if (willDelete) {
                    SalaryService.deleteSalary({id: item._id}).then((data) => {
                        swal("Success", "Salary created successfully!", "success");
                    }).then(()=>{
                        getAllSalaryData();
                    })
                }
            }
        });
    }

    const nextPage = () => {
        if(!(skip < 0)){
            setSkip(prev => prev + 1)
        }
        getAllSalaryData();
    }

    const prevPage = () => {
        if(!(skip <= 0)){
            setSkip(prev => prev - 1)
        } 
        getAllSalaryData();
    }

    const entriesMenu = (value, limit) => {
        setEntries(value);
        setLimit(limit);
        getAllSalaryData();
    }

    const printReport = () => {
        
    }

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            {<SalaryModal station={currentStation} open={open} close={setOpen} refresh={getAllSalaryData} />}
            {<UpdateSalary open={open2} id={currentSalary} close={setOpen2} refresh={getAllSalaryData} />}
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
                            <MenuItem onClick={openSalaryModal} value={20}>Add Salary</MenuItem>
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
                            onClick={openSalaryModal}
                            variant="contained"> Add Salary
                        </Button>
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
                        <div className='column'>Position</div>
                        <div className='column'>Level</div>
                        <div className='column'>Salary range</div>
                        <div className='column'>Actions</div>
                    </div>

                    <div className='row-container'>
                        {
                            salaryData.length === 0?
                            <div style={place}>No data</div>:
                            salaryData.map((item, index) => {
                                return(
                                    <div data-aos="fade-up" key={index} className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{item.position}</div>
                                        <div className='column'>{item.level}</div>
                                        <div className='column'>{item.low_range+' - '+item.high_range}</div>
                                        <div className='column'>
                                            <div style={{width:'70px'}} className='actions'>
                                                <img onClick={()=>{updateSalary(item)}} style={{width:'27px', height:'27px'}} src={hr7} alt="icon" />
                                                <img onClick={()=>{deleteSalary(item)}} style={{width:'27px', height:'27px'}} src={hr8} alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='footer'>
                    <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>
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

export default Salary;