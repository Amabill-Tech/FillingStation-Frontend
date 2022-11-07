import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, getAllStations, searchStations } from '../../store/actions/outlet';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import outletSuccess from '../../assets/outletSuccess.png';
import { ThreeDots } from  'react-loader-spinner';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import '../../styles/mode.scss';
import search from '../../assets/search.png';
import tick from '../../assets/tick.png';
import { OutlinedInput } from '@mui/material';
import OutletService from '../../services/outletService';

const CostPriceModal = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const history = useHistory();
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const open = useSelector(state => state.outletReducer.openModal);
    const loadingSpinner = useSelector(state => state.authReducer.loadingSpinner);
    const newOutlet = useSelector(state => state.outletReducer.newOutlet);
    const [cost, setCost] = useState("");
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const handleClose = () => props.close(false);

    const handleSelection = (e, item) => {

        if(!(e.target.children[0].style.visibility === "visible")){
            e.target.style.border = "1px solid green";
            e.target.children[0].style.visibility = "visible";
            e.target.children[0].style.marginRight = "5px";
            setCollections(prev => [...prev, item]);
        }else{
            e.target.style.border = "1px solid #ccc";
            e.target.children[0].style.visibility = "hidden";
            e.target.children[0].style.marginRight = "0px";
            setCollections(prev => prev.filter(data => !(data._id === item._id)));
        }

        if(props.type === "cost" && props.mode === "pms"){
            setCost(item.PMSCost);
        }else if(props.type === "cost" && props.mode === "ago"){
            setCost(item.AGOCost);
        }else if(props.type === "cost" && props.mode === "dpk"){
            setCost(item.DPKCost);
        }else if(props.type === "selling" && props.mode === "pms"){
            setCost(item.PMSCost);
        }else if(props.type === "selling" && props.mode === "ago"){
            setCost(item.AGOCost);
        }else if(props.type === "selling" && props.mode === "dpk"){
            setCost(item.DPKCost);
        }
    }

    const editCostPrice = () => {
        if(collections.length === 0) return swal("Warning!", "Please select a station", "info");
        if(cost === "") return swal("Warning!", "Cost price field cannot be empty", "info");
        if(cost === "pending") return swal("Warning!", "Please enter a real cost price value", "info");
        setLoading(true);

        const payload = {};

        if(props.type === "cost" && props.mode === "pms"){
            payload['stations'] = collections;
            payload['PMSCost'] = cost;
        }else if(props.type === "cost" && props.mode === "ago"){
            payload['stations'] = collections;
            payload['AGOCost'] = cost;
        }else if(props.type === "cost" && props.mode === "dpk"){
            payload['stations'] = collections;
            payload['DPKCost'] = cost;
        }else if(props.type === "selling" && props.mode === "pms"){
            payload['stations'] = collections;
            payload['PMSPrice'] = cost;
        }else if(props.type === "selling" && props.mode === "ago"){
            payload['stations'] = collections;
            payload['AGOPrice'] = cost;
        }else if(props.type === "selling" && props.mode === "dpk"){
            payload['stations'] = collections;
            payload['DPKPrice'] = cost;
        }

        OutletService.updateStation(payload).then(data => {
            swal("Success", "Records updated successfully!", "success");
        }).then(()=>{
            setLoading(false);
            props.refresh();
        }).then(()=>{
            handleClose();
        })
    }

    const searchStationList = (e) => {
        dispatch(searchStations(e.target.value));
    }

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
            <div style={{height:'430px'}} className='modal'>
                <div className='inner'>
                    <div className='head'>
                        <div className='head-text'>{`Edit ${props.mode.toUpperCase()} ${props.type === "cost"? "Cost": "Selling"} Price`}</div>
                        <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                    </div>

                    <div className='main'>
                        <div className='text'>
                            Select or search for outlet that this should take effect on
                        </div>
                        <div className='iput'>
                            <img style={{width:'22px', height:'22px', marginLeft:'5px'}} src={search} alt="icon" />
                            <input onChange={searchStationList} className='imput' placeholder='Search' type="text" />
                        </div>

                        <div className='bud'>
                            <div className='mainBody'>
                                {
                                    allOutlets.length === 0?
                                    <div style={menu}>No station data</div>:
                                    allOutlets.map((item, index) => {
                                        return(
                                            <div key={index} onClick={e => handleSelection(e, item)} className='inactive'>
                                                <img style={{width:'17px', height:'13px', visibility:'hidden'}} src={tick} alt={tick} />
                                                <div style={{marginRight:'20px'}}>{item.outletName}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className='inputs'>
                            <div className='head-text2'>Cost price</div>
                            <OutlinedInput 
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }} 
                                value={cost==="pending"? 0: cost}
                                placeholder="" 
                                type="number"
                                onChange={e => setCost(e.target.value)}
                            />
                        </div>
                        <Button sx={{
                            width:'100%', 
                            height:'30px',  
                            background: '#054834',
                            borderRadius: '3px',
                            fontSize:'12px',
                            marginTop: '20px',
                            textTransform:'capitalize',
                            '&:hover': {
                                backgroundColor: '#054834'
                            }
                            }}  
                            onClick={editCostPrice}
                            variant="contained"> 
                            {loading?
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#fff" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />: 
                                <div>Save</div>
                            }
                        </Button>
                </div>
                </div>
            </div>
        </Modal>
    )
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default CostPriceModal;