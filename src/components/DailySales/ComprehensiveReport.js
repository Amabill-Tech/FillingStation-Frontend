import { Button } from '@mui/material';
import React from 'react';
import '../../styles/report.scss';

const LeftTableView = () => {
    return(
        <div className='column-head1'>
            <div className='header1'>
                <span style={{marginLeft:'10px'}}>Balance B/Forward</span>
            </div>
            <div className='row-cont'>
                <div className='rows'>
                    <div className='cell'>Product Type</div>
                    <div style={{marginRight:'0px'}} className='cell'>Litre Qty</div>
                </div>

                <div className='rows'>
                    <div style={{color:'#06805B', fontSize:'11px'}} className='cell'>PMS</div>
                    <div style={{marginRight:'0px', fontSize:'11px'}} className='cell'>4,234.00</div>
                </div>

                <div className='rows'>
                    <div style={{color:'#06805B', fontSize:'11px'}} className='cell'>AGO</div>
                    <div style={{marginRight:'0px', fontSize:'11px'}} className='cell'>4,234.00</div>
                </div>

                <div className='rows'>
                    <div style={{color:'#06805B', fontSize:'11px'}} className='cell'>DPK</div>
                    <div style={{marginRight:'0px', fontSize:'11px'}} className='cell'>4,234.00</div>
                </div>
            </div>
        </div>
    )
}

const MiddleTableView = () => {
    return(
        <div className='column-head2'>
            <div className='header2'>
                <span style={{marginLeft:'10px'}}>Supply</span>
            </div>
            <div className='row-cont'>
                <div className='rows'>
                    <div className='cell'>Product Type</div>
                    <div className='cell'>Truck No</div>
                    <div className='cell'>Litre Qty</div>
                    <div className='cell'>Transportation</div>
                    <div style={{marginRight:'0px'}} className='cell'>Shortage</div>
                </div>

                <div className='rows'>
                    <div style={{color:'#06805B', fontSize:'11px'}} className='cell'>PMS</div>
                    <div style={{fontSize:'11px'}} className='cell'>Truck No</div>
                    <div style={{fontSize:'11px'}} className='cell'>Litre Qty</div>
                    <div style={{ fontSize:'11px'}} className='cell'></div>
                    <div style={{marginRight:'0px', fontSize:'11px'}} className='cell'>Shortage</div>
                </div>

                <div className='rows'>
                    <div style={{color:'#06805B', fontSize:'11px'}} className='cell'>AGO</div>
                    <div style={{fontSize:'11px'}} className='cell'>Truck No</div>
                    <div style={{fontSize:'11px'}} className='cell'>Litre Qty</div>
                    <div style={{fontSize:'11px'}} className='cell'></div>
                    <div style={{marginRight:'0px', fontSize:'11px'}} className='cell'>Shortage</div>
                </div>

                <div className='rows'>
                    <div style={{color:'#06805B', fontSize:'11px'}} className='cell'>DPK</div>
                    <div style={{fontSize:'11px'}} className='cell'>Truck No</div>
                    <div style={{fontSize:'11px'}} className='cell'>Litre Qty</div>
                    <div style={{fontSize:'11px'}} className='cell'></div>
                    <div style={{marginRight:'0px', fontSize:'11px'}} className='cell'>Shortage</div>
                </div>
            </div>
        </div>
    )
}

const RightTableView = () => {
    return(
        <div style={{marginRight:'0px', marginLeft:'5px'}} className='column-head1'>
            <div className='header1'>
                <span style={{marginLeft:'10px'}}>Available Balance</span>
            </div>
            <div className='row-cont'>
                <div className='row-cont'>
                    <div className='rows'>
                        <div className='cell'>Product Type</div>
                        <div style={{marginRight:'0px'}} className='cell'>Litre Qty</div>
                    </div>

                    <div className='rows'>
                        <div style={{color:'#06805B', fontSize:'11px'}} className='cell'>PMS</div>
                        <div style={{marginRight:'0px', fontSize:'11px'}} className='cell'>4,234.00</div>
                    </div>

                    <div className='rows'>
                        <div style={{color:'#06805B', fontSize:'11px'}} className='cell'>AGO</div>
                        <div style={{marginRight:'0px', fontSize:'11px'}} className='cell'>4,234.00</div>
                    </div>

                    <div className='rows'>
                        <div style={{color:'#06805B', fontSize:'11px'}} className='cell'>DPK</div>
                        <div style={{marginRight:'0px', fontSize:'11px'}} className='cell'>4,234.00</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ComprehensiveReport = () => {
    return(
        <div className='reportContainer'>
            <div className='controls'>
                <Button 
                    variant="contained" 
                    sx={{
                        width:'120px',
                        height:'30px',
                        background:'#06805B',
                        fontSize:'13px',
                        marginLeft:'10px',
                        borderRadius:'5px',
                        textTransform:'capitalize',
                        '&:hover': {
                            backgroundColor: '#06805B'
                        }
                    }}
                    // onClick={()=>{openDailySales("report")}}
                >
                    Date Range
                </Button>
                <Button 
                    variant="contained" 
                    sx={{
                        width:'80px',
                        height:'30px',
                        background:'#F36A4C',
                        fontSize:'13px',
                        marginLeft:'10px',
                        borderRadius:'5px',
                        textTransform:'capitalize',
                        '&:hover': {
                            backgroundColor: '#F36A4C'
                        }
                    }}
                    // onClick={()=>{openDailySales("report")}}
                >
                    Print
                </Button>
            </div>

            <div className='mains-report'>
                <div className='left'>
                    <div className='inner-main'>
                        <div className='table-cont'>
                            <LeftTableView />
                            <MiddleTableView />
                            <RightTableView />
                        </div>
                    </div>
                </div>
                <div className='right'>world</div>
            </div>
        </div>
    )
}

export default ComprehensiveReport;