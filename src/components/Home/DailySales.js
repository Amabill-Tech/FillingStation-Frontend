import React from 'react';
import '../../styles/dailySales.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import me5 from '../../assets/me5.png';

const DailySales = () => {
    return(
        <div className='daily-sales-container'>
            <div className='daily-left'>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={10}
                    sx={selectStyle2}
                >
                    <MenuItem value={10}>Ammasco Nyanya</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>

                <div className='item-dash-daily'>
                    <div className="dash-item">
                        <div className="inner-dash-item">
                            <div className="dash-image">
                                <img style={{width:'60px', height:'50px'}} src={me5} alt="icon" />
                            </div>
                            <div className="dash-details">
                                <div style={{display:'flex',marginRight:'10px', flexDirection:'column', alignItems:'flex-start'}}>
                                    <div style={{fontFamily:'Nunito-Regular', fontSize:'14px'}}>Total Amount</div>
                                    <div style={{fontFamily:'Nunito-Regular', marginTop:'5px', fontSize:'14px'}}>PMS</div>
                                    <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'10px', fontSize:'16px'}}> N 231,925</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dash-item">
                        <div className="inner-dash-item">
                            <div className="dash-image">
                                <img style={{width:'60px', height:'50px'}} src={me5} alt="icon" />
                            </div>
                            <div className="dash-details">
                                <div style={{display:'flex',marginRight:'10px', flexDirection:'column', alignItems:'flex-start'}}>
                                    <div style={{fontFamily:'Nunito-Regular', fontSize:'14px'}}>Total Amount</div>
                                    <div style={{fontFamily:'Nunito-Regular', marginTop:'5px', fontSize:'14px'}}>AGO</div>
                                    <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'10px', fontSize:'16px'}}> N 231,925</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dash-item">
                        <div className="inner-dash-item">
                            <div className="dash-image">
                                <img style={{width:'60px', height:'50px'}} src={me5} alt="icon" />
                            </div>
                            <div className="dash-details">
                                <div style={{display:'flex',marginRight:'10px', flexDirection:'column', alignItems:'flex-start'}}>
                                    <div style={{fontFamily:'Nunito-Regular', fontSize:'14px'}}>Total Amount</div>
                                    <div style={{fontFamily:'Nunito-Regular', marginTop:'5px', fontSize:'14px'}}>DPK</div>
                                    <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', marginTop:'10px', fontSize:'16px'}}> N 231,925</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tank-text">Tank Stock Levels</div>
                <div className="tank-container">
                    <div className="tank-inner">
                        <div className="tanks">hello</div>
                        <div className="tanks">hello</div>
                        <div className="tanks">hello</div>
                    </div>
                </div>
            </div>
            <div className='daily-right'>second</div>
        </div>
    )
}

const selectStyle2 = {
    width:'250px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
}

export default DailySales;