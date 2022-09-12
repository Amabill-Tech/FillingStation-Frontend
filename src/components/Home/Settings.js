import React, {useState} from 'react';
import '../../styles/settings.scss';
import rightArrow from '../../assets/rightArrow.png';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Settings = ({history}) => {

    const [nav, setNav] = useState(0);

    const OutletInfo = () => {
        return(
            <div className='outlet'>
                <div className='lef'>
                    <div className='title'>Outlet Information</div>
                    <div className='text-group'>
                        <div className='form-text'>License Code</div>
                        <OutlinedInput 
                            sx={{
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777'
                            }} placeholder="" 
                        />
                    </div>
                    <div className='text-group'>
                        <div className='form-text'>Outlet Name</div>
                        <OutlinedInput 
                            sx={{
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777'
                            }} placeholder="" 
                        />
                    </div>
                    <div className='text-group'>
                        <div className='form-text'>No Of Tanks</div>
                        <OutlinedInput 
                            sx={{
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777'
                            }} placeholder="" 
                        />
                    </div>
                    <div className='text-group'>
                        <div className='form-text'>No Of Pumps</div>
                        <OutlinedInput 
                            sx={{
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777'
                            }} placeholder="" 
                        />
                    </div>
                    <div className='text-group'>
                        <div className='form-text'>State</div>
                        <OutlinedInput 
                            sx={{
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777'
                            }} placeholder="" 
                        />
                    </div>
                    <div className='text-group'>
                        <div className='form-text'>Town</div>
                        <OutlinedInput 
                            sx={{
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777'
                            }} placeholder="" 
                        />
                    </div>
                </div>
                <div className='rig'>
                    <div style={{marginTop:'50px'}} className='text-group'>
                        <div className='form-text'>LGA</div>
                        <OutlinedInput 
                            sx={{
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777'
                            }} placeholder="" 
                        />
                    </div>

                    <div className='text-group'>
                        <div className='form-text'>Street</div>
                        <OutlinedInput 
                            sx={{
                                height: '35px', 
                                marginTop:'5px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777',
                                marginBottom:'30px'
                            }} placeholder="" 
                        />
                    </div>
                </div>
            </div>
        )
    }

    const Appearances = () => {
        return(
            <div className='appearance'>

            </div>
        )
    }

    const Logo = () => {
        return(
            <div className='appearance'>

            </div>
        )
    }

    const Password = () => {
        return(
            <div className='appearance'>

            </div>
        )
    }

    const Email = () => {
        return(
            <div className='appearance'>

            </div>
        )
    }

    const DeleteOutlet = () => {
        return(
            <div className='appearance'>

            </div>
        )
    }

    return(
        <div className='settingsContainer'>
            <div className='action'>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={1}
                    sx={{
                        backgroundColor:"#06805B", 
                        color:'#fff', 
                        height:'35px',  
                        width:'150px', 
                        fontSize:'14px',
                        marginRight:'20px'
                    }}
                >
                    <MenuItem value={1}>Action</MenuItem>
                    <MenuItem value={2}>Licence Code</MenuItem>
                    <MenuItem value={3}>Outlet Name</MenuItem>
                    <MenuItem value={4}>No of Tanks</MenuItem>
                    <MenuItem value={5}>No of Pumps</MenuItem>
                    <MenuItem value={6}>State</MenuItem>
                    <MenuItem value={7}>Town</MenuItem>
                    <MenuItem value={8}>LGA</MenuItem>
                    <MenuItem value={9}>Street</MenuItem>
                </Select>
            </div>
            <div className='inner-container'>
                <div className='leftSettings'>
                    <div className='linspace'>
                        <div onClick={()=>{setNav(0)}} className='accord'>
                            <div className='text'>Outlet Information</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(1)}} className='accord'>
                            <div style={{color:'#1F1F1F'}} className='text'>Appearances</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(2)}} className='accord'>
                            <div style={{color:'#1F1F1F'}} className='text'>Logo ( Branding )</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(3)}} className='accord'>
                            <div style={{color:'#1F1F1F'}} className='text'>Change Password</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(4)}} className='accord'>
                            <div style={{color:'#1F1F1F'}} className='text'>Change Email</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(5)}} className='accord'>
                            <div style={{color:'#1F1F1F'}} className='text'>Delete Outlets</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{history.push('/login')}} className='accord'>
                            <div style={{color:'#1F1F1F'}} className='text'>Logout</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                    </div>
                </div>
                <div className='rightSettings'>
                    <div className='inner'>
                        { nav === 0 && <OutletInfo />}
                        { nav === 1 && <Appearances />}
                        { nav === 2 && <Logo />}
                        { nav === 3 && <Password />}
                        { nav === 4 && <Email />}
                        { nav === 5 && <DeleteOutlet />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;