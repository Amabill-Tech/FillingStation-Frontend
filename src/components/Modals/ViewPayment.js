import React from 'react';
import close from '../../assets/close.png';
import Modal from '@mui/material/Modal';

const ViewPayment = (props) => {

    const handleClose = () => props.close(false);

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
                <div style={{height:'auto'}} className='modalContainer2'>
                    <div style={{height:'auto', margin:'20px'}} className='inner'>
                        <div className='head'>
                            <div className='head-text'>View Register Payment</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <div style={main}>
                                {props.desc}
                            </div>
                        </div>
                    </div>
                </div>
        </Modal>
    )
}

const inner = {
    width:'100%',
    height:'340px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}

const main ={
    width: '100%',
    height: '94%',
    background:'#F0F9F7',
    borderRadius:'5px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}

export default ViewPayment;