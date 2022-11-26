import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { ThreeDots } from  'react-loader-spinner';
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { register, setSpinner } from '../../store/actions/auth';
import { useDispatch } from 'react-redux';
import '../../styles/login.scss';

const Register = (props) => {

    const loadingSpinner = useSelector(state => state.authReducer.loadingSpinner);
    const dispatch = useDispatch();

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [org, setOrg] = useState('');
    const [location, setLocation] = useState('');

    const switchToRegister = () => props.reg(prev => !prev);

    const registerUser = () => {
        if(firstname === "") return swal("Warning!", "First name field cannot be empty", "info");
        if(lastname === "") return swal("Warning!", "Last name field cannot be empty", "info");
        if(email === "") return swal("Warning!", "Email field cannot be empty", "info");
        if(password === "") return swal("Warning!", "Password field cannot be empty", "info");
        if(password !== confirm) return swal("Warning!", "Password must match", "info");
        if(org === "") return swal("Warning!", "Organisation field cannot be empty", "info");
        if(location === "") return swal("Warning!", "Location field cannot be empty", "info");

        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            organisation: org,
            location: location,
        }

        dispatch(setSpinner());
        dispatch(register(data));
    }

    return(
        <div style={{height:'600px'}} className='login-form-container'>
            <div className='inner-sign'>
                <div className='login-text'>Signup</div>
                <input 
                    className='input-field' 
                    type={'text'} 
                    placeholder="First name"  
                    onChange = {e => setFirstName(e.target.value)}
                />

                <input 
                    style={{marginTop:'20px'}}
                    className='input-field' 
                    type={'text'} 
                    placeholder="Last name"  
                    onChange = {e => setLastName(e.target.value)}
                />

                <input 
                    style={{marginTop:'20px'}}
                    className='input-field' 
                    type={'email'} 
                    placeholder="Email"  
                    onChange = {e => setEmail(e.target.value)}
                />

                <input 
                    style={{marginTop:'20px'}}
                    className='input-field' 
                    type={'text'} 
                    placeholder="Organisation"  
                    onChange = {e => setOrg(e.target.value)}
                />

                <input 
                    style={{marginTop:'20px'}}
                    className='input-field' 
                    type={'password'} 
                    placeholder="Password"  
                    onChange = {e => setPassword(e.target.value)}
                />

                <input 
                    style={{marginTop:'20px'}}
                    className='input-field' 
                    type={'password'} 
                    placeholder="Confirm password"  
                    onChange = {e => setConfirm(e.target.value)}
                />

                <input 
                    style={{marginTop:'20px'}}
                    className='input-field' 
                    type={'text'} 
                    placeholder="Location"  
                    onChange = {e => setLocation(e.target.value)}
                />

                <Button sx={{
                    width:'100%', 
                    height:'35px', 
                    background:'#076146', 
                    borderRadius:'24px', 
                    marginTop:'30px',
                    textTransform:"capitalize",
                    '&:hover': {
                        backgroundColor: '#076146'
                    }
                    }}  variant="contained"
                    onClick={registerUser}>Register
                </Button>

                <div style={{height:"35px", alignItems:'center'}} className='reg'>
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
                    <div onClick={switchToRegister} className='register'>Login</div>
                </div>
            </div>
        </div>
    )
}

export default Register;