import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/pump.scss';
import me4 from '../../assets/me4.png';
import plus from '../../assets/plus.png';
import cross from '../../assets/cross.png';
import { Button, MenuItem, Select } from '@mui/material';
import OutletService from '../../services/outletService';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOutletTanks, getAllPumps, getAllStations, getOneTank } from '../../store/actions/outlet';
import LPOService from '../../services/lpo';
import { createLPO } from '../../store/actions/lpo';
import PumpUpdate from '../Modals/PumpUpdate';

const Dipping = () => {

    const [defaultState, setDefault] = useState(0);
    const [currentStation, setCurrentStation] = useState({});
    const [currentPump, setCurrentPump] = useState({});
    const [currentTank, setCurrentTank] = useState({});
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const tankList = useSelector(state => state.outletReducer.tankList);
    const [totalPumps, setTotalPumps] = useState([]);
    const [open, setOpen] = useState(false);
    const [PMSPumps, setPMSPumps] = useState([]);
    const [AGOPumps, setAGOPumps] = useState([]);
    const [DPKPumps, setDPKPumps] = useState([]);

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
            
            OutletService.getAllOutletTanks(payload).then(data => {
                dispatch(getAllOutletTanks(data.stations));
            });
        })
    }, [dispatch, user._id, user.userType, user.organisationID]);

    const getAllPumps = useCallback(() => {
        const PMS = tankList.filter(data => data.productType === "PMS");
        const AGO = tankList.filter(data => data.productType === "AGO");
        const DPK = tankList.filter(data => data.productType === "DPK");

        setPMSPumps(PMS);
        setAGOPumps(AGO);
        setDPKPumps(DPK);
    }, [tankList])

    useEffect(()=>{
        getAllStationData();
    }, [getAllStationData])

    useEffect(()=>{
        getAllPumps();
    }, [getAllPumps])

    const changeMenu2 = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);

        const payload = {
            outletID: item._id, 
            organisationID: item.organisation
        }
        
        OutletService.getAllOutletTanks(payload).then(data => {console.log(data, 'update')
            dispatch(getAllOutletTanks(data.stations));
        });
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

    const dippingValue = (e, item) => {
        const payload = {
            id: item._id,
            dipping: e.target.value
        }

        OutletService.updateTank(payload).then((data) => {
            console.log('sucess')
        }).then(()=>{
            getAllStationData();
        })
    }

    return(
        <div className='pumpContainer'>
            {open && <PumpUpdate open={open} close={setOpen} currentStation={currentStation} current={currentPump} currentTank={currentTank} />}
            <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={defaultState}
                sx={selectStyle2}
            >
                {
                    allOutlets.map((item, index) => {
                        return(
                            <MenuItem key={index} style={menu} onClick={()=>{changeMenu2(index, item)}} value={index}>{item.outletName +', '+ item.city}</MenuItem>
                        )
                    })  
                }
            </Select>
            
            <div className='pmscont'>PMS</div>

            <div className='pumping'>
                {
                    PMSPumps.length === 0?
                    <div style={created}>No PMS tank created</div>:
                    PMSPumps.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start'}} key={index} className='item'>
                                <img style={{width:'80px', height:'65px', marginTop:'15px'}} src={me4}  alt="icon"/>
                                <div style={{marginTop:'0px'}} className='pop'>{item.tankName}</div>
                                <div style={{marginTop:'0px', color:'green'}} className='pop'>{`Tank capacity: ${item.tankCapacity}`}</div>
                                <div style={{marginTop:'10px'}} className='label'>Dipping (Litres)</div>
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
                                <input onChange={(e)=>{dippingValue(e, item)}} defaultValue={item.dipping} style={imps} type="text" />
                            </div>
                        )
                    })
                }
            </div>

            <div style={{color:'#FFA010'}} className='pmscont'>AGO</div>

            <div className='pumping'>
                {
                    AGOPumps.length === 0?
                    <div style={created}>No AGO tank created</div>:
                    AGOPumps.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start'}} key={index} className='item'>
                                <img style={{width:'80px', height:'65px', marginTop:'15px'}} src={me4}  alt="icon"/>
                                <div style={{marginTop:'0px'}} className='pop'>{item.tankName}</div>
                                <div style={{marginTop:'0px', color:'green'}} className='pop'>{`Tank capacity: ${item.tankCapacity}`}</div>
                                <div style={{marginTop:'10px'}} className='label'>Dipping (Litres)</div>
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
                                <input onChange={(e)=>{dippingValue(e, item)}} defaultValue={item.dipping} style={imps} type="text" />
                            </div>
                        )
                    })
                }
            </div>

            <div className='pmscont'>DPK</div>

            <div className='pumping'>
                {
                    DPKPumps.length === 0?
                    <div style={created}>No DPK tank created</div>:
                    DPKPumps.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start'}} key={index} className='item'>
                                <img style={{width:'80px', height:'65px', marginTop:'15px'}} src={me4}  alt="icon"/>
                                <div style={{marginTop:'0px'}} className='pop'>{item.tankName}</div>
                                <div style={{marginTop:'0px', color:'green'}} className='pop'>{`Tank capacity: ${item.tankCapacity}`}</div>
                                <div style={{marginTop:'10px'}} className='label'>Dipping (Litres)</div>
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
                                <input onChange={(e)=>{dippingValue(e, item)}} defaultValue={item.dipping} style={imps} type="text" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const created = {
    fontSize:'12px',
    marginLeft:'10px'
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
    width:'200px', 
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

export default Dipping;