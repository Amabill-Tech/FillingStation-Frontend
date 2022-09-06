import React from 'react';
import '../styles/login.scss';
import station from '../assets/station.png';
import logo from '../assets/logo.png';

const LoginScreen = ({history}) => {

    const handleLogin = () => {
        history.push('/');
    }

    return(
        <div className='container'>
            <div className='left-block'>
                <div className='upper-block'>
                    <div className='login-form-container'>
                        <div className='inner-form-container'>
                            <img className='logo' src={logo} alt="icon" />
                            <div className='login-text'>Login</div>
                            <form className='main-form'>
                                <input 
                                    className='input-field' 
                                    type={'email'} 
                                    placeholder="Email" required />
                                <input 
                                    style={{marginTop:'25px'}} 
                                    className='input-field' 
                                    type={'password'} 
                                    placeholder="Password" required />
                                <div className='forget-password'>Forgot password</div>
                                <button className='login-button' type={'submit'} onClick={handleLogin}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='lower-block'>

                </div>
            </div>
            <div className='right-block'>
                <img className='station' src={station} alt="icon" />
            </div>
        </div>
    )
}

export default LoginScreen;