import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { 
    closeModal, 
    openModal, 
    createTanks, 
    setSpinner, 
    removeSpinner, 
} from '../../store/actions/outlet';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import Radio from '@mui/material/Radio';
import swal from 'sweetalert';

const AddTank = (props) => {

    const dispatch = useDispatch();
    const open = useSelector(state => state.outletReducer.openModal);
    const loadingSpinner = useSelector(state => state.authReducer.loadingSpinner);
    const newOutlet = useSelector(state => state.outletReducer.newOutlet);

    const handleClose = () => dispatch(closeModal(0));
    const [tankName, setTankName] = useState('');
    const [tankHeight, setTankHeight] = useState('');
    const [productType, setProductType] = useState('PMS');
    const [tankCapacity, setTankCapacity] = useState('');
    const [deadStockLevel, setDeadStockLevel] = useState('');
    const [calibrationDate, setCalibrationDate] = useState('');

    const handleAddPump = async() => {

        if(tankName === "") return swal("Warning!", "Tank name field cannot be empty", "info");
        if(tankHeight === "") return swal("Warning!", "Tank height field cannot be empty", "info");
        if(productType === "") return swal("Warning!", "product type field cannot be empty", "info");
        if(tankCapacity === "") return swal("Warning!", "Tank capacity field cannot be empty", "info");
        if(deadStockLevel === "") return swal("Warning!", "Dead stock level field cannot be empty", "info");
        if(calibrationDate === "") return swal("Warning!", "Calibration date field cannot be empty", "info");
        dispatch(setSpinner());

        const data = {
            tankName: tankName,
            tankHeight: tankHeight,
            productType: productType,
            tankCapacity: tankCapacity,
            deadStockLevel: deadStockLevel,
            calibrationDate: calibrationDate,
            organisationID: props.data.state.organisation,
            outletID: props.data.state._id,
        }

        await dispatch(createTanks(data));
        await dispatch(removeSpinner());
        await props.refresh();
        dispatch(closeModal(0));
    }

    return(
        <Modal
            open={open === 2}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
            <div className='modalContainer'>
                <div className='inner'>
                    <div className='head'>
                        <div className='head-text'>Add Tank</div>
                        <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                    </div>

                    <div className='inputs'>
                        <div className='head-text2'>Tank Name/ Series</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            onChange={e => setTankName(e.target.value)}
                        />
                    </div>

                    <div style={{marginTop:'15px'}} className='inputs'>
                        <div className='head-text2'>Tank Height (cm)</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            onChange={e => setTankHeight(e.target.value)}
                        />
                    </div>

                    <div style={{marginTop:'15px'}} className='inputs'>
                        <div className='head-text2'>Choose product type</div>
                        <div className='radio'>
                            <div className='rad-item'>
                                <Radio onClick={()=>{setProductType('PMS')}} checked={productType === 'PMS'? true: false} />
                                <div className='head-text2' style={{marginRight:'5px'}}>PMS</div>
                            </div>
                            <div className='rad-item'>
                                <Radio onClick={()=>{setProductType('AGO')}} checked={productType === 'AGO'? true: false} />
                                <div className='head-text2' style={{marginRight:'5px'}}>AGO</div>
                            </div>
                            <div className='rad-item'>
                                <Radio onClick={()=>{setProductType('DPK')}} checked={productType === 'DPK'? true: false} />
                                <div className='head-text2' style={{marginRight:'5px'}}>DPK</div>
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop:'15px'}} className='inputs'>
                        <div className='head-text2'>Tank Capacity</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            onChange={e => setTankCapacity(e.target.value)}
                        />
                    </div>

                    <div style={{marginTop:'15px'}} className='inputs'>
                        <div className='head-text2'>Dead Stock Level (Litre)</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            onChange={e => setDeadStockLevel(e.target.value)}
                        />
                    </div>

                    <div style={{marginTop:'15px'}} className='inputs'>
                        <div className='head-text2'>Calibration Date</div>
                        <input  onChange={e => setCalibrationDate(e.target.value)} style={date} type={'date'} />
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
                            onClick={handleAddPump}
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

const date = {
    width:'96%',
    height:'35px',
    background: 'rgba(229, 240, 237, 0.6)',
    border: '0.938659px solid #606060',
    borderRadius: '5px',
    paddingLeft: '2%',
    paddingRight:'2%'
}

export default AddTank;