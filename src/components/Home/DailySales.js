import React, {useCallback, useEffect, useState} from 'react';
import '../../styles/dailySales.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import me5 from '../../assets/me5.png';
import calendar from '../../assets/calendar.png';
import slideMenu from '../../assets/slideMenu.png';
import Button from '@mui/material/Button';
import PMSTank from '../Outlet/PMSTank';
import AGOTank from '../Outlet/AGOTank';
import DPKTank from '../Outlet/DPKTank';
import { useDispatch, useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import { adminOutlet, getAllOutletTanks, getAllStations } from '../../store/actions/outlet';
import { Route, Switch, useHistory } from 'react-router-dom';
import PMSDailySales from '../DailySales/PMSDailySales';
import AGODailySales from '../DailySales/AGODailySales';
import DPKDailySales from '../DailySales/DPKDailySales';
import ComprehensiveReport from '../DailySales/ComprehensiveReport';
import ListAllTanks from '../Outlet/TankList';
import { useRef } from 'react';
import DailySalesService from '../../services/DailySales';
import { bulkReports, dailySupplies, lpoRecords, passAllDailySales, passCummulative, passExpensesAndPayments, passIncomingOrder, paymentRecords } from '../../store/actions/dailySales';
import BarChartGraph from '../common/BarChartGraph';
import { Skeleton } from '@mui/material';

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
    const [month, day, year] = toString.split(' ');
    const date2 = `${day} ${month} ${year}`;

    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [load, setLoads] = useState(false);
    const tankList = useSelector(state => state.outletReducer.tankList);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const oneStationData = useSelector(state => state.outletReducer.adminOutlet);
    const [defaultState, setDefault] = useState(0);
    const [cummulatives, setCummulatives] = useState({});
    const [currentStation, setCurrentStation] = useState({});
    const dateHandle = useRef();
    const [currentDate, setCurrentDate] = useState(date2);
    const dailySales = useSelector(state => state.dailySalesReducer.dailySales);
    const payments = useSelector(state => state.dailySalesReducer.payments);
    const dailyIncoming = useSelector(state => state.dailySalesReducer.dailyIncoming);
    const cummulative = useSelector(state => state.dailySalesReducer.cummulative);
    const dailySupplys = useSelector(state => state.dailySalesReducer.dailySupplies);

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

    const SupplyDataSummary = (supplies) => {
        let totalPMS = 0;
        let totalAGO = 0;
        let totalDPK = 0;
        for(let supply of supplies){
            if(supply.productType === "PMS"){
                totalPMS = totalPMS + Number(supply.quantity);
            }else if(supply.productType === "AGO"){
                totalAGO = totalAGO + Number(supply.quantity);
            }else if(supply.productType === "DPK"){
                totalDPK = totalDPK + Number(supply.quantity);
            }
        }

        const totals = {
            PMS: totalPMS,
            AGO: totalAGO,
            DPK: totalDPK
        }

        return totals
    }

    const getAndAnalyzeDailySales = async(data, onLoad, selectedDate) => {

        const salesPayload = {
            organisationID: data.organisation,
            outletID: data._id,
            onLoad: onLoad,
            selectedDate: selectedDate
        }

        DailySalesService.getDailySalesDataAndAnalyze(salesPayload).then(data => {

            const salesDataRecord = {
                sales: data.dailyRecords.sales,
                lpo: data.dailyRecords.lpo,
                rtVolumes: data.dailyRecords.rtVolumes,
            }

            const paymentsRecords = {
                expenses: data.dailyRecords.expenses,
                bankPayment: data.dailyRecords.payments,
                posPayment: data.dailyRecords.pospayment,
            }

            const supplyRecords = SupplyDataSummary(data.dailyRecords.supply);

            dispatch(paymentRecords(paymentsRecords));
            getAggregatePayment(paymentsRecords);
            dispatch(bulkReports(data.dailyRecords));

            dispatch(lpoRecords(data.dailyRecords.lpo));
            getMasterRows(salesDataRecord);

            dispatch(getAllOutletTanks(data.dailyRecords.tanks));
            dispatch(dailySupplies(supplyRecords));
            dispatch(passIncomingOrder(data.dailyRecords.incoming));
        });
    }

    const getAllProductData = useCallback(() => {

        const payload = {
            organisation: user._id
        }

        if(user.userType === "superAdmin"){
            setLoads(true);
            OutletService.getAllOutletStations(payload).then(data => {
                dispatch(getAllStations(data.station));
                if(data.station.length !== 0){
                    setDefault(1);
                }
                setCurrentStation(data.station[0]);
                return data.station[0];
            }).then(async(data)=>{
                getAndAnalyzeDailySales(data, true, "");
                setLoads(false);
            });
        }else{
            setLoads(true);
            OutletService.getOneOutletStation({outletID: user.outletID}).then(data => {
                dispatch(adminOutlet(data.station));
                setCurrentStation(data.station);
                return data.station;
            }).then(async(data)=>{
                getAndAnalyzeDailySales(data, true, "");
                setLoads(false);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, user._id, user.outletID, user.userType]);

    useEffect(()=>{
        getAllProductData();
    },[getAllProductData]);

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
    }, [tankList, dispatch]);

    useEffect(()=>{
        getProductTanks();
    }, [getProductTanks]);

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);
        setLoads(true);

        getAndAnalyzeDailySales(item, true, "");

        const payload = {
            organisationID: item.organisation,
            outletID: item._id
        }
        OutletService.getAllOutletTanks(payload).then(data => {
            dispatch(getAllOutletTanks(data.stations));
            setLoads(false);
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
        setCurrentDate(format);
        getAndAnalyzeDailySales(currentStation, false, e.target.value);
    }

    return(
        <div style={{marginTop:'20px'}} className='daily-sales-container'>
            { props.activeRoute.split('/').length === 3 &&
                <>
                    <div className='daily-left'>
                        <div style={{display:'flex', flexDirection:'row'}}>
                            <div>
                                {oneStationData.hasOwnProperty("outletName") ||
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
                                }
                                {oneStationData.hasOwnProperty("outletName") &&
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={0}
                                        sx={selectStyle2}
                                        disabled
                                    >
                                        <MenuItem style={menu} value={0}>{oneStationData.hasOwnProperty("outletName")?oneStationData.outletName+", "+oneStationData.city: "No station created"}</MenuItem>
                                    </Select>
                                }
                            </div>
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
                                {load?
                                    <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'100%'} height={110} />:
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
                                }
                            </div>
                            <div data-aos="flip-left" className="dash-item">
                                {load?
                                    <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'100%'} height={110} />:
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
                                }
                            </div>
                            <div data-aos="flip-left" className="dash-item">
                                {load?
                                    <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'100%'} height={110} />:
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
                                }
                            </div>
                        </div>

                        <div style={{color: user.isDark === '0'? '#000': '#fff'}} className="tank-text">Tank Stock Levels</div>
                        <div className="tank-container">
                            {load?
                                <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'100%'} height={450} />:
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
                            }
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
                                {load?
                                    <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'100%'} height={120} />:
                                    <div className='ins'>
                                        <div>Expenses</div>
                                        <div>N {payments.hasOwnProperty("payments")? payments.expenses: "0.00"}</div>
                                    </div>
                                }
                            </div>
                            <div style={{background:'#06805B'}} className='child'>
                                {load?
                                    <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'100%'} height={120} />:
                                    <div className='ins'>
                                        <div>Payments</div>
                                        <div>N {payments.hasOwnProperty("payments")? payments.payments: "0.00"}</div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div style={{color: user.isDark === '0'? '#000': '#fff', marginTop:'30px'}} className="tank-text">Expenses And Payments</div>
                        <BarChartGraph load={load} station={currentStation} />

                        <div style={{marginTop:'30px'}} className='asset'>
                            <div style={{color: user.isDark === '0'? '#000': '#fff'}}>Supply</div>
                            {load?
                                <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'130px'} height={35} />:
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
                                    onClick={()=>{history.push("/home/supply")}}
                                >
                                    View in details
                                </Button>
                            }
                        </div>
                        <div className='inner-section'>
                            <div className="cardss">
                                {load?
                                    <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'130px'} height={35} />:
                                    <>
                                        <div className='left'>
                                            PMS
                                        </div>
                                        <div className='right'>
                                            <div>Litre Qty</div>
                                            <div>{dailySupplys.hasOwnProperty("PMS")? dailySupplys.PMS: "0"}</div>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="cardss">
                                {load?
                                    <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'130px'} height={35} />:
                                    <>
                                        <div className='left'>
                                            AGO
                                        </div>
                                        <div className='right'>
                                            <div>Litre Qty</div>
                                            <div>{dailySupplys.hasOwnProperty("AGO")? dailySupplys.AGO: "0"}</div>
                                        </div>
                                    </>
                                }
                            </div>
                            <div style={{marginRight:'0px'}} className="cardss">
                                {load?
                                    <Skeleton sx={{borderRadius:'5px', background:'#f7f7f7'}} animation="wave" variant="rectangular" width={'130px'} height={35} />:
                                    <>
                                        <div className='left'>
                                            DPK
                                        </div>
                                        <div className='right'>
                                            <div>Litre Qty</div>
                                            <div>{dailySupplys.hasOwnProperty("DPK")? dailySupplys.DPK: "0"}</div>
                                        </div>
                                    </>
                                }
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
                                    onClick={()=>{history.push("/home/analysis/payments")}}
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
                                    onClick={()=>{history.push("/home/record-sales/lpo")}}
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
                                onClick={()=>{history.push("/home/inc-orders")}}
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
                            <ComprehensiveReport refresh = {getAllProductData} station={currentStation}/>
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