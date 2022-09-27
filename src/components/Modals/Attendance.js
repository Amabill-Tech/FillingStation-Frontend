import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import '../../styles/lpo.scss';
import LPOService from '../../services/lpo';

const AttendanceModal = (props) => {
    const [productType, setProductType] = useState('Weekly');
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [personOfContact, setPersonOfContact] = useState('');
    const [PMS, setPMS] = useState('');
    const [AGO, setAGO] = useState('');
    const [DPK, setDPK] = useState('');
    const [total, setTotal] = useState('');

    const handleClose = () => props.close(false);

    const submit = () => {
        if(companyName === "") return swal("Warning!", "Company name field cannot be empty", "info");
        if(address === "") return swal("Warning!", "Address field cannot be empty", "info");
        if(personOfContact === "") return swal("Warning!", "Contact field cannot be empty", "info");
        if(PMS === "") return swal("Warning!", "PMS field cannot be empty", "info");
        if(AGO === "") return swal("Warning!", "AGO field cannot be empty", "info");
        if(DPK === "") return swal("Warning!", "DPK field cannot be empty", "info");
        if(total === "") return swal("Warning!", "Total amount field cannot be empty", "info");

        setLoading(true);

        const payload = {
            companyName: companyName,
            address: address,
            personOfContact: personOfContact,
            PMS: PMS,
            AGO: AGO,
            DPK: DPK,
            totalAmount: total,
            paymentStructure: productType,
            organizationID: user._id
        }

        LPOService.createLPO(payload).then((data) => {
            swal("Success", "LPO created successfully!", "success");
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
                <div style={{height:'auto'}} className='modalContainer'>
                    <div style={{height:'auto', margin:'20px'}} className='inner'>
                        <div className='head'>
                            <div className='head-text'>Add Salary Structure</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <div className='inputs'>
                                <div className='head-text2'>Employee Name</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setCompanyName(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Time in</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='time'
                                    onChange={e => setAddress(e.target.value)}
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
    height:'190px',
}

export default AttendanceModal;