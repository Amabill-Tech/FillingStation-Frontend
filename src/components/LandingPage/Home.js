import React from 'react';
import Footer from './Footer';
import Navbar from './NavBar';
import '../../styles/landing.scss';
import HeroArea from './HeroArea';
import About from './About';
import Statistics from './Statistics';
import Pitch from './Pitch';
import Features from './Features';

const Homepage = () => {
    return(
        <React.Fragment>
            <div style={background}>
                <Navbar />
                <HeroArea />
                <About />
                <Statistics />
                <Pitch />
                <Features />
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