import { Button, MenuItem, OutlinedInput, Select, Switch } from "@mui/material";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import swal from "sweetalert";
import me5 from '../../assets/me5.png';
import OutletService from "../../services/outletService";
import { getAllOutletTanks, getAllStations } from "../../store/actions/outlet";
import "../../styles/stationTanks.scss";

const StationTanks = () => {

    const [tabs, setTabs] = useState(0);
    const [PMSTank, setPMSTank] = useState([]);
    const [AGOTank, setAGOTank] = useState([]);
    const [DPKTank, setDPKTank] = useState([]);
    const [activeTank, setActiveTank] = useState([]);
    const [inActiveTank, setInactiveTank] = useState([]);
    const [currentTank, setCurrentTank] = useState({});
    const [currentStation, setCurrentStation] = useState({});
    const location = useLocation();
    const user = useSelector(state => state.authReducer.user);
    const tankList = useSelector(state => state.outletReducer.tankList);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const dispatch = useDispatch();
    const [defaultState, setDefault] = useState(0);

    const getAllStationTanks = useCallback(() => {
        const payload = {
            organisationID: location.state.state.organisation,
            outletID: location.state.state._id
        }
        OutletService.getAllOutletTanks(payload).then(data => {console.log(data, 'tanks')
            dispatch(getAllOutletTanks(data.stations));
        });

        OutletService.getAllOutletStations({organisation: user.userType === "superAdmin"? user._id : user.organisationID}).then(data => {console.log(data, 'station')
            dispatch(getAllStations(data.station));
        });
    }, [location.state.state._id, user._id, user.organisationID, user.userType, location.state.state.organisation, dispatch]);

    useEffect(()=>{
        getAllStationTanks();
    },[getAllStationTanks]);

    useEffect(()=>{
        getSeparateTanks(tankList);
    },[tankList]);

    const getSeparateTanks = (data) => {

        const PMS = [];
        const AGO = [];
        const DPK = [];
        const activeTank = [];
        const inActiveTank = [];

        for(let item of data){
            item.productType === 'PMS' && PMS.push(item);
            item.productType === 'AGO' && AGO.push(item);
            item.productType === 'DPK' && DPK.push(item);
            item.activeState === '0' || activeTank.push(item);
            item.activeState === '0' && inActiveTank.push(item);
        }

        setPMSTank(PMS);
        setAGOTank(AGO);
        setDPKTank(DPK);
        setActiveTank(activeTank.length);
        setInactiveTank(inActiveTank.length);
    }

    const activateTank = (e, data) => {
        const payload = {
            id: data._id,
            activeState: e.target.checked? '1': '0'
        }
        OutletService.activateTanks(payload).then((data) => {
            if(data.code === 200) swal("Success!", "Tank active state updated successfully", "success");
            getAllStationTanks();
        });
    }

    const deleteTanks = (data) => {
        swal({
            title: "Alert!",
            text: `Are you sure you want to delete ${data.tankName}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const payload = {
                    id: data._id,
                }
                OutletService.deleteTanks(payload).then(data => {
                    if(data.code === 200) swal("Success!", "Tank deleted successfully", "success");
                    getAllStationTanks();
                })
            }
        });
    }

    const addNewPump = (data) => {
        setCurrentTank(data);
    }

    const CardItem = (props) => {
        return(
            <div style={{height:"400px"}} className='item'>
                <div className='inner'>
                        <div className='top'>
                            <div className='left'>
                                <img style={{width:'40px', height:'40px'}} src={me5} alt="icon" />
                                <div>{props.data.tankName}</div>
                            </div>
                            <div className='right'>
                                <div>{props.data.activeState === '0'? 'Inactive': 'Active'}</div>
                                <IOSSwitch onClick={(e)=>{activateTank(e, props.data)}} sx={{ m: 1 }} defaultChecked={props.data.activeState === '0'? false: true} />
                            </div>
                        </div>

                        <div className='out'>
                            <div style={{width:'40%', textAlign:'left'}}>Dead Stock Level(Litres)</div>
                            <OutlinedInput 
                                placeholder="" 
                                sx={{
                                    width:'60%',
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }} 
                                value={props.data.deadStockLevel}
                            />
                        </div>

                        <div className='out'>
                            <div style={{width:'40%', textAlign:'left'}}>Tank Capacity (Litres)</div>
                            <OutlinedInput 
                                placeholder="" 
                                sx={{
                                    width:'60%',
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }} 
                                value={props.data.tankCapacity}
                            />
                        </div>

                        <div className='out'>
                            <div style={{width:'40%', textAlign:'left'}}>Tank ID</div>
                            <OutlinedInput 
                                placeholder="" 
                                sx={{
                                    width:'60%',
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }} 
                                value={props.data._id}
                            />
                        </div>

                        <div className='out'>
                            <div style={{width:'40%', textAlign:'left'}}>Current Stock Level (Litres)</div>
                            <OutlinedInput 
                                placeholder="" 
                                sx={{
                                    width:'60%',
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }} 
                                value={props.data.currentLevel}
                            />
                        </div>

                        <div className='out'>
                            <div style={{width:'40%', textAlign:'left'}}>Calibration Date</div>
                            <OutlinedInput 
                                placeholder="" 
                                sx={{
                                    width:'60%',
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }}
                                value={props.data.calibrationDate} 
                            />
                        </div>

                        <div style={{marginTop:'20px'}} className='delete'>
                            <div></div>
                            <Button sx={{
                                width:'70px', 
                                height:'30px',  
                                background: '#ff6347 ',
                                borderRadius: '3px',
                                fontSize:'10px',
                                color:'#fff',
                                marginLeft:'10px',
                                '&:hover': {
                                    backgroundColor: '#ff6347 '
                                }
                                }} 
                                onClick={()=>{deleteTanks(props.data)}}
                                variant="contained"> Delete
                            </Button>
                        </div>
                </div>
            </div>
        )
    }

    const AllTabs = () => {
        return(
            <div className='space'>
                {
                    tankList.length === 0?
                    <div style={place}>No records of tanks</div>:
                    tankList.map((item, index) => {
                        return(
                            <CardItem key={index} data={item} />
                        )
                    })
                }
            </div>
        )
    }

    const PMSTabs = () => {
        return(
            <div className='space'>
                {
                    PMSTank.length === 0?
                    <div style={place}>No records of tanks</div>:
                    PMSTank.map((item, index) => {
                        return(
                            <CardItem key={index} data={item} />
                        )
                    })
                }
            </div>
        )
    }

    const AGOTabs = () => {
        return(
            <div className='space'>
                {
                    AGOTank.length === 0?
                    <div style={place}>No records of tanks</div>:
                    AGOTank.map((item, index) => {
                        return(
                            <CardItem key={index} data={item} />
                        )
                    })
                }
            </div>
        )
    }

    const DPKTabs = () => {
        return(
            <div className='space'>
                {
                    DPKTank.length === 0?
                    <div style={place}>No records of tanks</div>:
                    DPKTank.map((item, index) => {
                        return(
                            <CardItem key={index} data={item} />
                        )
                    })
                }
            </div>
        )
    }

    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
    }));

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);

        const payload = {
            outletID: item._id, 
            organisationID: item.organisation
        }

        OutletService.getAllOutletStations(payload).then(data => {console.log(data, "sales")
            // dispatch(getAllStations(data.stations));
        });
    }

    return(
        <div className="stationTanksContainer">
            <div className="left-form">
                <div className="inner-tanks">
                    <div className="inpt" style={{width:'100%'}}>
                        <div style={{width:'100%', textAlign:'left'}}>State</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            value={location.state.state.state}
                            // onChange={e => setPumpName(e.target.value)}
                        />
                    </div>

                    <div className="inpt" style={{width:'100%'}}>
                        <div style={{width:'100%', textAlign:'left'}}>Station Name</div>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={defaultState}
                            sx={selectStyle2}
                        >
                            {
                                allOutlets.map((item, index) => {
                                    return(
                                        <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index, item)}} value={index}>{item.outletName+ ', ' +item.city}</MenuItem>
                                    )
                                })  
                            }
                        </Select>
                    </div>

                    <div className="inpt" style={{width:'100%'}}>
                        <div style={{width:'100%', textAlign:'left'}}>City/Town</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            value={location.state.state.city}
                            // onChange={e => setPumpName(e.target.value)}
                        />
                    </div>

                    <div className="inpt" style={{width:'100%'}}>
                        <div style={{width:'100%', textAlign:'left'}}>Tank ID</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            value={location.state.state._id}
                            // onChange={e => setPumpName(e.target.value)}
                        />
                    </div>

                    <div className="inpt" style={{width:'100%'}}>
                        <div style={{width:'100%', textAlign:'left'}}>LGA</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            value={location.state.state.lga}
                            // onChange={e => setPumpName(e.target.value)}
                        />
                    </div>

                    <div className="inpt" style={{width:'100%'}}>
                        <div style={{width:'100%', textAlign:'left'}}>Street</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            value={location.state.state.area}
                            // onChange={e => setPumpName(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="pump-container">
                <div className='head'>
                    <div className='tabs'>
                        <div onClick={()=>{setTabs(0)}} style={tabs === 0? tab1 : tab2}>All</div>
                        <div onClick={()=>{setTabs(1)}} style={tabs === 1? tab1 : tab2}>PMS</div>
                        <div onClick={()=>{setTabs(2)}} style={tabs === 2? tab1 : tab2}>AGO</div>
                        <div onClick={()=>{setTabs(3)}} style={tabs === 3? tab1 : tab2}>DPK</div>
                    </div>
                </div>
                <div className='cont'>
                    {tabs === 0 && <AllTabs /> }
                    {tabs === 1 && <PMSTabs /> }
                    {tabs === 2 && <AGOTabs /> }
                    {tabs === 3 && <DPKTabs /> }
                </div>
            </div>
        </div>
    )
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
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

const tab1 = {
    width: '100%',
    height: '100%',
    background: '#E6F5F1',
    borderRadius: '5.20093px 5.20093px 0px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const tab2 = {
    width: '100%',
    height: '100%',
    borderRadius: '5.20093px 5.20093px 0px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#fff'
}

const place = {
    width:'100%',
    textAlign:'center',
    fontSize:'16px',
    fontFamily:'Nunito-Regular',
    marginTop:'20px',
    color:'green'
}

export default StationTanks;