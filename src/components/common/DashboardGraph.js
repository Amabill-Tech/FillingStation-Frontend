import { Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import calendar from '../../assets/calendar.png';
import DashboardService from "../../services/dashboard";
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
import { useRef, useState } from "react";

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

const weekLabels = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const annualLabels = [
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
];

const weeklyData = {
    labels: weekLabels,
    datasets: [
        {
            label: 'AGO',
            borderColor: '#399A19',
            data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
            label: 'PMS',
            borderColor: '#FFA010',
            data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
            label: 'DPK',
            borderColor: '#000',
            data: [0, 0, 0, 0, 0, 0, 0],
        }
    ]
};

const monthlyData = {
    labels: labels,
    datasets: [
        {
            label: 'AGO',
            borderColor: '#399A19',
            data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
            label: 'PMS',
            borderColor: '#FFA010',
            data: [0, 0, 0, 0, 0, 0, 0],
        },
        {
            label: 'DPK',
            borderColor: '#000',
            data: [0, 0, 0, 0, 0, 0, 0],
        }
    ]
};

const annualData = {
    labels: annualLabels,
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

const months = {
    '01' : 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
}

const options = {
    plugins: {
        legend: {
            display: false,
        }
    },
    maintainAspectRatio: false,
    scales:{
        yAxes:[{
            ticks:{
                beginAtZero: true,
                max: 1,
                min: 0
            }
        }]
    }
}

const DashboardGraph = (props) => {
    const date = new Date();
    const toString = date.toDateString();
    const [name, month, day, year] = toString.split(' ');
    const date2 = `${day} ${month} ${year}`;

    const [weeklyDataSet, setWeeklyDataSet] = useState(weeklyData);

    const [currentDate, setCurrentDate] = useState(date2);
    const [currentSelection, setCurrentSelection] = useState(0);
    const dateHandle = useRef();

    const updateDate = async(e) => {
        const date = e.target.value.split('-');
        const format = `${date[2]} ${months[date[1]]} ${date[0]}`;
    }

    const dateHandleInputDate = () => {
        dateHandle.current.showPicker();
    }

    function getUpcomingSunday() {
        const date = new Date();
        const today = date.getDate();
        const currentDay = date.getDay();
        const newDate = date.setDate(today - currentDay + 7);
        const mainDate = new Date(newDate).toLocaleDateString();
        const format = mainDate.split('/');
        return `${format[2]}-${format[0]}-${format[1]}`
    }

    function getLastSunday() {
        const date = new Date();
        const today = date.getDate();
        const currentDay = date.getDay();
        const newDate = date.setDate(today - (currentDay || 7));
        const mainDate = new Date(newDate).toLocaleDateString();
        const format = mainDate.split('/');
        return `${format[2]}-${format[0]}-${format[1]}`
    }

    // function getFirstAndLastDayOfTheMonth(){
    //     var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    //     var firstDay = new Date(y, m, 1);
    //     var lastDay = new Date(y, m + 1, 0);
    //     return {firstDay: firstDay.toLocaleDateString(), lastDay: lastDay.toLocaleDateString()};
    // }

    function getFirstAndLastDayOfTheYear(){
        const currentYear = new Date().getFullYear();
        const lastDay = new Date(currentYear, 11, 31);
        const firstDay = new Date(currentYear, 0, 1);
        return {firstDay: firstDay.toLocaleDateString(), lastDay: lastDay.toLocaleDateString()};
    }

    const analyseWeeklyData = (data) => {
        const dataListPMS = [0, 0, 0, 0, 0, 0, 0];
        const dataListAGO = [0, 0, 0, 0, 0, 0, 0];
        const dataListDPK = [0, 0, 0, 0, 0, 0, 0];

        for(let day of data.sales){
            if(day.productType === "PMS"){
                const dates = new Date(day.createdAt);
                const exactDay = dates.getDay();
                dataListPMS[exactDay] = Number(day.sales);
            }else if(day.productType === "AGO"){
                const dates = new Date(day.createdAt);
                const exactDay = dates.getDay();
                dataListAGO[exactDay] = Number(day.sales);
            }else if(day.productType === "DPK"){
                const dates = new Date(day.createdAt);
                const exactDay = dates.getDay();
                dataListDPK[exactDay] = Number(day.sales);
            }
        }

        const weeklyData = {
            labels: weekLabels,
            datasets: [
                {
                    label: 'AGO',
                    borderColor: '#399A19',
                    data: dataListAGO,
                },
                {
                    label: 'PMS',
                    borderColor: '#FFA010',
                    data: dataListPMS,
                },
                {
                    label: 'DPK',
                    borderColor: '#000',
                    data: dataListDPK,
                }
            ]
        };
        console.log(weeklyData, 'data')
        setWeeklyDataSet(weeklyData);
    }

    const getAllCurrentWeekData = () => {
        const firstDayOfTheWeek = getLastSunday();
        const lastDayOfTheWeek = getUpcomingSunday();

        const payload = {
            organisation: props.station.organisation,
            outletID: props.station._id,
            startRange: firstDayOfTheWeek,
            endRange: lastDayOfTheWeek
        }

        DashboardService.getWeeklyDataFromApi(payload).then(data => {
            console.log(data, "weekly from api");
            analyseWeeklyData(data);
        })
    }

    const switchGraphTab = (data) => {
        switch(data){
            case "week":{
                setCurrentSelection(0);
                getAllCurrentWeekData();
                break;
            }

            case "month":{
                setCurrentSelection(1);
                break;
            }

            case "year":{
                setCurrentSelection(2);
                break;
            }
            default:{}
        }
    }

    return(
        <div style={{marginTop:'10px'}} className='dash-records'>
            <div className='padding-container'>
                <div className='week'>
                    <div className='butts'>
                        <Button onClick={()=>{switchGraphTab("week")}} sx={currentSelection === 0? activeButton: inActive}  variant="contained"> Week </Button>
                        <Button onClick={()=>{switchGraphTab("month")}} sx={currentSelection === 1? activeButton: inActive}  variant="contained"> Month </Button>
                        <Button onClick={()=>{switchGraphTab("year")}} sx={currentSelection === 2? activeButton: inActive}  variant="contained"> Year </Button>
                    </div>
                    <div className='dates'>
                        <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                            <input onChange={updateDate} ref={dateHandle} style={{position:"absolute", marginTop:'10px', visibility:'hidden'}} type="date" />
                            <Button 
                                variant="contained" 
                                sx={{
                                    width:'140px',
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
                    <Line options={options} data={
                        currentSelection === 0? weeklyDataSet: currentSelection === 1? monthlyData: currentSelection? annualData: []
                    } />
                </div>
            </div>
        </div>
    )
}

const activeButton = {
    width:'50px', 
    height:'30px',  
    background: '#06805B',
    fontSize:'10px',
    borderRadius:'0px',
    '&:hover': {
        backgroundColor: '#06805B'
    }
}

const inActive = {
    width:'50px', 
    height:'30px',  
    background: '#C1CABE',
    fontSize:'10px',
    color:'#000',
    borderRadius:'0px',
    '&:hover': {
        backgroundColor: '#C1CABE'
    }
}

export default DashboardGraph;