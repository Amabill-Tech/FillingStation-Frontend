import React from 'react';
import '../../styles/expenses.scss';

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

            <div style={{marginTop:'20px'}} className='inputs'>
                <div className='text'>Description</div>
                <textarea style={textAreaStyle} className='date' type={'date'}  />
            </div>

            <div style={{marginTop:'20px'}} className='inputs'>
                <div className='text'>Expenses Amount</div>
                <input className='date' type={'text'}  />
            </div>
        </div>
    )
}

const textAreaStyle = {
    height:'150px',
    paddingTop:'10px',
}

export default Expenses;