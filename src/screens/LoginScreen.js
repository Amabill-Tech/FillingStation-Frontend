import React, { useState } from 'react';
import '../styles/login.scss';
import station from '../assets/station.png';
import logo from '../assets/logo.png';
import Button from '@mui/material/Button';
import { ThreeDots } from  'react-loader-spinner';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';

const LoginScreen = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loadingSpinner = useSelector(state => state.authReducer.loadingSpinner);

    const handleLogin = () => {
        if(email === "") return swal("Warning!", "Email field cannot be empty", "info");
        if(password === "") return swal("Warning!", "Password field cannot be empty", "info");
    }

    return(
        <div className='container'>
            <div className='left-block'>
                <div style={{flexDirection:'column'}} className='upper-block'>
                    <div className='login-form-container'>
                        <div className='inner-form-container'>
                            <img className='logo' src={logo} alt="icon" />
                            <div className='login-text'>Login</div>
                            <form className='main-form'>
                                <input 
                                    className='input-field' 
                                    type={'email'} 
                                    placeholder="Email"  
                                    onChange = {e => setEmail(e.target.value)}
                                />
                                <input 
                                    style={{marginTop:'25px'}} 
                                    className='input-field' 
                                    type={'password'} 
                                    placeholder="Password" 
                                    onChange = {e => setPassword(e.target.value)}
                                />
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

                            {loadingSpinner &&
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#076146" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{marginTop:'20px'}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            }
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