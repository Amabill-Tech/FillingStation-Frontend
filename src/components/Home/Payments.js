import React, { useEffect, useCallback, useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LPOModal from '../Modals/LPOModal';
import LPOService from '../../services/lpo';
import { useSelector } from 'react-redux';
import { createLPO, searchLPO } from '../../store/actions/lpo';
import { useDispatch } from 'react-redux';
import OutletService from '../../services/outletService';
import { getAllStations } from '../../store/actions/outlet';
import { OutlinedInput } from '@mui/material';
import edit2 from '../../assets/edit2.png';
import eyes from '../../assets/eyes.png';
import LPORateModal from '../Modals/SetLPORate';
import { Route, Switch } from 'react-router-dom';
import ListLPO from '../LPO/ListLPO';
import LPOReport from '../Reports/LpoReport';
import RecordPaymentService from '../../services/recordPayment';
import { allBankPayment, allPosPayment } from '../../store/actions/recordPayment';
import config from '../../constants';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const Payments = (props) => {

    const [lpo, setLpo] = React.useState(false);
    const user = useSelector(state => state.authReducer.user);
    const bank = useSelector(state => state.recordPaymentReducer.bank);
    const pos = useSelector(state => state.recordPaymentReducer.pos);
    const dispatch = useDispatch();
    const [defaultState, setDefault] = useState(0);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const [activeButton, setActiveButton] = useState(false);
    const [currentStation, setCurrentStation] = useState({});
    const [entries, setEntries] = useState(10);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(15);
    const [total1, setTotal1] = useState(0);
    const [total2, setTotal2] = useState(0);
    const [prints, setPrints] = useState(false);
    const [viewLPO, setViewLpo] = useState(false);
    const [priceModal, setPriceModal] = useState(false);
    const [currentLPO, setCurrentLPO] = useState();

    const openModal = () => {
        setLpo(true);
    }

    const getAllLPOData = useCallback(() => {
        OutletService.getAllOutletStations({organisation: user.userType === "superAdmin"? user._id : user.organisationID}).then(data => {
            dispatch(getAllStations(data.station));
            setCurrentStation(data.station[0]);
            setDefault(1);
            return data.station[0]
        }).then((data)=>{
            const payload = {
                skip: skip * limit,
                limit: limit,
                outletID: data._id, 
                organisationID: data.organisation
            }

            RecordPaymentService.getBankPayments(payload).then((data) => {
                setTotal1(data.bank.count);
                dispatch(allBankPayment(data.bank.bank));
            })
    
            RecordPaymentService.getPOSPayments(payload).then((data) => {
                setTotal2(data.pos.count);
                dispatch(allPosPayment(data.pos.pos));
            })
        });
    }, [dispatch, user.organisationID, user._id, user.userType, skip, limit]);

    useEffect(()=>{
        getAllLPOData();
    },[getAllLPOData])

    const LPOCompanies = () => {
        setActiveButton(true);
    }

    const dispensed = () => {
        setActiveButton(false);
    }

    const refresh = () => {
        const payload = {
            skip: skip * limit,
            limit: limit,
            outletID: currentStation._id, 
            organisationID: currentStation.organisation
        }

        RecordPaymentService.getBankPayments(payload).then((data) => {
            setTotal1(data.bank.count);
            dispatch(allBankPayment(data.bank.bank));
        })

        RecordPaymentService.getPOSPayments(payload).then((data) => {
            setTotal2(data.pos.count);
            dispatch(allPosPayment(data.pos.pos));
        })
    }

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);

        const payload = {
            skip: skip * limit,
            limit: limit,
            outletID: item._id, 
            organisationID: item.organisation
        }

        RecordPaymentService.getBankPayments(payload).then((data) => {
            setTotal1(data.bank.count);
            dispatch(allBankPayment(data.bank.bank));
        })

        RecordPaymentService.getPOSPayments(payload).then((data) => {
            setTotal2(data.pos.count);
            dispatch(allPosPayment(data.pos.pos));
        })
    }

    const searchTable = (value) => {
        dispatch(searchLPO(value));
    }

    const printReport = () => {
        setPrints(true);
    }

    const entriesMenu = (value, limit) => {
        setEntries(value);
        setLimit(limit);
        refresh();
    }

    const nextPage = () => {
        if(!(skip < 0)){
            setSkip(prev => prev + 1)
        }
        refresh();
    }

    const prevPage = () => {
        if(!(skip <= 0)){
            setSkip(prev => prev - 1)
        } 
        refresh();
    }

    const openLPOSales = (data) => {
        props.history.push('/home/lpo/list', {state: data});
    }

    const createPrice = (data) => {
        setPriceModal(true);
        setCurrentLPO(data);
    }

    return(
        <React.Fragment>
            <div data-aos="zoom-in-down" style={{width:'100%'}} className='paymentsCaontainer'>
                {/* { prints && <LPOReport allOutlets={lpos} open={prints} close={setPrints}/>} */}
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
                                    <MenuItem style={menu} value={0}>Select station</MenuItem>
                                    {
                                    allOutlets.map((item, index) => {
                                            return(
                                                <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index + 1, item)}} value={index + 1}>{item.outletName+ ', ' + item.city}</MenuItem>
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
                        <div style={{justifyContent: 'flex-end'}} className='butt'>
                            
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
                                variant="contained"> Bank Payments
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
                                variant="contained"> POS payments
                            </Button>
                        </div>
                        <div style={{width: mediaMatch.matches? '100%': '330px', alignItems:'center'}} className='input-cont2'>
                            
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={entries}
                                sx={{...selectStyle2, 
                                    width:'130px',
                                    height:'32px',
                                    display: mediaMatch.matches && 'none',
                                }}
                            >
                                <MenuItem style={menu} value={10}>Show entries</MenuItem>
                                <MenuItem onClick={()=>{entriesMenu(20, 15)}} style={menu} value={20}>15 entries</MenuItem>
                                <MenuItem onClick={()=>{entriesMenu(30, 30)}} style={menu} value={30}>30 entries</MenuItem>
                                <MenuItem onClick={()=>{entriesMenu(40, 100)}} style={menu} value={40}>100 entries</MenuItem>
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
                                onClick={printReport}
                                variant="contained"> Print
                            </Button>
                        </div>
                    </div>

                    {activeButton ||
                        <div style={{marginTop:'10px'}} className='table-container'>
                        <div className='table-head'>
                            <div className='column'>S/N</div>
                            <div className='column'>Bank Name</div>
                            <div className='column'>Teller Number</div>
                            <div className='column'>Amount Paid</div>
                            <div className='column'>Payment Date</div>
                            <div className='column'>Date Created</div>
                            <div className='column'>Reciept</div>
                        </div>

                        <div className='row-container'>
                            {
                                bank.length === 0?
                                <div style={place}>No LPO Data </div>:
                                bank.map((data, index) => {
                                    return(
                                        <div className='table-head2'>
                                            <div className='column'>{index + 1}</div>
                                            <div className='column'>{data.bankName}</div>
                                            <div className='column'>{data.tellerNumber}</div>
                                            <div className='column'>{data.amountPaid}</div>
                                            <div className='column'>{data.paymentDate}</div>
                                            <div className='column'>{data.createdAt.split('T')[0]}</div>
                                            <div className='column'>
                                                <a href={config.BASE_URL + data.uploadSlip} target="_blank" rel="noreferrer">View Slip</a>
                                            </div>
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
                                <div className='column'>POS Name</div>
                                <div className='column'>Terminal ID</div>
                                <div className='column'>Amount Paid</div>
                                <div className='column'>Payment Date</div>
                                <div className='column'>Date Created</div>
                                <div className='column'>Reciept</div>
                            </div>

                            <div className='row-container'>
                                {
                                    pos.length === 0?
                                    <div style={place}>No LPO Data </div>:
                                    pos.map((data, index) => {
                                        return(
                                            <div className='table-head2'>
                                                <div className='column'>{index + 1}</div>
                                                <div className='column'>{data.posName}</div>
                                                <div className='column'>{data.terminalID}</div>
                                                <div className='column'>{data.amountPaid}</div>
                                                <div className='column'>{data.paymentDate}</div>
                                                <div className='column'>{data.createdAt.split('T')[0]}</div>
                                                <div className='column'>
                                                    <a href={config.BASE_URL + data.uploadSlip} target="_blank" rel="noreferrer">View Slip</a>
                                                </div>
                                            </div> 
                                        )
                                    })
                                } 
                            </div>
                        </div>
                    }

                    <div className='footer'>
                        <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>
                            Showing {((skip + 1) * limit) - (limit-1)} to {(skip + 1) * limit} of {total1} entries
                        </div>
                        <div className='nav'>
                            <button onClick={prevPage} className='but'>Previous</button>
                            <div className='num'>{skip + 1}</div>
                            <button onClick={nextPage} className='but2'>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
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

export default Payments;