import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { 
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
import { useEffect } from 'react';
import OutletService from '../../services/outletService';

const EditTank = (props) => {

    const dispatch = useDispatch();
    const loadingSpinner = useSelector(state => state.authReducer.loadingSpinner);
    const oneStation = useSelector(state => state.outletReducer.adminOutlet);

    const handleClose = () => dispatch(props.close(false));
    const [tankName, setTankName] = useState('');
    const [tankHeight, setTankHeight] = useState('');
    const [productType, setProductType] = useState('PMS');
    const [tankCapacity, setTankCapacity] = useState('');
    const [deadStockLevel, setDeadStockLevel] = useState('');
    const [calibrationDate, setCalibrationDate] = useState('');
    const [currentStock, setCurrentStock] = useState('');

    useEffect(()=>{
        setTankName(props.data.tankName);
        setTankHeight(props.data.tankHeight);
        setTankCapacity(props.data.tankCapacity);
        setCurrentStock(props.data.currentLevel);
        setDeadStockLevel(props.data.deadStockLevel);
        setCalibrationDate(props.data.calibrationDate);
    },[props.data.calibrationDate, props.data.currentLevel, props.data.deadStockLevel, props.data.tankCapacity, props.data.tankHeight, props.data.tankName])

    const handleAddPump = async() => {

        if(tankName === "") return swal("Warning!", "Tank name field cannot be empty", "info");
        if(productType === "") return swal("Warning!", "product type field cannot be empty", "info");
        if(tankCapacity === "") return swal("Warning!", "Tank capacity field cannot be empty", "info");
        if(deadStockLevel === "") return swal("Warning!", "Dead stock level field cannot be empty", "info");
        if(calibrationDate === "") return swal("Warning!", "Calibration date field cannot be empty", "info");
        if(currentStock === "") return swal("Warning!", "Current stock field cannot be empty", "info");
        if(oneStation === null) return swal("Warning!", "Please create a station", "info");
        dispatch(setSpinner());

        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yy = today.getFullYear();
        const day = mm+'/'+dd+'/'+yy;

        const payload = {
            id: props.data._id,
            tankName: tankName,
            tankHeight: tankHeight,
            productType: productType,
            tankCapacity: tankCapacity,
            deadStockLevel: deadStockLevel,
            calibrationDate: calibrationDate,
            organisationID: oneStation?.organisation,
            outletID: oneStation?._id,
            dateUpdated: day,
            station: oneStation?.outletName,
            previousLevel: props.data.currentLevel,
            currentLevel: props.data.currentLevel,
            activeState: props.data.activeState,
        }

        OutletService.updateTank(payload).then((data)=>{
            dispatch(removeSpinner());
            props.refresh();
            swal("Success", data.message, "success");
        }).then(()=>{
            props.outRefresh();
            handleClose();
        });
    }

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
            <div className='modalContainer2'>
                <div className='inner'>
                    <div className='head'>
                        <div className='head-text'>Add Tank</div>
                        <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                    </div>

                    <div style={cont}>
                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Choose product type</div>
                            <div className='radio'>
                                {(props.tabs === 1 || props.tabs === 0) &&
                                    <div className='rad-item'>
                                        <Radio onClick={()=>{setProductType('PMS')}} checked={productType === 'PMS'? true: false} />
                                        <div className='head-text2' style={{marginRight:'5px'}}>PMS</div>
                                    </div>
                                }
                                {(props.tabs === 2 || props.tabs === 0) &&
                                    <div className='rad-item'>
                                        <Radio onClick={()=>{setProductType('AGO')}} checked={productType === 'AGO'? true: false} />
                                        <div className='head-text2' style={{marginRight:'5px'}}>AGO</div>
                                    </div>
                                }
                                {(props.tabs === 3 || props.tabs === 0) &&
                                    <div className='rad-item'>
                                        <Radio onClick={()=>{setProductType('DPK')}} checked={productType === 'DPK'? true: false} />
                                        <div className='head-text2' style={{marginRight:'5px'}}>DPK</div>
                                    </div>
                                }
                            </div>
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
                                value={tankName}
                                onChange={e => setTankName(e.target.value)}
                            />
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Tank Height in cm (optional)</div>
                            <OutlinedInput 
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }} placeholder="" 
                                value={tankHeight}
                                onChange={e => setTankHeight(e.target.value)}
                            />
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
                                value={tankCapacity}
                                onChange={e => setTankCapacity(e.target.value)}
                            />
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Current Stock Level</div>
                            <OutlinedInput 
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }} placeholder="" 
                                value={currentStock}
                                onChange={e => setCurrentStock(e.target.value)}
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
                                value={deadStockLevel}
                                onChange={e => setDeadStockLevel(e.target.value)}
                            />
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Calibration Date</div>
                            <input value={calibrationDate} onChange={e => setCalibrationDate(e.target.value)} style={date} type={'date'} />
                        </div>
                    </div>

                    <div style={{marginTop:'10px', height:'30px'}} className='butt'>
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

const cont = {
    width:'100%',
    height:'500px',
    overflowY:'scroll',
    overflowX:'hidden'
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

export default EditTank;