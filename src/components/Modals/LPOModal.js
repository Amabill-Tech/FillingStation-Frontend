import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import '../../styles/lpo.scss';
import Radio from '@mui/material/Radio';
import LPOService from '../../services/lpo';
import { Input } from '@mui/icons-material';

const LPOModal = (props) => {
    const [productType, setProductType] = useState('Weekly');
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [personOfContact, setPersonOfContact] = useState('');
    const [PMS, setPMS] = useState('');
    const [AGO, setAGO] = useState('');
    const [DPK, setDPK] = useState('');
    const [PMSRate, setPMSRate] = useState('');
    const [AGORate, setAGORate] = useState('');
    const [DPKRate, setDPKRate] = useState('');
    const [contactPhone, setContactPhone] = useState('');

    const handleClose = () => props.close(false);

    const submit = () => {
        if(companyName === "") return swal("Warning!", "Company name field cannot be empty", "info");
        if(address === "") return swal("Warning!", "Address field cannot be empty", "info");
        if(personOfContact === "") return swal("Warning!", "Contact field cannot be empty", "info");
        if(PMS === "") return swal("Warning!", "PMS field cannot be empty", "info");
        if(AGO === "") return swal("Warning!", "AGO field cannot be empty", "info");
        if(DPK === "") return swal("Warning!", "DPK field cannot be empty", "info");
        if(PMSRate === "") return swal("Warning!", "PMS rate field cannot be empty", "info");
        if(AGORate === "") return swal("Warning!", "AGO rate field cannot be empty", "info");
        if(DPKRate === "") return swal("Warning!", "DPK rate field cannot be empty", "info");
        if(contactPhone === "") return swal("Warning!", "Contact phone field cannot be empty", "info");

        setLoading(true);

        const payload = {
            companyName: companyName,
            address: address,
            personOfContact: personOfContact,
            contactPhone: contactPhone,
            PMS: PMS,
            AGO: AGO,
            DPK: DPK,
            PMSRate: PMSRate,
            AGORate: AGORate,
            DPKRate: DPKRate,
            paymentStructure: productType,
            outletID: props.station._id,
            organizationID: props.station.organisation
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
                <div className='modalContainer2'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'>Register LPO Company</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <div className='inputs'>
                                <div className='head-text2'>Company Name</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    onChange={e => setCompanyName(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Address</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Person of Contact</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    onChange={e => setPersonOfContact(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Contact phone</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    type="text"
                                    onChange={e => setContactPhone(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>PMS Limit (Litres)</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    type="number"
                                    onChange={e => setPMS(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>AGO Limit (Litres)</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    type='number'
                                    onChange={e => setAGO(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>DPK Limit (Litres)</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    type='number'
                                    onChange={e => setDPK(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>PMS Rate (amount)</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    type="number"
                                    onChange={e => setPMSRate(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>AGO Rate(amount)</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    type="number"
                                    onChange={e => setAGORate(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>DPK Rate (amount)</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline:'none',
                                        paddingLeft:'5px',
                                    }} placeholder="" 
                                    type='number'
                                    onChange={e => setDPKRate(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Payment structure</div>
                                <div className='radio'>
                                    <div className='rad-item'>
                                        <Radio onClick={()=>{setProductType('Weekly')}} checked={productType === 'Weekly'? true: false} />
                                        <div className='head-text2' style={{marginRight:'5px'}}>Weekly</div>
                                    </div>
                                    <div className='rad-item'>
                                        <Radio onClick={()=>{setProductType('Monthly')}} checked={productType === 'Monthly'? true: false} />
                                        <div className='head-text2' style={{marginRight:'5px'}}>Monthly</div>
                                    </div>
                                    <div className='rad-item'>
                                        <Radio onClick={()=>{setProductType('Annually')}} checked={productType === 'Annually'? true: false} />
                                        <div className='head-text2' style={{marginRight:'5px'}}>Yearly</div>
                                    </div>
                                </div>
                            </div>
                       </div>

                        <div style={{marginTop:'10px', height:'30px'}} className='butt'>
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
    height:'500px',
    overflowY: 'scroll'
}

export default LPOModal;