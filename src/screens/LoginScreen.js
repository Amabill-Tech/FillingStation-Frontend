import React, { useState } from 'react';
import '../styles/login.scss';
import station from '../assets/station.png';
import Register from '../components/Login/register';
import Login from '../components/Login/login';

const LoginScreen = ({history}) => {

    const [gotToRegister, setToRegister] = useState(false);
    
    return(
        <div className='container'>
            <div className='left-block'>
                <div style={{flexDirection:'column'}} className='upper-block'>
                    { gotToRegister || <Login history={history} reg={setToRegister} />}
                    { gotToRegister && <Register reg={setToRegister} />}
                </div>
                {/*<div className='lower-block'></div>*/}
            </div>
            <div className='right-block'>
                <img className='station' src={station} alt="icon" />
            </div>
        </div>
    )
}

export default LoginScreen;