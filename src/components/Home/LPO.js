import React, { useEffect, useCallback } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LPOModal from '../Modals/LPOModal';
import LPOService from '../../services/lpo';
import { useSelector } from 'react-redux';
import { createLPO } from '../../store/actions/lpo';
import { useDispatch } from 'react-redux';

const LPO = () => {

    const [lpo, setLpo] = React.useState(false);
    const user = useSelector(state => state.authReducer.user);
    const lpos = useSelector(state => state.lpoReducer.lpo);
    const dispatch = useDispatch();
    console.log(lpos)

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
    }, [dispatch, user._id]);

    useEffect(()=>{
        getAllLPOData();
    },[getAllLPOData])

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
                            sx={{...selectStyle2, backgroundColor:"#F36A4C", color:'#fff'}}
                        >
                            <MenuItem value={10}>Register LPO</MenuItem>
                            <MenuItem value={20}>Download PDF</MenuItem>
                            <MenuItem value={30}>Print</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='search'>
                    <div className='input-cont'>
                        <div className='second-select'>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={10}
                                sx={selectStyle2}
                            >
                                <MenuItem value={10}>07 August, 2022</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                        <div className='second-select'>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={10}
                                sx={selectStyle2}
                            >
                                <MenuItem value={10}>07 August, 2022</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className='butt'>
                        <Button sx={{
                            width:'100%', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'11px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  
                            onClick={openModal}
                            variant="contained"> Register LPO
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
                                fontSize:'11px',
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
                                fontSize:'11px',
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

export default LPO;