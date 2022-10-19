import React from 'react';
import '../../styles/pump.scss';
import pump1 from '../../assets/pump1.png';
import plus from '../../assets/plus.png';
import cross from '../../assets/cross.png';

const Pumps = () => {
    return(
        <div className='pumpContainer'>
            <div>Select Pump used for the day</div>
            <div className='pump-list'>
                <div className='box'>
                    <div style={{marginRight:'10px'}}>Pump 1</div>
                    <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                </div>
                <div className='box'>
                    <div style={{marginRight:'10px'}}>Pump 2</div>
                    <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                </div>
                <div className='box'>
                    <div style={{marginRight:'10px'}}>Pump 3</div>
                    <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                </div>
                <div className='box2'>
                    <div style={{marginRight:'10px'}}>Pump 4</div>
                    <img style={{width:'20px', height:'20px'}} src={plus}  alt="icon"/>
                </div>
                <div className='box2'>
                    <div style={{marginRight:'10px'}}>Pump 5</div>
                    <img style={{width:'20px', height:'20px'}} src={plus}  alt="icon"/>
                </div>
                <div className='box2'>
                    <div style={{marginRight:'10px'}}>Pump 6</div>
                    <img style={{width:'20px', height:'20px'}} src={plus}  alt="icon"/>
                </div>
            </div>

            <div className='pumping'>
                <div data-aos="fade-down" className='item'>
                    <img style={{width:'55px', height:'65px'}} src={pump1}  alt="icon"/>
                    <div className='pop'>Pump 1</div>
                    <div className='label'>Totalizer Reading (Litres)</div>
                    <input type={'text'} className="textInput" />
                </div>

                <div data-aos="fade-down" className='item'>
                    <img style={{width:'55px', height:'65px'}} src={pump1}  alt="icon"/>
                    <div className='pop'>Pump 1</div>
                    <div className='label'>Totalizer Reading (Litres)</div>
                    <input type={'text'} className="textInput" />
                </div>

                <div data-aos="fade-down" className='item'>
                    <img style={{width:'55px', height:'65px'}} src={pump1}  alt="icon"/>
                    <div className='pop'>Pump 1</div>
                    <div className='label'>Totalizer Reading (Litres)</div>
                    <input type={'text'} className="textInput" />
                </div>

            </div>
        </div>
    )
}

export default Pumps;