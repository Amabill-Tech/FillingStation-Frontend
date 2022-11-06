import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import '../../styles/lpo.scss';
import AtendanceService from '../../services/attendance';
import Webcam from "react-webcam";

const ReactCamera = (props) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    const [defaultState, setDefault] = useState(0);
    const attendanceData = useSelector(state => state.attendanceReducer.attendance);
    const [employeeName, setEmployeeName] = useState('');
    const [clockOut, setClockout] = useState('');

    const handleClose = () => props.close(false);

    return(
        <Modal
            open={props.open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
        >
                <div style={{height:'500px'}} className='modalContainer2'>
                    <div style={{height:'450px', margin:'20px'}} className='inner'>
                        <div className='head'>
                            <div className='head-text'>Capture image from camera</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <div style={cam}>
                                <Webcam 
                                    height={400}
                                    screenshotFormat="image/jpeg"
                                    width={370}
                                >
                                    {({ getScreenshot }) => (
                                        <button
                                            onClick={() => {
                                                const imageSrc = getScreenshot()
                                                props.setDataUri(imageSrc);
                                                handleClose();
                                            }}
                                        >
                                            Capture photo
                                        </button>
                                        )}
                                </Webcam>
                            </div>
                       </div>

                        <div style={{marginTop:'10px'}} className='butt'>

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
    height:'400px',
}

const cam = {
    width:'100%',
    height:'400px',
}

export default ReactCamera;