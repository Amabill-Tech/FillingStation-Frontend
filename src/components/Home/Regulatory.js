import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import PaymentModal from '../Modals/PaymentModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStations } from '../../store/actions/outlet';
import OutletService from '../../services/outletService';

const Regulatory = () => {

    const [open, setOpen] = useState(false);
    const [defaultState, setDefault] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);

    const openPaymentModal = () => {
        setOpen(true);
    }

    const getTankData = useCallback(() => {
        const payload = {
            organisationID: user._id
        }

        OutletService.getAllOutletStations({organisation: user._id}).then(data => {
            dispatch(getAllStations(data.station));
        });
    }, [user._id, dispatch]);

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
        <div className='paymentsCaontainer'>
            { <PaymentModal open={open} close={setOpen} /> }
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
                            <MenuItem onClick={openPaymentModal} value={20}>Register Payment</MenuItem>
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
                            onClick={openPaymentModal}
                            variant="contained"> Register Payment
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
                        <div className='column'>Organisation Name</div>
                        <div className='column'>Description</div>
                        <div className='column'>Amount</div>
                        <div className='column'>Contact Person</div>
                        <div className='column'>Attachment (Certificate)</div>
                        <div className='column'>Payment reciept</div>
                    </div>

                    <div className='row-container'>
                        <div style={{height:'auto', display:'flex', justifyContent:'center', alignItems:'center'}} className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>DPR</div>
                            <div style={{textAlign:'left', lineHeight:'20px'}} className='column'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere  
                            </div>
                            <div className='column'>132,000</div>
                            <div className='column'>Eng. Balawa Mudu</div>
                            <div className='column'>DPRCertificate.pdf</div>
                            <div className='column'>DPRReceip.pdf</div>
                        </div> 

                        <div style={{height:'auto', display:'flex', justifyContent:'center', alignItems:'center'}} className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>DPR</div>
                            <div style={{textAlign:'left', lineHeight:'20px'}} className='column'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere  
                            </div>
                            <div className='column'>132,000</div>
                            <div className='column'>Eng. Balawa Mudu</div>
                            <div className='column'>DPRCertificate.pdf</div>
                            <div className='column'>DPRReceip.pdf</div>
                        </div> 

                        <div style={{height:'auto', display:'flex', justifyContent:'center', alignItems:'center'}} className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>DPR</div>
                            <div style={{textAlign:'left', lineHeight:'20px'}} className='column'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere  
                            </div>
                            <div className='column'>132,000</div>
                            <div className='column'>Eng. Balawa Mudu</div>
                            <div className='column'>DPRCertificate.pdf</div>
                            <div className='column'>DPRReceip.pdf</div>
                        </div> 

                        <div style={{height:'auto', display:'flex', justifyContent:'center', alignItems:'center'}} className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>DPR</div>
                            <div style={{textAlign:'left', lineHeight:'20px'}} className='column'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere  
                            </div>
                            <div className='column'>132,000</div>
                            <div className='column'>Eng. Balawa Mudu</div>
                            <div className='column'>DPRCertificate.pdf</div>
                            <div className='column'>DPRReceip.pdf</div>
                        </div> 

                        <div style={{height:'auto', display:'flex', justifyContent:'center', alignItems:'center'}} className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>DPR</div>
                            <div style={{textAlign:'left', lineHeight:'20px'}} className='column'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere  
                            </div>
                            <div className='column'>132,000</div>
                            <div className='column'>Eng. Balawa Mudu</div>
                            <div className='column'>DPRCertificate.pdf</div>
                            <div className='column'>DPRReceip.pdf</div>
                        </div> 

                        <div style={{height:'auto', display:'flex', justifyContent:'center', alignItems:'center'}} className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>DPR</div>
                            <div style={{textAlign:'left', lineHeight:'20px'}} className='column'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere  
                            </div>
                            <div className='column'>132,000</div>
                            <div className='column'>Eng. Balawa Mudu</div>
                            <div className='column'>DPRCertificate.pdf</div>
                            <div className='column'>DPRReceip.pdf</div>
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

export default Regulatory;