import login from '../../assets/landing/login.png';
import login2 from '../../assets/landing/login2.png';
import login3 from '../../assets/landing/login3.png';
import login4 from '../../assets/landing/login4.png';
import login5 from '../../assets/landing/login5.png';
import login6 from '../../assets/landing/login6.png';

const HowItWorksSection = () => {
    return(
        <div className="howItWorks">
            <div className='inner'>
                <div className="items">
                    <div className="inner">
                        <img style={{width:'150px', height:'150px'}} src={login} alt="icon" />
                        <span className='head'>1. Register Your Outlet On 360-Station</span>
                        <div className='texts'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed id lectus pharetra in sit. Vestibulum eget porttitor 
                            donec interdum. Risus convallis tortor sed dolor eget 
                            condimentum pulvinar.
                        </div>
                    </div>
                </div>

                <div className="items">
                    <div className="inner">
                        <img style={{width:'150px', height:'150px'}} src={login2} alt="icon" />
                        <span className='head'>2. Create a Fueling Outlets</span>
                        <div className='texts'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed id lectus pharetra in sit. Vestibulum eget porttitor 
                            donec interdum. Risus convallis tortor sed dolor eget 
                            condimentum pulvinar.
                        </div>
                    </div>
                </div>

                <div className="items">
                    <div className="inner">
                        <img style={{width:'150px', height:'150px'}} src={login3} alt="icon" />
                        <span className='head'>3. Add Tanks to the Fueling Outlets</span>
                        <div className='texts'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed id lectus pharetra in sit. Vestibulum eget porttitor 
                            donec interdum. Risus convallis tortor sed dolor eget 
                            condimentum pulvinar.
                        </div>
                    </div>
                </div>

                <div className="items">
                    <div className="inner">
                        <img style={{width:'150px', height:'150px'}} src={login4} alt="icon" />
                        <span className='head'>4. Add Pump to the Tank in Your Outlet</span>
                        <div className='texts'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed id lectus pharetra in sit. Vestibulum eget porttitor 
                            donec interdum. Risus convallis tortor sed dolor eget 
                            condimentum pulvinar.
                        </div>
                    </div>
                </div>

                <div className="items">
                    <div className="inner">
                        <img style={{width:'150px', height:'150px'}} src={login5} alt="icon" />
                        <span className='head'>5. Record Your Daily Sales, Payments and Expenses</span>
                        <div className='texts'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed id lectus pharetra in sit. Vestibulum eget porttitor 
                            donec interdum. Risus convallis tortor sed dolor eget 
                            condimentum pulvinar.
                        </div>
                    </div>
                </div>

                <div className="items">
                    <div className="inner">
                        <img style={{width:'150px', height:'150px'}} src={login6} alt="icon" />
                        <span className='head'>6. Add Tanks to the Fueling Outlets</span>
                        <div className='texts'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Sed id lectus pharetra in sit. Vestibulum eget porttitor 
                            donec interdum. Risus convallis tortor sed dolor eget 
                            condimentum pulvinar.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowItWorksSection;