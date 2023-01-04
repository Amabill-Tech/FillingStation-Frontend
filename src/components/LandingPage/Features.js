import pc from '../../assets/landing/pc.png';
import tick from '../../assets/landing/tick.png';

const Features = () => {
    return(
        <div className="features">
            <div className="inns">
                <div className="left">
                    <span className='hdd'>Monitoring System...</span>
                    <div className='entry'>
                        <div className='top'>
                            <img style={{width:'25px', height:'25px', marginRight:'10px'}} src={tick} alt="icon"/>
                            <span className='nxt'>Realtime Update</span>
                        </div>

                        <span className='bdd'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus 
                            mi vulputate pharetra, sit. Sagittis nulla at diam sagittis enim 
                            nunc a lacinia scelerisque. Leo semper nunc pellentesque nascetur 
                            amet adipiscing elit. Cursus mi vulputate pharetra, sit. Sagittis 
                            nulla at diam sagittis enim nunc  a lacinia scelerisque. Leo semper 
                            nunc pellentesque nascetur amet adipiscing elit. Cursus mi vulputate 
                            pharetra, sit. Sagittis nulla at diam sagittis enim nunc
                        </span>
                    </div>

                    <div className='entry'>
                        <div className='top'>
                            <img style={{width:'25px', height:'25px', marginRight:'10px'}} src={tick} alt="icon"/>
                            <span className='nxt'>Accurate Reports</span>
                        </div>

                        <span className='bdd'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus 
                            mi vulputate pharetra, sit. Sagittis nulla at diam sagittis enim 
                            nunc a lacinia scelerisque. Leo semper nunc pellentesque nascetur 
                            amet adipiscing elit. Cursus mi vulputate pharetra, sit. Sagittis 
                            nulla at diam sagittis enim nunc  a lacinia scelerisque. Leo semper 
                            nunc pellentesque nascetur amet adipiscing elit. Cursus mi vulputate 
                            pharetra, sit. Sagittis nulla at diam sagittis enim nunc
                        </span>
                    </div>

                    <div className='entry'>
                        <div className='top'>
                            <img style={{width:'25px', height:'25px', marginRight:'10px'}} src={tick} alt="icon"/>
                            <span className='nxt'>Important Alerts and Notifications</span>
                        </div>

                        <span className='bdd'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus 
                            mi vulputate pharetra, sit. Sagittis nulla at diam sagittis enim 
                            nunc a lacinia scelerisque. Leo semper nunc pellentesque nascetur 
                            amet adipiscing elit. Cursus mi vulputate pharetra, sit. Sagittis 
                            nulla at diam sagittis enim nunc  a lacinia scelerisque. Leo semper 
                            nunc pellentesque nascetur amet adipiscing elit. Cursus mi vulputate 
                            pharetra, sit. Sagittis nulla at diam sagittis enim nunc
                        </span>
                    </div>
                </div>
                <div className="right">
                    <img style={{width:'350px', height:'300px'}} src={pc} alt="icon" />
                </div>
            </div>
        </div>
    )
}

export default Features;