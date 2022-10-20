import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import close from '../../assets/close.png';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import '../../styles/lpo.scss';
import QueryService from '../../services/query';

const ViewQuery = (props) => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    const [employeeName, setEmployeeName] = useState('');
    const [queryTitle, setQueryTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleClose = () => props.close(false);

    const submit = () => {
        if(employeeName === "") return swal("Warning!", "Employee name field cannot be empty", "info");
        if(queryTitle === "") return swal("Warning!", "Query title field cannot be empty", "info");
        if(description === "") return swal("Warning!", "Description field cannot be empty", "info");

        setLoading(true);

        const payload = {
            employeeName: employeeName,
            queryTitle: queryTitle,
            description: description,
            organisationID: user._id,
        }

        QueryService.createQuery(payload).then((data) => {
            swal("Success", "Query created successfully!", "success");
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

export default ViewQuery;