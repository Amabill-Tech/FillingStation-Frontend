import React, { useEffect, useCallback, useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LPOModal from '../Modals/LPOModal';
import LPOService from '../../services/lpo';
import { useSelector } from 'react-redux';
import { createLPO } from '../../store/actions/lpo';
import { useDispatch } from 'react-redux';
import OutletService from '../../services/outletService';
import { getAllStations } from '../../store/actions/outlet';
import { OutlinedInput } from '@mui/material';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const LPO = () => {

    const [lpo, setLpo] = React.useState(false);
    const user = useSelector(state => state.authReducer.user);
    const lpos = useSelector(state => state.lpoReducer.lpo);
    const dispatch = useDispatch();
    const [defaultState, setDefault] = useState(0);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const [activeButton, setActiveButton] = useState(false);

    const openModal = () => {
        setLpo(true);
    }

    const getAllLPOData = useCallback(() => {

        const payload = {
            organizationID: user._id
        }

        LPOService.getAllLPO(payload).then((data) => {
            dispatch(createLPO(data));
        })

        OutletService.getAllOutletStations({organisation: user._id}).then(data => {
            dispatch(getAllStations(data.station));
        });
    }, [dispatch, user._id]);

    useEffect(()=>{
        getAllLPOData();
    },[getAllLPOData])

    const changeMenu = (index, item ) => {
        setDefault(index);
    }

    const searchTable = (value) => {
        //dispatch(searchQuery(value));
    }

    const LPOCompanies = () => {
        setActiveButton(true);
    }

    const dispensed = () => {
        setActiveButton(false);
    }

    return(
        <div className='paymentsCaontainer'>
            {<LPOModal open={lpo} close={setLpo} refresh={getAllLPOData}/>}
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
                            <MenuItem onClick={openModal} value={20}>Register LPO</MenuItem>
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
                    <div className='butt'>
                        <Button sx={{
                            width:'100%', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'10px',
                            marginRight:'10px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  
                            onClick={openModal}
                            variant="contained"> LPO Payment
                        </Button>
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
                            variant="contained"> Register LPO
                        </Button>
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='search2'>
                    <div className='lpo-butt'>
                        <Button sx={{
                            width:'120px', 
                            height:'30px',  
                            background: !activeButton? '#06805B': '#fff',
                            borderRadius: '27px',
                            fontSize:'10px',
                            marginRight:'10px',
                            color: !activeButton? '#fff': '#000',
                            '&:hover': {
                                background: !activeButton? '#06805B': '#fff',
                            }
                            }}  
                            onClick={dispensed}
                            variant="contained"> LPO Dispensed
                        </Button>
                        <Button sx={{
                            width:'120px', 
                            height:'30px',  
                            background: activeButton? '#06805B': '#fff',
                            borderRadius: '27px',
                            fontSize:'10px',
                            color: activeButton? '#fff': '#000',
                            '&:hover': {
                                background: activeButton? '#06805B': '#fff',
                            }
                            }}  
                            onClick={LPOCompanies}
                            variant="contained"> LPO Companies
                        </Button>
                    </div>
                    <div style={{width: mediaMatch.matches? '100%': '330px', alignItems:'center'}} className='input-cont2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={{...selectStyle2, 
                                width:'130px',
                                height:'32px',
                                display: mediaMatch.matches && 'none',
                            }}
                        >
                            <MenuItem value={10}>Show entries</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
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
                            //onClick={printReport}
                            variant="contained"> Print
                        </Button>
                    </div>
                </div>

                {activeButton ||
                    <div style={{marginTop:'10px'}} className='table-container'>
                    <div className='table-head'>
                        <div className='column'>S/N</div>
                        <div className='column'>Company Name</div>
                        <div className='column'>Address</div>
                        <div className='column'>Person of Contact</div>
                        <div className='column'>PMS Dispensed</div>
                        <div className='column'>AGO Dispensed</div>
                        <div className='column'>DPK Dispensed</div>
                        <div className='column'>Payment Structure</div>
                    </div>

                    <div className='row-container'>
                        {
                            lpos.length === 0?
                            <div style={place}>No LPO Data </div>:
                            lpos.map((data, index) => {
                                return(
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{data.companyName}</div>
                                        <div className='column'>{data.address}</div>
                                        <div className='column'>{data.personOfContact}</div>
                                        <div className='column'>{data.PMS}</div>
                                        <div className='column'>{data.AGO}</div>
                                        <div className='column'>{data.DPK}</div>
                                        <div className='column'>{data.paymentStructure}</div>
                                    </div> 
                                )
                            })
                        } 
                    </div>
                    </div>
                }

                {activeButton &&
                    <div style={{marginTop:'10px'}} className='table-container'>
                    <div className='table-head'>
                        <div className='column'>S/N</div>
                        <div className='column'>Company Name</div>
                        <div className='column'>Address</div>
                        <div className='column'>Person of Contact</div>
                        <div className='column'>PMS Limit</div>
                        <div className='column'>AGO Limit</div>
                        <div className='column'>DPK Limit</div>
                        <div className='column'>Payment Structure</div>
                    </div>

                    <div className='row-container'>
                        {
                            lpos.length === 0?
                            <div style={place}>No LPO Data </div>:
                            lpos.map((data, index) => {
                                return(
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{data.companyName}</div>
                                        <div className='column'>{data.address}</div>
                                        <div className='column'>{data.personOfContact}</div>
                                        <div className='column'>{data.PMS}</div>
                                        <div className='column'>{data.AGO}</div>
                                        <div className='column'>{data.DPK}</div>
                                        <div className='column'>{data.paymentStructure}</div>
                                    </div> 
                                )
                            })
                        } 
                    </div>
                    </div>
                }

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

export default LPO;