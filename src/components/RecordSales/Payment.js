import React, { useState } from 'react';
import '../../styles/expenses.scss';
import pluss from '../../assets/pluss.png';
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Payments = () => {

    const [switchTab, setSwitchTab] = useState(false);

    const handleSwitchTab = () => {
        setSwitchTab(false);
    }

    const handleSwitchTab2 = () => {
        setSwitchTab(true);
    }

    return(
        <div style={{background:'#fff'}} className='expensesContainer'>
            <div style={inner}>
                <div className='tabs'>
                    <Button sx={{
                        width:'120px', 
                        height:'30px',  
                        background: '#06805B',
                        borderRadius: '39px',
                        fontSize:'11px',
                        marginRight:'10px',
                        marginTop:'20px',
                        '&:hover': {
                            backgroundColor: '#06805B'
                        }
                        }}
                        onClick={handleSwitchTab}  
                        variant="contained"> Take Payment
                    </Button>
                    <Button sx={{
                        width:'120px', 
                        height:'30px',  
                        fontSize:'11px',
                        background: '#F0F9F7',
                        border: '1px solid #5B5B5B',
                        borderRadius: '39px',
                        color:'#000',
                        marginTop:'20px',
                        '&:hover': {
                            backgroundColor: '#F0F9F7'
                        }
                        }} 
                        onClick={handleSwitchTab2}  
                        variant="contained"> POS Payment
                    </Button>
                </div>

                {!switchTab?
                    <div className='cashPayment'>
                        <div style={{marginTop:'25px'}} className='inputs'>
                            <div className='text'>Date Created</div>
                            <input className='date' type={'text'}  />
                        </div>

                        <div className='twoInputs'>
                            <div className='inputs2'>
                                <div className='text'>Bank Name</div>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={10}
                                    sx={{
                                        width:'100%',
                                        height:'40px',
                                        marginTop:'10px',
                                        fontSize:'12px',                                 
                                        background: 'rgba(229, 240, 237, 0.6)',
                                        border: '0.938659px solid #606060',
                                        borderRadius: '5.63195px',
                                    }}
                                >
                                    <MenuItem value={10}>Wema Bank</MenuItem>
                                    <MenuItem value={20}>GT Bank</MenuItem>
                                    <MenuItem value={30}>Zenith Bank</MenuItem>
                                </Select>
                            </div>

                            <div className='inputs2'>
                                <div className='text'>Teller Number</div>
                                <input className='date' type={'text'}  />
                            </div>
                        </div>

                        <div className='twoInputs'>
                            <div className='inputs2'>
                                <div className='text'>Amount Paid</div>
                                <input className='date' type={'text'}  />
                            </div>

                            <div className='inputs2'>
                                <div className='text'>Payment Date</div>
                                <input className='date' type={'date'}  />
                            </div>
                        </div>

                        <div style={{marginTop:'20px'}} className='inputs'>
                            <div className='text'>Upload Teller slip</div>
                            <div className='button-container'>
                                <div style={{background:'#216DB2'}} className='buttons'>
                                    <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                                    <div>Take Photo</div>
                                </div>
                                <div style={{background:'#087B36'}} className='buttons'>
                                    <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                                    <div>Upload</div>
                                </div>
                            </div>
                        </div>

                        <div className='plus'>
                            <img style={{width:'18px', height:'18px', marginRight:'10px'}} src={pluss} alt="icon" />
                            <div>Add more expenses</div>
                        </div>

                        <div className='submit'>
                            <Button sx={{
                                width:'120px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'11px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }}  variant="contained"> Submit
                            </Button>
                        </div>
                    </div>:
        
                    <div className='cashPayment'>
                    <div style={{marginTop:'25px'}} className='inputs'>
                        <div className='text'>Date Created</div>
                        <input className='date' type={'text'}  />
                    </div>

                    <div className='twoInputs'>
                        <div className='inputs2'>
                            <div className='text'>POS Name</div>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={10}
                                sx={{
                                    width:'100%',
                                    height:'40px',
                                    marginTop:'10px',
                                    fontSize:'12px',                                 
                                    background: 'rgba(229, 240, 237, 0.6)',
                                    border: '0.938659px solid #606060',
                                    borderRadius: '5.63195px',
                                }}
                            >
                                <MenuItem value={10}>Wema Bank</MenuItem>
                                <MenuItem value={20}>GT Bank</MenuItem>
                                <MenuItem value={30}>Zenith Bank</MenuItem>
                            </Select>
                        </div>

                        <div className='inputs2'>
                            <div className='text'>Terminal ID</div>
                            <input className='date' type={'text'}  />
                        </div>
                    </div>

                    <div className='twoInputs'>
                        <div className='inputs2'>
                            <div className='text'>Amount Paid</div>
                            <input className='date' type={'text'}  />
                        </div>

                        <div className='inputs2'>
                            <div className='text'>Payment Date</div>
                            <input className='date' type={'date'}  />
                        </div>
                    </div>

                    <div style={{marginTop:'20px'}} className='inputs'>
                        <div className='text'>Upload Teller slip</div>
                        <div className='button-container'>
                            <div style={{background:'#216DB2'}} className='buttons'>
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                                <div>Take Photo</div>
                            </div>
                            <div style={{background:'#087B36'}} className='buttons'>
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                                <div>Upload</div>
                            </div>
                        </div>
                    </div>

                    <div className='plus'>
                        <img style={{width:'18px', height:'18px', marginRight:'10px'}} src={pluss} alt="icon" />
                        <div>Add more expenses</div>
                    </div>

                    <div className='submit'>
                        <Button sx={{
                            width:'120px', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'11px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  variant="contained"> Submit
                        </Button>
                    </div>
                    </div>
                }

                <div style={{width:'100%', height:'5px'}}></div>
            </div>
        </div>
    )
}

const textAreaStyle = {
    height:'150px',
    paddingTop:'10px',
}

const inner = {
    margin:'20px',
}

export default Payments;