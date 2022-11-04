import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/pump.scss';
import pump1 from '../../assets/pump1.png';
import plus from '../../assets/plus.png';
import cross from '../../assets/cross.png';
import { Button, MenuItem, Select } from '@mui/material';
import OutletService from '../../services/outletService';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPumps, getAllStations, getOneTank } from '../../store/actions/outlet';
import LPOService from '../../services/lpo';
import { createLPO } from '../../store/actions/lpo';
import PumpUpdate from '../Modals/PumpUpdate';

const Pumps = () => {

    const [defaultState, setDefault] = useState(0);
    const [currentStation, setCurrentStation] = useState({});
    const [currentPump, setCurrentPump] = useState({});
    const [currentTank, setCurrentTank] = useState({});
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const pumpList = useSelector(state => state.outletReducer.pumpList);
    const [totalPumps, setTotalPumps] = useState([]);
    const [open, setOpen] = useState(false);

    const [product, setProduct] = useState('');

    const getAllStationData = useCallback(() => {
        OutletService.getAllOutletStations({organisation: user.userType === "superAdmin"? user._id : user.organisationID}).then(data => {
            dispatch(getAllStations(data.station));
            setCurrentStation(data.station[0]);
            return data.station[0]
        }).then((data)=>{
            const payload = {
                outletID: data._id, 
                organisationID: data.organisation
            }
            
            OutletService.getAllStationPumps(payload).then(data => {
                dispatch(getAllPumps(data));
            });

            LPOService.getAllLPO(payload).then((data) => {
                dispatch(createLPO(data.lpo.lpo));
            })
        })
    }, [dispatch, user.organisationID]);

    useEffect(()=>{
        getAllStationData()
    }, [getAllStationData])

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);

        const payload = {
            outletID: item._id, 
            organisationID: item.organisation
        }
        
        OutletService.getAllStationPumps(payload).then(data => {
            dispatch(getAllPumps(data));
        });

        setTotalPumps([]);
    }

    const diselectPump = (index) => {alert(index)
        setSelected(null);
    }

    const openSalesModal = (item) => {
        setOpen(true);
        setCurrentPump(item);
        console.log(item)

        const payload = {
            id: item.hostTank
        }

        OutletService.getOneTank(payload).then((data) => {
            dispatch(getOneTank(data.stations));
        })
    }

    const pumpItem = (e, index, item) => {
        e.preventDefault();

        if(e.target.parentElement.style.color === "#fff"){
            e.target.parentElement.style.background = "#fff";
            e.target.parentElement.style.color = "#000";
        }else{
            e.target.parentElement.style.background = "#06805B";
            e.target.parentElement.style.color = "#fff";
        }

        setSelected(index);
        setCurrentPump(item);
        setProduct(item.productType);
        setTotalPumps(prev => [...prev, item]);
    }

    return(
        <div className='pumpContainer'>
            {open && <PumpUpdate open={open} close={setOpen} currentStation={currentStation} current={currentPump} currentTank={currentTank} />}
            <div>Select Pump used for the day</div>
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
            <div className='pump-list'>
                {
                    pumpList.length === 0?
                    <div style={{...box, width:'170px'}}>
                        <div style={{marginRight:'10px'}}>No pump Created</div>
                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                    </div>:
                    pumpList.map((data, index) => {
                        return(
                            <div key={index} onClick={e => pumpItem(e, index, data)}>
                                <div className='box2'>
                                    <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                    <img onClick={()=>{diselectPump(index)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='pumping'>
                {
                    pumpList.length === 0?
                    <div>Please click to select a pump</div>:
                    pumpList.map((item, index) => {
                        return(
                            <div key={index} data-aos="fade-down" className='item'>
                                <img style={{width:'55px', height:'65px'}} src={pump1}  alt="icon"/>
                                <div className='pop'>{item.pumpName}</div>
                                <div className='label'>Totalizer Reading (Litres)</div>
                                <Button sx={{
                                    width:'140px', 
                                    height:'30px',  
                                    background: '#06805B',
                                    borderRadius: '3px',
                                    fontSize:'12px',
                                    marginTop:'10px',
                                    textTransform: 'capitalize',
                                    display:'none',
                                    '&:hover': {
                                        backgroundColor: '#06805B'
                                    }
                                    }}  
                                    onClick={()=>{openSalesModal(item)}}
                                    variant="contained"> Record Sales
                                </Button>
                                <input defaultValue={item.totalizerReading} style={imps} type="text" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const imps = {
    height:'30px', 
    width:'160px', 
    marginTop:'10px',
    background:'#D7D7D799',
    outline:'none',
    border:'1px solid #000',
    paddingLeft:'10px'
}

const selectStyle2 = {
    width:'130px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none',
    marginTop:'10px'
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

const box = {
    width: '100px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06805B',
    borderRadius: '30px',
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    marginRight: '10px',
    marginTop: '10px',
}

const box2 = {
    width: '100px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '30px',
    color: '#000',
    fontFamily: 'Nunito-Regular',
    marginRight: '10px',
    marginTop: '10px',
    border: '1px solid #8D8D8D',
}

export default Pumps;