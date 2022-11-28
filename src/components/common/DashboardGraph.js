import { Button } from "@mui/material";
import { Line } from "react-chartjs-2";
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

const DashboardGraph = () => {
    return(
        <div style={{marginTop:'10px'}} className='dash-records'>
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
    )
}

export default DashboardGraph;