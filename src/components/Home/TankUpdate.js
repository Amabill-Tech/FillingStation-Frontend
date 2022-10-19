import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import TankUpdateModal from '../Modals/TankUpdateModal';
import { useDispatch, useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import { getAllStations } from '../../store/actions/outlet';

const TankUpdate = () => {

    const [open, setOpen] = useState(false);
    const [defaultState, setDefault] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const tankList = useSelector(state => state.outletReducer.tankList);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const [tanks, setTanks] = useState([]);

    const updateTankModal = () => {
        setOpen(true);
    }

    const getTankData = useCallback(() => {
        if(user.userType === 'staff'){
            OutletService.getOneOutletStation({organisation: user.organisationID, outletID: user.outletID}).then(data => {
                dispatch(getAllStations([data.station]));
            });

            OutletService.getAllOutletTanks({organisationID: user.organisationID, outletID: user.outletID}).then(data => {
                setTanks(data);
            })
        }else{
            OutletService.getAllOutletStations({organisation: user._id}).then(data => {
                dispatch(getAllStations(data.station));
            });
        }
    }, [user._id, user.organisationID, user.outletID, user.userType, dispatch]);

    useEffect(()=>{
        getTankData();
    },[getTankData]);

    const changeMenu = (index, item ) => {
        setDefault(index);
    }

    const searchTable = (value) => {
        //dispatch(searchQuery(value));
    }

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            { <TankUpdateModal data={tankList} open={open} close={setOpen} tanks={tanks} refresh={getTankData} /> }
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
                            <MenuItem onClick={updateTankModal} value={20}>Update Tank</MenuItem>
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
                            onClick={updateTankModal}
                            variant="contained">Update Tank
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
                        <div className='column'>Date</div>
                        <div className='column'>Tank Name</div>
                        <div className='column'>Tank Product</div>
                        <div className='column'>Station</div>
                        <div className='column'>Previous Level</div>
                        <div className='column'>Quantity Added</div>
                        <div className='column'>Updated Level</div>
                    </div>

                    <div className='row-container'>
                        {!user.userType === 'staff' &&
                            tankList.length === 0?
                            <div style={place}>No tank updates</div>:
                            tankList.map((data, index) => {
                                return(
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{data.dateUpdated}</div>
                                        <div className='column'>{data.tankName}</div>
                                        <div className='column'>{data.productType}</div>
                                        <div className='column'>{data.station}</div>
                                        <div className='column'>{data.previousLevel}</div>
                                        <div className='column'>{data.quantityAdded}</div>
                                        <div className='column'>{data.currentLevel}</div>
                                    </div>
                                )
                            })
                        }

                        {user.userType === 'staff' &&
                            tanks.length === 0?
                            <div style={place}>No tank updates</div>:
                            tanks.map((data, index) => {
                                return(
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{data.dateUpdated}</div>
                                        <div className='column'>{data.tankName}</div>
                                        <div className='column'>{data.productType}</div>
                                        <div className='column'>{data.station}</div>
                                        <div className='column'>{data.previousLevel}</div>
                                        <div className='column'>{data.quantityAdded}</div>
                                        <div className='column'>{data.currentLevel}</div>
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

export default TankUpdate;