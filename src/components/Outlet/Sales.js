import React from 'react';
import '../../styles/sales.scss';
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
import Button from '@mui/material/Button';
import { Line } from 'react-chartjs-2';
import me4 from '../../assets/me4.png';
import me5 from '../../assets/me5.png';
import PMSTank from './PMSTank';
import AGOTank from './AGOTank';
import DPKTank from './DPKTank';
import { useLocation } from 'react-router-dom';
import OutletService from '../../services/outletService';
import { getAllOutletTanks, getAllPumps } from '../../store/actions/outlet';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

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

const Sales = () => {

    const {state} = useLocation();
    const dispatch = useDispatch();
    const tankList = useSelector(state => state.outletReducer.tankList);
    const pumpList = useSelector(state => state.outletReducer.pumpList);
    const [cummulatives, setCummulatives] = useState({});
    const [pumpAndTankMetric, setTankAndPumpMetrics] = useState({});

    const getAllStationTanks = useCallback(() => {
        const payload = {
            organisationID: state.state.organisation,
            outletID: state.state._id
        }
        OutletService.getAllOutletTanks(payload).then(data => {
            dispatch(getAllOutletTanks(data.stations));
        });

        OutletService.getAllStationPumps(payload).then(data => {
            dispatch(getAllPumps(data));
        });

    }, [state.state._id, state.state.organisation, dispatch]);

    useEffect(()=>{
        getAllStationTanks();
    },[getAllStationTanks]);

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
            PMSTankCapacity: PMSTankCapacity,
            PMSDeadStock: PMSDeadStock,
            totalAGO: totalAGO,
            AGOTankCapacity: AGOTankCapacity,
            AGODeadStock: AGODeadStock,
            totalDPK: totalDPK,
            DPKTankCapacity: DPKTankCapacity,
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

    const getActiveTankAndPumps = useCallback(() => {

        const activePMSTank = tankList.filter(tank => tank.productType === "PMS" && tank.activeState === "1");
        const inActivePMSTank = tankList.filter(tank => tank.productType === "PMS" && tank.activeState === "0");

        const activeAGOTank = tankList.filter(tank => tank.productType === "AGO" && tank.activeState === "1");
        const inActiveAGOTank = tankList.filter(tank => tank.productType === "AGO" && tank.activeState === "0");

        const activeDPKTank = tankList.filter(tank => tank.productType === "DPK" && tank.activeState === "1");
        const inActiveDPKTank = tankList.filter(tank => tank.productType === "DPK" && tank.activeState === "0");

        const activePMSPump = pumpList.filter(tank => tank.productType === "PMS" && tank.activeState === "1");
        const inActivePMSPump = pumpList.filter(tank => tank.productType === "PMS" && tank.activeState === "0");

        const activeAGOPump = pumpList.filter(tank => tank.productType === "AGO" && tank.activeState === "1");
        const inActiveAGOPump = pumpList.filter(tank => tank.productType === "AGO" && tank.activeState === "0");

        const activeDPKPump = pumpList.filter(tank => tank.productType === "DPK" && tank.activeState === "1");
        const inActiveDPKPump = pumpList.filter(tank => tank.productType === "DPK" && tank.activeState === "0");

        const totalActiveTank = activePMSTank.length + activeAGOTank.length + activeDPKTank.length;
        const totalInactiveTank = inActiveAGOTank.length + inActiveAGOTank.length + inActiveDPKTank.length;

        const totalActivePump = activePMSPump.length + activeAGOPump.length + activeDPKPump.length;
        const totalInactivePump = inActiveAGOPump.length + inActiveAGOPump.length + inActiveDPKPump.length;

        const payload = {
            activePMSTank: activePMSTank,
            inActivePMSTank: inActivePMSTank,
            activeAGOTank: activeAGOTank,
            inActiveAGOTank: inActiveAGOTank,
            activeDPKTank: activeDPKTank,
            inActiveDPKTank: inActiveDPKTank,
            activePMSPump: activePMSPump,
            inActivePMSPump: inActivePMSPump,
            activeAGOPump: activeAGOPump,
            inActiveAGOPump: inActiveAGOPump,
            activeDPKPump: activeDPKPump,
            inActiveDPKPump: inActiveDPKPump,
            totalActiveTank: totalActiveTank,
            totalInactiveTank: totalInactiveTank,
            totalActivePump: totalActivePump,
            totalInactivePump: totalInactivePump,
        }

        setTankAndPumpMetrics(payload);

    }, [tankList, pumpList])

    useEffect(()=>{
        getProductTanks();
    }, [getProductTanks]);

    useEffect(()=>{
        getActiveTankAndPumps();
    }, [getActiveTankAndPumps]);

    return(
        <div className='sales-container'>
            <div className='first'>
                <div className='first-left'>
                    <div className="tank-container">
                        <div className="tank-inner">
                            <div className="tanks">
                                <div className='canvas-container'>
                                    <PMSTank data = {cummulatives}/>
                                </div>
                                <div style={{marginTop:'10px', color:'#399A19'}} className='tank-head'>PMS</div>
                                <div className='level'>Level: {cummulatives.totalPMS} Litres</div>
                                <div className='capacity'>Capacity: {cummulatives.PMSTankCapacity} Litres</div>
                            </div>
                            <div className="tanks">
                                <div className='canvas-container'>
                                    <AGOTank data = {cummulatives}/>
                                </div>
                                <div style={{marginTop:'10px', color:'#FFA010'}} className='tank-head'>AGO</div>
                                <div className='level'>Level: {cummulatives.totalAGO} Litres</div>
                                <div className='capacity'>Capacity: {cummulatives.AGOTankCapacity} Litres</div>
                            </div>
                            <div className="tanks">
                                <div className='canvas-container'>
                                        <DPKTank data = {cummulatives}/>
                                    </div>
                                <div style={{marginTop:'10px', color:'#35393E'}} className='tank-head'>DPK</div>
                                    <div className='level'>Level: {cummulatives.totalDPK} Litres</div>
                                    <div className='capacity'>Capacity: {cummulatives.DPKTankCapacity} Litres</div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className='first-right'>
                    <div className='head2'>
                        <span style={{marginLeft:'10px'}}>Outlet Information</span>
                    </div>

                    <div className='bod'>
                        <div className='row'>
                            <div className='name1'>
                                <div className='label'> License Code</div>
                                <div className='value'>{state.state.licenseCode}</div>
                            </div>
                            <div className='name2'>
                                <div className='label'>Sealed</div>
                                <div className='value'>{state.state.activeState === 0? 'Yes': 'No'}</div>
                            </div>
                        </div>

                        <div style={{marginTop:'10px'}} className='row'>
                            <div className='name1'>
                                <div className='label'> Name </div>
                                <div className='value'>{state.state.outletName}</div>
                            </div>
                            <div className='name2'></div>
                        </div>

                        <div style={{marginTop:'10px'}} className='row'>
                            <div className='name1'>
                                <div className='label'> Outlet Code</div>
                                <div className='value'>NG5WSE3174AFGJ18</div>
                            </div>
                            <div className='name2'></div>
                        </div>

                        <div style={{marginTop:'10px'}} className='row'>
                            <div className='name1'>
                                <div className='label'> No of Tanks</div>
                                <div className='value'>{state.state.noOfTanks}</div>
                            </div>
                            <div className='name2'></div>
                        </div>

                        <div style={{marginTop:'10px'}} className='row'>
                            <div className='name1'>
                                <div className='label'> No of Pumps</div>
                                <div className='value'>{state.state.noOfPumps}</div>
                            </div>
                            <div className='name2'></div>
                        </div>

                        <div style={{marginTop:'10px'}} className='row'>
                            <div className='name1'>
                                <div className='label'> State </div>
                                <div className='value'>{state.state.state}</div>
                            </div>
                            <div className='name2'></div>
                        </div>

                        <div style={{marginTop:'10px'}} className='row'>
                            <div className='name1'>
                                <div className='label'> City/Town</div>
                                <div className='value'>{state.state.city}</div>
                            </div>
                            <div className='name2'></div>
                        </div>

                        <div style={{marginTop:'10px'}} className='row'>
                            <div className='name1'>
                                <div className='label'> LGA </div>
                                <div className='value'>{state.state.lga}</div>
                            </div>
                            <div className='name2'></div>
                        </div>

                        <div style={{marginTop:'10px'}} className='row'>
                            <div className='name1'>
                                <div className='label'> Street</div>
                                <div className='value'>{state.state.area}</div>
                            </div>
                            <div className='name2'></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='top-level'>
                <div className='left'>
                    <div className='title'>Total Sales</div>
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
                <div className='right'>
                    <div className='details'>
                        <div className='inner'>
                            <div className='head'>
                                <span style={{fontSize:'12px', marginLeft:'10px', fontFamily:'Nunito-Regular'}}>Outlet Asset</span>
                            </div>

                            <div className='card'>
                                <div className='left-card'>
                                    <img style={{width:'80px', height:'60px'}} src={me4} alt="icon" />
                                    <div className='text'>
                                        <span className='active'>Active Tank</span>
                                        <span className='num'>{'totalActiveTank' in pumpAndTankMetric? pumpAndTankMetric.totalActiveTank: 0}</span>
                                    </div>
                                </div>
                                <div className='right-card'>
                                    <div style={{color:'#06805B'}} className='text'>
                                        <span className='active'>PMS</span>
                                        <span className='num'>{'activePMSTank' in pumpAndTankMetric? pumpAndTankMetric?.activePMSTank.length: 0}</span>
                                    </div>
                                    <div style={{color:'#FFA010'}} className='text'>
                                        <span className='active'>AGO</span>
                                        <span className='num'>{'activeAGOTank' in pumpAndTankMetric? pumpAndTankMetric?.activeAGOTank.length: 0}</span>
                                    </div>
                                    <div style={{color:'#525252'}} className='text'>
                                        <span className='active'>DPK</span>
                                        <span className='num'>{'activeDPKTank'in pumpAndTankMetric? pumpAndTankMetric?.activeDPKTank.length: 0}</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className='card'>
                                <div className='left-card'>
                                    <img style={{width:'80px', height:'60px'}} src={me4} alt="icon" />
                                    <div className='text'>
                                        <span className='active'>Inactive Tank</span>
                                        <span className='num'>{'totalInactiveTank' in pumpAndTankMetric? pumpAndTankMetric.totalInactiveTank: 0}</span>
                                    </div>
                                </div>
                                <div className='right-card'>
                                    <div style={{color:'#06805B'}} className='text'>
                                        <span className='active'>PMS</span>
                                        <span className='num'>{'inActivePMSTank' in pumpAndTankMetric? pumpAndTankMetric?.inActivePMSTank.length: 0}</span>
                                    </div>
                                    <div style={{color:'#FFA010'}} className='text'>
                                        <span className='active'>AGO</span>
                                        <span className='num'>{'inActiveAGOTank' in pumpAndTankMetric? pumpAndTankMetric?.inActiveAGOTank.length: 0}</span>
                                    </div>
                                    <div style={{color:'#525252'}} className='text'>
                                        <span className='active'>DPK</span>
                                        <span className='num'>{'inActiveDPKTank' in pumpAndTankMetric? pumpAndTankMetric?.inActiveDPKTank.length: 0}</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className='card'>
                                <div className='left-card'>
                                    <img style={{width:'80px', height:'60px'}} src={me5} alt="icon" />
                                    <div className='text'>
                                        <span className='active'>Active Pump</span>
                                        <span className='num'>{'totalActivePump' in pumpAndTankMetric? pumpAndTankMetric.totalActivePump: 0}</span>
                                    </div>
                                </div>
                                <div className='right-card'>
                                    <div style={{color:'#06805B'}} className='text'>
                                        <span className='active'>PMS</span>
                                        <span className='num'>{'activePMSPump' in pumpAndTankMetric? pumpAndTankMetric?.activePMSPump.length: 0}</span>
                                    </div>
                                    <div style={{color:'#FFA010'}} className='text'>
                                        <span className='active'>AGO</span>
                                        <span className='num'>{'activeAGOPump' in pumpAndTankMetric? pumpAndTankMetric?.activeAGOPump.length: 0}</span>
                                    </div>
                                    <div style={{color:'#525252'}} className='text'>
                                        <span className='active'>DPK</span>
                                        <span className='num'>{'activeDPKPump' in pumpAndTankMetric? pumpAndTankMetric?.activeDPKPump.length: 0}</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className='card'>
                                <div className='left-card'>
                                    <img style={{width:'80px', height:'60px'}} src={me5} alt="icon" />
                                    <div className='text'>
                                        <span className='active'>Inactive Pump</span>
                                        <span className='num'>{'totalInactivePump' in pumpAndTankMetric? pumpAndTankMetric.totalInactivePump: 0}</span>
                                    </div>
                                </div>
                                <div className='right-card'>
                                    <div style={{color:'#06805B'}} className='text'>
                                        <span className='active'>PMS</span>
                                        <span className='num'>{'inActivePMSPump' in pumpAndTankMetric? pumpAndTankMetric?.inActivePMSPump.length: 0}</span>
                                    </div>
                                    <div style={{color:'#FFA010'}} className='text'>
                                        <span className='active'>AGO</span>
                                        <span className='num'>{'inActiveAGOPump' in pumpAndTankMetric? pumpAndTankMetric?.inActiveAGOPump.length: 0}</span>
                                    </div>
                                    <div style={{color:'#525252'}} className='text'>
                                        <span className='active'>DPK</span>
                                        <span className='num'>{'inActiveDPKPump' in pumpAndTankMetric? pumpAndTankMetric?.inActiveDPKPump.length: 0}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sales;