import React, { useState } from 'react';
import '../../styles/pump.scss';
import pump1 from '../../assets/pump1.png';
import cross from '../../assets/cross.png';
import { Button } from '@mui/material';
import OutletService from '../../services/outletService';
import { useDispatch, useSelector } from 'react-redux';
import { getOneTank } from '../../store/actions/outlet';
import PumpUpdate from '../Modals/PumpUpdate';

const Pumps = (props) => {

    const [currentPump, setCurrentPump] = useState({});
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();
    const pumpList = useSelector(state => state.outletReducer.pumpList);
    const [open, setOpen] = useState(false);
    const oneOutletStation = useSelector(state => state.outletReducer.oneStation);

    const openSalesModal = (item) => {
        setOpen(true);
        setCurrentPump(item);

        const payload = {
            id: item.hostTank
        }

        OutletService.getOneTank(payload).then((data) => {
            dispatch(getOneTank(data.stations));
        })
    }

    const pumpItem = (e, index, item) => {
        e.preventDefault();

        setSelected(index);
        setCurrentPump(item);
    }

    return(
        <div className='pumpContainer'>
            {open && <PumpUpdate open={open} close={setOpen} currentStation={oneOutletStation} current={currentPump} refresh={props.refresh} />}
            <div>Select Pump used for the day</div>
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
                                {index === selected?
                                    <div className='box'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>:
                                    <div className='box2'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
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
                            <div key={index} className='item'>
                                <img style={{width:'55px', height:'65px'}} src={pump1}  alt="icon"/>
                                <div className='pop'>{item.pumpName}</div>
                                <div className='label'>Totalizer Reading (Litres)</div>
                                {index === selected?
                                    <Button sx={{
                                        width:'140px', 
                                        height:'30px',  
                                        background: '#06805B',
                                        borderRadius: '3px',
                                        fontSize:'12px',
                                        marginTop:'10px',
                                        textTransform: 'capitalize',
                                        '&:hover': {
                                            backgroundColor: '#06805B'
                                        }
                                        }}  
                                        onClick={()=>{openSalesModal(item)}}
                                        variant="contained"> Record Sales
                                    </Button>:
                                    <input disabled={true} defaultValue={item.totalizerReading} style={imps} type="text" />
                                }
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

export default Pumps;