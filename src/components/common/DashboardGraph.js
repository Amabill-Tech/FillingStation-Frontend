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
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
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
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            label: 'PMS',
            borderColor: '#FFA010',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            label: 'DPK',
            borderColor: '#000',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        }
    ]
};

const annualData = {
    labels: annualLabels,
    datasets: [
        {
            label: 'AGO',
            borderColor: '#399A19',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            label: 'PMS',
            borderColor: '#FFA010',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            label: 'DPK',
            borderColor: '#000',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    scales: {
        x: {
            min: 0
        },
        y: {
            min: 0
        }
    }
    // scales: {
    //     x: {
    //         ticks:{
    //             beginAtZero: true,
    //             max: 1,
    //             min: 0
    //         }
    //     },
    //     y: {
    //         ticks:{
    //             beginAtZero: true,
    //             max: 1,
    //             min: 0
    //         }
    //     }
    // }
}

const getMonthlyTotals = (day, dataListPMS) => {
    const dates = day.createdAt.split('-');
    switch(dates[1]){
        case "1":{
            let currentValue = dataListPMS[0];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[0] = currentValue;
            break;
        }

        case "2":{
            let currentValue = dataListPMS[1];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[1] = currentValue;
            break;
        }

        case "3":{
            let currentValue = dataListPMS[2];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[2] = currentValue;
            break;
        }

        case "4":{
            let currentValue = dataListPMS[3];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[3] = currentValue;
            break;
        }

        case "5":{
            let currentValue = dataListPMS[4];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[4] = currentValue;
            break;
        }

        case "6":{
            let currentValue = dataListPMS[5];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[5] = currentValue;
            break;
        }

        case "7":{
            let currentValue = dataListPMS[6];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[6] = currentValue;
            break;
        }

        case "8":{
            let currentValue = dataListPMS[7];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[7] = currentValue;
            break;
        }

        case "9":{
            let currentValue = dataListPMS[8];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[8] = currentValue;
            break;
        }

        case "10":{
            let currentValue = dataListPMS[9];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[9] = currentValue;
            break;
        }

        case "11":{
            let currentValue = dataListPMS[10];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[10] = currentValue;
            break;
        }

        case "12":{
            let currentValue = dataListPMS[11];
            currentValue = currentValue + Number(day.sales);
            dataListPMS[11] = currentValue;
            break;
        }
        default: {}
    }
}

const DashboardGraph = (props) => {
    const date = new Date();
    const toString = date.toDateString();
    const [name, month, day, year] = toString.split(' ');
    const date2 = `${day} ${month} ${year}`;

    const [weeklyDataSet, setWeeklyDataSet] = useState(weeklyData);
    const [monthlyDataSet, setMonthlyDataSet] = useState(monthlyData);

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

    function getFirstAndLastDayOfTheYear(){
        const currentYear = new Date().getFullYear();
        const lastDay = new Date(currentYear, 11, 31).toLocaleDateString();
        const firstDay = new Date(currentYear, 0, 1).toLocaleDateString();
        const format1 = firstDay.split('/');
        const format2 = lastDay.split('/');
        return {firstDay: `${format1[2]}-${format1[0]}-${format1[1]}`, lastDay: `${format2[2]}-${format2[0]}-${format2[1]}`};
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
        setWeeklyDataSet(weeklyData);
    }

    const analyseMonthlyData = (data) => {
        const dataListPMS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const dataListAGO = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const dataListDPK = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for(let day of data.sales){
            if(day.productType === "PMS"){
                getMonthlyTotals(day, dataListPMS);

            }else if(day.productType === "AGO"){
                getMonthlyTotals(day, dataListAGO);

            }else if(day.productType === "DPK"){
                getMonthlyTotals(day, dataListDPK);
            }
        }

        const monthlyData = {
            labels: labels,
            datasets: [
                {
                    label: 'AGO',
                    borderColor: '#399A19',
                    data: dataListPMS,
                },
                {
                    label: 'PMS',
                    borderColor: '#FFA010',
                    data: dataListAGO,
                },
                {
                    label: 'DPK',
                    borderColor: '#000',
                    data: dataListDPK,
                }
            ]
        };

        setMonthlyDataSet(monthlyData);
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
            // console.log(data, "weekly from api");
            analyseWeeklyData(data);
        })
    }

    const getAllMonthlyData = () => {
        const dateRange = getFirstAndLastDayOfTheYear();

        const payload = {
            organisation: props.station.organisation,
            outletID: props.station._id,
            startRange: dateRange.firstDay,
            endRange: dateRange.lastDay
        }

        DashboardService.getMonthlyDataFromApi(payload).then(data => {
            // console.log(data, "monthly data from api")
            analyseMonthlyData(data);
        });
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
                getAllMonthlyData();
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
                        currentSelection === 0? weeklyDataSet: currentSelection === 1? monthlyDataSet: currentSelection? annualData: []
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