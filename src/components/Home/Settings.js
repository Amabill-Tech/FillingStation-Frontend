import React, {useState} from 'react';
import '../../styles/settings.scss';
import rightArrow from '../../assets/rightArrow.png';
import dark from '../../assets/dark.png';
import light from '../../assets/light.png';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';

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
                <div className='app'>
                    <div className='head'>Appearances</div>
                </div>
                <div className='details'>
                    <div className='detail-text'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere
                    </div>
                    <div className='theme'>
                        <div className='col'> 
                            <div style={{fontFamily:'Nunito-Regular', fontSize:'14px'}}>Color</div>
                            <div style={{marginTop:'10px'}} className='radio'>
                                <div style={{marginRight:'10px'}} className='color-group'>
                                    <div className='colors'>
                                        <img src={dark} alt="icon" style={{width:'30px', height:'30px'}} />
                                    </div>
                                    <div style={{fontFamily:'Nunito-Regular', fontSize:'12px'}}>Light</div>
                                </div>
                                <Radio />
                            </div>
                            <div style={{marginTop:'10px'}} className='radio'>
                                <div style={{marginRight:'10px'}} className='color-group'>
                                    <div style={{background:'#fff'}} className='colors'>
                                        <img src={light} alt="icon" style={{width:'30px', height:'30px'}} />
                                    </div>
                                    <div style={{fontFamily:'Nunito-Regular', fontSize:'12px'}}>Dark</div>
                                </div>
                                <Radio />
                            </div>
                        </div>

                        <div className='col2'>
                            <div style={{fontFamily:'Nunito-Regular', fontSize:'14px'}}>Theme</div>
                            <div style={{marginTop:'10px'}} className='radio'>
                                <div className='color-group'>
                                    <div className='colors'></div>
                                    <div style={{fontFamily:'Nunito-Regular', fontSize:'12px'}}>Green</div>
                                </div>
                                <Radio />
                            </div>
                            <div className='radio'>
                                <div className='color-group'>
                                    <div style={{background:'yellow'}} className='colors'></div>
                                    <div style={{fontFamily:'Nunito-Regular', fontSize:'12px'}}>Yellow</div>
                                </div>
                                <Radio />
                            </div>
                            <div className='radio'>
                                <div className='color-group'>
                                    <div style={{background:'orange'}} className='colors'></div>
                                    <div style={{fontFamily:'Nunito-Regular', fontSize:'12px'}}>Orange</div>
                                </div>
                                <Radio />
                            </div>
                            <div style={{marginBottom:'20px'}} className='radio'>
                                <div className='color-group'>
                                    <div style={{background:'blue'}} className='colors'></div>
                                    <div>Blue</div>
                                </div>
                                <Radio />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const Logo = () => {
        return(
            <div className='appearance'>
                <div className='app'>
                    <div className='head'>Logo (Branding)</div>
                </div>
                <div className='details'>
                    <div style={{
                        fontSize:'14px',
                        fontFamily:'Nunito-Regular',
                        display:'flex',
                        flexDirection:'row',
                        justifyContent:'flex-start',
                        marginTop:'40px',
                        fontWeight:'bold'
                    }}>
                        Logo
                    </div>
                    <div style={{marginTop:'10px'}} className='detail-text'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere
                    </div>

                    <div className='browse'>
                        <Button 
                            variant="contained" 
                            sx={{
                                width:'110px',
                                height:'30px',
                                background:'#06805B',
                                fontSize:'11px',
                                '&:hover': {
                                    backgroundColor: '#06805B'
                                }
                            }}
                        >
                            Browse
                        </Button>

                        <div style={{
                            fontSize:'14px',
                            fontFamily:'Nunito-Regular',
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'flex-start',
                            marginTop:'20px',
                            fontWeight:'bold'
                        }}>
                            Branding Alias
                        </div>

                        <OutlinedInput 
                            sx={{
                                width:'100%',
                                height: '35px', 
                                marginTop:'10px', 
                                background:'#EEF2F1', 
                                border:'1px solid #777777'
                            }} placeholder="" 
                        />

                        <Button 
                            variant="contained" 
                            sx={{
                                width:'100%',
                                height:'30px',
                                background:'blue',
                                fontSize:'11px',
                                marginTop:'20px',
                                marginBottom:'20px',
                                '&:hover': {
                                    backgroundColor: 'blue'
                                }
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
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