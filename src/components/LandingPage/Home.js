import React from 'react';
import Footer from './Footer';
import Navbar from './NavBar';
import '../../styles/landing.scss';
import HeroArea from './HeroArea';

const Homepage = () => {
    return(
        <React.Fragment>
            <div style={background}>
                <Navbar />
                <HeroArea />
                <Footer />
            </div>
        </React.Fragment>
    )
}

const background = {
    width:'100%',
    display:'flex',
    flexDirection:'column',
}

export default Homepage;