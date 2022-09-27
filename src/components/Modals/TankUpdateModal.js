import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import '../../styles/lpo.scss';
import TankUpdate from '../../services/tankUpdateService';
import '../../styles/lpo.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const TankUpdateModal = (props) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    const [defaultState, setDefaultState] = useState(0);
    const [currentStation, setCurrentStation] = useState({});

    const [tankName, setTankName] = useState('');
    const [currentLevel, setCurrentLevel] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refCode, setRefCode] = useState('');
    const [date, setDate] = useState('');

    const handleClose = () => props.close(false);

    const handleMenuSelection = (e, data) => {
        setDefaultState(e.target.dataset.value);
        setCurrentStation(data);
    }

    const submit = () => {
        if(tankName === "") return swal("Warning!", "Tank Name field cannot be empty", "info");
        if(currentLevel === "") return swal("Warning!", "Current level field cannot be empty", "info");
        if(quantity === "") return swal("Warning!", "Quantity field cannot be empty", "info");
        if(refCode === "") return swal("Warning!", "Ref code field cannot be empty", "info");
        if(date === "") return swal("Warning!", "Date field cannot be empty", "info");

        setLoading(true);

        const payload = {
            tankName: tankName,
            currentLevel: currentLevel,
            quantityAdded: quantity,
            referenceCode: refCode,
            date: date,
            organizationID: user._id,
        }

        TankUpdate.createTankUpdate(payload).then((data) => {
            swal("Success", "Product order created successfully!", "success");
        }).then(()=>{
            setLoading(false);
            props.refresh();
            handleClose();
        })
    }

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
                <div style={{height:'580px'}} className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'>Update Tank</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <div className='inputs'>
                                <div className='head-text2'>Tank Name</div>
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
                                        props.data.map((item, index) => {
                                            return(
                                                <MenuItem style={menu} key={index} onClick={(e) => {handleMenuSelection(e, item)}} value={index}>{item.outletName}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Current Level (Litre)</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setCurrentLevel(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Quantity Added</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Reference Code</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='number'
                                    onChange={e => setRefCode(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Date</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='date'
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>
                       </div>

                        <div style={{marginTop:'10px'}} className='butt'>
                            <Button sx={{
                                width:'100px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'10px',
                                marginTop:'0px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }} 
                                onClick={submit}
                                variant="contained"> Save
                            </Button>

                            {loading?
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

const inner = {
    width:'100%',
    height:'480px',
    overflowY: 'scroll',
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default TankUpdateModal;