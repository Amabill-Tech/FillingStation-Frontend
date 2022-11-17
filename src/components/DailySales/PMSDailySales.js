import { Button } from '@mui/material';
import React from 'react';
import '../../styles/dailySales.scss';

const PMSDailySales = () => {
    return(
        <div className='sales'>
            <div className='top'>
                <div className='tex'>Total Amount Of Sales (PMS)</div>
                <div>
                    <Button
                        variant="contained" 
                        sx={{
                            width:'80px',
                            height:'30px',
                            background:'#F36A4C',
                            fontSize:'11px',
                            textTransform:'capitalize',
                            '&:hover': {
                                backgroundColor: '#F36A4C'
                            }
                        }}
                    >
                        print
                    </Button>
                    <Button
                        variant="contained" 
                        sx={{
                            width:'100px',
                            height:'30px',
                            background:'#0A6147',
                            fontSize:'11px',
                            marginLeft:'10px',
                            textTransform:'capitalize',
                            '&:hover': {
                                backgroundColor: '#0A6147'
                            }
                        }}
                    >
                        Select Date
                    </Button>
                </div>
            </div>

            <div className='main-sales'>
                <div className='inner'>
                    <div className='table-heads'>
                        <div className='col'>Pump Name</div>
                        <div className='col'>Opening</div>
                        <div className='col'>Closing</div>
                        <div className='col'>Difference</div>
                        <div className='col'>LPO</div>
                        <div className='col'>Rate</div>
                        <div className='col'>R/T</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>PMS</div>
                        <div className='col'>Opening</div>
                        <div className='col'>Closing</div>
                        <div className='col'>Difference</div>
                        <div className='col'>LPO</div>
                        <div className='col'>Rate</div>
                        <div className='col'>R/T</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>PMS</div>
                        <div className='col'>Opening</div>
                        <div className='col'>Closing</div>
                        <div className='col'>Difference</div>
                        <div className='col'>LPO</div>
                        <div className='col'>Rate</div>
                        <div className='col'>R/T</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>PMS</div>
                        <div className='col'>Opening</div>
                        <div className='col'>Closing</div>
                        <div className='col'>Difference</div>
                        <div className='col'>LPO</div>
                        <div className='col'>Rate</div>
                        <div className='col'>R/T</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div className='col'>Total</div>
                        <div className='col'>Difference</div>
                        <div className='col'>LPO</div>
                        <div className='col'>Rate</div>
                        <div className='col'>R/T</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PMSDailySales;