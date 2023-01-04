import tankfill from '../../assets/landing/tankfill.png';

const About = () => {
    return(
        <div className="about">
            <div className="inner">
                <div className="first">
                    <img className='image' src={tankfill} alt="icon" />
                </div>
                <div className="second">
                    <p className='head'>Why <span style={{color:'#399A19'}}>360-Station</span></p>
                    <p className='bod'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Egestas commodo turpis ac maecenas. Faucibus neque arcu 
                        posuere est vitae, dui nullam urna. Mattis volutpat ligula 
                        pharetra erat.Egestas commodo turpis ac maecenas. Faucibus 
                        neque arcu posuere est vitae, dui nullam urna. Mattis volutpat 
                        ligula pharetra erat.Egestas commodo turpis ac maecenas. Faucibus 
                        neque arcu posuere est vitae, dui nullam urna. Mattis volutpat 
                        ligula pharetra erat.ac maecenas. Faucibus neque arcu posuere est 
                        vitae, dui nullam urna. Mattis volutpat ligula pharetra erat.Egestas 
                        commodo turpis ac maecenas. Faucibus neque arcu posuere est vitae, 
                        dui nullam urna. Mattis volutpat ligula pharetra erat.
                    </p>
                    <p className='more'>Read More</p>
                </div>
            </div>
        </div>
    )
}

export default About;