import React from 'react';
import '../../styles/dailySales.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import me5 from '../../assets/me5.png';
import PMS from '../../assets/PMS.png';
import AGO from '../../assets/AGO.png';
import DPK from '../../assets/DPK.png';
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

const DailySales = () => {

    return(
        <div className='daily-sales-container'>
            <div className='daily-left'>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={10}
                    sx={selectStyle2}
                >
                    <MenuItem value={10}>Ammasco Nyanya</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                <div className='item-dash-daily'>
                    <div className="dash-item">
                        <div className="inner-dash-item">
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
                    <div className="dash-item">
                        <div className="inner-dash-item">
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
                    <div className="dash-item">
                        <div className="inner-dash-item">
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

                <div className="tank-text">Tank Stock Levels</div>
                <div className="tank-container">
                    <div className="tank-inner">
                        <div className="tanks">
                            <div className='tank-head'>PMS</div>
                            <div className='level'>Level: 92,600 Litres</div>
                            <div className='capacity'>Capacity: 156,600 Litres</div>
                            <img style={{width:'150px', height: "300px", marginTop:'20px'}} src={PMS} alt="icon" />
                        </div>
                        <div className="tanks">
                            <div className='tank-head'>AGO</div>
                                <div className='level'>Level: 92,600 Litres</div>
                                <div className='capacity'>Capacity: 156,600 Litres</div>
                                <img style={{width:'150px', height: "300px", marginTop:'20px'}} src={AGO} alt="icon" />
                            </div>
                        <div className="tanks">
                            <div className='tank-head'>DPK</div>
                                <div className='level'>Level: 92,600 Litres</div>
                                <div className='capacity'>Capacity: 156,600 Litres</div>
                                <img style={{width:'150px', height: "300px", marginTop:'20px'}} src={DPK} alt="icon" />
                            </div>
                    </div>
                </div>
            </div>
            <div className='daily-right'>
                <div className="tank-text">Expenses And Payments</div>
                <div className='bar-chart'>
                    <div className='bar'>
                        <Bar options={options} data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const selectStyle2 = {
    width:'250px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
}

export default DailySales;