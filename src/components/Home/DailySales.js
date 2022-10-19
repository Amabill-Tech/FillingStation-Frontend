import React, {useEffect, useRef} from 'react';
import '../../styles/dailySales.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import me5 from '../../assets/me5.png';
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
                    <div data-aos="flip-left" className="dash-item">
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
                    <div data-aos="flip-left" className="dash-item">
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
                    <div data-aos="flip-left" className="dash-item">
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
                            <div className='canvas-container'>
                                <PMSTank/>
                            </div>
                        </div>
                        <div className="tanks">
                            <div className='tank-head'>AGO</div>
                                <div className='level'>Level: 92,600 Litres</div>
                                <div className='capacity'>Capacity: 156,600 Litres</div>
                                <div className='canvas-container'>
                                    <AGOTank/>
                                </div>
                            </div>
                        <div className="tanks">
                            <div className='tank-head'>DPK</div>
                                <div className='level'>Level: 92,600 Litres</div>
                                <div className='capacity'>Capacity: 156,600 Litres</div>
                                <div className='canvas-container'>
                                    <DPKTank/>
                                </div>
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

                <div style={{display:'flex', flexDirection:'row', width:'100%', marginTop:'30px', justifyContent:'space-between'}} className="tank-text">
                    <div>Incoming Order</div>
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