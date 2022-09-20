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

const CreateFillingStation = () => {

    const dispatch = useDispatch();
    const open = useSelector(state => state.outletReducer.openModal);
    const loadingSpinner = useSelector(state => state.authReducer.loadingSpinner);

    const handleClose = () => dispatch(closeModal(0));
    const [defaultState, setDefaultState] = useState(0);
    const [local, setLocal] = useState(0);
    
    const [outletName, setOutletName] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [lga, setLga] = useState('');
    const [area, setArea] = useState('');
    const [license, setLicense] = useState('');

    const handleTankModal = () => {
        dispatch(closeModal(0));
    }

    const handleMenuSelection = (item) => {
        setDefaultState(item.target.dataset.value);
    }

    const handleLgaSelection = (item) => {
        setLocal(item.target.dataset.value);
    }

    return(
        <Modal
            open={open === 1}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
                <div className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'>Create Filling Station</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                        <div className='inputs'>
                            <div className='head-text2'>Outline Name</div>
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
                                            <MenuItem onClick={handleMenuSelection} value={index}>{item.state}</MenuItem>
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
                                            <MenuItem onClick={handleLgaSelection} value={index}>{item}</MenuItem>
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

                        <div className='butt'>
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

                            {loadingSpinner &&
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#076146" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            }
                        </div>
                        
                    </div>
                </div>
        </Modal>
    )
}

export default CreateFillingStation;