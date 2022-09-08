import React from 'react';
import '../../styles/dashboard.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
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
        }
    ]
};

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
                            <Line data={data} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='right-dash'>

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