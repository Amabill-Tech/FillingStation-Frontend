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

const PMSDailySales = (props) => {
    return(
        <div className='main-sales'>
            <div className='inner'>
                <div className='table-heads'>
                    <div className='col'>{props.name}</div>
                    <div className='col'>Opening</div>
                    <div className='col'>Closing</div>
                    <div className='col'>Difference</div>
                    <div className='col'>LPO</div>
                    <div className='col'>Rate</div>
                    <div className='col'>R/T</div>
                    <div style={{marginRight:'0px'}} className='col'>Amount</div>
                </div>

                <div className='table-heads2'>
                    <div className='col'>1</div>
                    <div className='col'>Opening</div>
                    <div className='col'>Closing</div>
                    <div className='col'>Difference</div>
                    <div className='col'>LPO</div>
                    <div className='col'>Rate</div>
                    <div className='col'>R/T</div>
                    <div style={{marginRight:'0px'}} className='col'>Amount</div>
                </div>

                <div className='table-heads2'>
                    <div className='col'>2</div>
                    <div className='col'>Opening</div>
                    <div className='col'>Closing</div>
                    <div className='col'>Difference</div>
                    <div className='col'>LPO</div>
                    <div className='col'>Rate</div>
                    <div className='col'>R/T</div>
                    <div style={{marginRight:'0px'}} className='col'>Amount</div>
                </div>

                <div className='table-heads2'>
                    <div className='col'>3</div>
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
    )
}

const LPODailySales = () => {
    return(
        <div>
            <div style={{width:'100%', textAlign:'left', marginBottom:'10px', color:'#06805B', fontSize:'12px', fontWeight:'900'}}>LPO</div>
            <div className='main-sales'>
                <div className='inner'>
                    <div className='table-heads'>
                        <div className='col'>S/N</div>
                        <div className='col'>Amount Name</div>
                        <div className='col'>Products</div>
                        <div className='col'>Truck No</div>
                        <div className='col'>Litre (Qty)</div>
                        <div className='col'>Rate</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>1</div>
                        <div className='col'>Opening</div>
                        <div className='col'>Closing</div>
                        <div className='col'>Difference</div>
                        <div className='col'>LPO</div>
                        <div className='col'>Rate</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>2</div>
                        <div className='col'>Opening</div>
                        <div className='col'>Closing</div>
                        <div className='col'>Difference</div>
                        <div className='col'>LPO</div>
                        <div className='col'>Rate</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>3</div>
                        <div className='col'>Opening</div>
                        <div className='col'>Closing</div>
                        <div className='col'>Difference</div>
                        <div className='col'>LPO</div>
                        <div className='col'>Rate</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div className='col'>Total</div>
                        <div style={{marginRight:'0px'}} className='col'>435, 000</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExpensesDailySales = () => {
    return(
        <div>
            <div style={{width:'100%', textAlign:'left', marginBottom:'10px', color:'#06805B', fontSize:'12px', fontWeight:'900'}}>Expenses</div>
            <div style={{width:'350px'}} className='main-sales'>
                <div className='inner'>
                    <div className='table-heads'>
                        <div className='col'>S/N</div>
                        <div className='col'>Expense Name</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>1</div>
                        <div className='col'>Rate</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>2</div>
                        <div className='col'>Rate</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>3</div>
                        <div className='col'>Rate</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    <div className='table-heads2'>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div className='col'>Total</div>
                        <div style={{marginRight:'0px'}} className='col'>435, 000</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExpensesSummary = () => {
    return(
        <div>
            <div style={{width:'100%', textAlign:'left', marginBottom:'10px', color:'#06805B', fontSize:'12px', fontWeight:'900'}}></div>
            <div style={{width:'350px'}} className='main-sales'>
                <div className='inner'>
                    <div className='table-heads'>
                        <div style={{width:'70%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>Total Amount of sales (NGN)</span>
                        </div>
                        <div style={{marginRight:'0px', width:'30%', background:'#EDEDED', color:'#000'}} className='col'>Amount</div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{width:'70%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>Total Amount of Expenses (NGN)</span>
                        </div>
                        <div style={{marginRight:'0px', width:'30%', background:'#EDEDED', color:'#000'}} className='col'>Amount</div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{width:'70%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>Total Amount of I.O.N (NGN)</span>
                        </div>
                        <div style={{marginRight:'0px', width:'30%', background:'#EDEDED', color:'#000'}} className='col'>Amount</div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads2'>
                        <div style={{width:'70%', display:'flex', justifyContent:'flex-end'}} className='col'>
                            <span style={{marginRight:'20px'}}>Total</span>
                        </div>
                        <div style={{marginRight:'0px', width:'30%'}} className='col'>Amount</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PaymentDailySales = () => {
    return(
        <div>
            <div style={{width:'100%', textAlign:'left', marginBottom:'10px', color:'#06805B', fontSize:'12px', fontWeight:'900'}}>Payments</div>
            <div style={{width:'350px'}} className='main-sales'>
                <div className='inner'>
                    <div className='table-heads'>
                        <div style={{marginRight:'5px', width:'50%', background:'#EDEDED', color:'#000'}} className='col'>Bank Name</div>
                        <div style={{width:'50%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>Wema Bank</span>
                        </div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{marginRight:'5px', width:'50%', background:'#EDEDED', color:'#000'}} className='col'>Teller No</div>
                        <div style={{width:'50%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>892783876564</span>
                        </div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{marginRight:'5px', width:'50%', background:'#EDEDED', color:'#000'}} className='col'>Teller</div>
                        <div style={{width:'50%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>25,000</span>
                        </div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{marginRight:'5px', width:'50%', background:'#EDEDED', color:'#000'}} className='col'>POS</div>
                        <div style={{width:'50%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>250,000</span>
                        </div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{marginRight:'5px', width:'50%', background:'#EDEDED', color:'#000'}} className='col'>Teller No</div>
                        <div style={{width:'50%', display:'flex', background:'#EDEDED', color:'#000', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>892783876564</span>
                        </div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{marginRight:'5px', width:'50%', background:'#EDEDED', color:'#000'}} className='col'>Teller No</div>
                        <div style={{width:'50%', display:'flex', background:'#EDEDED', color:'#000', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>892783876564</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProductDailySales = () => {
    return(
        <div>
            <div style={{width:'100%', textAlign:'left', marginBottom:'10px', color:'#06805B', fontSize:'12px', fontWeight:'900'}}>
                Product Balance Carried Forward
            </div>
            <div style={{width:'350px'}} className='main-sales'>
                <div className='inner'>
                    <div className='table-heads'>
                        <div className='col'>Product Type</div>
                        <div className='col'>Litre (Qty)</div>
                        <div style={{marginRight:'0px'}} className='col'>Confirmed by</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>PMS</div>
                        <div className='col'>10,000</div>
                        <div style={{marginRight:'0px'}} className='col'></div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>AGO</div>
                        <div className='col'>10,000</div>
                        <div style={{marginRight:'0px'}} className='col'></div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>DPK</div>
                        <div className='col'>10,000</div>
                        <div style={{marginRight:'0px'}} className='col'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const DippingDailySales = () => {
    return(
        <div style={{width:'100%'}}>
            <div style={{width:'100%', textAlign:'left', marginBottom:'10px', color:'#06805B', fontSize:'12px', fontWeight:'900'}}>
                Dipping
            </div>
            <div style={{width:'100%'}} className='main-sales'>
                <div className='inner'>
                    <div className='table-heads'>
                        <div className='col'>Product Type</div>
                        <div className='col'>PMS</div>
                        <div className='col'>AGO</div>
                        <div style={{marginRight:'0px'}} className='col'>DPK</div>
                    </div>
                    
                    <div className='table-heads2'>
                        <div className='col'>Pump 1</div>
                        <div className='col'>10,000</div>
                        <div className='col'>12,000</div>
                        <div style={{marginRight:'0px'}} className='col'>5,000</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>Pump 2</div>
                        <div className='col'>10,000</div>
                        <div className='col'>12,000</div>
                        <div style={{marginRight:'0px'}} className='col'>5,000</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>Pump 3</div>
                        <div className='col'>10,000</div>
                        <div className='col'>12,000</div>
                        <div style={{marginRight:'0px'}} className='col'>5,000</div>
                    </div>

                    <div className='table-heads2'>
                        <div className='col'>Total</div>
                        <div className='col'>10,000</div>
                        <div className='col'>12,000</div>
                        <div style={{marginRight:'0px'}} className='col'>5,000</div>
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

                        <PMSDailySales name={'PMS'} />
                        <PMSDailySales name={'AGO'} />
                        <PMSDailySales name={'DPK'} />
                        <LPODailySales />
                        <ExpensesDailySales />

                        <div className='paym'>
                            <div className='pleft'>
                                <ExpensesSummary />
                            </div>
                            <div className='pleft'>
                                <PaymentDailySales />
                            </div>
                        </div>

                        <div className='paym2'>
                            <div className='pleft'>
                                <ProductDailySales />
                            </div>
                            <div className='pright'>
                                <DippingDailySales />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right'>world</div>
            </div>
        </div>
    )
}

export default ComprehensiveReport;