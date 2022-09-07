import React from 'react';
import '../styles/login.scss';
import station from '../assets/station.png';
import logo from '../assets/logo.png';
import Button from '@mui/material/Button';

const LoginScreen = ({history}) => {

    const handleLogin = () => {
        history.push('/home');
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
                                <Button sx={{
                                    width:'100%', 
                                    height:'35px', 
                                    background:'#076146', 
                                    borderRadius:'24px', 
                                    marginTop:'30px',
                                    '&:hover': {
                                        backgroundColor: '#076146'
                                    }
                                }}  variant="contained"
                                    onClick={handleLogin}>Login</Button>
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