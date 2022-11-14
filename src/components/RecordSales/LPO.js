import React, { useRef, useState } from 'react';
import '../../styles/pump.scss';
import '../../styles/expenses.scss';
import cross from '../../assets/cross.png';
import { Button, MenuItem, Select } from '@mui/material';
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import OutletService from '../../services/outletService';
import { useDispatch, useSelector } from 'react-redux';
import LPOService from '../../services/lpo';
import swal from 'sweetalert';
import axios from 'axios';
import config from '../../constants';
import ReactCamera from '../Modals/ReactCamera';
import { getOneTank } from '../../store/actions/outlet';
import { ThreeDots } from 'react-loader-spinner';
import hr8 from '../../assets/hr8.png';

const LPO = (props) => {

    const dispatch = useDispatch();
    const oneOutletStation = useSelector(state => state.outletReducer.oneStation);
    const [currentPump, setCurrentPump] = useState({});
    const [defaultState2, setDefault2] = useState(0);
    const pumpList = useSelector(state => state.outletReducer.pumpList);
    const lpos = useSelector(state => state.lpoReducer.lpo);
    const oneTank = useSelector(state => state.outletReducer.oneTank);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const camera = useRef();
    const gallery = useRef();
    const [listOfLpos, setListOfLpos] = useState([]);

    const [accountName, setAccountName] = useState({});
    const [product, setProduct] = useState('');
    const [truckNo, setTruckNo] = useState('');
    const [litre, setLitre] = useState('');
    const [cam, setCam] = useState(null);
    const [gall, setGall] = useState('');

    const changeMenu2 = (index, item ) => {
        setDefault2(index);
        setAccountName(item);
    }

    const selectedPump = (index, item) => {
        setSelected(index);
        setCurrentPump(item);
        setProduct(item.productType);

        const payload = {
            id: item.hostTank
        }

        OutletService.getOneTank(payload).then((data) => {
            dispatch(getOneTank(data.stations));
        })
    }

    const openCamera = () => {
        setOpen(true);
    }

    const openGallery = () => {
        gallery.current.click();
    }

    const pickFromGallery = (e) => {
        let file = e.target.files[0];
        setGall(file);
    }
    
    const submitRecordSales = () => {
        const prev = (Number(oneTank.currentLevel) - Number(litre)) < Number(oneTank.deadStockLevel)
        const detail = oneTank.currentLevel==="None"? true : prev;

        if((typeof(cam) === "string")){
            if(accountName === "") return swal("Warning!", "Account Name field cannot be empty", "info");
            if(product === "") return swal("Warning!", "Product Type field cannot be empty", "info");
            if(truckNo === "") return swal("Warning!", "Truck No field cannot be empty", "info");
            if(litre === "") return swal("Warning!", "Litre field cannot be empty", "info");
            if(typeof(cam) !== "string") return swal("Warning!", "Please select a file", "info");
            if(oneTank.activeState === "0") return swal("Warning!", "Tank is currently inactive, contact admin", "info");
            if((detail)) return swal("Warning!", "Tank deadstock level reached!", "info");

            const payload = {
                accountName: accountName.companyName,
                productType: product,
                truckNo: truckNo,
                litre: litre,
                attachApprovalCam: cam,
                lpoID: accountName._id,
                outletID: oneOutletStation._id,
                organizationID: oneOutletStation.organisation,
            }

            const load = {type: "cam", lpoAccount:accountName, currentPump: currentPump, payload: payload}

            setListOfLpos(prev => [...prev, load]);

            setAccountName({});
            setTruckNo("");
            setLitre("");
            setCam(null);
            setGall("");
        }else{
            if(accountName === "" || accountName === undefined) return swal("Warning!", "Account Name field cannot be empty", "info");
            if(product === "") return swal("Warning!", "Product Type field cannot be empty", "info");
            if(truckNo === "") return swal("Warning!", "Truck No field cannot be empty", "info");
            if(litre === "") return swal("Warning!", "Litre field cannot be empty", "info");
            if(typeof(gall.name) === "undefined") return swal("Warning!", "Please select a file", "info");
            if(oneTank.activeState === "0") return swal("Warning!", "Tank is currently inactive, contact admin", "info");
            if((detail)) return swal("Warning!", "Tank deadstock level reached!", "info");

            const payload = {
                accountName: accountName.companyName,
                productType: product,
                truckNo: truckNo,
                litre: litre,
                attachApprovalCam: gall,
                lpoID: accountName._id,
                outletID: oneOutletStation._id,
                organizationID: oneOutletStation.organisation,
            }

            const load = {type: "gall", lpoAccount:accountName, currentPump: currentPump, payload: payload}

            setListOfLpos(prev => [...prev, load]);
            setAccountName({});
            setTruckNo("");
            setLitre("");
            setCam(null);
            setGall("");
        }
    }

    const createLPORecord = async(url, payload, httpConfig) => {
        let res = await axios.post(url, payload, httpConfig).then((data) => {
            return data;
        });
        return res;
    }

    const effectTankUpdate = async(updatedTank) => {
        let res = await OutletService.updateTank(updatedTank).then((data) => {
            return data;
        });

        return res;
    }

    const updatedLPOHandler = async(updatedLPO) => {
        let res = await LPOService.updateLPO(updatedLPO).then(data => {
            return data
        });

        return res;
    }

    const createLPOGallRecord = async(url, payload, httpConfig) => {
        let res = await axios.post(url, payload, httpConfig).then((data) => {
            return data;
        })
        return res;
    }     
    
    const UpdatedGallTank = async(updatedTank) => {
        let res = await OutletService.updateTank(updatedTank).then((data) => {
            return data;
        });
        return res;
    }

    const UpdateGallLpoHandler = async(updatedLPO) => {
        let res = await LPOService.updateLPO(updatedLPO).then(data => {
            return data
        });
        return res
    }

    const submitAllRecordSales  = async() => { console.log(listOfLpos, 'lpos')

        for(let i = 0, max = listOfLpos.length; i < max; i++){
            if(listOfLpos[i].type === "cam"){
                // console.log(listOfLpos[i], 'cams')

                const url = config.BASE_URL + "/360-station/api/lpoSales/create";
                const httpConfig = {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Authorization": "Bearer "+ localStorage.getItem('token'),
                    }
                };

                let lpoData = await createLPORecord(url, listOfLpos[i].payload, httpConfig);
                console.log(lpoData, 'lpo is done here oo');

                const updatedTank = {
                    id: oneTank._id,
                    previousLevel: oneTank.currentLevel,
                    currentLevel: oneTank.currentLevel === "None"? null: String(Number(oneTank.currentLevel) - Number(listOfLpos[i].payload.litre)),
                    outletID: oneOutletStation._id,
                    organisationID: oneOutletStation.organisation,
                }

                if(updatedTank.currentLevel !== null){
                    let updatedTankData = await effectTankUpdate(updatedTank);
                    console.log(updatedTankData, 'Tank is updated successfully')

                    const updatedLPO = {
                        id: accountName._id,
                        PMS: listOfLpos[i].currentPump.productType === "PMS"? Number(listOfLpos[i].lpoAccount.PMS) - Number(listOfLpos[i].payload.litre): undefined,
                        AGO: listOfLpos[i].currentPump.productType ==="AGO"? Number(listOfLpos[i].lpoAccount.AGO) - Number(listOfLpos[i].payload.litre): undefined,
                        DPK: listOfLpos[i].currentPump.productType ==="DPK"? Number(listOfLpos[i].lpoAccount.DPK) - Number(listOfLpos[i].payload.litre): undefined,
                    }

                    let lpoUpdate = await updatedLPOHandler(updatedLPO);
                    console.log(lpoUpdate, 'updated lpos');
                }
            }else{
                // console.log(listOfLpos[i], 'gall')

                const formData = new FormData();
                formData.append("accountName", listOfLpos[i].lpoAccount.companyName);
                formData.append("productType", listOfLpos[i].payload.productType);
                formData.append("truckNo", listOfLpos[i].payload.truckNo);
                formData.append("litre", listOfLpos[i].payload.litre);
                formData.append("attachApprovalGall", listOfLpos[i].payload.attachApprovalCam);
                formData.append("lpoID", listOfLpos[i].lpoAccount._id);
                formData.append("outletID", oneOutletStation._id);
                formData.append("organizationID", oneOutletStation.organisation);
                
                const httpConfig = {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Authorization": "Bearer "+ localStorage.getItem('token'),
                    }
                };

                const url = config.BASE_URL + "/360-station/api/lpoSales/create";
                let lpoGallData = await createLPOGallRecord(url, listOfLpos[i].payload, httpConfig);
                console.log(lpoGallData, 'lpo Gall is done here oo');

                const updatedTank = {
                    id: oneTank._id,
                    previousLevel: oneTank.currentLevel,
                    currentLevel: oneTank.currentLevel === "None"? null: String(Number(oneTank.currentLevel) - Number(listOfLpos[i].payload.litre)),
                    outletID: oneOutletStation._id,
                    organisationID: oneOutletStation.organisation,
                }

                if(updatedTank.currentLevel !== null){
                    let updatedTankData = await UpdatedGallTank(updatedTank);
                    console.log(updatedTankData, 'Tank from gall is updated successfully');

                    const updatedLPO = {
                        id: accountName._id,
                        PMS: listOfLpos[i].currentPump.productType === "PMS"? Number(listOfLpos[i].lpoAccount.PMS) - Number(listOfLpos[i].payload.litre): undefined,
                        AGO: listOfLpos[i].currentPump.productType ==="AGO"? Number(listOfLpos[i].lpoAccount.AGO) - Number(listOfLpos[i].payload.litre): undefined,
                        DPK: listOfLpos[i].currentPump.productType ==="DPK"? Number(listOfLpos[i].lpoAccount.DPK) - Number(listOfLpos[i].payload.litre): undefined,
                    }

                    let updateGallLpo = await UpdateGallLpoHandler(updatedLPO);
                    console.log(updateGallLpo, 'updated gall lpos');
                }
            }
        }

        props.refresh();

        /*if((typeof(cam) === "string")){
            const url = config.BASE_URL + "/360-station/api/lpoSales/create";
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };
            axios.post(url, payload, httpConfig).then((data) => {
                return data;
            }).then(()=>{
                const updatedTank = {
                    id: oneTank._id,
                    previousLevel: oneTank.currentLevel,
                    currentLevel: oneTank.currentLevel === "None"? null: String(Number(oneTank.currentLevel) - Number(litre)),
                    outletID: oneOutletStation._id,
                    organisationID: oneOutletStation.organisation,
                }

                if(updatedTank.currentLevel !== null){
                    OutletService.updateTank(updatedTank).then((data) => {
                        swal("Success!", "LPO recorded successfully", "success"); 
                        return data;
                    }).then(()=>{
                        const updatedLPO = {
                            id: accountName._id,
                            PMS: currentPump.productType==="PMS"? Number(accountName.PMS) - Number(litre): undefined,
                            AGO: currentPump.productType==="AGO"? Number(accountName.AGO) - Number(litre): undefined,
                            DPK: currentPump.productType==="DPK"? Number(accountName.DPK) - Number(litre): undefined,
                        }

                        LPOService.updateLPO(updatedLPO).then(data => {
                            return data
                        }).then(()=>{
                            props.refresh();
                        })
                
                    })
                }  
            });

        }else{

            const formData = new FormData();
            formData.append("accountName", accountName.companyName);
            formData.append("productType", product);
            formData.append("truckNo", truckNo);
            formData.append("litre", litre);
            formData.append("attachApprovalGall", gall);
            formData.append("lpoID", accountName._id);
            formData.append("outletID", oneOutletStation._id);
            formData.append("organizationID", oneOutletStation.organisation);
            
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };

            const url = config.BASE_URL + "/360-station/api/lpoSales/create";
            axios.post(url, formData, httpConfig).then((data) => {
                return data;
            }).then(()=>{
                const updatedTank = {
                    id: oneTank._id,
                    previousLevel: oneTank.currentLevel,
                    currentLevel: oneTank.currentLevel === "None"? null: String(Number(oneTank.currentLevel) - Number(litre)),
                    outletID: oneOutletStation._id,
                    organisationID: oneOutletStation.organisation,
                }

                if(updatedTank.currentLevel !== null){
                    OutletService.updateTank(updatedTank).then((data) => {
                        swal("Success!", "LPO recorded successfully", "success"); 
                        return data;
                    }).then(()=>{
                        const updatedLPO = {
                            id: accountName._id,
                            PMS: currentPump.productType==="PMS"? Number(accountName.PMS) - Number(litre): undefined,
                            AGO: currentPump.productType==="AGO"? Number(accountName.AGO) - Number(litre): undefined,
                            DPK: currentPump.productType==="DPK"? Number(accountName.DPK) - Number(litre): undefined,
                        }

                        LPOService.updateLPO(updatedLPO).then(data => {
                            return data
                        }).then(()=>{
                            props.refresh();
                        })
                
                    })
                }  
            });
        }*/
        
    }

    const deleteFromList = (index) => {
        const newList = [...listOfLpos];
        newList.pop(index);
        setListOfLpos(newList);
    }

    return(
        <div style={{height:'auto', flexDirection:'column', alignItems:'center'}} className='pumpContainer'>
            <ReactCamera open={open} close={setOpen} setDataUri={setCam} />
            <div>Select Pump that gives out lpo for the day</div>

            <div>
                <div style={{marginTop:'10px', width:'auto'}} className='pump-list'>
                    {
                        pumpList.length === 0?
                        <div style={{...box, width:'170px'}}>
                            <div style={{marginRight:'10px'}}>No pump Created</div>
                            <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                        </div>:
                        pumpList.map((data, index) => {
                            return(
                                <div key={index} onClick={()=>{selectedPump(index, data)}}>
                                    {index === selected?
                                        <div className='box'>
                                            <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                            <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                        </div>:
                                        <div className='box2'>
                                            <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                            <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div style={{height:'auto'}} className='expensesContainer'>
                <div className='lpos'>
                    <div style={{marginTop:'0px'}} className='inputs'>
                        <div className='text'>Account Name</div>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={defaultState2}
                            sx={{...selectStyle2, width:'100%'}}
                        >
                            <MenuItem style={menu} value={0}>Select Account</MenuItem>
                            {
                                lpos.map((item, index) => {
                                    return(
                                        <MenuItem key={index} style={menu} onClick={()=>{changeMenu2(index + 1, item)}} value={index + 1}>{item.companyName}</MenuItem>
                                    )
                                })  
                            }
                        </Select>
                    </div>

                    <div style={{marginTop:'20px'}} className='inputs'>
                        <div className='text'>Product Type</div>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={{
                                width:'100%',
                                height:'40px',
                                marginTop:'10px',
                                fontSize:'12px',                                 
                                background: 'rgba(229, 240, 237, 0.6)',
                                border: '0.938659px solid #606060',
                                borderRadius: '5.63195px',
                            }}
                        >
                            <MenuItem style={menu} value={10}>{currentPump.productType}</MenuItem>
                        </Select>
                    </div>

                    <div style={{marginTop:'20px'}} className='inputs'>
                        <div className='text'>Truck No</div>
                        <input value={truckNo} onChange={e => setTruckNo(e.target.value)} className='date' type={'text'}  />
                    </div>

                    <div style={{width:'100%'}} className='twoInputs'>
                        <div style={{width:'100%'}} className='inputs2'>
                            <div className='text'>Litre (QTY)</div>
                            <input value={litre} onChange={e => setLitre(e.target.value)} className='date' type={'text'}  />
                        </div>
                    </div>

                    <div style={{marginTop:'20px'}} className='inputs'>
                        <div className='text'>Upload Teller slip</div>
                        <div className='button-container'>
                            <Button onClick={openCamera} style={{background:'#216DB2', fontSize:'12px', textTransform:'capitalize'}} className='buttons'>
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                                <div>{typeof(cam) === "string"? "Image taken":<span>Take photo</span>}</div>
                            </Button>
                            <Button onClick={openGallery} style={{background:'#087B36', fontSize:'12px', textTransform:'capitalize'}} className='buttons'>
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                                <div>{typeof(gall) === "string"? "Upload":<span>File uploaded</span>}</div>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <input ref={camera} style={{visibility:'hidden'}} type={'file'} />
                        <input onChange={pickFromGallery} ref={gallery} style={{visibility:'hidden'}} type={'file'} />
                    </div>

                    <div style={{marginTop:'0px'}} className='submit'>
                        <Button sx={{
                            width:'120px', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'11px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  
                            onClick={submitRecordSales}
                            variant="contained"> Add to list
                        </Button>
                    </div>
                </div>

                <div className='right'>
                    <div className='headers'>
                        <div className='headText'>S/N</div>
                        <div className='headText'>Account</div>
                        <div className='headText'>Product</div>
                        <div className='headText'>Quantity</div>
                        <div className='headText'>Action</div>
                    </div>

                    {
                        listOfLpos.length === 0?
                        false? 
                        <div style={{width:'100%', height:'30px', display:'flex', justifyContent:'center'}}>
                            <ThreeDots 
                                height="60" 
                                width="50" 
                                radius="9"
                                color="#076146" 
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{position:'absolute', zIndex:'30'}}
                                wrapperClassName=""
                                visible={false}
                            />
                        </div>:
                        <div style={{fontSize:'14px', fontFamily:'Nunito-Regular', marginTop:'20px', color:'green'}}>No pending supply record</div>:
                        listOfLpos.map((data, index) => {
                            return(
                                <div className='rows'>
                                    <div className='headText'>{index + 1}</div>
                                    <div className='headText'>{data.payload.accountName}</div>
                                    <div className='headText'>{data.payload.productType}</div>
                                    <div className='headText'>{data.payload.litre}</div>
                                    <div className='headText'>
                                        <img onClick={()=>{deleteFromList(index)}} style={{width:'22px', height:'22px'}} src={hr8} alt="icon" />
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div style={{marginBottom:'0px', width:'100%', height:'30px', justifyContent:'space-between'}} className='submit'>
                        <div>
                            <ThreeDots 
                                height="60" 
                                width="50" 
                                radius="9"
                                color="#076146" 
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{position:'absolute', zIndex:'30'}}
                                wrapperClassName=""
                                visible={false}
                            />
                        </div>
                        <Button sx={{
                            width:'120px', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'11px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  
                            onClick={submitAllRecordSales}
                            variant="contained"> Submit
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const selectStyle2 = {
    width:'200px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none',
    marginTop:'10px'
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
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

const box2 = {
    width: '100px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '30px',
    color: '#000',
    fontFamily: 'Nunito-Regular',
    marginRight: '10px',
    marginTop: '10px',
    border: '1px solid #8D8D8D',
}

export default LPO;