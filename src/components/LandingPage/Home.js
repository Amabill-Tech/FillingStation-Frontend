import React, { useState } from 'react';
import Footer from './Footer';
import Navbar from './NavBar';
import '../../styles/landing.scss';
import HeroArea from './HeroArea';
import About from './About';
import Statistics from './Statistics';
import Pitch from './Pitch';
import Features from './Features';
import HeroHowItWorks from './HeroHowItWorks';
import HowItWorksSection from './HowItWorks';

const Home = () => {
    return(
        <>
            <HeroArea />
            <About />
            <Statistics />
            <Pitch />
            <Features />
        </>
    )
}

const HowItWorks = () => {
    return(
        <>
            <HeroHowItWorks />
            <HowItWorksSection />
            <Features />
        </>
    )
}

const Homepage = () => {

    const [page, setPage] = useState(0);

    return(
        <React.Fragment>
            <div style={background}>
                <Navbar page={page} setPage={setPage} />
                {page === 0 && <Home />}
                {page === 1 && <HowItWorks />}
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