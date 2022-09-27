import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import upload from '../../assets/upload.png';
import photo from '../../assets/photo.png';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import '../../styles/lpo.scss';
import ProductService from '../../services/productService';
import axios from 'axios';
import '../../styles/lpo.scss';
import Radio from '@mui/material/Radio';

const StaffModal = (props) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    const [productType, setProductType] = useState('Male');

    const [dateCreated, setDateCreated] = useState('');
    const [depot, setDepot] = useState('');
    const [depotAddress, setDepotAddress] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loadingLocation, setLoadingLocation] = useState('');
    const [uploadFile, setUpload] = useState('');
    const [loading2, setLoading2] = useState(0);
    const attach = useRef();

    const handleClose = () => props.close(false);

    const submit = () => {
        if(dateCreated === "") return swal("Warning!", "Date created field cannot be empty", "info");
        if(depot === "") return swal("Warning!", "Depot field cannot be empty", "info");
        if(depotAddress === "") return swal("Warning!", "Depot address field cannot be empty", "info");
        if(quantity === "") return swal("Warning!", "Quantity field cannot be empty", "info");
        if(loadingLocation === "") return swal("Warning!", "Location field cannot be empty", "info");
        if(uploadFile === "") return swal("Warning!", "File upload cannot be empty", "info");

        setLoading(true);

        const payload = {
            dateCreated: dateCreated,
            depot: depot,
            depotAddress: depotAddress,
            quantity: quantity,
            loadingLocation: loadingLocation,
            attachCertificate: uploadFile,
            organizationID: user._id,
        }

        ProductService.createProductOrder(payload).then((data) => {
            swal("Success", "Product order created successfully!", "success");
        }).then(()=>{
            setLoading(false);
            setLoading2(0);
            props.refresh();
            handleClose();
        })
    }

    const uploadProductOrders = () => {
        attach.current.click();
    }

    const selectedFile = (e) => {
        let file = e.target.files[0];
        setLoading2(1);
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": "Bearer "+ localStorage.getItem('token'),
            }
        };
        const url = "http://localhost:3000/360-station/api/upload";
        axios.post(url, formData, config).then((data) => {
            setUpload(data.data.path);
        }).then(()=>{
            setLoading2(2);
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
                <div className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'>Add Staff</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <div className='inputs'>
                                <div className='head-text2'>Staff Name</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setDateCreated(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Staff Image</div>
                                <div style={photos}>
                                    <Button sx={{
                                        width:'49%', 
                                        height:'35px',  
                                        background: '#427BBE',
                                        borderRadius: '3px',
                                        fontSize:'10px',
                                        '&:hover': {
                                            backgroundColor: '#427BBE'
                                        }
                                        }} 
                                        onClick={uploadProductOrders}
                                        variant="contained"> 
                                        <img style={{width:'25px', height:'18px', marginRight:'10px'}} src={photo} alt={'icon'} />
                                        <div>Take Photo</div>
                                    </Button>
                                    <Button sx={{
                                        width:'49%', 
                                        height:'35px',  
                                        background: '#087B36',
                                        borderRadius: '3px',
                                        fontSize:'10px',
                                        '&:hover': {
                                            backgroundColor: '#087B36'
                                        }
                                        }} 
                                        onClick={uploadProductOrders}
                                        variant="contained"> 
                                        <img style={{width:'25px', height:'18px', marginRight:'10px'}} src={upload} alt={'icon'} />
                                        <div>Upload Image</div>
                                    </Button>
                                </div>
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Sex</div>
                                <div className='radio'>
                                    <div className='rad-item'>
                                        <Radio onClick={()=>{setProductType('Male')}} checked={productType === 'Male'? true: false} />
                                        <div className='head-text2' style={{marginRight:'5px'}}>Male</div>
                                    </div>
                                    <div className='rad-item'>
                                        <Radio onClick={()=>{setProductType('Female')}} checked={productType === 'Female'? true: false} />
                                        <div className='head-text2' style={{marginRight:'5px'}}>Female</div>
                                    </div>
                                </div>
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Email</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setDateCreated(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Upload ID</div>
                                <div style={{marginTop:'10px', marginBottom:'10px'}} className='head-text2'>
                                    Upload National ID, Voters Card, International Passport
                                    or Drivers License.
                                </div>
                                <div style={photos}>
                                    <Button sx={{
                                        width:'49%', 
                                        height:'35px',  
                                        background: '#427BBE',
                                        borderRadius: '3px',
                                        fontSize:'10px',
                                        '&:hover': {
                                            backgroundColor: '#427BBE'
                                        }
                                        }} 
                                        onClick={uploadProductOrders}
                                        variant="contained"> 
                                        <img style={{width:'25px', height:'18px', marginRight:'10px'}} src={photo} alt={'icon'} />
                                        <div>Take Photo</div>
                                    </Button>
                                    <Button sx={{
                                        width:'49%', 
                                        height:'35px',  
                                        background: '#087B36',
                                        borderRadius: '3px',
                                        fontSize:'10px',
                                        '&:hover': {
                                            backgroundColor: '#087B36'
                                        }
                                        }} 
                                        onClick={uploadProductOrders}
                                        variant="contained"> 
                                        <img style={{width:'25px', height:'18px', marginRight:'10px'}} src={upload} alt={'icon'} />
                                        <div>Upload Image</div>
                                    </Button>
                                </div>
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Phone Number</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} 
                                    type='number'
                                    placeholder="" 
                                    onChange={e => setDepot(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Home Address</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>State Of Origin</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Account Number</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Bank Name</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Date Employed</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='date'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Date Of Birth</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='date'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Role</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Job Title</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='text'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Password</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='password'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Confirm Password</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    type='password'
                                    onChange={e => setQuantity(e.target.value)}
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
                                variant="contained"> Add Staff
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


const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

const photos = {
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:'10px'
}

export default StaffModal;