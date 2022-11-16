import React, { useState } from 'react';
import close from '../../assets/close.png';
import Modal from '@mui/material/Modal';

const DatePickerModal = (props) => {

    const handleClose = () => props.close(false);

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
                <div data-aos="zoom-out-up" style={{height:'auto'}} className='modalContainer2'>
                    <div style={{height:'auto', margin:'20px'}} className='inner'>
                        <div className='head'>
                            <div className='head-text'>Add Attendance</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                    </div>
                </div>
        </Modal>
    )
}

const inner = {
    width:'100%',
    height:'270px',
    background:'red'
}

export default DatePickerModal;