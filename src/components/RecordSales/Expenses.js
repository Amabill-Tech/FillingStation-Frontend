import React from 'react';
import '../../styles/expenses.scss';
import pluss from '../../assets/pluss.png';
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import Button from '@mui/material/Button';

const Expenses = () => {
    return(
        <div className='expensesContainer'>
            <div className='inputs'>
                <div className='text'>Date Created</div>
                <input className='date' type={'date'}  />
            </div>

            <div className='twoInputs'>
                <div className='inputs2'>
                    <div className='text'>Expenses Name</div>
                    <input className='date' type={'text'}  />
                </div>

                <div className='inputs2'>
                    <div className='text'>Expenses Date</div>
                    <input className='date' type={'date'}  />
                </div>
            </div>

            <div style={{marginTop:'30px'}} className='inputs'>
                <div className='text'>Description</div>
                <textarea style={textAreaStyle} className='date' type={'date'}  />
            </div>

            <div style={{marginTop:'20px'}} className='inputs'>
                <div className='text'>Expenses Amount</div>
                <input className='date' type={'text'}  />
            </div>

            <div style={{marginTop:'20px'}} className='inputs'>
                <div className='text'>Expenses Invoice</div>
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

            <div style={{width:'100%', height:'50px'}}></div>
        </div>
    )
}

const textAreaStyle = {
    height:'150px',
    paddingTop:'10px',
}

export default Expenses;