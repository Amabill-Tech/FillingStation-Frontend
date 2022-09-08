import React from 'react';
import '../../styles/dashboard.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import me1 from '../../assets/me1.png';
import me2 from '../../assets/me2.png';
import me3 from '../../assets/me3.png';
import me4 from '../../assets/me4.png';
import me5 from '../../assets/me5.png';
import me6 from '../../assets/me6.png';
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
import { PropaneSharp } from '@mui/icons-material';

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
    return(
        <div className='first-image'>
            <div className='inner-first-image'>
                <div className='top-first-image'>
                    <div className='top-icon'>
                        <img style={{width:'60px', height:'60px'}} src={props.image} alt="icon" />
                    </div>
                    <div className='top-text'>
                        <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>{props.name}</div>
                        <div style={{fontSize:'16px', fontWeight:'bold', fontFamily:'Nunito-Regular'}}>{props.value}</div>
                    </div>
                </div>
                <div className='bottom-first-image'>
                    <img style={{width:'30px', height:'10px'}} src={me6} alt="icon" />
                </div>
            </div>
        </div>
    )
}

const Dashboard = () => {
    return(
        <div className='dashboardContainer'>
            <div className='left-dash'>
                <div className='selectItem'>
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
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={10}
                        sx={selectStyle2}
                    >
                        <MenuItem value={10}>07 August, 2022</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </div>
                <div className='dashImages'>
                    <DashboardImage image={me1} name={'Current staff'} value={'41'}/>
                    <div className='first-image'>
                        <div className='inner-first-image'>
                            <div className='top-first-image'>
                                <div className='top-icon'>
                                    <img style={{width:'60px', height:'70px'}} src={me2} alt="icon" />
                                </div>
                                <div className='top-text'>
                                    <div style={{fontSize:'14px', textAlign:'left', fontFamily:'Nunito-Regular'}}>
                                        <div style={{marginTop:'10px'}}>
                                            Total Sales: <span style={{fontWeight:'bold'}}>#183,000</span>
                                        </div>
                                        <div style={{marginTop:'5px'}}>Liter: <span>197,822.00</span> LTR</div>
                                    </div>
                                    <div style={{fontSize:'16px', fontWeight:'bold', fontFamily:'Nunito-Regular'}}>41</div>
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
                <div className='dashImages'>
                    <DashboardImage image={me4} name={'Active Tank'} value={'41'} />
                    <DashboardImage image={me4} name={'Inactive Tank'} value={'41'}/>
                </div>
                <div style={{marginTop:'15px'}} className='dashImages'>
                    <DashboardImage image={me5} name={'Active Pump'} value={'41'}/>
                    <DashboardImage image={me5} name={'Inactive Pump'} value={'41'}/>
                </div>

                <div className='section'>
                    <div className='bank'>Net to Bank</div>
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

                <div className='station'>
                    <div className='bank'>Station</div>
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
            </div>
        </div>
    )
}

const selectStyle = {
    width:'200px', 
    height:'35px', 
    borderRadius:'5px',
    background: 'linear-gradient(264.74deg, #0A6147 -18.7%, rgba(10, 97, 71, 0.88) 54.22%)',
    color:'#fff',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
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

export default Dashboard;