import { Button } from "@mui/material";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import IncomingService from "../../services/IncomingService";
import OutletService from "../../services/outletService";
import { createIncomingOrder, searchIncoming } from "../../store/actions/incomingOrder";
import { getAllOutletTanks } from "../../store/actions/outlet";
import AddIcon from '@mui/icons-material/Add';
import hr8 from '../../assets/hr8.png';
import { passRecordSales } from "../../store/actions/dailySales";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const SupplyComponent = () => {

    const [selected, setSelected] = useState([]);
    const [menus, setMenus] = useState(false);
    const dispatch = useDispatch();
    const linkedData = useSelector(state => state.dailySalesReducer.linkedData);
    const user = useSelector(state => state.authReducer.user);
    const allAdminStations = useSelector(state => state.dailyRecordReducer.allAdminStations);
    const singleAdminStation = useSelector(state => state.dailyRecordReducer.singleAdminStation);
    const incomingOrder = useSelector(state => state.incomingOrderReducer.incomingOrder);
    const tankList = useSelector(state => state.outletReducer.tankList);
    const [selectedIncomingOrders, setSelectedIncomingOrder] = useState("");

    // payload data
    const [transporter, setTransporter] = useState('');
    const [waybillNo, setWaybillNo] = useState('');
    const [truckNo, setTruckNo] = useState('');
    const [productSupply, setProductSupply] = useState('');
    const [quantityLoaded, setQuantityLoaded] = useState('');
    const [outletName, setOutletName] = useState("");


    const selectedIncomingOrder = (data) => {

        setTransporter(data.transporter);
        setWaybillNo(data.wayBillNo);
        setProductSupply(data.product);
        setQuantityLoaded(data.quantity);
        setTruckNo(data.truckNo);

        setMenus(!menus);
        setSelectedIncomingOrder(data);
    }

    const selectedStation = (e) => {
        const value = e.target.options[e.target.options.selectedIndex].value;

        setOutletName(value);

        const payload = {
            outletID: JSON.parse(value)?._id, 
            organisationID: JSON.parse(value)?.organisation
        }

        IncomingService.getAllIncoming(payload).then((data) => {
            dispatch(createIncomingOrder(data.incoming.incoming));
        });

        OutletService.getAllOutletTanks(payload).then(data => {
            const outletTanks = data.stations.map(data => {
                const newData = {...data, label: data.tankName, value: data._id};
                return newData;
            });
            dispatch(getAllOutletTanks(outletTanks));
        });
    }


    const incomingTanks = (e, data) => {
        const room = Number(data.tankCapacity) - Number(data.currentLevel);
        let addedQuantity = Number(e.target.value);

        if(addedQuantity > room){
            swal("Warning!", `This tank doesn't have the capacity, can only accommodate ${room} litres extra. `, "info");
        }else{
            const cloneSelectedTanks = [...selected];
            const findID = cloneSelectedTanks.findIndex(item => item._id === data._id);
            const total = String(Number(cloneSelectedTanks[findID].currentLevel) + addedQuantity);
            cloneSelectedTanks[findID].newLevel = total;
            cloneSelectedTanks[findID].addedQuantity = addedQuantity;
        }
    }

    const addDetailsToList = () => {
        if(transporter === "") return swal("Warning!", "Transporter field cannot be empty", "info");
        if(waybillNo === "") return swal("Warning!", "waybill no field cannot be empty", "info");
        if(truckNo === "") return swal("Warning!", "Truck no field cannot be empty", "info");
        if(outletName === "") return swal("Warning!", "Outlet field cannot be empty", "info");
        if(productSupply === "") return swal("Warning!", "Product type field cannot be empty", "info");
        if(selectedIncomingOrders === "") return swal("Warning!", "Incoming order field cannot be empty", "info");

        let discharged = 0;
        for(let data of selected){
            discharged = discharged + Number(data.addedQuantity);
        }

        if(typeof discharged === 'number' && discharged !== 0){

            const payload = {
                transportationName: transporter,
                wayBillNo: waybillNo,
                truckNo: truckNo,
                quantity: String(discharged),
                outletName: user.userType === "superAdmin"? JSON.parse(outletName).outletName: singleAdminStation.outletName,
                productType: productSupply,
                shortage: "None",
                overage: "None",
                incomingID: selectedIncomingOrders._id,
                date: "None",
                tankUpdate: selected,
                outletID: user.userType === "superAdmin"? JSON.parse(outletName)._id: singleAdminStation._id,
                organizationID: user.userType === "superAdmin"? JSON.parse(outletName).organisation: singleAdminStation.organisation,
            }

            const newList = {...linkedData};
            newList.head.data.payload.push(payload);
            dispatch(passRecordSales(newList));

            setTransporter("");
            setWaybillNo("");
            setTruckNo("");
            setOutletName("");
            setQuantityLoaded("");
            setProductSupply("");
            setSelected([]);
        
        }else{
            swal("Warning!", `Please add quantity to each tank. `, "info");
        }
    }

    const deleteFromList = (index) => {
        const newList = {...linkedData};
        newList.head.data.payload.pop(index);
        dispatch(passRecordSales(newList));
    }

    const searchWayBill = (e) => {
        dispatch(searchIncoming(e.target.value));
    }

    const getFilteredTanks = () => {
        const PMS = tankList.filter(data => data.productType === productSupply);
        const AGO = tankList.filter(data => data.productType === productSupply);
        const DPK = tankList.filter(data => data.productType === productSupply);

        if(productSupply === "PMS"){
            return PMS
        }else if(productSupply === "AGO"){
            return AGO;
        }else{
            return DPK
        }
    }

    return(
        <div className='inner-body'>
            <div className='left'>
                <div className='single-form'>
                    <div className='input-d'>
                        <span style={{color:'green'}}>Select Station</span>
                        {user.userType === "superAdmin" &&
                            <select onChange={selectedStation} className='text-field'>
                                <option>Select a station</option>
                                {
                                    allAdminStations.map((data, index) => {
                                        return(
                                            <option value={JSON.stringify(data)} key={index}>{data.outletName}</option>
                                        )
                                    })
                                }
                            </select>
                        }
                        {user.userType === "superAdmin" ||
                            <select onChange={selectedStation} className='text-field'>
                                <option value={JSON.stringify(singleAdminStation)}>{singleAdminStation?.outletName}</option>
                            </select>
                        }
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='double-form'>
                    <div className='input-d'>
                        <span style={{color:'green'}}>Incoming Order ID</span>
                        <div style={{width: '100%', position:'relative'}}>
                            <div onClick={()=>setMenus(!menus)} className='text-field2'>
                                <span>{waybillNo}</span>
                                <KeyboardArrowDownIcon />
                            </div>
                            {menus &&
                                <div className="drop">
                                    <input onChange={(e => searchWayBill(e))} className="searches" type={'text'} placeholder="Search" />
                                    <div className="cons">
                                        {
                                            incomingOrder.map((data, index) => {
                                                return(
                                                    <span key={index} onClick={()=>{selectedIncomingOrder(data)}} className="ids">&nbsp;&nbsp;&nbsp;{`${data.wayBillNo}`}</span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className='input-d'>
                        <span style={{color:'green'}}>Transporter</span>
                        <input disabled value={transporter} onChange={e => setTransporter(e.target.value)} className='text-field' type={'text'} />
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='double-form'>
                    <div className='input-d'>
                        <span style={{color:'green'}}>Waybill No</span>
                        <input disabled value={waybillNo} onChange={e => setWaybillNo(e.target.value)} className='text-field' type={'text'} />
                    </div>

                    <div className='input-d'>
                        <span style={{color:'green'}}>Truck No</span>
                        <input disabled value={truckNo} onChange={e => setTruckNo(e.target.value)} className='text-field' type={'text'} />
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='double-form'>
                    <div className='input-d'>
                        <span style={{color:'green'}}>Product Supply</span>
                        <input disabled value={productSupply} onChange={e => setProductSupply(e.target.value)} className='text-field' type={'text'} />
                    </div>

                    <div className='input-d'>
                        <span style={{color:'green'}}>Quantity Loaded</span>
                        <input disabled value={quantityLoaded} onChange={e => setQuantityLoaded(e.target.value)} className='text-field' type={'text'} />
                    </div>
                </div>

                <div className='single-form'>
                    <div className='input-d'>
                        <span style={{color:'green'}}>Select tanks</span>
                        <MultiSelect
                            options={getFilteredTanks()}
                            value = {selected}
                            onChange = {setSelected}
                            className="multiple"
                        />
                    </div>
                </div>

                <div className="tanks">
                    {
                        selected.map((data, index) => {
                            return(
                                <div key={index} className="items">
                                    <span>{data.label}<span style={label}>(capacity: {data.tankCapacity})</span></span>
                                    <input 
                                        onChange={(e)=>{incomingTanks(e, data)}} 
                                        className="tank-input" type={'number'} 
                                        placeholder={`Current level: ${data.currentLevel}`}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

                <div style={{marginTop:'20px'}} className='double-form'>
                    <div className='input-d'>
                        <span style={{color:'green'}}>Shortage</span>
                        <input className='text-field' type={'text'} />
                    </div>

                    <div className='input-d'>
                        <span style={{color:'green'}}>Overage</span>
                        <input className='text-field' type={'text'} />
                    </div>
                </div>

                <div style={add}>
                    <Button sx={{
                        width:'140px', 
                        height:'30px',  
                        background: '#427BBE',
                        borderRadius: '3px',
                        fontSize:'11px',
                        '&:hover': {
                            backgroundColor: '#427BBE'
                        }
                        }}  
                        onClick={addDetailsToList}
                        variant="contained"> 
                        <AddIcon sx={{marginRight:'10px'}} /> Add to List
                    </Button>
                </div>
            </div>

            <div className='right'>
                <div className="table-head">
                    <div className="col">S/N</div>
                    <div className="col">Transporter</div>
                    <div className="col">Product</div>
                    <div className="col">Quantity</div>
                    <div className="col">Action</div>
                </div>

                {
                    linkedData.head?.data?.payload.length === 0?
                    <div style={{marginTop:'10px'}}>No data</div>:
                    linkedData.head?.data?.payload.map((data, index) => {
                        return(
                            <div key={index} style={{background: '#fff', marginTop:'5px'}} className="table-head">
                                <div style={{color:'#000'}} className="col">{index + 1}</div>
                                <div style={{color:'#000'}} className="col">{data?.transportationName}</div>
                                <div style={{color:'#000'}} className="col">{data?.productType}</div>
                                <div style={{color:'#000'}} className="col">{data?.quantity}</div>
                                <div style={{color:'#000'}} className="col">
                                    <img 
                                        onClick={()=>{deleteFromList(index)}} 
                                        style={{width:'22px', height:'22px'}} 
                                        src={hr8} 
                                        alt="icon" 
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const label = {
    fontSize: '12px',
    marginLeft: '5px',
    fontWeight: '500',
    color: 'red'
}

const add = {
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:'30px'
}

export default SupplyComponent;