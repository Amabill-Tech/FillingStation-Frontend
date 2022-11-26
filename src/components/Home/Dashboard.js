import React from 'react';
import '../../styles/dashboard.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import me1 from '../../assets/me1.png';
import me2 from '../../assets/me2.png';
import me4 from '../../assets/me4.png';
import me5 from '../../assets/me5.png';
import me6 from '../../assets/me6.png';
import Button from '@mui/material/Button';
import slideMenu from '../../assets/slideMenu.png';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import OutletService from '../../services/outletService';
import { getAllStations } from '../../store/actions/outlet';
import { useState } from 'react';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import expense from '../../assets/expense.png';
import DashboardService from '../../services/dashboard';
import { addDashboard } from '../../store/actions/dashboard';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
];

const data = {
    labels: labels,
    datasets: [
        {
            label: 'AGO',
            borderColor: '#399A19',
            data: [0, 10, 5, 2, 20, 30, 45],
        },
        {
            label: 'PMS',
            borderColor: '#FFA010',
            data: [40, 10,20, 26, 20, 10, 45],
        },
        {
            label: 'DPK',
            borderColor: '#000',
            data: [20, 40,10, 20, 30, 5, 18],
        }
    ]
};

const options = {
    plugins: {
        legend: {
            display: false,
        }
    },
    maintainAspectRatio: false,
}

const DashboardImage = (props) => {

    const history = useHistory();

    const goToNextScreen = () => {
        switch(props.screen){
            case "employee":{
                history.push("/home/hr/employee");
                break;
            }

            case "activeTank":{
                history.push("/home/tank-list", {state: "activeTank", station: props.station});
                break;
            }

            case "inactiveTank":{
                history.push("/home/tank-list", {state: "inActiveTank", station: props.station});
                break;
            }
            case "activePump":{
                history.push("/home/pump-list", {state: "activePump", station: props.station});
                break;
            }

            case "inactivePump":{
                history.push("/home/pump-list", {state: "inActivePump", station: props.station});
                break;
            }

            default:{}
        }
    }

    return(
        <div className='first-image'>
            <div onClick={goToNextScreen} className='inner-first-image'>
                <div className='top-first-image'>
                    <div className='top-icon'>
                        <img style={{width:'60px', height:'60px'}} src={props.image} alt="icon" />
                    </div>
                    <div className='top-text'>
                        <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>{props.name}</div>
                        <div style={{fontSize:'16px', fontWeight:'bold', marginRight:'10px', fontFamily:'Nunito-Regular'}}>{props.value}</div>
                    </div>
                </div>
                <div className='bottom-first-image'>
                    <img style={{width:'30px', height:'10px'}} src={me6} alt="icon" />
                </div>
            </div>
        </div>
    )
}

const Dashboard = (props) => {

    const dispatch = useDispatch();
    const history  = useHistory();
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const dashboardData = useSelector(state => state.dashboardReducer.dashboardData);
    const [defaultState, setDefault] = useState(0);
    const [currentStation, setCurrentStation] = useState(null);
    console.log(dashboardData, "from redux")

    const getAllStationData = useCallback(() => {
        const payload = {
            organisation: user._id
        }
        OutletService.getAllOutletStations(payload).then(data => {
            dispatch(getAllStations(data.station));
            setDefault(1);
            setCurrentStation(data.station[0]);
            return data.station[0];
        }).then(data => {
            DashboardService.allAttendanceRecords({id: data.organisation, outletID: data._id}).then(data => {
                let activeTank = data.station.tanks.filter(data => data.activeState === "1");
                let inActiveTank = data.station.tanks.filter(data => data.activeState === "0");
                let activePump = data.station.pumps.filter(data => data.activeState === "1");
                let inActivePump = data.station.pumps.filter(data => data.activeState === "0");

                const payload = {
                    count: data.count,
                    tanks: {
                        activeTank: {count: activeTank.length, list: activeTank},
                        inActiveTank: {count: inActiveTank.length, list: inActiveTank}
                    },
                    pumps: {
                        activePumps: {count: activePump.length, list: activePump},
                        inActivePumps: {count: inActivePump.length, list: inActivePump}
                    }
                }
                dispatch(addDashboard(payload));
            });
        })
    }, [user._id, dispatch]);

    useEffect(()=>{
        getAllStationData();
    },[getAllStationData]);

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);
    }

    const goToPayments = () => {
        history.push("/home/analysis/payments");
    }

    const goToExpenses = () => {
        history.push("/home/analysis/expenses");
    }

    return(
        <>
            { props.activeRoute.split('/').length === 2 &&
                <div className='dashboardContainer'>
                    <div className='left-dash'>
                        <div className='selectItem'>
                            <div className='first-select'>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={10}
                                    sx={selectStyle}
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
                                    value={defaultState}
                                    sx={selectStyle2}
                                >
                                    <MenuItem style={menu} value={0}>Select Station</MenuItem>
                                    {
                                        allOutlets.map((item, index) => {
                                            return(
                                                <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index + 1, item)}} value={index + 1}>{item.outletName+ ', ' +item.city}</MenuItem>
                                            )
                                        })  
                                    }
                                </Select>
                            </div>
                        </div>
                        <div className='dashImages'>
                            <DashboardImage screen={"employee"} image={me1} name={'Current staff'} value={dashboardData?.count}/>
                            <div data-aos="flip-left" className='first-image'>
                                <div className='inner-first-image'>
                                    <div className='top-first-image'>
                                        <div className='top-icon'>
                                            <img style={{width:'60px', height:'70px'}} src={me2} alt="icon" />
                                        </div>
                                        <div className='top-text'>
                                            <div style={{ width:'100%', fontSize:'14px', textAlign:'right', fontFamily:'Nunito-Regular'}}>
                                                <div style={{marginTop:'5px'}}>Liter: <span style={{fontWeight:'bold', fontSize:'14px'}}>197,822.00</span> LTR</div>
                                                <div style={{marginTop:'10px'}}>
                                                    Total Sales: <span style={{fontWeight:'bold'}}>N 183,000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bottom-first-image'>
                                        <img style={{width:'30px', height:'10px'}} src={me6} alt="icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='dash-records'>
                            <div className='padding-container'>
                                <div className='week'>
                                    <div className='butts'>
                                        <Button sx={{
                                            width:'50px', 
                                            height:'30px',  
                                            background: '#06805B',
                                            fontSize:'10px',
                                            borderRadius:'0px',
                                            '&:hover': {
                                                backgroundColor: '#06805B'
                                            }
                                            }}  variant="contained"> Week
                                        </Button>
                                        <Button sx={{
                                            width:'50px', 
                                            height:'30px',  
                                            background: '#C1CABE',
                                            fontSize:'10px',
                                            color:'#000',
                                            borderRadius:'0px',
                                            '&:hover': {
                                                backgroundColor: '#C1CABE'
                                            }
                                            }}  variant="contained"> Month
                                        </Button>
                                        <Button sx={{
                                            width:'50px', 
                                            height:'30px',  
                                            background: '#C1CABE',
                                            fontSize:'10px',
                                            color:'#000',
                                            borderRadius:'0px',
                                            '&:hover': {
                                                backgroundColor: '#C1CABE'
                                            }
                                            }}  variant="contained"> Year
                                        </Button>
                                    </div>
                                    <div className='dates'>

                                    </div>
                                </div>
                                <div className='type'>
                                    <div className='single-type'>
                                        <div className='color'></div>
                                        <div className='name'>PMS</div>
                                    </div>
                                    <div style={{marginLeft:'10px'}} className='single-type'>
                                        <div style={{background:'#FFA010'}} className='color'></div>
                                        <div className='name'>AGO</div>
                                    </div>
                                    <div style={{marginLeft:'10px'}} className='single-type'>
                                        <div style={{background:'#35393E'}} className='color'></div>
                                        <div className='name'>DPK</div>
                                    </div>
                                </div>
                                <div className='graph'>
                                    <Line options={options} data={data} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-dash'>
                        <div className='asset'>
                            <div style={{color: user.isDark === '0'? '#000': '#fff'}} >Asset</div>
                            <Button 
                                variant="contained" 
                                startIcon={<img style={{width:'15px', height:'10px', marginRight:'15px'}} src={slideMenu} alt="icon" />}
                                sx={{
                                    width:'165px',
                                    height:'30px',
                                    background:'#06805B',
                                    fontSize:'11px',
                                    borderRadius:'0px',
                                    '&:hover': {
                                        backgroundColor: '#06805B'
                                    }
                                }}
                            >
                                View in details
                            </Button>
                        </div>
                        <div className='dashImages'>
                            <DashboardImage station={currentStation} screen={"activeTank"} image={me4} name={'Active Tank'} value={dashboardData.tanks.activeTank.count} />
                            <DashboardImage station={currentStation} screen={"inactiveTank"} image={me4} name={'Inactive Tank'} value={dashboardData.tanks.inActiveTank.count}/>
                        </div>
                        <div style={{marginTop:'15px'}} className='dashImages'>
                            <DashboardImage station={currentStation} screen={"activePump"} image={me5} name={'Active Pump'} value={dashboardData.pumps.activePumps.count}/>
                            <DashboardImage station={currentStation} screen={"inactivePump"} image={me5} name={'Inactive Pump'} value={dashboardData.pumps.inActivePumps.count}/>
                        </div>

                        <div className='section'>
                            <div className='asset'>
                                <div style={{color: user.isDark === '0'? '#000': '#fff'}}>Supply</div>
                                <Button 
                                    variant="contained" 
                                    startIcon={<img style={{width:'15px', height:'10px', marginRight:'15px'}} src={slideMenu} alt="icon" />}
                                    sx={{
                                        width:'165px',
                                        height:'30px',
                                        background:'#06805B',
                                        fontSize:'11px',
                                        borderRadius:'0px',
                                        '&:hover': {
                                            backgroundColor: '#06805B'
                                        }
                                    }}
                                >
                                    View in details
                                </Button>
                            </div>
                            <div className='inner-section'>
                                <div className="cardss">
                                    <div className='left'>
                                        PMS
                                    </div>
                                    <div className='right'>
                                        <div>Litre Qty</div>
                                        <div>234, 825</div>
                                    </div>
                                </div>
                                <div className="cardss">
                                    <div className='left'>
                                        AGO
                                    </div>
                                    <div className='right'>
                                        <div>Litre Qty</div>
                                        <div>234, 825</div>
                                    </div>
                                </div>
                                <div style={{marginRight:'0px'}} className="cardss">
                                    <div className='left'>
                                        DPK
                                    </div>
                                    <div className='right'>
                                        <div>Litre Qty</div>
                                        <div>234, 825</div>
                                    </div>
                                </div>
                            </div>

                            <div style={{marginTop:'40px', width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between', color: user.isDark === '0'? '#000': '#fff'}} className='bank'>
                                <span>Net to Bank</span><span>Payments</span><span>Outstanding</span>
                            </div>
                            <div onClick={goToPayments} style={{height:'110px', marginTop:'0px'}} className='inner-section'>
                                <div className='inner-content'>
                                    <div className='conts'>
                                        <div className='row-count'>
                                            <div style={{color:'green', fontSize:'14px', fontWeight:'600'}} className='item-count'>N 213,093</div>
                                            <div style={{color:'#0872D4', fontSize:'14px', fontWeight:'600'}} className='item-count'>Teller</div>
                                            <div style={{color:'#0872D4', fontSize:'14px', fontWeight:'600'}} className='item-count'>N 213,093</div>
                                            <div style={{color:'red', fontSize:'14px', fontWeight:'600'}} className='item-count'>N 0,000</div>
                                        </div>
                                        <div className='row-count'>
                                            <div style={{color:'green', fontSize:'14px', fontWeight:'600'}} className='item-count'></div>
                                            <div style={{color:'#0872D4', fontSize:'12px', fontWeight:'600'}} className='item-count'>POS</div>
                                            <div style={{color:'#0872D4', fontSize:'12px', fontWeight:'600'}} className='item-count'>N 213,093</div>
                                            <div style={{color:'red', fontSize:'14px', fontWeight:'600'}} className='item-count'></div>
                                        </div>
                                        <div style={{marginTop:'10px'}} className="arrows">
                                            <div className="image">
                                                <img style={{width:'20px', height:'8px', marginRight:'30px'}} src={me6} alt="icon" />
                                            </div>
                                            <div className="image">
                                                <img style={{width:'20px', height:'8px', marginRight:'30px'}} src={me6} alt="icon" />
                                            </div>
                                            <div className="image">
                                                <img style={{width:'20px', height:'8px', marginRight:'30px'}} src={me6} alt="icon" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{marginTop:'30px', color: user.isDark === '0'? '#000': '#fff'}} className='bank'>Expenses</div>
                            <div onClick={goToExpenses} style={{height:'110px'}} className='inner-section'>
                                <div style={{
                                    backgroundImage:`url(${expense})`, 
                                    backgroundSize:'contain',
                                    backgroundRepeat:'no-repeat',
                                    display:'flex',
                                    flexDirection:'row',
                                    justifyContent:'flex-end',
                                    alignItems:'center',
                                    }} className='inner-content'>
                                    <span style={{marginRight:'30px', fontSize:'14px', fontWeight:'900'}}>N 2000</span>
                                </div>
                            </div>
                        </div>

                        <div className='station'>
                            <div style={{ color: user.isDark === '0'? '#000': '#fff'}} className='bank'>Station</div>
                            <div className='station-container'>
                                <div className='station-content'>
                                    <div className='inner-stat'>
                                        <div className='inner-header'>Ammasco Oil, Albasu, Kano</div>
                                        <div className='station-slider'>
                                            <div className='slideName'>
                                                <div className='pms'>PMS</div>
                                                <progress className='prog' value="70" max="100"> 70% </progress>
                                            </div>
                                            <div className='slideQty'>2500 Ltr</div>
                                        </div>
                                        <div className='station-slider'>
                                            <div className='slideName'>
                                                <div className='pms'>AGO</div>
                                                <progress className='prog' value="50" max="100"> 50% </progress>
                                            </div>
                                            <div className='slideQty'>2500 Ltr</div>
                                        </div>
                                        <div className='station-slider'>
                                            <div className='slideName'>
                                                <div className='pms'>DPK</div>
                                                <progress className='prog' value="32" max="100"> 32% </progress>
                                            </div>
                                            <div className='slideQty'>2500 Ltr</div>
                                        </div>
                                        <div className='butom'>
                                            <div className='pump-cont'>
                                                <div>No of Pump</div>
                                                <div className='amount'>2</div>
                                            </div>
                                            <div style={{marginLeft:'20px'}} className='pump-cont'>
                                                <div>No of Pump</div>
                                                <div className='amount'>2</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{marginTop:'0px'}} className='station-content'>
                                    <div className='inner-stat'>
                                        <div className='inner-header'>Ammasco Oil, Albasu, Kano</div>
                                        <div className='station-slider'>
                                            <div className='slideName'>
                                                <div className='pms'>PMS</div>
                                                <progress className='prog' value="70" max="100"> 70% </progress>
                                            </div>
                                            <div className='slideQty'>2500 Ltr</div>
                                        </div>
                                        <div className='station-slider'>
                                            <div className='slideName'>
                                                <div className='pms'>AGO</div>
                                                <progress className='prog' value="50" max="100"> 50% </progress>
                                            </div>
                                            <div className='slideQty'>2500 Ltr</div>
                                        </div>
                                        <div className='station-slider'>
                                            <div className='slideName'>
                                                <div className='pms'>DPK</div>
                                                <progress className='prog' value="32" max="100"> 32% </progress>
                                            </div>
                                            <div className='slideQty'>2500 Ltr</div>
                                        </div>
                                        <div className='butom'>
                                            <div className='pump-cont'>
                                                <div>No of Pump</div>
                                                <div className='amount'>2</div>
                                            </div>
                                            <div style={{marginLeft:'20px'}} className='pump-cont'>
                                                <div>No of Pump</div>
                                                <div className='amount'>2</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{display:'flex', flexDirection:'row', width:'100%', marginTop:'30px', justifyContent:'space-between'}} className="tank-text">
                            <div style={{ color: user.isDark === '0'? '#000': '#fff'}}>Incoming Order</div>
                            <Button 
                                variant="contained" 
                                startIcon={<img style={{width:'15px', height:'10px', marginRight:'15px'}} src={slideMenu} alt="icon" />}
                                sx={{
                                    width:'165px',
                                    height:'30px',
                                    background:'#06805B',
                                    fontSize:'11px',
                                    '&:hover': {
                                        backgroundColor: '#06805B'
                                    }
                                }}
                            >
                                View in details
                            </Button>
                        </div>

                        <div style={{width:'100%', marginBottom:'40px'}}>
                            <div className='table-view'>
                                <div className='table-text'>Outlets</div>
                                <div className='table-text'>Date approved</div>
                                <div className='table-text'>Depot</div>
                                <div className='table-text'>Products</div>
                                <div className='table-text'>Quantity</div>
                            </div>
                            
                            <div className='table-view2'>
                                <div className='table-text'>Ammasco</div>
                                <div className='table-text'>Date approved</div>
                                <div className='table-text'>Abuja</div>
                                <div className='table-text'>12-23-23</div>
                                <div className='table-text'>245900</div>
                            </div>
                            <div className='table-view2'>
                                <div className='table-text'>Ammasco</div>
                                <div className='table-text'>Date approved</div>
                                <div className='table-text'>Abuja</div>
                                <div className='table-text'>12-23-23</div>
                                <div className='table-text'>245900</div>
                            </div>
                            <div className='table-view2'>
                                <div className='table-text'>Ammasco</div>
                                <div className='table-text'>Date approved</div>
                                <div className='table-text'>Abuja</div>
                                <div className='table-text'>12-23-23</div>
                                <div className='table-text'>245900</div>
                            </div>
                            <div className='table-view2'>
                                <div className='table-text'>Ammasco</div>
                                <div className='table-text'>Date approved</div>
                                <div className='table-text'>Abuja</div>
                                <div className='table-text'>12-23-23</div>
                                <div className='table-text'>245900</div>
                            </div>
                            <div className='table-view2'>
                                <div className='table-text'>Ammasco</div>
                                <div className='table-text'>Date approved</div>
                                <div className='table-text'>Abuja</div>
                                <div className='table-text'>12-23-23</div>
                                <div className='table-text'>245900</div>
                            </div>
                        </div>
                    </div>
                </div>     
            }
        </>
    )
}

const selectStyle = {
    width:'100%', 
    height:'35px', 
    borderRadius:'5px',
    background: 'linear-gradient(264.74deg, #0A6147 -18.7%, rgba(10, 97, 71, 0.88) 54.22%)',
    color:'#fff',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
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

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default Dashboard;