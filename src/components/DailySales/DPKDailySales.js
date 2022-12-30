import { Button } from '@mui/material';
import React from 'react';
import '../../styles/dailySales.scss';
import { useSelector } from 'react-redux';

const DPKDailySales = () => {

    const dailySales = useSelector(state => state.dailySalesReducer.dailySales);

    return(
        <div className='sales'>
            <div className='top'>
                <div className='tex'>Total Amount Of Sales (DPK)</div>
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

                    {
                        dailySales?.DPK?.rows?.length === 0?
                        <div style={dats}> No Data </div>:
                        dailySales?.DPK?.rows.map(data => {
                            return(
                                <div className='table-heads2'>
                                    <div className='col'>{data.pumpName}</div>
                                    <div className='col'>{data.openingMeter}</div>
                                    <div className='col'>{data.closingMeter}</div>
                                    <div className='col'>{Number(data.closingMeter) - Number(data.openingMeter)}</div>
                                    <div className='col'>{data.lpoLitre}</div>
                                    <div className='col'>{data.DPKRate}</div>
                                    <div className='col'>{data.rtLitre}</div>
                                    <div style={{marginRight:'0px'}} className='col'>
                                        {Number(data.sales)*Number(data.DPKSellingPrice) + Number(data.lpoLitre)*Number(data.DPKRate) - Number(data.rtLitre)*Number(data.DPKSellingPrice)}
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        dailySales?.DPK?.rows?.length === 0 ||
                        <div className='table-heads2'>
                            <div style={{background: "transparent"}} className='col'></div>
                            <div style={{background: "transparent"}} className='col'></div>
                            <div className='col'>Total</div>
                            <div className='col'>{dailySales?.DPK?.total?.totalDifference}</div>
                            <div className='col'>{dailySales?.DPK?.total?.totalLpo}</div>
                            <div className='col'></div>
                            <div className='col'>{dailySales?.DPK?.total?.totalrt}</div>
                            <div style={{marginRight:'0px'}} className='col'>{dailySales?.DPK?.total?.amount}</div>
                        </div>
                    }

                </div>
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

export default DPKDailySales;