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
import DailySalesService from '../../services/DailySales';
import LPOService from '../../services/lpo';
import dailySalesReducer from '../../store/reducers/dailySales';
import { passAllDailySales, passCummulative, passExpensesAndPayments, passIncomingOrder } from '../../store/actions/dailySales';

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

const DailySales = (props) => {
    const date = new Date();
    const toString = date.toDateString();
    const [name, month, day, year] = toString.split(' ');
    const date2 = `${day} ${month} ${year}`;

    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const tankList = useSelector(state => state.outletReducer.tankList);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const [defaultState, setDefault] = useState(0);
    const [cummulatives, setCummulatives] = useState({});
    const [currentStation, setCurrentStation] = useState({});
    const dateHandle = useRef();
    const [currentDate, setCurrentDate] = useState(date2);
    const [rangeDate, setRangeDate] = useState({});
    const dailySales = useSelector(state => state.dailySalesReducer.dailySales);
    const payments = useSelector(state => state.dailySalesReducer.payments);
    const dailyIncoming = useSelector(state => state.dailySalesReducer.dailyIncoming);
    const cummulative = useSelector(state => state.dailySalesReducer.cummulative);
    console.log(dailySales, 'yeaaaahhhhh')

    const getMasterRows = ({sales, lpo, rtVolumes}) => {

        // filter all records by product Type
        const salesPMSData = sales.filter(data => data.productType === "PMS");
        const salesAGOData = sales.filter(data => data.productType === "AGO");
        const salesDPKData = sales.filter(data => data.productType === "DPK");

        const lpoPMSData = lpo.filter(data => data.productType === "PMS");
        const lpoAGOData = lpo.filter(data => data.productType === "AGO");
        const lpoDPKData = lpo.filter(data => data.productType === "DPK");

        const rtPMSData = rtVolumes.filter(data => data.productType === "PMS");
        const rtAGOData = rtVolumes.filter(data => data.productType === "AGO");
        const rtDPKData = rtVolumes.filter(data => data.productType === "DPK");

        // merge pms data records for the day
        const mergedPMSToLPOList = salesPMSData.map(({ids, ...data}) => {
            let res = lpoPMSData.filter(detail => data.pumpID === detail.pumpID);
            let [{pumpID, lpoLitre, PMSRate, AGORate, DPKRate}] = [{pumpID:'', lpoLitre: 0, PMSRate: 0, AGORate: 0, DPKRate: 0}];
            if(res.length !== 0){
                [{pumpID, lpoLitre, PMSRate, AGORate, DPKRate}] = res;
            }
            return {pumpID, lpoLitre, PMSRate, AGORate, DPKRate, ...data}
        });

        const mergedPMSToLPOToRTList = mergedPMSToLPOList.map(({ids, ...data}) => {
            let res = rtPMSData.filter(detail => data.pumpID === detail.pumpID);
            let [{pumpID, rtLitre}] = [{pumpID:'', rtLitre: 0}];
            if(res.length !== 0){
                [{pumpID, rtLitre}] = res;
            }
            return {pumpID, rtLitre, ...data}
        });

        const pmsTotals = () => {
            let totalDifference = 0;
            let totalLpo = 0;
            let totalrt = 0;
            let amount = 0;
            let lpoAmount = 0;
            let noLpoAmount = 0;

            for(let row of mergedPMSToLPOToRTList){
                totalDifference = totalDifference + Number(row.sales);
                totalLpo = totalLpo + Number(row.lpoLitre);
                totalrt = totalrt + Number(row.rtLitre);
                amount = amount + Number(row.sales)*Number(row.PMSSellingPrice) + Number(row.lpoLitre)*Number(row.PMSRate) - Number(row.rtLitre)*Number(row.PMSSellingPrice);
                lpoAmount = lpoAmount + Number(row.lpoLitre)*Number(row.PMSRate);
                noLpoAmount = noLpoAmount + Number(row.sales)*Number(row.PMSSellingPrice) - Number(row.rtLitre)*Number(row.PMSSellingPrice);
            }

            const pmsTotalDetails = {
                totalDifference: totalDifference,
                totalLpo: totalLpo,
                totalrt: totalrt,
                amount: amount,
                lpoAmount: lpoAmount,
                noLpoAmount: noLpoAmount,
            }

            return pmsTotalDetails;
        }

        // merge ago data records for the day
        const mergedAGOToLPOList = salesAGOData.map(({ids, ...data}) => {
            let res = lpoAGOData.filter(detail => data.pumpID === detail.pumpID);
            let [{pumpID, lpoLitre, PMSRate, AGORate, DPKRate}] = [{pumpID:'', lpoLitre: 0, PMSRate: 0, AGORate: 0, DPKRate: 0}];
            if(res.length !== 0){
                [{pumpID, lpoLitre, PMSRate, AGORate, DPKRate}] = res;
            }
            return {pumpID, lpoLitre, PMSRate, AGORate, DPKRate, ...data}
        });

        const mergedAGOToLPOToRTList = mergedAGOToLPOList.map(({ids, ...data}) => {
            let res = rtAGOData.filter(detail => data.pumpID === detail.pumpID);
            let [{pumpID, rtLitre}] = [{pumpID:'', rtLitre: 0}];
            if(res.length !== 0){
                [{pumpID, rtLitre}] = res;
            }
            return {pumpID, rtLitre, ...data}
        });

        const agoTotals = () => {
            let totalDifference = 0;
            let totalLpo = 0;
            let totalrt = 0;
            let amount = 0;
            let lpoAmount = 0;
            let noLpoAmount = 0;

            for(let row of mergedAGOToLPOToRTList){
                totalDifference = totalDifference + Number(row.sales);
                totalLpo = totalLpo + Number(row.lpoLitre);
                totalrt = totalrt + Number(row.rtLitre);
                amount = amount + Number(row.sales)*Number(row.AGOSellingPrice) + Number(row.lpoLitre)*Number(row.AGORate) - Number(row.rtLitre)*Number(row.AGOSellingPrice);
                lpoAmount = lpoAmount + Number(row.lpoLitre)*Number(row.PMSRate);
                noLpoAmount = noLpoAmount + Number(row.sales)*Number(row.PMSSellingPrice) - Number(row.rtLitre)*Number(row.PMSSellingPrice);
            }

            const agoTotalDetails = {
                totalDifference: totalDifference,
                totalLpo: totalLpo,
                totalrt: totalrt,
                amount: amount,
                lpoAmount: lpoAmount,
                noLpoAmount: noLpoAmount
            }

            return agoTotalDetails;
        }

        // merge dpk data records for the day
        const mergedDPKToLPOList = salesDPKData.map(({ids, ...data}) => {
            let res = lpoDPKData.filter(detail => data.pumpID === detail.pumpID);
            let [{pumpID, lpoLitre, PMSRate, AGORate, DPKRate}] = [{pumpID:'', lpoLitre: 0, PMSRate: 0, AGORate: 0, DPKRate: 0}];
            if(res.length !== 0){
                [{pumpID, lpoLitre, PMSRate, AGORate, DPKRate}] = res;
            }
            return {pumpID, lpoLitre, PMSRate, AGORate, DPKRate, ...data}
        });

        const mergedDPKToLPOToRTList = mergedDPKToLPOList.map(({ids, ...data}) => {
            let res = rtDPKData.filter(detail => data.pumpID === detail.pumpID);
            let [{pumpID, rtLitre}] = [{pumpID:'', rtLitre: 0}];
            if(res.length !== 0){
                [{pumpID, rtLitre}] = res;
            }
            return {pumpID, rtLitre, ...data}
        });

        const dpkTotals = () => {
            let totalDifference = 0;
            let totalLpo = 0;
            let totalrt = 0;
            let amount = 0;
            let lpoAmount = 0;
            let noLpoAmount = 0;

            for(let row of mergedDPKToLPOToRTList){
                totalDifference = totalDifference + Number(row.sales);
                totalLpo = totalLpo + Number(row.lpoLitre);
                totalrt = totalrt + Number(row.rtLitre);
                amount = amount + Number(row.sales)*Number(row.DPKSellingPrice) + Number(row.lpoLitre)*Number(row.DPKRate) - Number(row.rtLitre)*Number(row.DPKSellingPrice);
                lpoAmount = lpoAmount + Number(row.lpoLitre)*Number(row.PMSRate);
                noLpoAmount = noLpoAmount + Number(row.sales)*Number(row.PMSSellingPrice) - Number(row.rtLitre)*Number(row.PMSSellingPrice);
            }

            const dpkTotalDetails = {
                totalDifference: totalDifference,
                totalLpo: totalLpo,
                totalrt: totalrt,
                amount: amount,
                lpoAmount: lpoAmount,
                noLpoAmount: noLpoAmount
            }

            return dpkTotalDetails;
        }

        const masterDailySales = {
            PMS: {rows: mergedPMSToLPOToRTList, total: pmsTotals()},
            AGO: {rows: mergedAGOToLPOToRTList, total: agoTotals()},
            DPK: {rows: mergedDPKToLPOToRTList, total: dpkTotals()},
        }

        dispatch(passAllDailySales(masterDailySales));
    }

    const getAggregatePayment = ({expenses, bankPayment, posPayment}) => {
        let totalExpenses = 0;
        let totalPayment = 0;
        let oneBankPayment = 0;
        let onePosPayment = 0;

        for(let expense of expenses){
            totalExpenses = totalExpenses + Number(expense.expenseAmount);
        }

        for(let bankpay of bankPayment){
            totalPayment = totalPayment + Number(bankpay.amountPaid);
            oneBankPayment  = oneBankPayment + Number(bankpay.amountPaid);
        }

        for(let pospay of posPayment){
            totalPayment = totalPayment + Number(pospay.amountPaid);
            onePosPayment = onePosPayment + Number(pospay.amountPaid);
        }

        const total = {
            expenses: totalExpenses,
            payments: totalPayment,
            oneBankPayment: oneBankPayment,
            onePosPayment: onePosPayment,
        }

        dispatch(passExpensesAndPayments(total));
    }

    const getAllProductData = useCallback((rangeDate) => {

        OutletService.getAllOutletStations({organisation: user.userType === "superAdmin"? user._id : user.organisationID}).then(data => {
            dispatch(getAllStations(data.station));
            setCurrentStation(data.station[0]);
            setDefault(1);
            return data.station[0]
        }).then(async(data)=>{
            const payload = {
                organisationID: data.organisation,
                outletID: data._id
            }

            const salesPayload = {
                organisationID: data.organisation,
                outletID: data._id,
                today: rangeDate.today,
                tomorrow: rangeDate.tomorrow,
            }

            const salesRecord = {};
            let paymentsRecords = {};

            OutletService.getAllOutletTanks(payload).then(data => {
                dispatch(getAllOutletTanks(data.stations));
            });

            await DailySalesService.getAllSales(salesPayload).then(data => {
                salesRecord.sales = data.sales.sales;
            });

            await DailySalesService.getAllLPOSales(salesPayload).then((data) => {
                salesRecord.lpo = data.lpo.lpo;
            });

            await DailySalesService.getAllRT(salesPayload).then((data) => {
                salesRecord.rtVolumes = data.rtVolumes.rtVolumes;
            });

            getMasterRows(salesRecord);

            await DailySalesService.getAllDailyExpenses(salesPayload).then((data) => {
                paymentsRecords.expenses = data.expense.expense;
            });

            await DailySalesService.getAllDailyPayments(salesPayload).then((data) => {
                paymentsRecords.bankPayment = data.payment.payment;
                // console.log(data.payment.payment, 'bank payment')
            });

            await DailySalesService.getAllDailyPOSPayments(salesPayload).then((data) => {
                paymentsRecords.posPayment = data.pospayment.pospayment;
                // console.log(data.pospayment.pospayment, 'pos payment')
            });

            getAggregatePayment(paymentsRecords);

            await DailySalesService.getAllDailySupply(salesPayload).then((data) => {
                // console.log(data, 'daily supply');
            });

            await DailySalesService.getAllDailyIncomingOrder(salesPayload).then((data) => {
                dispatch(passIncomingOrder(data.incoming.incoming));
            });
        });

    }, [dispatch, user.organisationID, rangeDate.today, rangeDate.tomorrow, user._id, user.userType]);

    useEffect(()=>{
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const formatWell = year + "-"+ month + "-" + day;
        const getDataRange = getTodayAndTomorrow(formatWell);
        setRangeDate(getDataRange);
        getAllProductData(getDataRange);
    },[getAllProductData])

    const getTodayAndTomorrow = (value) => {
        const today = value;
        let tomorrow;
        const [year, month, day] = today.split('-');

        switch(month){
            case "02":{
                if(day === "28"){
                    let newMonth = String(Number(month) + 1);
                    tomorrow = `${year}-${newMonth.length === 1? `0${newMonth}`: newMonth}-01`;
                }else{
                    let newDay = String(Number(day) + 1);
                    tomorrow = `${year}-${month}-${newDay.length === 1? `0${newDay}`: newDay}`;
                }
                break
            }

            case "01":
            case "03":
            case "05":
            case "07":
            case "08":
            case "10":
            case "12":{
                if(day === "31"){
                    let newMonth = String(Number(month) + 1);
                    tomorrow = `${year}-${newMonth.length === 1? `0${newMonth}`: newMonth}-01`;
                }else{
                    let newDay = String(Number(day) + 1);
                    tomorrow = `${year}-${month}-${newDay.length === 1? `0${newDay}`: newDay}`;
                }
                break
            }

            case "04":
            case "06":
            case "09":
            case "11":{
                if(day === "30"){
                    let newDay = String(Number(day) + 1);
                    tomorrow = `${year}-${month}-${newDay.length === 1? `0${newDay}`: newDay}`;
                }else{
                    let newDay = String(Number(day) + 1);
                    tomorrow = `${year}-${month}-${newDay.length === 1? `0${newDay}`: newDay}`;
                }
                break
            }

            default:{
                tomorrow = today;
            }
        }

        return {today, tomorrow}
    }

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
        dispatch(passCummulative(cummulative));
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

    const updateDate = (e) => {
        const date = e.target.value.split('-');
        const format = `${date[2]} ${months[date[1]]} ${date[0]}`;
        setCurrentDate(format)
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
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', fontSize:'14px'}}>PMS</div>
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'5px', fontSize:'12px'}}>Litre {
                                                dailySales.hasOwnProperty("PMS")? Number(dailySales.PMS.total.totalDifference) + Number(dailySales.PMS.total.totalLpo) - Number(dailySales.PMS.total.totalrt): 0.00
                                            } ltr</div>
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'5px', fontSize:'12px'}}>Total Amount N {
                                                dailySales.hasOwnProperty("PMS")? dailySales.PMS.total.amount: 0.00
                                            }</div>
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
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', fontSize:'14px'}}>AGO</div>
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'5px', fontSize:'12px'}}>Litre {
                                                dailySales.hasOwnProperty("PMS")? Number(dailySales.AGO.total.totalDifference) + Number(dailySales.AGO.total.totalLpo) - Number(dailySales.AGO.total.totalrt): 0.00
                                            } ltr</div>
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'5px', fontSize:'12px'}}>Total Amount N {
                                                dailySales.hasOwnProperty("AGO")? dailySales.AGO.total.amount: 0.00
                                            }</div>
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
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', fontSize:'14px'}}>DPK</div>
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'5px', fontSize:'12px'}}>Litre {
                                                dailySales.hasOwnProperty("PMS")? Number(dailySales.DPK.total.totalDifference) + Number(dailySales.DPK.total.totalLpo) - Number(dailySales.DPK.total.totalrt): 0.00
                                            } ltr</div>
                                            <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'5px', fontSize:'12px'}}>Total Amount N {
                                                dailySales.hasOwnProperty("DPK")? dailySales.DPK.total.amount: 0.00
                                            }</div>
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
                                    <div style={{fontWeight:'500'}} className='level'>Level: {cummulative.totalPMS} Litres</div>
                                    <div style={{fontWeight:'500'}} className='capacity'>Capacity: {cummulative.PMSTankCapacity} Litres</div>
                                    <div onClick={()=>{goToTanks("PMS")}} className='canvas-container'>
                                        <PMSTank data = {cummulatives}/>
                                    </div>
                                </div>
                                <div className="tanks">
                                    <div className='tank-head'>AGO</div>
                                        <div style={{fontWeight:'500'}} className='level'>Level: {cummulative.totalAGO} Litres</div>
                                        <div style={{fontWeight:'500'}} className='capacity'>Capacity: {cummulative.AGOTankCapacity} Litres</div>
                                        <div onClick={()=>{goToTanks("AGO")}} className='canvas-container'>
                                            <AGOTank data = {cummulatives}/>
                                        </div>
                                    </div>
                                <div className="tanks">
                                    <div className='tank-head'>DPK</div>
                                        <div style={{fontWeight:'500'}} className='level'>Level: {cummulative.totalDPK} Litres</div>
                                        <div style={{fontWeight:'500'}} className='capacity'>Capacity: {cummulative.DPKTankCapacity} Litres</div>
                                        <div onClick={()=>{goToTanks("DPK")}} className='canvas-container'>
                                            <DPKTank data = {cummulatives}/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className='daily-right'>
                        <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                            <input onChange={updateDate} ref={dateHandle} style={{position:"absolute", marginTop:'10px', visibility:'hidden'}} type="date" />
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
                                    <div>N {payments.hasOwnProperty("payments")? payments.expenses: "0.00"}</div>
                                </div>
                            </div>
                            <div style={{background:'#06805B'}} className='child'>
                                <div className='ins'>
                                    <div>Payments</div>
                                    <div>N {payments.hasOwnProperty("payments")? payments.payments: "0.00"}</div>
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
                                            <div style={{fontSize:'14px', fontWeight:'bold'}} className='item-count'>Net to bank</div>
                                            <div style={{fontSize:'14px', fontWeight:'bold'}} className='item-count'>Payment</div>
                                            <div style={{fontSize:'14px', fontWeight:'bold', color:'#0872D4'}} className='item-count'>
                                                # {payments.hasOwnProperty("payments")? payments.payments: "0.00"}
                                            </div>
                                            <div style={{fontSize:'14px', fontWeight:'bold'}} className='item-count'>Outstanding</div>
                                        </div>
                                        <div className='row-count'>
                                            <div className='item-count'>
                                                {(dailySales.hasOwnProperty("PMS") && payments.hasOwnProperty("expenses"))? Number(dailySales.PMS.total.noLpoAmount) + Number(dailySales.AGO.total.noLpoAmount) + Number(dailySales.DPK.total.noLpoAmount) - Number(payments.expenses) : "0.00"}
                                            </div>
                                            <div className='item-count'>Teller</div>
                                            <div style={{color:'#0872D4'}} className='item-count'>
                                                # {payments.hasOwnProperty("oneBankPayment")? payments.oneBankPayment: "0.00"}
                                            </div>
                                            <div className='item-count'>
                                                {(dailySales.hasOwnProperty("PMS") && payments.hasOwnProperty("expenses"))? Number(dailySales.PMS.total.noLpoAmount) + Number(dailySales.AGO.total.noLpoAmount) + Number(dailySales.DPK.total.noLpoAmount) - Number(payments.expenses) - Number(payments.payments) : "0.00"}
                                            </div>
                                        </div>
                                        <div className='row-count'>
                                            <div className='item-count'></div>
                                            <div className='item-count'>POS</div>
                                            <div style={{color:'#0872D4'}} className='item-count'>
                                                # {payments.hasOwnProperty("onePosPayment")? payments.onePosPayment: "0.00"}
                                            </div>
                                            <div className='item-count'></div>
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
                                            <div style={{fontSize:'13px', fontWeight:'bold'}} className='item-count'>Total LPO (Ltrs)</div>
                                            <div style={{fontSize:'13px', fontWeight:'bold'}} className='item-count'>Total Amount</div>
                                        </div>
                                        <div className='row-count'>
                                            <div className='item-count'>
                                                {dailySales.hasOwnProperty("PMS")? Number(dailySales.PMS.total.totalLpo) + Number(dailySales.AGO.total.totalLpo) + Number(dailySales.DPK.total.totalLpo): "0.00"} Litres
                                            </div>
                                            <div className='item-count'>
                                                # {dailySales.hasOwnProperty("PMS")?  Number(dailySales.PMS.total.lpoAmount) + Number(dailySales.AGO.total.lpoAmount) + Number(dailySales.DPK.total.lpoAmount): "0.00"}: 00
                                            </div>
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

                            {
                                dailyIncoming.length === 0?
                                <div style={dats}> No incoming order today </div>:
                                dailyIncoming.map((data, index) => {
                                    return(
                                        <div key={index} className='table-view2'>
                                            <div className='table-text'>{data.outletName}</div>
                                            <div className='table-text'>{data.createdAt.split('T')[0]}</div>
                                            <div className='table-text'>{data.depotStation}</div>
                                            <div className='table-text'>{data.product}</div>
                                            <div className='table-text'>{data.quantity}</div>
                                        </div>
                                    )
                                })
                            }
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

const dats = {
    marginTop:'20px',
    fontSize:'14px',
    fontWeight:'bold',
    fontFamily:'Nunito-Regular'
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