import { Button } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/report.scss';
import ComprehensiveReports from '../Reports/ConprehensiveReports';

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
                    <div className='col'>{props?.name}</div>
                    <div className='col'>Opening</div>
                    <div className='col'>Closing</div>
                    <div className='col'>Difference</div>
                    <div className='col'>LPO</div>
                    <div className='col'>Rate</div>
                    <div className='col'>R/T</div>
                    <div style={{marginRight:'0px'}} className='col'>Amount</div>
                </div>

                {
                    props?.data?.rows?.length === 0?
                    <div style={dats}> No Data </div>:
                    props?.data?.rows?.map(data => {
                        return(
                            <div className='table-heads2'>
                                <div className='col'>{data.pumpName}</div>
                                <div className='col'>{data.openingMeter}</div>
                                <div className='col'>{data.closingMeter}</div>
                                <div className='col'>{Number(data.closingMeter) - Number(data.openingMeter)}</div>
                                <div className='col'>{data.lpoLitre}</div>
                                <div className='col'>
                                    {data.productType === "PMS" && data.PMSRate}
                                    {data.productType === "AGO" && data.AGORate}
                                    {data.productType === "DPK" && data.DPKRate}
                                </div>
                                <div className='col'>{data.rtLitre}</div>
                                <div style={{marginRight:'0px'}} className='col'>
                                    {data.productType === "PMS" && Number(data.sales)*Number(data.PMSSellingPrice) + Number(data.lpoLitre)*Number(data.PMSRate) - Number(data.rtLitre)*Number(data.PMSSellingPrice)}
                                    {data.productType === "AGO" && Number(data.sales)*Number(data.AGOSellingPrice) + Number(data.lpoLitre)*Number(data.AGORate) - Number(data.rtLitre)*Number(data.AGOSellingPrice)}
                                    {data.productType === "DPK" && Number(data.sales)*Number(data.DPKSellingPrice) + Number(data.lpoLitre)*Number(data.DPKRate) - Number(data.rtLitre)*Number(data.DPKSellingPrice)}
                                </div>
                            </div>
                        )
                    })
                }

                {
                    props?.data?.rows?.length === 0 ||
                    <div className='table-heads2'>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div className='col'>Total</div>
                        <div className='col'>{props?.data?.total?.totalDifference}</div>
                        <div className='col'>{props?.data?.total?.totalLpo}</div>
                        <div className='col'></div>
                        <div className='col'>{props?.data?.total?.totalrt}</div>
                        <div style={{marginRight:'0px'}} className='col'>{props?.data?.total?.amount}</div>
                    </div>
                }
            </div>
        </div>
    )
}

const LPODailySales = (props) => {

    const getTotal = () => {
        let total = 0;
        for(let lpo of props?.data){
            if(lpo.productType === "PMS"){
                total = total + Number(lpo.PMSRate)*Number(lpo.lpoLitre)
            }else if(lpo.productType === "AGO"){
                total = total + Number(lpo.AGORate)*Number(lpo.lpoLitre)
            }else if(lpo.productType === "DPK"){
                total = total + Number(lpo.DPKRate)*Number(lpo.lpoLitre)
            }
        }
        return total;
    }

    return(
        <div>
            <div style={{width:'100%', textAlign:'left', marginBottom:'10px', color:'#06805B', fontSize:'12px', fontWeight:'900'}}>LPO</div>
            <div className='main-sales'>
                <div className='inner'>
                    <div className='table-heads'>
                        <div className='col'>S/N</div>
                        <div className='col'>Account Name</div>
                        <div className='col'>Products</div>
                        <div className='col'>Truck No</div>
                        <div className='col'>Litre (Qty)</div>
                        <div className='col'>Rate</div>
                        <div style={{marginRight:'0px'}} className='col'>Amount</div>
                    </div>

                    {
                        props?.data?.length === 0?
                        <div style={dats}> No Data </div>:
                        props?.data?.map((data, index) => {
                            return(
                                <div key={index} className='table-heads2'>
                                    <div className='col'>{index + 1}</div>
                                    <div className='col'>{data.accountName}</div>
                                    <div className='col'>{data.productType}</div>
                                    <div className='col'>{data.truckNo}</div>
                                    <div className='col'>{data.lpoLitre}</div>
                                    <div className='col'>{
                                        data.productType === "PMS"? data.PMSRate: data.productType === "AGO"? data.AGORate: data.DPKRate
                                    }</div>
                                    <div style={{marginRight:'0px'}} className='col'>{
                                        data.productType === "PMS"? Number(data.PMSRate)*Number(data.lpoLitre): data.productType === "AGO"? Number(data.AGORate)*Number(data.lpoLitre): Number(data.DPKRate)*Number(data.lpoLitre)
                                    }</div>
                                </div>
                            )
                        })
                    }

                    <div className='table-heads2'>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div className='col'>Total</div>
                        <div style={{marginRight:'0px'}} className='col'>
                            {
                                getTotal()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExpensesDailySales = (props) => {

    const totalExpenses = () => {
        let total = 0;
        for(let exp of props?.data){
            total = total + Number(exp.expenseAmount);
        }
        return total;
    }

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

                    {
                        props?.data?.length === 0?
                        <div style={dats}> No Data </div>:
                        props?.data?.map((data, index) => {
                            return(
                                <div key={index} className='table-heads2'>
                                    <div className='col'>{index+1}</div>
                                    <div className='col'>{data.expenseName}</div>
                                    <div style={{marginRight:'0px'}} className='col'>{data.expenseAmount}</div>
                                </div>
                            )
                        })
                    }

                    <div className='table-heads2'>
                        <div style={{background: "transparent"}} className='col'></div>
                        <div className='col'>Total</div>
                        <div style={{marginRight:'0px'}} className='col'>{totalExpenses}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ExpensesSummary = ({expenses, sales}) => {

    const totalExpenses = () => {
        let total = 0;
        for(let exp of expenses){
            total = total + Number(exp.expenseAmount);
        }
        return total;
    }

    const getTotalSales = () => {
        return sales?.AGO?.total?.amount + sales?.PMS?.total?.amount + sales?.DPK?.total?.amount;
    }

    return(
        <div>
            <div style={{width:'100%', textAlign:'left', marginBottom:'10px', color:'#06805B', fontSize:'12px', fontWeight:'900'}}></div>
            <div style={{width:'350px'}} className='main-sales'>
                <div className='inner'>
                    <div className='table-heads'>
                        <div style={{width:'70%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>Total Amount of sales (NGN)</span>
                        </div>
                        <div style={{marginRight:'0px', width:'30%', background:'#EDEDED', color:'#000'}} className='col'>{getTotalSales()}</div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{width:'70%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>Total Amount of Expenses (NGN)</span>
                        </div>
                        <div style={{marginRight:'0px', width:'30%', background:'#EDEDED', color:'#000'}} className='col'>{totalExpenses()}</div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads2'>
                        <div style={{width:'70%', display:'flex', justifyContent:'flex-end'}} className='col'>
                            <span style={{marginRight:'20px'}}>Total</span>
                        </div>
                        <div style={{marginRight:'0px', width:'30%'}} className='col'>{getTotalSales() - totalExpenses()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PaymentDailySales = (props) => {

    const bankPayments = () => {
        let total = 0;
        if(props?.data?.bankPayment?.length === 0){
            return 0;
        }else{
            for(let pay of props?.data?.bankPayment){
                total = total + Number(pay.amountPaid);
            }
        }
        return total;
    }

    const posPayments = () => {
        let total = 0;
        if(props?.data?.posPayment?.length === 0){
            return 0;
        }else{
            for(let pay of props?.data?.posPayment){
                total = total + Number(pay.amountPaid);
            }
        }
        return total;
    }

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
                            <span style={{marginLeft:'10px'}}>{bankPayments()}</span>
                        </div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{marginRight:'5px', width:'50%', background:'#EDEDED', color:'#000'}} className='col'>POS</div>
                        <div style={{width:'50%', display:'flex', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>{posPayments()}</span>
                        </div>
                    </div>

                    <div style={{marginTop:'5px'}} className='table-heads'>
                        <div style={{marginRight:'5px', width:'50%', background:'#EDEDED', color:'#000'}} className='col'>Total</div>
                        <div style={{width:'50%', display:'flex', background:'#EDEDED', color:'#000', justifyContent:'flex-start'}} className='col'>
                            <span style={{marginLeft:'10px'}}>{bankPayments() + posPayments()}</span>
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

const ComprehensiveReport = (props) => {

    useEffect(()=>{
        props.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dailySales = useSelector(state => state.dailySalesReducer.dailySales);
    const lpoRecords = useSelector(state => state.dailySalesReducer.lpoRecords);
    const paymentRecords = useSelector(state => state.dailySalesReducer.paymentRecords);
    const [prints, setPrints] = useState(false);

    const printReport = () => {
        setPrints(true);
    }

    return(
        <div className='reportContainer'>
            { prints && <ComprehensiveReports data={dailySales} open={prints} close={setPrints}/>}
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
                    onClick={printReport}
                >
                    Print
                </Button>
            </div>

            <div className='mains-report'>
                <div className='left'>
                    <div className='inner-main'>
                        <div style={{marginBottom:'30px'}} className='table-cont'>
                            <LeftTableView />
                            <MiddleTableView />
                            <RightTableView />
                        </div>

                        <PMSDailySales name={'PMS'} data={dailySales.PMS} />
                        <PMSDailySales name={'AGO'} data={dailySales.AGO} />
                        <PMSDailySales name={'DPK'} data={dailySales.DPK} />
                        <LPODailySales data={lpoRecords} />
                        <ExpensesDailySales data = {paymentRecords.expenses} />

                        <div className='paym'>
                            <div className='pleft'>
                                <ExpensesSummary expenses={paymentRecords.expenses} sales={dailySales} />
                            </div>
                            <div className='pleft'>
                                <PaymentDailySales data={paymentRecords} />
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

const dats = {
    marginTop:'20px',
    fontSize:'14px',
    fontWeight:'bold',
    fontFamily:'Nunito-Regular'
}

export default ComprehensiveReport;