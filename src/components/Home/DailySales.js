import React, {useCallback, useEffect, useState} from 'react';
import '../../styles/dailySales.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import me5 from '../../assets/me5.png';
import calendar from '../../assets/calendar.png';
import slideMenu from '../../assets/slideMenu.png';
import Button from '@mui/material/Button';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import PMSTank from '../Outlet/PMSTank';
import AGOTank from '../Outlet/AGOTank';
import DPKTank from '../Outlet/DPKTank';
import { useDispatch, useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import { getAllOutletTanks, getAllStations } from '../../store/actions/outlet';
import { Route, Switch, useHistory } from 'react-router-dom';
import PMSDailySales from '../DailySales/PMSDailySales';
import AGODailySales from '../DailySales/AGODailySales';
import DPKDailySales from '../DailySales/DPKDailySales';
import ComprehensiveReport from '../DailySales/ComprehensiveReport';
import ListAllTanks from '../Outlet/TankList';
import { useRef } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [40, 10, 5, 2, 20, 30, 35],
        backgroundColor: '#06805B',
      },
      {
        label: 'Dataset 2',
        data: [30, 10, 5, 2, 20, 30, 45],
        backgroundColor: '#108CFF',
      },
    ],
};


const options = {
    plugins: {
        legend: {
            display: false,
        }
    },
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            grid: {
                display: false,
            }
        }
    }
}

const DailySales = (props) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const date2 = new Date(year+"-"+month+"-"+day)

    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const tankList = useSelector(state => state.outletReducer.tankList);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const [defaultState, setDefault] = useState(0);
    const [cummulatives, setCummulatives] = useState({});
    const [currentStation, setCurrentStation] = useState({});
    const dateHandle = useRef();
    const [currentDate, setCurrentDate] = useState(date2.toDateString());

    const getAllProductData = useCallback(() => {

        OutletService.getAllOutletStations({organisation: user.userType === "superAdmin"? user._id : user.organisationID}).then(data => {
            dispatch(getAllStations(data.station));
            setCurrentStation(data.station[0]);
            setDefault(1);
            return data.station[0]
        }).then((data)=>{
            const payload = {
                organisationID: data.organisation,
                outletID: data._id
            }
            OutletService.getAllOutletTanks(payload).then(data => {
                dispatch(getAllOutletTanks(data.stations));
            });
        });

    }, [dispatch, user.organisationID, user._id, user.userType]);

    useEffect(()=>{
        getAllProductData();
    },[getAllProductData])

    const getCummulativeVolumePerProduct = (pms, ago, dpk) => {
        let totalPMS = 0;
        let PMSTankCapacity = 0;
        let PMSDeadStock = 0;
        let totalAGO = 0;
        let AGOTankCapacity = 0;
        let AGODeadStock = 0;
        let totalDPK = 0;
        let DPKTankCapacity = 0;
        let DPKDeadStock = 0;

        if(pms.length !== 0){ 
            for(let pm of pms){
                totalPMS = totalPMS + Number(pm.currentLevel);
                PMSTankCapacity = PMSTankCapacity + Number(pm.tankCapacity);
                PMSDeadStock = PMSDeadStock + Number(pm.deadStockLevel);
            } 
        }   

        if(ago.length !== 0){ 
            for(let ag of ago){
                totalAGO = totalAGO + Number(ag.currentLevel);
                AGOTankCapacity = AGOTankCapacity + Number(ag.tankCapacity);
                AGODeadStock = AGODeadStock + Number(ag.deadStockLevel);
            } 
        }  

        if(dpk.length !== 0){ 
            for(let dp of dpk){
                totalDPK = totalDPK + Number(dp.currentLevel);
                DPKTankCapacity = DPKTankCapacity + Number(dp.tankCapacity);
                DPKDeadStock = DPKDeadStock + Number(dp.deadStockLevel);
            } 
        }  

        const payload = {
            totalPMS: totalPMS,
            PMSTankCapacity: PMSTankCapacity === 0? 33000: PMSTankCapacity,
            PMSDeadStock: PMSDeadStock,
            totalAGO: totalAGO,
            AGOTankCapacity: AGOTankCapacity === 0? 33000: AGOTankCapacity,
            AGODeadStock: AGODeadStock,
            totalDPK: totalDPK,
            DPKTankCapacity: DPKTankCapacity === 0? 33000: DPKTankCapacity,
            DPKDeadStock: DPKDeadStock,
        }

        return payload;
    }

    const getProductTanks = useCallback(() => {
        const PMSList = tankList.filter(tank => tank.productType === "PMS");
        const AGOList = tankList.filter(tank => tank.productType === "AGO");
        const DPKList = tankList.filter(tank => tank.productType === "DPK");

        const cummulative = getCummulativeVolumePerProduct(PMSList, AGOList, DPKList);
        setCummulatives(cummulative);
    }, [tankList]);

    useEffect(()=>{
        getProductTanks();
    }, [getProductTanks]);

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);

        const payload = {
            organisationID: item.organisation,
            outletID: item._id
        }
        OutletService.getAllOutletTanks(payload).then(data => {
            dispatch(getAllOutletTanks(data.stations));
        });
    }

    const openDailySales = (data) => {
        if(data === "pms"){
            props.history.push('/home/daily-sales/pms');
        }else if(data === "ago"){
            props.history.push('/home/daily-sales/ago');
        }else if(data === "dpk"){
            props.history.push('/home/daily-sales/dpk');
        }else if(data === "report"){
            props.history.push('/home/daily-sales/report');
        }
    }

    const goToTanks = (product) => {
        history.push('/home/outlets/list', {state: product});
    }

    const dateHandleInputDate = () => {
        dateHandle.current.showPicker();
    }

    return(
        <div style={{marginTop:'20px'}} className='daily-sales-container'>
            { props.activeRoute.split('/').length === 3 &&
                <>
                    <div className='daily-left'>
                        <div>
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
                            <Button 
                                variant="contained" 
                                sx={{
                                    width:'210px',
                                    height:'35px',
                                    background:'#06805B',
                                    fontSize:'13px',
                                    marginLeft:'10px',
                                    borderRadius:'5px',
                                    textTransform:'capitalize',
                                    '&:hover': {
                                        backgroundColor: '#06805B'
                                    }
                                }}
                                onClick={()=>{openDailySales("report")}}
                            >
                                View comprehensive report
                            </Button>
                        </div>

                        <div className='item-dash-daily'>
                            <div data-aos="flip-left" className="dash-item">
                                <div onClick={()=>{openDailySales("pms")}} className="inner-dash-item">
                                    <div className="dash-image">
                                        <img style={{width:'60px', height:'50px'}} src={me5} alt="icon" />
                                    </div>
                                    <div className="dash-details">
                                        <div style={{display:'flex',marginRight:'10px', flexDirection:'column', alignItems:'flex-start'}}>
                                            <div style={{fontFamily:'Nunito-Regular', fontSize:'14px'}}>Total Amount</div>
                                            <div style={{fontFamily:'Nunito-Regular', marginTop:'5px', fontSize:'14px'}}>PMS</div>
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'10px', fontSize:'16px'}}> N 231,925</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-aos="flip-left" className="dash-item">
                                <div onClick={()=>{openDailySales("ago")}} className="inner-dash-item">
                                    <div className="dash-image">
                                        <img style={{width:'60px', height:'50px'}} src={me5} alt="icon" />
                                    </div>
                                    <div className="dash-details">
                                        <div style={{display:'flex',marginRight:'10px', flexDirection:'column', alignItems:'flex-start'}}>
                                            <div style={{fontFamily:'Nunito-Regular', fontSize:'14px'}}>Total Amount</div>
                                            <div style={{fontFamily:'Nunito-Regular', marginTop:'5px', fontSize:'14px'}}>AGO</div>
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'10px', fontSize:'16px'}}> N 231,925</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-aos="flip-left" className="dash-item">
                                <div onClick={()=>{openDailySales("dpk")}} className="inner-dash-item">
                                    <div className="dash-image">
                                        <img style={{width:'60px', height:'50px'}} src={me5} alt="icon" />
                                    </div>
                                    <div className="dash-details">
                                        <div style={{display:'flex',marginRight:'10px', flexDirection:'column', alignItems:'flex-start'}}>
                                            <div style={{fontFamily:'Nunito-Regular', fontSize:'14px'}}>Total Amount</div>
                                            <div style={{fontFamily:'Nunito-Regular', marginTop:'5px', fontSize:'14px'}}>DPK</div>
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'10px', fontSize:'16px'}}> N 231,925</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{color: user.isDark === '0'? '#000': '#fff'}} className="tank-text">Tank Stock Levels</div>
                        <div className="tank-container">
                            <div className="tank-inner">
                                <div className="tanks">
                                    <div className='tank-head'>PMS</div>
                                    <div className='level'>Level: 92,600 Litres</div>
                                    <div className='capacity'>Capacity: 156,600 Litres</div>
                                    <div onClick={()=>{goToTanks("PMS")}} className='canvas-container'>
                                        <PMSTank data = {cummulatives}/>
                                    </div>
                                </div>
                                <div className="tanks">
                                    <div className='tank-head'>AGO</div>
                                        <div className='level'>Level: 92,600 Litres</div>
                                        <div className='capacity'>Capacity: 156,600 Litres</div>
                                        <div onClick={()=>{goToTanks("AGO")}} className='canvas-container'>
                                            <AGOTank data = {cummulatives}/>
                                        </div>
                                    </div>
                                <div className="tanks">
                                    <div className='tank-head'>DPK</div>
                                        <div className='level'>Level: 92,600 Litres</div>
                                        <div className='capacity'>Capacity: 156,600 Litres</div>
                                        <div onClick={()=>{goToTanks("DPK")}} className='canvas-container'>
                                            <DPKTank data = {cummulatives}/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className='daily-right'>
                        <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                            <input ref={dateHandle} style={{position:"absolute", marginTop:'10px', visibility:'hidden'}} type="date" />
                            <Button 
                                variant="contained" 
                                sx={{
                                    width:'170px',
                                    height:'30px',
                                    background:'#06805B',
                                    fontSize:'12px',
                                    borderRadius:'0px',
                                    textTransform:'capitalize',
                                    display:'flex',
                                    flexDirection:'row',
                                    alignItems:'center',
                                    '&:hover': {
                                        backgroundColor: '#06805B'
                                    }
                                }}
                                onClick={dateHandleInputDate}
                            >
                                <div style={{marginRight:'10px'}}>{currentDate}</div>
                                <img style={{width:'20px', height:'20px'}} src={calendar} alt="icon"/>
                            </Button>
                        </div>
                        <div style={{marginTop:'10px'}} className='expen'>
                            <div style={{background:'#108CFF'}} className='child'>
                                <div className='ins'>
                                    <div>Expenses</div>
                                    <div>N 280, 000</div>
                                </div>
                            </div>
                            <div style={{background:'#06805B'}} className='child'>
                                <div className='ins'>
                                    <div>Payments</div>
                                    <div>N 280, 000</div>
                                </div>
                            </div>
                        </div>
                        <div style={{color: user.isDark === '0'? '#000': '#fff', marginTop:'30px'}} className="tank-text">Expenses And Payments</div>
                        <div className='bar-chart'>
                            <div className='bar'>
                                <Bar options={options} data={data} />
                            </div>
                        </div>

                        <div style={{marginTop:'30px'}} className='asset'>
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

                        <div style={{marginTop:'30px'}} className='section'>
                            <div className='alisss'>
                                <div style={{color: user.isDark === '0'? '#000': '#fff'}} className='bank'>Net to Bank</div>
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
                                <div className='inner-content'>
                                    <div className='conts'>
                                        <div className='row-count'>
                                            <div className='item-count'>Net to bank</div>
                                            <div className='item-count'>Log to bank</div>
                                            <div style={{color:'#0872D4'}} className='item-count'>Teller Amount</div>
                                            <div className='item-count'>POS Amount</div>
                                        </div>
                                        <div className='row-count'>
                                            <div className='item-count'>#213,093</div>
                                            <div className='item-count'>#213,093</div>
                                            <div style={{color:'#0872D4'}} className='item-count'>#213,093</div>
                                            <div className='item-count'>#0,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop:'30px'}} className='section'>
                            <div className='alisss'>
                                <div style={{color: user.isDark === '0'? '#000': '#fff'}} className='bank'>LPO</div>
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
                                <div className='inner-content'>
                                    <div className='conts'>
                                        <div className='row-count'>
                                            <div className='item-count'>Net to bank</div>
                                            <div className='item-count'>Log to bank</div>
                                            <div style={{color:'#0872D4'}} className='item-count'>Teller Amount</div>
                                            <div className='item-count'>POS Amount</div>
                                        </div>
                                        <div className='row-count'>
                                            <div className='item-count'>#213,093</div>
                                            <div className='item-count'>#213,093</div>
                                            <div style={{color:'#0872D4'}} className='item-count'>#213,093</div>
                                            <div className='item-count'>#0,000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{display:'flex', flexDirection:'row', width:'100%', marginTop:'40px', justifyContent:'space-between'}} className="tank-text">
                            <div style={{color: user.isDark === '0'? '#000': '#fff'}}>Incoming Order</div>
                            <Button 
                                variant="contained" 
                                startIcon={<img style={{width:'15px', height:'10px', marginRight:'15px'}} alt="icon" src={slideMenu} />}
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
                </>
            }
            { props.activeRoute.split('/').length === 4 &&
                <div style={contain}>
                    <Switch>
                        <Route path='/home/daily-sales/pms'>
                            <PMSDailySales/>
                        </Route>
                        <Route path='/home/daily-sales/ago'>
                            <AGODailySales/>
                        </Route>
                        <Route path='/home/daily-sales/dpk'>
                            <DPKDailySales/>
                        </Route>
                        <Route path='/home/daily-sales/report'>
                            <ComprehensiveReport/>
                        </Route>
                        <Route path='/home/outlets/list'>
                            <ListAllTanks refresh={getAllProductData}/>
                        </Route>
                    </Switch>
                </div>
            }
        </div>
    )
}

const contain = {
    width:'100%',
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

const selectStyle2 = {
    width:'200px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
}

export default DailySales;