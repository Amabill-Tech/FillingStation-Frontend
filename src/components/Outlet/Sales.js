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

const Tank = () => {

    const {state} = useLocation();

    return(
        <div className='sales-container'>
            <div className='first'>
                <div className='first-left'>
                    <div className="tank-container">
                        <div className="tank-inner">
                            <div className="tanks">
                                <div className='canvas-container'>
                                    <PMSTank/>
                                </div>
                                <div style={{marginTop:'10px', color:'#399A19'}} className='tank-head'>PMS</div>
                                <div className='level'>Level: 92,600 Litres</div>
                                <div className='capacity'>Capacity: 156,600 Litres</div>
                            </div>
                            <div className="tanks">
                                <div className='canvas-container'>
                                    <AGOTank/>
                                </div>
                                <div style={{marginTop:'10px', color:'#FFA010'}} className='tank-head'>AGO</div>
                                <div className='level'>Level: 92,600 Litres</div>
                                <div className='capacity'>Capacity: 156,600 Litres</div>
                            </div>
                            <div className="tanks">
                                <div className='canvas-container'>
                                        <DPKTank/>
                                    </div>
                                <div style={{marginTop:'10px', color:'#35393E'}} className='tank-head'>DPK</div>
                                    <div className='level'>Level: 92,600 Litres</div>
                                    <div className='capacity'>Capacity: 156,600 Litres</div>
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
                                <div className='value'> No</div>
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
                                        <span className='num'>20</span>
                                    </div>
                                </div>
                                <div className='right-card'>
                                    <div style={{color:'#06805B'}} className='text'>
                                        <span className='active'>PMS</span>
                                        <span className='num'>20</span>
                                    </div>
                                    <div style={{color:'#FFA010'}} className='text'>
                                        <span className='active'>AGO</span>
                                        <span className='num'>20</span>
                                    </div>
                                    <div style={{color:'#525252'}} className='text'>
                                        <span className='active'>DPK</span>
                                        <span className='num'>20</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className='card'>
                                <div className='left-card'>
                                    <img style={{width:'80px', height:'60px'}} src={me4} alt="icon" />
                                    <div className='text'>
                                        <span className='active'>Active Tank</span>
                                        <span className='num'>20</span>
                                    </div>
                                </div>
                                <div className='right-card'>
                                    <div style={{color:'#06805B'}} className='text'>
                                        <span className='active'>PMS</span>
                                        <span className='num'>20</span>
                                    </div>
                                    <div style={{color:'#FFA010'}} className='text'>
                                        <span className='active'>AGO</span>
                                        <span className='num'>20</span>
                                    </div>
                                    <div style={{color:'#525252'}} className='text'>
                                        <span className='active'>DPK</span>
                                        <span className='num'>20</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className='card'>
                                <div className='left-card'>
                                    <img style={{width:'80px', height:'60px'}} src={me5} alt="icon" />
                                    <div className='text'>
                                        <span className='active'>Active Tank</span>
                                        <span className='num'>20</span>
                                    </div>
                                </div>
                                <div className='right-card'>
                                    <div style={{color:'#06805B'}} className='text'>
                                        <span className='active'>PMS</span>
                                        <span className='num'>20</span>
                                    </div>
                                    <div style={{color:'#FFA010'}} className='text'>
                                        <span className='active'>AGO</span>
                                        <span className='num'>20</span>
                                    </div>
                                    <div style={{color:'#525252'}} className='text'>
                                        <span className='active'>DPK</span>
                                        <span className='num'>20</span>
                                    </div>
                                </div>
                            </div>

                            
                            <div className='card'>
                                <div className='left-card'>
                                    <img style={{width:'80px', height:'60px'}} src={me5} alt="icon" />
                                    <div className='text'>
                                        <span className='active'>Active Tank</span>
                                        <span className='num'>20</span>
                                    </div>
                                </div>
                                <div className='right-card'>
                                    <div style={{color:'#06805B'}} className='text'>
                                        <span className='active'>PMS</span>
                                        <span className='num'>20</span>
                                    </div>
                                    <div style={{color:'#FFA010'}} className='text'>
                                        <span className='active'>AGO</span>
                                        <span className='num'>20</span>
                                    </div>
                                    <div style={{color:'#525252'}} className='text'>
                                        <span className='active'>DPK</span>
                                        <span className='num'>20</span>
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

export default Tank;