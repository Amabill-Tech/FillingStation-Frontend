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
import { getAllStations } from '../../store/actions/outlet';
import AddCostPrice from '../Modals/AddCostPrice';
import CostPriceModal from '../Modals/CostPriceModal';
import { Route, Switch, useHistory } from 'react-router-dom';
import Payments from './Payments';
import Expenses from './Expenses';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const Analysis = (props) => {

    const [value, onChange] = useState([new Date(), new Date()]);
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const dispatch = useDispatch();
    const history = useHistory();
    const [currentStation, setCurrentStation] = useState({});
    const [defaultState, setDefault] = useState(0);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [type, setType] = useState(false);
    const [mode, setMode] = useState("");

    const getAllOutletData = useCallback(() => {

        OutletService.getAllOutletStations({organisation: user.userType === "superAdmin"? user._id : user.organisationID}).then(data => {
            dispatch(getAllStations(data.station));
            setCurrentStation(data.station[0]);
            setDefault(1);
            return data.station[0]
        }).then((data)=>{
            // const payload = {
            //     skip: skip * limit,
            //     limit: limit,
            //     outletID: data._id, 
            //     organisationID: data.organisation
            // }

        });

    }, [dispatch, user._id, user.userType, user.organisationID]);

    useEffect(()=>{
        getAllOutletData();
    },[getAllOutletData])

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);
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
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={defaultState}
                                    sx={selectStyle2}
                                >
                                    <MenuItem style={menu} value={0}>Select station</MenuItem>
                                    {
                                    allOutlets.map((item, index) => {
                                            return(
                                                <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index + 1, item)}} value={index + 1}>{item.outletName+ ", " +item.city}</MenuItem>
                                            )
                                    })  
                                    }
                                </Select>
                            </div>
                        </div>
                        <div style={{justifyContent:'flex-end'}} className='butt'>
                            <DateRangePicker onChange={onChange} value={value} />
                        </div>
                    </div>

                    <div style={contain2}>
                        <div className='imgContainer'>
                            <DashboardImage type={"cost"} right={'10px'} left={'0px'} image={naira} name={'Cost Price'} value={'NGN 231,925'} />
                            <DashboardImage type={"selling"} right={'10px'} left={'0px'} image={hand} name={'Selling Price'} value={'NGN 231,925'} />
                            <DashboardImage type={"expenses"} right={'10px'} left={'0px'} image={folder} name={'Expenses'} value={'NGN 231,925'} />
                            <DashboardImage type={"payments"} right={'10px'} left={'0px'} image={folder2} name={'Payments'} value={'NGN 231,925'} />
                            <DashboardImage type={"none"} right={'0px'} left={'0px'} image={analysis2} name={'Profits'} value={'NGN 231,925'} />
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
    outline:'none'
}

const contain2 = {
    width:'100%',
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default Analysis;