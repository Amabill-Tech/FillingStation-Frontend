import React, { useState } from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import tan from '../../assets/tan.png';
import eye from '../../assets/eye.png';
import filling from '../../assets/filling.png';
import OutlinedInput from '@mui/material/OutlinedInput';
import TankUpdateModal from '../Modals/TankUpdateModal';

const TankUpdate = () => {

    const [open, setOpen] = useState(false);

    const updateTankModal = () => {
        setOpen(true);
    }

    return(
        <div className='paymentsCaontainer'>
            { <TankUpdateModal open={open} close={setOpen} /> }
            <div className='inner-pay'>
                <div className='action'>
                    <div style={{width:'150px'}} className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={{...selectStyle2, backgroundColor:"#F36A4C", color:'#fff'}}
                        >
                            <MenuItem value={10}>Update Tank</MenuItem>
                            <MenuItem value={20}>Download PDF</MenuItem>
                            <MenuItem value={30}>Print</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='search'>
                    <div className='input-cont'>
                        <div className='second-select'>
                            <OutlinedInput 
                                placeholder="Search" 
                                sx={{
                                    width:'100%',
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }} 
                            />
                        </div>
                        <div className='second-select'>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={10}
                                sx={selectStyle2}
                            >
                                <MenuItem value={10}>07 August, 2022</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div style={{width:'120px'}} className='butt'>
                        <Button sx={{
                            width:'100%', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'10px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}
                            onClick={updateTankModal}
                            variant="contained">Update Tank
                        </Button>
                    </div>
                </div>

                <div className='search2'>
                    <div className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={selectStyle2}
                        >
                            <MenuItem value={10}>Show entries</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </div>
                    <div style={{width:'210px'}} className='input-cont2'>
                        <div className='second-select2'>
                            <Button sx={{
                                width:'100%', 
                                height:'30px',  
                                background: '#58A0DF',
                                borderRadius: '3px',
                                fontSize:'10px',
                                '&:hover': {
                                    backgroundColor: '#58A0DF'
                                }
                                }}  variant="contained"> Download PDF
                            </Button>
                        </div>
                        <div className='second-select3'>
                            <Button sx={{
                                width:'100%', 
                                height:'30px',  
                                background: '#F36A4C',
                                borderRadius: '3px',
                                fontSize:'10px',
                                '&:hover': {
                                    backgroundColor: '#F36A4C'
                                }
                                }}  variant="contained"> Print
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='table-container'>
                    <div className='table-head'>
                        <div className='column'>S/N</div>
                        <div className='column'>Date</div>
                        <div className='column'>Tank Name</div>
                        <div className='column'>Tank Product</div>
                        <div className='column'>Station</div>
                        <div className='column'>Previous Level</div>
                        <div className='column'>Quantity Added</div>
                        <div className='column'>Updated Level</div>
                        <div className='column'>Reference</div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>S/N</div>
                            <div className='column'>Date</div>
                            <div className='column'>PMS Tank 1</div>
                            <div className='column'>PMS</div>
                            <div className='column'>Ammasco Kd</div>
                            <div className='column'>9000</div>
                            <div className='column'>11,000</div>
                            <div className='column'>123,825</div>
                            <div className='column'>1423KJS265</div>
                        </div>

                        <div className='table-head2'>
                            <div className='column'>S/N</div>
                            <div className='column'>Date</div>
                            <div className='column'>PMS Tank 1</div>
                            <div className='column'>PMS</div>
                            <div className='column'>Ammasco Kd</div>
                            <div className='column'>9000</div>
                            <div className='column'>11,000</div>
                            <div className='column'>123,825</div>
                            <div className='column'>1423KJS265</div>
                        </div>

                        <div className='table-head2'>
                            <div className='column'>S/N</div>
                            <div className='column'>Date</div>
                            <div className='column'>PMS Tank 1</div>
                            <div className='column'>PMS</div>
                            <div className='column'>Ammasco Kd</div>
                            <div className='column'>9000</div>
                            <div className='column'>11,000</div>
                            <div className='column'>123,825</div>
                            <div className='column'>1423KJS265</div>
                        </div>

                        <div className='table-head2'>
                            <div className='column'>S/N</div>
                            <div className='column'>Date</div>
                            <div className='column'>PMS Tank 1</div>
                            <div className='column'>PMS</div>
                            <div className='column'>Ammasco Kd</div>
                            <div className='column'>9000</div>
                            <div className='column'>11,000</div>
                            <div className='column'>123,825</div>
                            <div className='column'>1423KJS265</div>
                        </div>

                        <div className='table-head2'>
                            <div className='column'>S/N</div>
                            <div className='column'>Date</div>
                            <div className='column'>PMS Tank 1</div>
                            <div className='column'>PMS</div>
                            <div className='column'>Ammasco Kd</div>
                            <div className='column'>9000</div>
                            <div className='column'>11,000</div>
                            <div className='column'>123,825</div>
                            <div className='column'>1423KJS265</div>
                        </div>

                        <div className='table-head2'>
                            <div className='column'>S/N</div>
                            <div className='column'>Date</div>
                            <div className='column'>PMS Tank 1</div>
                            <div className='column'>PMS</div>
                            <div className='column'>Ammasco Kd</div>
                            <div className='column'>9000</div>
                            <div className='column'>11,000</div>
                            <div className='column'>123,825</div>
                            <div className='column'>1423KJS265</div>
                        </div>

                        <div className='table-head2'>
                            <div className='column'>S/N</div>
                            <div className='column'>Date</div>
                            <div className='column'>PMS Tank 1</div>
                            <div className='column'>PMS</div>
                            <div className='column'>Ammasco Kd</div>
                            <div className='column'>9000</div>
                            <div className='column'>11,000</div>
                            <div className='column'>123,825</div>
                            <div className='column'>1423KJS265</div>
                        </div>

                        <div className='table-head2'>
                            <div className='column'>S/N</div>
                            <div className='column'>Date</div>
                            <div className='column'>PMS Tank 1</div>
                            <div className='column'>PMS</div>
                            <div className='column'>Ammasco Kd</div>
                            <div className='column'>9000</div>
                            <div className='column'>11,000</div>
                            <div className='column'>123,825</div>
                            <div className='column'>1423KJS265</div>
                        </div>
                    </div>
                </div>

                <div className='footer'>
                    <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>Showing 1 to 11 of 38 entries</div>
                    <div className='nav'>
                        <button className='but'>Previous</button>
                        <div className='num'>1</div>
                        <button className='but2'>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const selectStyle2 = {
    width:'100%', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
}

export default TankUpdate;