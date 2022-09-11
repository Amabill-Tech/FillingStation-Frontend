import React from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import tan from '../../assets/tan.png';
import eye from '../../assets/eye.png';
import filling from '../../assets/filling.png';

const Outlets = () => {
    return(
        <div className='paymentsCaontainer'>
            <div className='inner-pay'>
                <div className='action'>
                    <div style={{width:'150px'}} className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={{...selectStyle2, backgroundColor:"#F36A4C", color:'#fff'}}
                        >
                            <MenuItem value={10}>Create new filling station</MenuItem>
                            <MenuItem value={20}>Download PDF</MenuItem>
                            <MenuItem value={30}>Print</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='search'>
                    <div className='input-cont'>
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
                    <div style={{width:'195px'}} className='butt'>
                        <Button sx={{
                            width:'100%', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'10px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  variant="contained"> Create new filling station
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
                        <div className='column'>Licence Code</div>
                        <div className='column'>Name</div>
                        <div className='column'>Outlet Code</div>
                        <div className='column'>No of Tanks</div>
                        <div className='column'>No of Pumps</div>
                        <div className='column'>State</div>
                        <div className='column'>City/Town</div>
                        <div className='column'>Actions</div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>09 June, 2022</div>
                            <div className='column'>Wema bank</div>
                            <div className='column'>1524353625262</div>
                            <div className='column'>150,000</div>
                            <div className='column'>352,000</div>
                            <div className='column'>170,000</div>
                            <div className='column'>230,000</div>
                            <div className='column'>
                                <div className='actions'>
                                    <img style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>09 June, 2022</div>
                            <div className='column'>Wema bank</div>
                            <div className='column'>1524353625262</div>
                            <div className='column'>150,000</div>
                            <div className='column'>352,000</div>
                            <div className='column'>170,000</div>
                            <div className='column'>230,000</div>
                            <div className='column'>
                                <div className='actions'>
                                    <img style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>09 June, 2022</div>
                            <div className='column'>Wema bank</div>
                            <div className='column'>1524353625262</div>
                            <div className='column'>150,000</div>
                            <div className='column'>352,000</div>
                            <div className='column'>170,000</div>
                            <div className='column'>230,000</div>
                            <div className='column'>
                                <div className='actions'>
                                    <img style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>09 June, 2022</div>
                            <div className='column'>Wema bank</div>
                            <div className='column'>1524353625262</div>
                            <div className='column'>150,000</div>
                            <div className='column'>352,000</div>
                            <div className='column'>170,000</div>
                            <div className='column'>230,000</div>
                            <div className='column'>
                                <div className='actions'>
                                    <img style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>09 June, 2022</div>
                            <div className='column'>Wema bank</div>
                            <div className='column'>1524353625262</div>
                            <div className='column'>150,000</div>
                            <div className='column'>352,000</div>
                            <div className='column'>170,000</div>
                            <div className='column'>230,000</div>
                            <div className='column'>
                                <div className='actions'>
                                    <img style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>09 June, 2022</div>
                            <div className='column'>Wema bank</div>
                            <div className='column'>1524353625262</div>
                            <div className='column'>150,000</div>
                            <div className='column'>352,000</div>
                            <div className='column'>170,000</div>
                            <div className='column'>230,000</div>
                            <div className='column'>
                                <div className='actions'>
                                    <img style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>09 June, 2022</div>
                            <div className='column'>Wema bank</div>
                            <div className='column'>1524353625262</div>
                            <div className='column'>150,000</div>
                            <div className='column'>352,000</div>
                            <div className='column'>170,000</div>
                            <div className='column'>230,000</div>
                            <div className='column'>
                                <div className='actions'>
                                    <img style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='row-container'>
                        <div className='table-head2'>
                            <div className='column'>01</div>
                            <div className='column'>09 June, 2022</div>
                            <div className='column'>Wema bank</div>
                            <div className='column'>1524353625262</div>
                            <div className='column'>150,000</div>
                            <div className='column'>352,000</div>
                            <div className='column'>170,000</div>
                            <div className='column'>230,000</div>
                            <div className='column'>
                                <div className='actions'>
                                    <img style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                    <img style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
                                </div>
                            </div>
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

export default Outlets;