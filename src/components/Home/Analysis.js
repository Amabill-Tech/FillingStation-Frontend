import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import analysis2 from '../../assets/analysis2.png';
import folder from '../../assets/folder.png';
import folder2 from '../../assets/folder2.png';
import hand from '../../assets/hand.png';
import naira from '../../assets/naira.png';
import me6 from '../../assets/me6.png';
import { useDispatch, useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import { adminOutlet, getAllStations } from '../../store/actions/outlet';
import AddCostPrice from '../Modals/AddCostPrice';
import CostPriceModal from '../Modals/CostPriceModal';
import { Route, Switch, useHistory } from 'react-router-dom';
import Payments from './Payments';
import Expenses from './Expenses';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import AnalysisService from '../../services/analysis';
import { setAnalysisData } from '../../store/actions/analysis';

const Analysis = (props) => {

    const [range, setRange] = useState([new Date(), new Date()]);
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const oneStationData = useSelector(state => state.outletReducer.adminOutlet);
    const analysisData = useSelector(state => state.analysisReducer.analysisData);

    const dispatch = useDispatch();
    const history = useHistory();
    const [defaultState, setDefault] = useState(0);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [type, setType] = useState(false);
    const [mode, setMode] = useState("");

    const getAllOutletData = useCallback(() => {
        const payload = {
            organisation: user._id
        }

        if(user.userType === "superAdmin" || user.userType === "admin"){
            OutletService.getAllOutletStations(payload).then(data => {
                dispatch(getAllStations(data.station));
                if(data.station.length !== 0){
                    setDefault(1);
                }
                dispatch(adminOutlet(data.station[0]));
                return data.station[0];
            }).then(data => {
                const payload = {
                    organisationID: data.organisation,
                    outletID: data._id,
                    onLoad: true,
                }

                AnalysisService.allRecords(payload).then(data => {
                    dispatch(setAnalysisData(data.analysisData));
                });
            });
        }else{
            OutletService.getOneOutletStation({outletID: user.outletID}).then(data => {
                dispatch(adminOutlet(data.station));
                return data.station;
            }).then(data => {
                const payload = {
                    organisationID: data.organisation,
                    outletID: data._id,
                    onLoad: true,
                }

                AnalysisService.allRecords(payload).then(data => {
                    dispatch(setAnalysisData(data.analysisData));
                });
            });
        }

    }, [user._id, user.userType, user.outletID, dispatch]);

    useEffect(()=>{
        getAllOutletData();
    },[getAllOutletData])

    const changeMenu = (index, item ) => {
        setDefault(index);
        dispatch(adminOutlet(item));

        const payload = {
            organisationID: item.organisation,
            outletID: item._id,
            onLoad: true,
        }

        AnalysisService.allRecords(payload).then(data => {
            dispatch(setAnalysisData(data.analysisData));
        });
    }

    const DashboardImage = (props) => {
        return(
            <div style={{marginRight: props.right, marginLeft: props.left}} onClick={()=>{openCostPrice(props.type)}} className='first-image'>
                <div style={{marginRight:'10px'}} className='inner-first-image'>
                    <div className='top-first-image'>
                        <div className='top-icon'>
                            <img style={{width:'50px', height:'40px'}} src={props.image} alt="icon" />
                        </div>
                        <div style={{alignItems:'flex-end', justifyContent:'center', flexDirection:'column'}} className='top-text'>
                            <div style={{fontSize:'14px', color:'#06805B', fontFamily:'Nunito-Regular'}}>{props.name}</div>
                            <div style={{fontSize:'14px', fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'5px'}}>{props.value}</div>
                        </div>
                    </div>
                    <div className='bottom-first-image'>
                        <img style=
                        {{width:'30px', height:'10px'}} src={me6} alt="icon" />
                    </div>
                </div>
            </div>
        )
    }

    const openCostPrice = (type) => {
        if(type === "cost" || type === "selling"){
            setOpen(true);
            setType(type);
        }else if(type === "payments"){
            history.push("/home/analysis/payments");
        }else if(type === "expenses"){
             history.push("/home/analysis/expenses");
        }
    }

    const getDateFromRange = (data) => {
        const rangeOne = new Date(data[0]);
        const rangeOneYear = rangeOne.getFullYear();
        const rangeOneMonth = rangeOne.getMonth() + 1;
        const rangeOneDay = rangeOne.getDate();
        const formatOne = String(rangeOneDay).length === 1? rangeOneYear+"-"+rangeOneMonth+"-0"+rangeOneDay: rangeOneYear+"-"+rangeOneMonth+"-"+rangeOneDay;

        const rangeTwo = new Date(data[1]);
        const rangeTwoYear = rangeTwo.getFullYear();
        const rangeTwoMonth = rangeTwo.getMonth() + 1;
        const rangeTwoDay = rangeTwo.getDate();
        const formatTwo = String(rangeTwoDay).length === 1? rangeTwoYear+"-"+rangeTwoMonth+"-0"+rangeTwoDay : rangeTwoYear+"-"+rangeTwoMonth+"-"+rangeTwoDay;
    
        const payload = {
            organisationID: oneStationData?.organisation,
            outletID: oneStationData?._id,
            startDate: formatOne,
            endDate: formatTwo
        }

        setRange([formatOne, formatTwo]);

        AnalysisService.getAnalysisData(payload).then(data => {
            dispatch(setAnalysisData(data.analysisData));
        });
    }

    const calculateExpenses = () => {
        if(analysisData.expenses.length === 0){
            return 0;
        }

        let expenseSum = 0;
        for(let exp of analysisData.expenses){
            expenseSum = expenseSum + Number(exp.expenseAmount);
        }
        return expenseSum;
    }

    const calculatePayment = () => {
        if(analysisData.payments.length === 0 || analysisData.pospayment.length === 0){
            return 0;
        }

        let paymentSum = 0;
        for(let pay of analysisData.payments){
            paymentSum = paymentSum + Number(pay.amountPaid);
        }

        for(let pos of analysisData.pospayment){
            paymentSum = paymentSum + Number(pos.amountPaid);
        }
        return paymentSum;
    }

    const calculateTotalSales = () => {
        if(analysisData.sales.length === 0){
            return 0;
        }

        let sales = 0;
        for(let sale of analysisData.sales){
            sales = sales + sale.productType === "PMS"? Number(sale.sales)*Number(sale.PMSSellingPrice): sale.productType === "AGO"? Number(sale.sales)*Number(sale.AGOSellingPrice): Number(sale.sales)*Number(sale.DPKSellingPrice);
        }

        let lpo = 0;
        for(let sale of analysisData.lpo){
            lpo = lpo + sale.productType === "PMS"? Number(sale.lpoLitre)*Number(sale.PMSRate): sale.productType === "AGO"? Number(sale.lpoLitre)*Number(sale.AGORate): Number(sale.lpoLitre)*Number(sale.DPKRate);
        }

        let rtPrice = 0;
        for(let sale of analysisData.rtVolumes){
            rtPrice = rtPrice + sale.productType === "PMS"? Number(sale.rtLitre)*Number(sale.PMSPrice): sale.productType === "AGO"? Number(sale.rtLitre)*Number(sale.AGOPrice): Number(sale.rtLitre)*Number(sale.DPKPrice);
        }

        const total = sales + lpo - rtPrice;

        return total;
    }

    const calculateTotalCost = () => {
        if(analysisData.sales.length === 0){
            return 0;
        }

        let cost = 0;
        for(let sale of analysisData.sales){
            cost = cost + sale.productType === "PMS"? Number(sale.sales)*Number(sale?.PMSCostPrice): sale.productType === "AGO"? Number(sale.sales)*Number(sale?.AGOCostPrice): Number(sale.sales)*Number(sale?.DPKCostPrice);
        }

        let lpo = 0;
        for(let sale of analysisData.lpo){
            lpo = lpo + sale.productType === "PMS"? Number(sale.lpoLitre)*Number(sale?.PMSCost): sale.productType === "AGO"? Number(sale.lpoLitre)*Number(sale?.AGOCost): Number(sale.lpoLitre)*Number(sale?.DPKCost);
        }

        let rtPrice = 0;
        for(let sale of analysisData.rtVolumes){
            rtPrice = rtPrice + sale.productType === "PMS"? Number(sale.rtLitre)*Number(sale?.PMSCost): sale.productType === "AGO"? Number(sale.rtLitre)*Number(sale?.AGOCost): Number(sale.rtLitre)*Number(sale?.DPKCost);
        }

        const total = cost + lpo - rtPrice;

        return total;
    }

    return(
        <div data-aos="zoom-in-down" style={{background: user.isDark === "0"? '#fff': '#404040'}} className='paymentsCaontainer'>
            {open && <AddCostPrice type={type} open={open} close={setOpen} open2={setOpen2} setMode={setMode} />}
            {open2 && <CostPriceModal type={type} open={open2} close={setOpen2} mode={mode} refresh={getAllOutletData} />}
            {props.activeRoute.split('/').length === 3 &&
                <div style={{width:'100%', marginTop:'0px'}} className='inner-pay'>
                    <div className='action'>
                        <div style={{width:'150px'}} className='butt2'>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={10}
                                sx={{...selectStyle2, backgroundColor:"#F36A4C", color:'#fff'}}
                            >
                                <MenuItem value={10}>Add Payments</MenuItem>
                                <MenuItem value={20}>Download PDF</MenuItem>
                                <MenuItem value={30}>Print</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div style={{marginBottom:'0px'}} className='search'>
                        <div className='input-cont'>
                            <div className='second-select'>
                                {(user.userType === "superAdmin" || user.userType === "admin") &&
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
                                                    <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index + 1, item)}} value={index + 1}>{item.outletName+ ', ' +item.alias}</MenuItem>
                                                )
                                            })  
                                        }
                                    </Select>
                                }
                                {user.userType === "staff" &&
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={0}
                                        sx={selectStyle2}
                                        disabled
                                    >
                                        <MenuItem style={menu} value={0}>{user.userType === "staff"? oneStationData?.outletName+", "+oneStationData?.alias: "No station created"}</MenuItem>
                                    </Select>
                                }
                            </div>
                        </div>
                        <div style={{justifyContent:'flex-end'}} className='butt'>
                            <DateRangePicker onChange={getDateFromRange} value={range} />
                        </div>
                    </div>

                    <div style={contain2}>
                        <div className='imgContainer'>
                            <DashboardImage type={"cost"} right={'10px'} left={'0px'} image={naira} name={'Cost Price'} value={`NGN ${oneStationData === null? "0": oneStationData?.PMSCost}`} />
                            <DashboardImage type={"selling"} right={'10px'} left={'0px'} image={hand} name={'Selling Price'} value={`NGN ${oneStationData === null? "0": oneStationData?.PMSPrice}`} />
                            <DashboardImage type={"expenses"} right={'10px'} left={'0px'} image={folder} name={'Expenses'} value={`NGN ${calculateExpenses()}`} />
                            <DashboardImage type={"payments"} right={'10px'} left={'0px'} image={folder2} name={'Payments'} value={`NGN ${calculatePayment()}`} />
                            <DashboardImage type={"none"} right={'0px'} left={'0px'} image={analysis2} name={'Profits'} value={`NGN ${calculateTotalSales() - calculateTotalCost() - calculateExpenses()}`} />
                        </div>
                    </div>
                </div>
            }

            {props.activeRoute.split('/').length === 4 &&
                <Switch>
                    <Route path='/home/analysis/payments'>
                        <Payments />
                    </Route>
                    <Route path='/home/analysis/expenses'>
                        <Expenses />
                    </Route>
                </Switch>
            }
        </div>
    )
}

const selectStyle2 = {
    width:'100%', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none',
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border:'1px solid #777777',
    },
}

const contain2 = {
    width:'100%',
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default Analysis;