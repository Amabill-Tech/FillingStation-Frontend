import React, {useState} from 'react';
import logo from '../../assets/logo.png';
import Button from '@mui/material/Button';
import { ThreeDots } from  'react-loader-spinner';
import swal from 'sweetalert';
import { login, setSpinner } from '../../store/actions/auth';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loadingSpinner = useSelector(state => state.authReducer.loadingSpinner);
    const dispatch = useDispatch();

    const handleLogin = () => {
        if(email === "") return swal("Warning!", "Email field cannot be empty", "info");
        if(password === "") return swal("Warning!", "Password field cannot be empty", "info");
        dispatch(setSpinner());

        const data = {
            email: email,
            password: password
        }
        dispatch(login(data, props.history));
    }

    const switchToRegister = () => {
        props.reg(prev => !prev);
    }

    return(
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

                        <div style={{height:'35px', alignItems:'center'}} className='reg'>
                            <div>
                                {loadingSpinner &&
                                    <ThreeDots 
                                        height="60" 
                                        width="50" 
                                        radius="9"
                                        color="#076146" 
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                        visible={true}
                                    />
                                }
                            </div>
                            <div onClick={switchToRegister} className='register'>Register</div>
                        </div>
                    </div>
                </div>
    )
}


export default Login;