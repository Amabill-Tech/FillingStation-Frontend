import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import upload from '../../assets/upload.png';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import '../../styles/lpo.scss';
import ProductService from '../../services/productService';
import axios from 'axios';
import { MenuItem, Select } from '@mui/material';

const ProductOrderModal = (props) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.authReducer.user);

    const [dateCreated, setDateCreated] = useState('');
    const [depot, setDepot] = useState('');
    const [depotAddress, setDepotAddress] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loadingLocation, setLoadingLocation] = useState('');
    const [uploadFile, setUpload] = useState('');
    const [loading2, setLoading2] = useState(0);
    const [defaults, setDefaults] = useState(10);
    const [productType, setProductType] = useState("");
    const attach = useRef();

    const handleClose = () => props.close(false);

    const submit = () => {
        if(dateCreated === "") return swal("Warning!", "Date created field cannot be empty", "info");
        if(depot === "") return swal("Warning!", "Depot field cannot be empty", "info");
        if(depotAddress === "") return swal("Warning!", "Depot address field cannot be empty", "info");
        if(quantity === "") return swal("Warning!", "Quantity field cannot be empty", "info");
        if(productType === "") return swal("Warning!", "Product field cannot be empty", "info");
        if(loadingLocation === "") return swal("Warning!", "Location field cannot be empty", "info");
        if(uploadFile === "") return swal("Warning!", "File upload cannot be empty", "info");

        setLoading(true);

        const payload = {
            dateCreated: dateCreated,
            depot: depot,
            depotAddress: depotAddress,
            quantity: quantity,
            productType: productType,
            loadingLocation: loadingLocation,
            attachCertificate: uploadFile,
            outletID: props.station._id,
            organizationID: props.station.organisation
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
        const url = "http://66.29.128.83:8005/360-station/api/upload";
        axios.post(url, formData, config).then((data) => {
            setUpload(data.data.path);
        }).then(()=>{
            setLoading2(2);
        });
    }

    const menuSelection = (e, data) => {
        setDefaults(e);
        setProductType(data);
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
                            <div className='head-text'>Create Order</div>
                            <img onClick={handleClose} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                       <div className='middleDiv' style={inner}>
                            <div className='inputs'>
                                <div className='head-text2'>Date Created</div>
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
                                    onChange={e => setDateCreated(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Company (Product seller)</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setDepot(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Depot Address</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                    onChange={e => setDepotAddress(e.target.value)}
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>Product type</div>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={defaults}
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }}
                                >
                                    <MenuItem onClick={() => {menuSelection(10, "")}} style={menu} value={10}>Select Product</MenuItem>
                                    <MenuItem onClick={() => {menuSelection(20, "PMS")}} style={menu} value={20}>PMS</MenuItem>
                                    <MenuItem onClick={() => {menuSelection(30, "AGO")}} style={menu} value={30}>AGO</MenuItem>
                                    <MenuItem onClick={() => {menuSelection(40, "DPK")}} style={menu} value={40}>DPK</MenuItem>
                                </Select>
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Quantity (litre)</div>
                                <input 
                                    style={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                        outline: 'none',
                                        paddingLeft:'10px',
                                    }} placeholder="" 
                                    type='number'
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Loading location</div>
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
                                    onChange={e => setLoadingLocation(e.target.value)}
                                />
                            </div>

                            <Button sx={{
                                width:'100%', 
                                height:'35px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'10px',
                                marginTop:'20px',
                                marginBottom:'20px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }} 
                                onClick={uploadProductOrders}
                                variant="contained"> 
                                <img style={{width:'25px', height:'20px', marginRight:'10px'}} src={upload} alt={'icon'} />
                                { loading2 === 0 && <div>Attachment</div>}
                                { loading2 === 1 &&
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
                                { loading2 === 2 && <div style={{color:'#fff', fontSize:'12px'}}>Success</div>}
                            </Button>

                            <input onChange={selectedFile} ref={attach} type="file" style={{visibility:'hidden'}} />
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

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default ProductOrderModal;