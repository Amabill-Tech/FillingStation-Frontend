import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../store/actions/outlet';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import states from '../../modules/states';
import swal from 'sweetalert';
import { createFillingStation } from '../../store/actions/outlet';
import '../../styles/payments.scss';

const CreateFillingStation = (props) => {

    const dispatch = useDispatch();
    const open = useSelector(state => state.outletReducer.openModal);
    const user = useSelector(state => state.authReducer.user);

    const handleClose = () => dispatch(closeModal(0));
    const [defaultState, setDefaultState] = useState(0);
    const [local, setLocal] = useState(0);
    
    const [outletName, setOutletName] = useState('');
    const [state, setState] = useState(states.listOfStates[0].state);
    const [city, setCity] = useState('');
    const [lga, setLga] = useState(states.listOfStates[0].lgas[0]);
    const [area, setArea] = useState('');
    const [license, setLicense] = useState('');
    const [pmsCost, setPMSCost] = useState('');
    const [pmsPrice, setPMSPrice] = useState('');
    const [agoCost, setAGOCost] = useState('');
    const [agoPrice, setAGOPrice] = useState('');
    const [dpkCost, setDPKCost] = useState('');
    const [dpkPrice, setDPKPrice] = useState('');
    const [loadingSpinner, setLoadingSpinner] = useState(false);

    const handleTankModal = async() => {

        if(outletName === "") return swal("Warning!", "Outlet name field cannot be empty", "info");
        if(state === "") return swal("Warning!", "State field cannot be empty", "info");
        if(city === "") return swal("Warning!", "City field cannot be empty", "info");
        if(lga === "") return swal("Warning!", "LGA field cannot be empty", "info");
        if(pmsCost === "") return swal("Warning!", "PMS Cost field cannot be empty", "info");
        if(pmsPrice === "") return swal("Warning!", "PMS Price field cannot be empty", "info");
        if(agoCost === "") return swal("Warning!", "AGO Cost field cannot be empty", "info");
        if(agoPrice === "") return swal("Warning!", "AGO Price field cannot be empty", "info");
        if(dpkCost === "") return swal("Warning!", "DPK Cost field cannot be empty", "info");
        if(dpkPrice === "") return swal("Warning!", "DPK Price field cannot be empty", "info");
        if(area === "") return swal("Warning!", "Area field cannot be empty", "info");
        if(license === "") return swal("Warning!", "License code field cannot be empty", "info");
        setLoadingSpinner(true);

        const data = {
            outletName: outletName,
            state: state,
            city: city,
            lga: lga,
            area: area,
            licenseCode: license,
            noOfTanks: "",
            noOfPumps: "",
            PMSCost: pmsCost,
            PMSPrice: pmsPrice,
            AGOCost: agoCost,
            AGOPrice: agoPrice,
            DPKCost: dpkCost,
            DPKPrice: dpkPrice,
            organisation: user._id
        }

        await dispatch(createFillingStation(data));
        await dispatch(closeModal(0));
        setLoadingSpinner(false);
        await props.getStations();
        dispatch(openModal(4));
    }

    const handleMenuSelection = (item) => {
        setDefaultState(item.target.dataset.value);
        setState(states.listOfStates[item.target.dataset.value].state);
    }

    const handleLgaSelection = (item) => {
        setLocal(item.target.dataset.value);
        setLga(states.listOfStates[defaultState].lgas[item.target.dataset.value]);
    }

    return(
        <Modal
            open={open === 1}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
                <div className='modalContainer2'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'>Create Filling Station</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                        <div style={{width:'100%', height:'480px', overflowX:'hidden', overflowY:'scroll'}}>
                            <div className='inputs'>
                                <div className='head-text2'>Outlet Name</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setOutletName(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>Choose state</div>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={defaultState}
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }}
                                >
                                    {
                                        states.listOfStates.map((item, index) => {
                                            return(
                                                <MenuItem style={menu} key={index} onClick={handleMenuSelection} value={index}>{item.state}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>City/Town</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setCity(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>PMS Cost</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setPMSCost(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>PMS Price</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setPMSPrice(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>AGO Cost</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setAGOCost(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>AGO Price</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setAGOPrice(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>DPK Cost</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setDPKCost(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>DPK Price</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setDPKPrice(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>LGA</div>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={local}
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }}
                                >
                                    {
                                        states.listOfStates[defaultState].lgas.map((item, index) => {
                                            return(
                                                <MenuItem style={menu} key={index} onClick={handleLgaSelection} value={index}>{item}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>Area/Street</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setArea(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>License code</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setLicense(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{height:'30px'}} className='butt'>
                            <Button sx={{
                                width:'100px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'10px',
                                marginTop:'00px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }} 
                                onClick={handleTankModal} 
                                variant="contained"> Save
                            </Button>

                            {loadingSpinner?
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#076146" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />: null
                            }
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

export default CreateFillingStation;