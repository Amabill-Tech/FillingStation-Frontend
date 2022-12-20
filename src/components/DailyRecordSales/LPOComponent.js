import { Button, Radio } from "@mui/material"
import { useState } from "react";
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import cross from '../../assets/cross.png';
import { useDispatch, useSelector } from "react-redux";
import IncomingService from "../../services/IncomingService";
import { createIncomingOrder } from "../../store/actions/incomingOrder";
import OutletService from "../../services/outletService";
import { getAllOutletTanks } from "../../store/actions/outlet";
import ReactCamera from "../Modals/ReactCamera";
import { useRef } from "react";
import AddIcon from '@mui/icons-material/Add';
import hr8 from '../../assets/hr8.png';
import swal from 'sweetalert';
import axios from "axios";
import config from '../../constants';
import { passRecordSales } from "../../store/actions/dailySales";
import LPOService from "../../services/lpo";
import { createLPO } from "../../store/actions/lpo";
import { useEffect } from "react";

const LPOComponent = (props) => {

    const dispatch = useDispatch();
    const gallery = useRef();
    const user = useSelector(state => state.authReducer.user);
    const linkedData = useSelector(state => state.dailySalesReducer.linkedData);
    const allAdminStations = useSelector(state => state.dailyRecordReducer.allAdminStations);
    const singleAdminStation = useSelector(state => state.dailyRecordReducer.singleAdminStation);
    const pumpList = useSelector(state => state.outletReducer.pumpList);
    const tankList = useSelector(state => state.outletReducer.tankList);
    const lpos = useSelector(state => state.lpoReducer.lpo);
    const [selectedPMS, setSelectedPMS] = useState(null);
    const [selectedAGO, setSelectedAGO] = useState(null);
    const [selectedDPK, setSelectedDPK] = useState(null);
    console.log(linkedData, "link")

    // selections
    const [open, setOpen] = useState(false);

    // payload records
    const [cam, setCam] = useState(null);
    const [gall, setGall] = useState(null);
    const [productType, setProductType] = useState(null);
    const [dispenseLpo, setDispensedLPO] = useState(null);
    const [dispensedPump, setDispensedPump] = useState(null);
    const [currentStation, setCurrentStation] = useState(null);
    const [truckNo, setTruckNo] = useState("");
    const [quantity, setQuantity] = useState("");

    const getPMSPump = () => {
        const pms = pumpList.filter(data => data.productType === "PMS");
        const newPms = pms.map(data => Object.assign({}, data));
        return newPms;
    }

    const getAGOPump = () => {
        const ago = pumpList.filter(data => data.productType === "AGO");
        const newAgo = ago.map(data => Object.assign({}, data));
        return newAgo;
    }

    const getDPKPump = () => {
        const dpk = pumpList.filter(data => data.productType === "DPK");
        const newDpk = dpk.map(data => Object.assign({}, data));
        return newDpk;
    }

    const [pms] = useState(getPMSPump());
    const [ago] = useState(getAGOPump());
    const [dpk] = useState(getDPKPump());

    const onRadioClick = (data) => {
        if(data === "PMS"){
            setProductType('PMS');
        }
        
        if(data === "AGO"){
            setProductType('AGO');
        }

        if(data === "DPK"){
            setProductType('DPK');
        }
    }

    useEffect(()=>{
        setProductType("PMS");
    },[])

    const pumpItem = (e, index, item) => {
        e.preventDefault();
        setDispensedPump(item);

        if(productType === "PMS"){
            setSelectedPMS(index);
            setSelectedAGO(null);
            setSelectedDPK(null);
        }else if(productType === "AGO"){
            setSelectedPMS(null);
            setSelectedAGO(index);
            setSelectedDPK(null);
        }else{
            setSelectedPMS(null);
            setSelectedAGO(null);
            setSelectedDPK(index);
        }
    }

    const desselect = () => {
        if(productType === "PMS"){
            setSelectedPMS("");
        }else if(productType === "AGO"){
            setSelectedAGO("")
        }else{
            setSelectedDPK("")
        }
    }

    const selectedStation = (e) => {
        const value = e.target.options[e.target.options.selectedIndex].value;
        setCurrentStation(JSON.parse(value));

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

        LPOService.getAllLPO(payload).then((data) => {
            dispatch(createLPO(data.lpo.lpo));
        });
    }

    const selectLPOAccount = (e) => {
        const value = e.target.options[e.target.options.selectedIndex].value;
        setDispensedLPO(JSON.parse(value));
    }

    const openCamera = () => {
        setOpen(true);
    }

    const openGallery = () => {
        gallery.current.click();
    }

    const pickFromGallery = (e) => {
        let file = e.target.files[0];

        const formData = new FormData();
        formData.append("file", file);
        const httpConfig = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": "Bearer "+ localStorage.getItem('token'),
            }
        };
        const url = `${config.BASE_URL}/360-station/api/upload`;
        axios.post(url, formData, httpConfig).then((data) => {
            setGall(data.data.path);
        });
    }

    const addDetailsToList = () => {
        if(currentStation === null) return swal("Warning!", "please select station", "info");
        if(dispenseLpo === null) return swal("Warning!", "Please select lpo account", "info");
        if(dispensedPump === null) return swal("Warning!", "Please select lpo pump", "info");
        if(truckNo === "") return swal("Warning!", "Truck no field cannot be empty", "info");
        if(quantity === "") return swal("Warning!", "Quantity field cannot be empty", "info");
        if(productType === "") return swal("Warning!", "Product type field cannot be empty", "info");
        if(typeof(gall) === "object" && typeof(cam) === "object") return swal("Warning!", "Please select a file", "info");

        const tank = tankList.filter(data => data._id === dispensedPump.hostTank)[0];

        const payload = {
            accountName: dispenseLpo.companyName,
            productType: productType,
            truckNo: truckNo,
            lpoLitre: quantity,
            camera: cam,
            gallery: gall,
            lpoID: dispenseLpo._id,
            pumpID: dispensedPump._id,
            tank: tank,
            PMSRate: currentStation.PMSPrice,
            AGORate: currentStation.PMSPrice,
            DPKRate: currentStation.PMSPrice,
            PMSCost: currentStation.PMSCost,
            AGOCost: currentStation.AGOCost,
            DPKCost: currentStation.DPKCost,
            outletID: currentStation._id,
            organizationID: currentStation.organisation,
        }

        const newList = {...linkedData};
        newList.head.data.payload.push(payload);
        dispatch(passRecordSales(newList));

        setGall(null);
        setCam(null);
        setTruckNo("");
        setQuantity("");
    }

    const deleteFromList = (index) => {
        const newList = {...linkedData};
        newList.head.data.payload.pop(index);
        dispatch(passRecordSales(newList));
    }

    return(
        <div className="inner-body" style={{width:'98%', display:'flex', flexDirection: 'column', alignItems:'center'}}>
            <ReactCamera open={open} close={setOpen} setDataUri={setCam} />

            <div style={rad} className='radio'>
                <div className='rad-item'>
                    <Radio {...props}
                        sx={{
                            '&, &.Mui-checked': {
                            color: '#054834',
                            },
                        }} 
                        onClick={()=>onRadioClick("PMS")} 
                        checked={productType === 'PMS'? true: false} 
                    />
                    <div className='head-text2' style={{marginRight:'5px', fontSize:'12px'}}>PMS</div>
                </div>
                <div className='rad-item'>
                    <Radio {...props}
                        sx={{
                            '&, &.Mui-checked': {
                            color: '#054834',
                            },
                        }}
                        onClick={()=>onRadioClick("AGO")} 
                        checked={productType === 'AGO'? true: false} 
                    />
                    <div className='head-text2' style={{marginRight:'5px', fontSize:'12px'}}>AGO</div>
                </div>
                <div className='rad-item'>
                    <Radio {...props}
                        sx={{
                            '&, &.Mui-checked': {
                            color: '#054834',
                            },
                        }} 
                        onClick={()=>onRadioClick("DPK")} 
                        checked={productType === 'DPK'? true: false} 
                    />
                    <div className='head-text2' style={{marginRight:'5px', fontSize:'12px'}}>DPK</div>
                </div>
            </div>
            
            <div style={{marginTop:'10px', marginBottom:'10px'}}>Select Pump used for the day</div>
            <div style={{flexDirection:'row', justifyContent:'center'}} className='pump-list'>
                {
                    pumpList.length === 0?
                    <div style={{...box, width:'170px'}}>
                        <div style={{marginRight:'10px'}}>No pump Created</div>
                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                    </div>:
                    productType === "PMS"?
                    pms.map((data, index) => {
                        return(
                            <div key={index} >
                                {selectedPMS === index &&
                                    <div className='box'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={desselect} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {selectedPMS !== index &&
                                    <div className='box2'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={desselect} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    }):
                    productType === "AGO"?
                    ago.map((data, index) => {
                        return(
                            <div key={index}>
                                {selectedAGO === index &&
                                    <div className='box'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={desselect} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {selectedAGO !== index &&
                                    <div className='box2'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={desselect} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    }):
                    dpk.map((data, index) => {
                        return(
                            <div key={index} >
                                {selectedDPK === index &&
                                    <div className='box'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={desselect} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {selectedDPK !== index &&
                                    <div className='box2'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={desselect} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>

            <div className='inner-body'>
                <div className='left'>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span style={{color:'green'}}>Select Station</span>
                            {user.userType === "superAdmin" &&
                                <select onChange={selectedStation} className='text-field'>
                                    <option>Select station</option>
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

                    <div className='single-form'>
                        <div className='input-d'>
                            <span style={{color:'green'}}>Account Name</span>
                            <select onChange={selectLPOAccount} className='text-field'>
                                <option>Select lpo account</option>
                                {
                                    lpos.map((data, index) => {
                                        return(
                                            <option value={JSON.stringify(data)} key={index}>{data.companyName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span style={{color:'green'}}>Product Type</span>
                            <input defaultValue={productType} disabled className='text-field' type={'text'} />
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span style={{color:'green'}}>Truck No</span>
                            <input value={truckNo} onChange={e => setTruckNo(e.target.value)} className='text-field' type={'text'} />
                        </div>
                    </div>

                    <div style={{marginTop:'20px'}} className='single-form'>
                        <div className='input-d'>
                            <span style={{color:'green'}}>Quantity (Litres)</span>
                            <input value={quantity} onChange={e => setQuantity(e.target.value)} className='text-field' type={'text'} />
                        </div>
                    </div>

                    <div style={{marginTop:'30px'}} className='double-form'>
                        <div className='input-d'>
                            <Button 
                                variant="contained" 
                                onClick={openCamera}
                                sx={{
                                    width:'100%',
                                    height:'35px',
                                    background:'#216DB2',
                                    fontSize:'13px',
                                    borderRadius:'5px',
                                    textTransform:'capitalize',
                                    '&:hover': {
                                        backgroundColor: '#216DB2'
                                    }
                                }}
                            >
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                                <div>{typeof(cam) === "string"? "Image taken":<span>Take photo</span>}</div>
                            </Button>
                        </div>

                        <div className='input-d'>
                            <Button 
                                onClick={openGallery}
                                variant="contained" 
                                sx={{
                                    width:'100%',
                                    height:'35px',
                                    background:'#087B36',
                                    fontSize:'13px',
                                    borderRadius:'5px',
                                    textTransform:'capitalize',
                                    '&:hover': {
                                        backgroundColor: '#087B36'
                                    }
                                }}
                            >
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                                <div>{typeof(gall) === "string"? "File uploaded":<span>Upload</span>}</div>
                            </Button>
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
                    <input onChange={pickFromGallery} ref={gallery} style={{visibility:'hidden'}} type={'file'} />
                </div>

                <div className='right'>
                    <div className="table-head">
                        <div className="col">S/N</div>
                        <div className="col">Account</div>
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
                                    <div style={{color:'#000'}} className="col">{data?.accountName}</div>
                                    <div style={{color:'#000'}} className="col">{data?.productType}</div>
                                    <div style={{color:'#000'}} className="col">{data?.lpoLitre}</div>
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
        </div>
    )
}

const rad = {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center'
}

const box = {
    width: '100px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06805B',
    borderRadius: '30px',
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    marginRight: '10px',
    marginTop: '10px',
}

const add = {
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    marginTop:'30px'
}

export default LPOComponent;