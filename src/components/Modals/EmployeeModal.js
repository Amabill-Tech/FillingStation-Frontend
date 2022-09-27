import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import avat from '../../assets/avat.png';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import '../../styles/lpo.scss';
import LPOService from '../../services/lpo';

const EmployeeDetails = (props) => {
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
                <div className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'></div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <img src={avat} alt="icon" style={{width:'60px', height:'60px', marginTop:'20px', borderRadius:'60px'}} />
                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Staff Name</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Sex</div>
                                </div>
                                <div style={item}>Email</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Uploaded ID</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Phone Number</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Date Of Birth</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Home Address</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Account Number</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Bank Name</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>State Of Origin</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Date Employed</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Job Title</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>

                            <div style={main}>
                                <div style={item2}>
                                    <div style={title}>Role</div>
                                </div>
                                <div style={item}>Aminu Faruk Umar</div>
                            </div>
                       </div>

                        <div style={{marginTop:'10px'}} className='butt'></div>
                        
                    </div>
                </div>
        </Modal>
    )
}

const inner = {
    width:'100%',
    height:'550px',
    overflowY: 'scroll',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
}

const title = {
    fontSize:'12px',
    fontFamily:'Nunito-Regular',
    padding:'12px',
    background: '#F0F9F7',
    borderRadius: '31px',
}

const item = {
    width:'65%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    fontSize:'12px',
    fontFamily:'Nunito-Regular',
}

const item2 = {
    width:'35%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginLeft:'20px'
}

const main = {
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    marginTop:'20px'
}

export default EmployeeDetails;