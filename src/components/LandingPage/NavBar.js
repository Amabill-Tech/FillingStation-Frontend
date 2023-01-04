import { Button } from '@mui/material';
import React from 'react';
import stationLogo from '../../assets/landing/stationLogo.jpeg';

const Navbar = ({page, setPage}) => {

    const navigatePages = (data) => {
        setPage(data);
    }

    return(
        <React.Fragment>
            <div className='navigation-menu'>
                <div className='inner-nav'>
                    <img src={stationLogo} style={{width:'110px', height:'40px'}} alt="icon" />
                    <div className='menu-icons'>
                        <span onClick={()=>{navigatePages(0)}} style={{color: page === 0? 'green': "#000"}} className='items'>Home</span>
                        <span onClick={()=>{navigatePages(1)}} style={{color: page === 1? 'green': "#000"}} className='items'>How it works</span>
                        <span onClick={()=>{navigatePages(2)}} style={{color: page === 2? 'green': "#000"}} className='items'>Feature</span>
                        <span onClick={()=>{navigatePages(3)}} style={{color: page === 3? 'green': "#000"}} className='items'>Pricing</span>
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