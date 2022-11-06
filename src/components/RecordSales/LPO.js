import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../../styles/pump.scss';
import '../../styles/expenses.scss';
import pump1 from '../../assets/pump1.png';
import plus from '../../assets/plus.png';
import cross from '../../assets/cross.png';
import { Button, MenuItem, Modal, Select } from '@mui/material';
import pluss from '../../assets/pluss.png';
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import OutletService from '../../services/outletService';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPumps, getAllStations, getOneTank } from '../../store/actions/outlet';
import LPOService from '../../services/lpo';
import { createLPO } from '../../store/actions/lpo';
import Camera, { IMAGE_TYPES } from 'react-html5-camera-photo';
import swal from 'sweetalert';
import axios from 'axios';
import config from '../../constants';

const LPO = () => {

    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const [currentStation, setCurrentStation] = useState({});
    const [currentPump, setCurrentPump] = useState({});
    const [defaultState, setDefault] = useState(0);
    const [defaultState2, setDefault2] = useState(0);
    const pumpList = useSelector(state => state.outletReducer.pumpList);
    const lpos = useSelector(state => state.lpoReducer.lpo);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const oneTank = useSelector(state => state.outletReducer.oneTank);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const camera = useRef();
    const gallery = useRef();

    const [accountName, setAccountName] = useState({});
    const [product, setProduct] = useState('');
    const [truckNo, setTruckNo] = useState('');
    const [litre, setLitre] = useState('');
    const [amount, setAmount] = useState('');
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

    const refresh = () => {
        const payload = {
            id: oneTank._id
        }

        OutletService.getOneTank(payload).then((data) => {
            dispatch(getOneTank(data.stations));
        })
    }

    const diselectPump = () => {
        setSelected(null);
        setCurrentPump({});
    }

    const openCamera = () => {
        setOpen(true);
    }

    const openGallery = () => {
        gallery.current.click();
    }

    const handleTakePhoto = (data) => {
        setCam(data);
    }

    const handleCloseCam = () => {
        setOpen(false);
    }

    const CameraModal = (props) => {
        return(
            <Modal
                open={props.open}
                onClose={handleCloseCam}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display:'flex', justifyContent:'center', alignItems:'center'}}
            >
               { open?
                    <Camera
                        onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                        idealResolution = {{width: 200, height: 200}}
                        imageCompression = {0.5}
                        sizeFactor = {0.5}
                        isFullscreen={false}
                        imageType = {IMAGE_TYPES.PNG}
                    />:
                    <div></div>
                }
            </Modal>
        )
    }

    const pickFromGallery = (e) => {
        let file = e.target.files[0];
        setGall(file);
    }

    const submitRecordSales = () => {
        const fresh = Number(litre) < Number(oneTank.deadStockLevel);
        const prev = (Number(oneTank.currentLevel) - Number(litre)) < Number(oneTank.deadStockLevel)
        const detail = oneTank.currentLevel==="None"? fresh : prev;

        if((typeof(cam) === "string")){
            if(accountName === "") return swal("Warning!", "Account Name field cannot be empty", "info");
            if(product === "") return swal("Warning!", "Product Type field cannot be empty", "info");
            if(truckNo === "") return swal("Warning!", "Truck No field cannot be empty", "info");
            if(litre === "") return swal("Warning!", "Litre field cannot be empty", "info");
            if(amount === "") return swal("Warning!", "Amount field cannot be empty", "info");
            if(typeof(cam) !== "string") return swal("Warning!", "Please select a file", "info");
            if(oneTank.activeState === "0") return swal("Warning!", "Tank is currently inactive, contact admin", "info");
            if((detail)) return swal("Warning!", "Tank deadstock level reached!", "info");

            const payload = {
                accountName: accountName.companyName,
                productType: product,
                truckNo: truckNo,
                litre: litre,
                amountRate: amount,
                attachApprovalCam: cam,
                lpoID: accountName._id,
                outletID: currentStation._id,
                organizationID: currentStation.organisation,
            }

            const url = config.BASE_URL + "/360-station/api/lpoSales/create";
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };
            axios.post(url, payload, httpConfig).then((data) => {
                console.log('form data', data);
            }).then(()=>{
                swal("Success!", "LPO recorded successfully", "success"); 
            });

            const updatedTank = {
                id: oneTank._id,
                previousLevel: oneTank.currentLevel,
                totalizer: litre,
                currentLevel: oneTank.currentLevel === "None"? null: String(Number(oneTank.currentLevel) - Number(litre)),
                outletID: currentStation._id,
                organisationID: currentStation.organisation,
            }
           // console.log(updatedTank, 'update tank')

            if(updatedTank.currentLevel !== null){
                OutletService.updateTank(updatedTank).then((data) => {
                    console.log(data, 'lop updated tank')
                    refresh();
                });
            }   

        }else{
            if(accountName === "") return swal("Warning!", "Account Name field cannot be empty", "info");
            if(product === "") return swal("Warning!", "Product Type field cannot be empty", "info");
            if(truckNo === "") return swal("Warning!", "Truck No field cannot be empty", "info");
            if(litre === "") return swal("Warning!", "Litre field cannot be empty", "info");
            if(amount === "") return swal("Warning!", "Amount field cannot be empty", "info");
            if(typeof(gall.name) === "undefined") return swal("Warning!", "Please select a file", "info");
            if(oneTank.activeState === "0") return swal("Warning!", "Tank is currently inactive, contact admin", "info");
            if((detail)) return swal("Warning!", "Tank deadstock level reached!", "info");

            const formData = new FormData();
            formData.append("accountName", accountName.companyName);
            formData.append("productType", product);
            formData.append("truckNo", truckNo);
            formData.append("litre", litre);
            formData.append("amountRate", amount);
            formData.append("attachApprovalGall", gall);
            formData.append("lpoID", accountName._id);
            formData.append("outletID", currentStation._id);
            formData.append("organizationID", currentStation.organisation);
            const httpConfig = {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": "Bearer "+ localStorage.getItem('token'),
                }
            };

            const url = config.BASE_URL + "/360-station/api/lpoSales/create";
            axios.post(url, formData, httpConfig).then((data) => {
                console.log('form data', data);
            }).then(()=>{
                swal("Success!", "LPO recorded successfully", "success");
            });

            const updatedTank = {
                id: oneTank._id,
                previousLevel: oneTank.currentLevel,
                totalizer: litre,
                currentLevel: oneTank.currentLevel === "None"? null: String(Number(oneTank.currentLevel) - Number(litre)),
                outletID: currentStation._id,
                organisationID: currentStation.organisation,
            }

            if(updatedTank.currentLevel !== null){
                OutletService.updateTank(updatedTank).then((data) => {
                    console.log(data, 'lop updated tank')
                    refresh();
                });
            }   
        }
        

        //console.log(payload, 'hello world')
    }

    return(
        <div className='pumpContainer'>
            <CameraModal open={open} />
            <div>Select Pump that gives out lpo for the day</div>

            <div style={{marginTop:'10px'}} className='pump-list'>
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
                    <input onChange={e => setTruckNo(e.target.value)} className='date' type={'text'}  />
                </div>

                <div className='twoInputs'>
                    <div className='inputs2'>
                        <div className='text'>Litre (QTY)</div>
                        <input onChange={e => setLitre(e.target.value)} className='date' type={'text'}  />
                    </div>

                    <div className='inputs2'>
                        <div className='text'>Amount Rate</div>
                        <input onChange={e => setAmount(e.target.value)} className='date' type={'text'}  />
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='inputs'>
                    <div className='text'>Upload Teller slip</div>
                    <div className='button-container'>
                        <Button onClick={openCamera} style={{background:'#216DB2', fontSize:'12px', textTransform:'capitalize'}} className='buttons'>
                            <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                            <div>Take Photo</div>
                        </Button>
                        <Button onClick={openGallery} style={{background:'#087B36', fontSize:'12px', textTransform:'capitalize'}} className='buttons'>
                            <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                            <div>Upload</div>
                        </Button>
                    </div>
                </div>

                <div>
                    <input ref={camera} style={{visibility:'hidden'}} type={'file'} />
                    <input onChange={pickFromGallery} ref={gallery} style={{visibility:'hidden'}} type={'file'} />
                </div>

                <div className='submit'>
                    <Button sx={{
                        width:'120px', 
                        height:'30px',  
                        background: '#427BBE',
                        borderRadius: '3px',
                        fontSize:'11px',
                        marginBottom:'20px',
                        '&:hover': {
                            backgroundColor: '#427BBE'
                        }
                        }}  
                        onClick={submitRecordSales}
                        variant="contained"> Submit
                    </Button>
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