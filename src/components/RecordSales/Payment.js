import React from 'react';
import '../../styles/expenses.scss';
import pluss from '../../assets/pluss.png';
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Payments = () => {
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
                        }}  variant="contained"> Take Payment
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
                        }}  variant="contained"> POS Payment
                    </Button>
                </div>

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
                                    fontSize:'12px'
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
                            <div className='text'>Bank Name</div>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={10}
                                sx={{
                                    width:'100%',
                                    height:'40px',
                                    marginTop:'10px',
                                    fontSize:'12px'
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
                </div>

                <div style={{width:'100%', height:'50px'}}></div>
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