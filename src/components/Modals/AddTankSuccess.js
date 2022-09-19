import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../store/actions/outlet';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import outletSuccess from '../../assets/outletSuccess.png';
import { ThreeDots } from  'react-loader-spinner';

const AddTankSuccess = () => {

    const dispatch = useDispatch();
    const open = useSelector(state => state.outletReducer.openModal);
    const loadingSpinner = useSelector(state => state.authReducer.loadingSpinner);

    const handleClose = () => dispatch(closeModal(0));

    const handleAddTanks = () => {
        dispatch(closeModal(0));
        dispatch(openModal(2));
    }

    return(
        <Modal
            open={open === 4}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
            <div style={{height:'430px'}} className='modalContainer'>
                <div className='inner'>
                    <div className='head'>
                        <div className='head-text'></div>
                        <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                    </div>

                    <div className='tank'>
                        <img style={{width:'300px', height:'250px'}} src={outletSuccess} alt="icon" />
                    </div>

                    <div className='tex'>
                        A new outlets has been created proceed to add tanks and pump
                    </div>

                    <div style={{flexDirection:'column'}} className='butt'>
                        <Button sx={{
                            width:'200px', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'10px',
                            marginTop:'0px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  
                            onClick={handleAddTanks}
                            variant="contained"> Add Tanks
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

export default AddTankSuccess;