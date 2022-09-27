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
import axios from 'axios';
import '../../styles/lpo.scss';
import Radio from '@mui/material/Radio';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const StaffModal = (props) => {
    const [loading, setLoading] = useState(false);
    const [close2, setClose2] = useState(false);
    const [close3, setClose3] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    const [loading2, setLoading2] = useState(0);
    const [loading3, setLoading3] = useState(0);
    const attach = useRef();
    const attach2 = useRef();

    const [staffName, setStaffName] = useState('');
    const [staffImage, setStaffImage] = useState('');
    const [productType, setProductType] = useState('Male');
    const [email, setEmail] = useState('');
    const [staffID, setStaffID] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bankName, setBankName] = useState('');
    const [dateEmployed, setDateEmployed] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [role, setRole] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    

    const handleClose = () => {
        setLoading2(0);
        props.close(false)
    };

    const handleClose2 = () => {
        setClose2(false);
    }

    const handleClose3 = () => {
        setClose3(false);
    }

    const uploadIDByCamera = () => {
        setClose3(true);
    }

    function handleTakePhoto (dataUri) {
        setLoading3(1);
        const url = "http://localhost:3000/360-station/api/uploadFromCamera";
        const payload = {
            image: dataUri,
            token: "Bearer "+ localStorage.getItem('token')
        }
        axios.post(url, payload).then((data) => {
            setStaffImage(data.data.path);
        }).then(()=>{
            setLoading3(2);
            setClose2(false);
        });
    }

    function handlePhotoID (dataUri) {
        setLoading3(1);
        const url = "http://localhost:3000/360-station/api/uploadFromCamera";
        const payload = {
            image: dataUri,
            token: "Bearer "+ localStorage.getItem('token')
        }
        axios.post(url, payload).then((data) => {
            setStaffID(data.data.path);
        }).then(()=>{
            setLoading3(2);
            setClose3(false);
        });
    }

    const submit = () => {
        if(staffName === "") return swal("Warning!", "Staff name field cannot be empty", "info");
        if(staffImage === "") return swal("Warning!", "Staff image field cannot be empty", "info");
        if(productType === "") return swal("Warning!", "Sex field cannot be empty", "info");
        if(email === "") return swal("Warning!", "Email field cannot be empty", "info");
        if(staffID === "") return swal("Warning!", "Staff ID field cannot be empty", "info");
        if(phone === "") return swal("Warning!", "Phone field cannot be empty", "info");
        if(address === "") return swal("Warning!", "Address field cannot be empty", "info");
        if(state === "") return swal("Warning!", "State field cannot be empty", "info");
        if(accountNumber === "") return swal("Warning!", "Account No field cannot be empty", "info");
        if(bankName === "") return swal("Warning!", "Bank name field cannot be empty", "info");
        if(dateEmployed === "") return swal("Warning!", "Date employed field cannot be empty", "info");
        if(dateOfBirth === "") return swal("Warning!", "Date of birth field cannot be empty", "info");
        if(role === "") return swal("Warning!", "Role field cannot be empty", "info");
        if(jobTitle === "") return swal("Warning!", "Job title field cannot be empty", "info");
        if(password === "") return swal("Warning!", "Password field cannot be empty", "info");
        if(confirmPassword !== password) return swal("Warning!", "Confirm password field cannot be empty", "info");

        //setLoading(true);
        const payload = {
            staffImage: staffName,
            staffImage: staffImage,
            sex: productType,
            email: email,
            staffID: staffID,
            phone: phone,
            address: address,
            state: state,
            accountNumber: accountNumber,
            bankName: bankName,
            dateEmployed: dateEmployed,
            dateOfBirth: dateOfBirth,
            role: role,
            jobTitle: jobTitle,
            password: password,
            organisationID: user._id,
            outletID: ''
        }

        /*ProductService.createProductOrder(payload).then((data) => {
            swal("Success", "Product order created successfully!", "success");
        }).then(()=>{
            setLoading(false);
            setLoading2(0);
            props.refresh();
            handleClose();
        })*/
    }

    const uploadProductOrders = () => {
        attach.current.click();
    }

    const uploadID = () => {
        attach2.current.click();
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
            setStaffImage(data.data.path);
            console.log('from gallery', data.data.path)
        }).then(()=>{
            setLoading2(2);
        });
    }

    const selectID = (e) => {
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
            setStaffID(data.data.path);
            console.log('from gallery', data.data.path)
        }).then(()=>{
            setLoading2(2);
        });
    }

    const openDeviceCamera = () =>{
        setClose2(true);
    }

    const CameraModal = (props) => {
        return(
            <Modal
                open={props.open}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display:'flex', justifyContent:'center', alignItems:'center'}}
            >
                <Camera
                    onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                    idealResolution = {{width: 200, height: 200}}
                    imageCompression = {0.5}
                    sizeFactor = {0.5}
                />
            </Modal>
        )
    }

    const CameraIDModal = (props) => {
        return(
            <Modal
                open={props.open}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display:'flex', justifyContent:'center', alignItems:'center'}}
            >
                <Camera
                    onTakePhoto = { (dataUri) => { handlePhotoID(dataUri); } }
                    idealResolution = {{width: 200, height: 200}}
                    imageCompression = {0.5}
                    sizeFactor = {0.5}
                />
            </Modal>
        )
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
                        {<CameraModal open={close2} close={setClose2} />}
                        {<CameraIDModal open={close3} close={setClose3}  />}
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
                                    onChange={e => setStaffName(e.target.value)}
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
                                        onClick={openDeviceCamera}
                                        variant="contained"> 
                                        <img style={{width:'25px', height:'18px', marginRight:'10px'}} src={photo} alt={'icon'} />
                                        {loading3 === 0 && <div>Take Photo</div>}
                                        {loading3 === 1 && 
                                            <ThreeDots 
                                                height="50" 
                                                width="40" 
                                                radius="9"
                                                color="#fff" 
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                            />
                                        }
                                        {loading3 === 2 && <div>Success</div>}
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
                                        {loading2 === 0 && <div>Upload Image</div>}
                                        {loading2 === 1 && 
                                            <ThreeDots 
                                                height="50" 
                                                width="40" 
                                                radius="9"
                                                color="#fff" 
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                            />
                                        }
                                        {loading2 === 2 && <div>Success</div>}
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
                                    onChange={e => setEmail(e.target.value)}
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
                                        onClick={uploadIDByCamera}
                                        variant="contained"> 
                                        <img style={{width:'25px', height:'18px', marginRight:'10px'}} src={photo} alt={'icon'} />
                                        {loading3 === 0 && <div>Take Photo</div>}
                                        {loading3 === 1 && 
                                            <ThreeDots 
                                                height="50" 
                                                width="40" 
                                                radius="9"
                                                color="#fff" 
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                            />
                                        }
                                        {loading3 === 2 && <div>Success</div>}
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
                                        onClick={uploadID}
                                        variant="contained"> 
                                        <img style={{width:'25px', height:'18px', marginRight:'10px'}} src={upload} alt={'icon'} />
                                        {loading2 === 0 && <div>Upload Image</div>}
                                        {loading2 === 1 && 
                                            <ThreeDots 
                                                height="50" 
                                                width="40" 
                                                radius="9"
                                                color="#fff" 
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                wrapperClassName=""
                                                visible={true}
                                            />
                                        }
                                        {loading2 === 2 && <div>Success</div>}
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
                                    onChange={e => setPhone(e.target.value)}
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
                                    onChange={e => setAddress(e.target.value)}
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
                                    onChange={e => setState(e.target.value)}
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
                                    onChange={e => setAccountNumber(e.target.value)}
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
                                    onChange={e => setBankName(e.target.value)}
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
                                    onChange={e => setDateEmployed(e.target.value)}
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
                                    onChange={e => setDateOfBirth(e.target.value)}
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
                                    onChange={e => setRole(e.target.value)}
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
                                    onChange={e => setJobTitle(e.target.value)}
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
                                    onChange={e => setPassword(e.target.value)}
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
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <input ref={attach} type={'file'} onChange={selectedFile} style={{visibility:'hidden'}} />
                            <input ref={attach2} type={'file'} onChange={selectID} style={{visibility:'hidden'}} />

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