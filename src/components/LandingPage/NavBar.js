import { Button } from '@mui/material';
import React from 'react';
import stationLogo from '../../assets/landing/stationLogo.jpeg';

const Navbar = () => {
    return(
        <React.Fragment>
            <div className='navigation-menu'>
                <div className='inner-nav'>
                    <img src={stationLogo} style={{width:'110px', height:'40px'}} alt="icon" />
                    <div className='menu-icons'>
                        <span className='items'>Home</span>
                        <span className='items'>How it works</span>
                        <span className='items'>Feature</span>
                        <span className='items'>Pricing</span>
                        <div className='items'>
                            <Button sx={{
                                width:'100%', 
                                height:'40px',  
                                background: '#266910',
                                borderRadius: '3px',
                                fontFamily: 'Nunito',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                fontSize: '10px',
                                color: '#fff',
                                '&:hover': {
                                    backgroundColor: '#266910'
                                }
                                }}  
                                variant="contained"> CONTACT US
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Navbar;