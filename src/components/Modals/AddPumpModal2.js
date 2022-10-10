import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import swal from 'sweetalert';
import OutletService from '../../services/outletService';
import { getAllStations } from '../../store/actions/outlet';

const AddPump = (props) => {

    const dispatch = useDispatch();
    const loadingSpinner = useSelector(state => state.authReducer.loadingSpinner);

    const [defaultState, setDefaultState] = useState(0);
    const [productType, setProduct] = useState(props.allTank[0].productType);
    const [pumpName, setPumpName] = useState('');
    const [totalizer, setTotalizer] = useState('');
    const [currentTank, setCurrentTank] = useState(props.allTank[0]);

    const handleClose = () => props.close(false);

    const handleOpen = () => {
        if(pumpName === "") return swal("Warning!", "Pump name field cannot be empty", "info");
        if(defaultState === "") return swal("Warning!", "Tank name field cannot be empty", "info");
        if(productType === "") return swal("Warning!", "Product type field cannot be empty", "info");
        if(totalizer === "") return swal("Warning!", "Totalizer field cannot be empty", "info");

        const payload = {
            pumpName: pumpName,
            hostTank: currentTank._id,
            hostTankName: currentTank.tankName,
            productType: productType,
            totalizerReading: totalizer,
            organisationID: currentTank.organisationID,
            outletID: currentTank.outletID
        }

        OutletService.registerPumps(payload).then(data => {
            if(data.code === 200) swal("Success!", "Pump created successfully", "success");
        }).then(()=>{
            props.close(false);
            props.refresh();
            setTimeout(()=>{
                props.outRefresh();
            }, 2000);
        });
    }

    const selectMenu = (index, item) => {
        setDefaultState(index);
        setProduct(item.productType);
        setCurrentTank(item);
    }

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
            <div style={{height:'430px'}} className='modalContainer'>
                <div className='inner'>
                    <div className='head'>
                        <div className='head-text'>Add Pump</div>
                        <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                    </div>

                    <div className='inputs'>
                        <div className='head-text2'>Pump Name</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            onChange={e => setPumpName(e.target.value)}
                        />
                    </div>

                    <div style={{marginTop:'15px'}} className='inputs'>
                        <div className='head-text2'>Tank Connected to pump</div>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={props.allTank.length === 0? 0: defaultState}
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
                                props.allTank.length === 0?
                                <MenuItem style={menu} value={0}>No tanks available</MenuItem>:
                                props.allTank.map((item, index) => {
                                    return(
                                        <MenuItem onClick={()=>{selectMenu(index, item)}} style={menu} value={index}>{item.tankName}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </div>

                    <div style={{marginTop:'15px'}} className='inputs'>
                        <div className='head-text2'>Choose product type</div>
                        <div className='radio'>
                            <div className='rad-item'>
                                <Radio checked={productType === 'PMS'? true: false} />
                                <div className='head-text2' style={{marginRight:'5px'}}>PMS</div>
                            </div>
                            <div className='rad-item'>
                                <Radio checked={productType === 'AGO'? true: false} />
                                <div className='head-text2' style={{marginRight:'5px'}}>AGO</div>
                            </div>
                            <div className='rad-item'>
                                <Radio checked={productType === 'DPK'? true: false} />
                                <div className='head-text2' style={{marginRight:'5px'}}>DPK</div>
                            </div>
                        </div>
                    </div>

                    <div style={{marginTop:'15px'}} className='inputs'>
                        <div className='head-text2'>Totalizer Reading</div>
                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                fontSize:'12px',
                            }} placeholder="" 
                            onChange={e => setTotalizer(e.target.value)}
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
                            onClick={handleOpen} 
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

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default AddPump;