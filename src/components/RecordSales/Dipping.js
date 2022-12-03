import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/pump.scss';
import me4 from '../../assets/me4.png';
import { Button } from '@mui/material';
import OutletService from '../../services/outletService';
import { useDispatch, useSelector } from 'react-redux';
import PumpUpdate from '../Modals/PumpUpdate';
import { getOneTank } from '../../store/actions/outlet';

const Dipping = (props) => {

    const [currentPump, setCurrentPump] = useState({});
    const dispatch = useDispatch();
    const tankList = useSelector(state => state.outletReducer.tankList);
    const [open, setOpen] = useState(false);
    const [PMSPumps, setPMSPumps] = useState([]);
    const [AGOPumps, setAGOPumps] = useState([]);
    const [DPKPumps, setDPKPumps] = useState([]);
    const oneOutletStation = useSelector(state => state.outletReducer.oneStation);

    const getAllPumps = useCallback(() => {
        const PMS = tankList.filter(data => data.productType === "PMS");
        const AGO = tankList.filter(data => data.productType === "AGO");
        const DPK = tankList.filter(data => data.productType === "DPK");

        setPMSPumps(PMS);
        setAGOPumps(AGO);
        setDPKPumps(DPK);
    }, [tankList])

    useEffect(()=>{
        getAllPumps();
    }, [getAllPumps])

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
            return data;
        }).then(()=>{
            props.refresh();
        });
    }

    return(
        <div className='pumpContainer'>
            {open && <PumpUpdate open={open} close={setOpen} currentStation={oneOutletStation} current={currentPump} />}
            
            <div style={{marginLeft:'20px'}} className='pmscont'>PMS</div>

            <div className='pumping'>
                {
                    PMSPumps.length === 0?
                    <div style={created}>No PMS tank created</div>:
                    PMSPumps.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start', marginLeft:'20px', marginRight:'0px'}} key={index} className='item'>
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

            <div style={{color:'#FFA010', marginLeft:'20px'}} className='pmscont'>AGO</div>

            <div className='pumping'>
                {
                    AGOPumps.length === 0?
                    <div style={created}>No AGO tank created</div>:
                    AGOPumps.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start', marginLeft:'20px', marginRight:'0px'}} key={index} className='item'>
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

            <div style={{marginLeft:'20px'}} className='pmscont'>DPK</div>

            <div className='pumping'>
                {
                    DPKPumps.length === 0?
                    <div style={created}>No DPK tank created</div>:
                    DPKPumps.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start', marginLeft:'20px', marginRight:'0px'}} key={index} className='item'>
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