import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/pump.scss';
import pump1 from '../../assets/pump1.png';
import cross from '../../assets/cross.png';
import { Button } from '@mui/material';
import OutletService from '../../services/outletService';
import { useDispatch, useSelector } from 'react-redux';
import { deselectPumps, getAllPumps, getOneTank, selectPumps, setTotalizerReading } from '../../store/actions/outlet';
import PumpUpdate from '../Modals/PumpUpdate';
import swal from 'sweetalert';
import { ThreeDots } from 'react-loader-spinner';
import { refresh } from 'aos';

const Pumps = (props) => {

    const [currentPump, setCurrentPump] = useState({});
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();
    const pumpList = useSelector(state => state.outletReducer.pumpList);
    const tankList = useSelector(state => state.outletReducer.tankList);
    const [open, setOpen] = useState(false);
    const oneOutletStation = useSelector(state => state.outletReducer.oneStation);
    const [activePumps, setActivePumps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [trigger, setTrigger] = useState(false);

    const getOneOutletTank = async(payload) => {
        let res = await OutletService.getOneTank(payload)
        return res;
    }

    const updateCurrentTank = async(payload) => {
        let res = await OutletService.updateTank(payload)
        return res;
    }

    const updateCurrentPump = async(activePumps, i) => {
        let res = await OutletService.pumpUpdate({id: activePumps[i]._id, totalizerReading: activePumps[i].closingMeter});
        return res;
    }

    const addSupplyToList = async() => {
        if(activePumps.length === 0){
            return swal("Warning!", "Please select a pump to add readings!", "info");
        }

        for(let pump of activePumps){
            const currentTank = tankList.filter(tank => tank._id === pump.hostTank);
            const Tank = {...currentTank[0]};
            const difference = Number(pump.closingMeter) - Number(pump.totalizerReading);
            const canTankServe = Number(Tank.currentLevel) - difference;

            if(Number(pump.totalizerReading) > Number(pump.closingMeter)){
                return swal("Warning!", `Closing meter less than opening for ${pump.pumpName} !`, "info");
            }

            if(canTankServe < 0){
                return swal("Warning!", `${Tank.tankName} limit cannot dispense reading from ${pump.pumpName}!`, "info");
            }
        }

        for(let i = 0, max = activePumps.length; i < max; i++){
            const payload = {
                id: activePumps[i].hostTank
            }
            setLoading(true);
            let data = await getOneOutletTank(payload);
            // console.log('one tank', data)

            const difference = Number(activePumps[i].closingMeter) - Number(activePumps[i].totalizerReading);
            const canTankServe = Number(data.stations.currentLevel) - difference;

            if(payload.currentLevel !== null){
                const TankPayload = {
                    id: data.stations._id,
                    previousLevel: data.stations.currentLevel,
                    totalizer: activePumps[i].closingMeter,
                    currentLevel: data.stations.currentLevel === "None"? null: String(canTankServe),
                }
    
                let updateOneTank = await updateCurrentTank(TankPayload);
                // console.log('taks update', updateOneTank)
    
                let updatePumpTotalizer = await updateCurrentPump(activePumps, i);
                // console.log('pumps update', updatePumpTotalizer)

                if(updateOneTank.code === 200 && updatePumpTotalizer.code === 200){
                    setLoading(false);
                }else{
                    return;
                }
            }else{
                swal("Warning!", "This is an empty tank!", "info");
            }
        }

        OutletService.getAllStationPumps({outletID: oneOutletStation._id, organisationID: oneOutletStation.organisation}).then(data => {
            dispatch(getAllPumps(data));
        }).then(()=>{
            swal("Success!", "Pump update is successful!", "success");
            setTrigger(!trigger);
        })
    }

    const pumpItem = (e, index, item) => {
        e.preventDefault();

        setSelected(index);

        if(activePumps.length === 0){
            setActivePumps(prev => [...prev, item]);
        }else{
            let available = activePumps.findIndex(data => data._id === item._id);
            if(available === -1){
                setActivePumps(prev => [...prev, item]);
            }
        }

        dispatch(selectPumps(item));
    }

    const deselect = (item) => {
        let available = activePumps.findIndex(data => data._id === item._id);
        if(available !== -1){
            let newList = activePumps.filter(data => data._id !== item._id);
            setActivePumps(newList);
        }
        dispatch(deselectPumps(item));
    }

    const setTotalizer = (e, item) => {
        const list = [...activePumps];
        const pump = {...item};
        const index = activePumps.findIndex(data => data._id === pump._id);
        item['closingMeter'] = e.target.value;
        list[index] = item;
        setActivePumps(list);
    }

    return(
        <div style={{flexDirection:'column', alignItems:'center'}} className='pumpContainer'>
            {open && <PumpUpdate open={open} close={setOpen} currentStation={oneOutletStation} current={currentPump} refresh={props.refresh} />}
            <div>Select Pump used for the day</div>
            <div style={{flexDirection:'row', justifyContent:'center'}} className='pump-list'>
                {
                    pumpList.length === 0?
                    <div style={{...box, width:'170px'}}>
                        <div style={{marginRight:'10px'}}>No pump Created</div>
                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                    </div>:
                    pumpList.map((data, index) => {
                        return(
                            <div key={index} onClick={e => pumpItem(e, index, data)}>
                                {data.identity === index &&
                                    <div className='box'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={()=>{deselect(data)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {data.identity !== index &&
                                    <div className='box2'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={()=>{deselect(data)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>

            <div style={{width:'100%', marginTop:'20px', justifyContent:'center'}} className='pumping'>
                {
                    pumpList.length === 0?
                    <div>Please click to select a pump</div>:
                    pumpList.map((item, index) => {
                        return(
                            <div style={{height:'300px'}} key={index} className='item'>
                                <img style={{width:'55px', height:'60px', marginTop:'10px'}} src={pump1}  alt="icon"/>
                                <div className='pop'>{item.pumpName}</div>
                                <div style={{marginTop:'10px'}}  className='label'>Date: {item.updatedAt.split('T')[0]}</div>
                                <div>
                                    <div style={{marginTop:'10px'}} className='label'>Opening meter (Litres)</div>
                                    <input disabled={true} defaultValue={item.totalizerReading} style={imps} type="text" />

                                    <div style={{marginTop:'10px'}} className='label'>Closing meter (Litres)</div>
                                    <input 
                                        onChange={e => setTotalizer(e, item)} 
                                        defaultValue={item.closingMeter} 
                                        style={{...imps, border: (Number(item.totalizerReading) > Number(item.closingMeter)) && item.closingMeter !== '0'? '1px solid red': '1px solid black'}} 
                                        type="text" 
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div style={{marginBottom:'0px', height:'30px', width:'90%', justifyContent:'space-between', alignItems:'center'}} className='submit'>
                <div>
                    {loading?
                        <ThreeDots 
                            height="60" 
                            width="50" 
                            radius="9"
                            color="#076146" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />: null
                    }
                </div>
                <Button sx={{
                    width:'140px', 
                    height:'30px',  
                    background: '#427BBE',
                    borderRadius: '3px',
                    fontSize:'11px',
                    '&:hover': {
                        backgroundColor: '#427BBE'
                    }
                    }}  
                    onClick={addSupplyToList}
                    variant="contained"> Record Update
                </Button>
            </div>
        </div>
    )
}

const imps = {
    height:'30px', 
    width:'160px', 
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