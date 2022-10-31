import React, {useCallback, useEffect, useState} from 'react';
import '../../styles/settings.scss';
import rightArrow from '../../assets/rightArrow.png';
import dark from '../../assets/dark.png';
import light from '../../assets/light.png';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/auth';
import swal from 'sweetalert';
import OutletService from '../../services/outletService';
import { getAllStations, oneStation } from '../../store/actions/outlet';
import { ThreeDots } from 'react-loader-spinner';

const OutletInfo = (props) => {
    const oneStation = useSelector(state => state.outletReducer.oneStation);
    const [id, setID] = useState('');
    const [licenseCode, setLicenseCode] = useState('');
    const [outletName, setOutletName] = useState(oneStation.outletName);
    const [noOfPump, setNoOfPump] = useState(oneStation.noOfPumps);
    const [noOfTank, setNoOfTank] = useState(oneStation.noOfTanks);
    const [state, setState] = useState(oneStation.state);
    const [town, setTown] = useState(oneStation.city);
    const [lga, setLga] = useState(oneStation.lga);
    const [street, setStreet] = useState(oneStation.area);
    const [loadingSpinner, setLoadingSpinner] = useState(false);

    useEffect(()=>{
        setLicenseCode(oneStation.licenseCode);
        setOutletName(oneStation.outletName);
        setNoOfPump(oneStation.noOfPumps);
        setNoOfTank(oneStation.noOfTanks);
        setState(oneStation.state);
        setTown(oneStation.city);
        setLga(oneStation.lga);
        setStreet(oneStation.area);
        setID(oneStation._id);
    }, [
        oneStation.licenseCode,
        oneStation.outletName,
        oneStation.noOfPumps,
        oneStation.noOfTanks,
        oneStation.state,
        oneStation.city,
        oneStation.lga,
        oneStation.area,
        oneStation._id
    ]);

    const updateOutlet = () => {
        if(licenseCode === "") return swal("Warning!", "License code field cannot be empty", "info");
        if(outletName === "") return swal("Warning!", "Outlet name field cannot be empty", "info");
        if(noOfPump === "") return swal("Warning!", "No of pump name field cannot be empty", "info");
        if(noOfTank === "") return swal("Warning!", "No of tank name field cannot be empty", "info");
        if(state === "") return swal("Warning!", "State name field cannot be empty", "info");
        if(town === "") return swal("Warning!", "Town name field cannot be empty", "info");
        if(lga === "") return swal("Warning!", "LGA name field cannot be empty", "info");
        if(street === "") return swal("Warning!", "Street name field cannot be empty", "info");
        setLoadingSpinner(true);

        const payload = {
            id: id,
            outletName: outletName,
            state: state,
            city: state,
            lga: lga,
            area: town,
            licenseCode: licenseCode,
            noOfTanks: noOfTank,
            noOfPumps: noOfPump,
            activeState: oneStation.activeState,
        }

        OutletService.updateStation(payload).then(data => {
            swal("Success", "Station updated successfully!", "success");
        }).then(()=>{
            setLoadingSpinner(false);
            props.refresh();
        })
    }

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
                            border:'1px solid #777777',
                            fontSize:'12px'
                        }} 
                        value={licenseCode}
                        onChange={e => setLicenseCode(e.target.value)}
                        placeholder="" 
                    />
                </div>
                <div className='text-group'>
                    <div className='form-text'>Outlet Name</div>
                    <OutlinedInput 
                        sx={{
                            height: '35px', 
                            marginTop:'5px', 
                            background:'#EEF2F1', 
                            border:'1px solid #777777',
                            fontSize:'12px'
                        }} 
                        value={outletName}
                        onChange={e => setOutletName(e.target.value)}
                        placeholder="" 
                    />
                </div>
                <div className='text-group'>
                    <div className='form-text'>No Of Tanks</div>
                    <OutlinedInput 
                        sx={{
                            height: '35px', 
                            marginTop:'5px', 
                            background:'#EEF2F1', 
                            border:'1px solid #777777',
                            fontSize:'12px'
                        }} 
                        value={noOfTank}
                        onChange={e => setNoOfTank(e.target.value)}
                        placeholder="" 
                    />
                </div>
                <div className='text-group'>
                    <div className='form-text'>No Of Pumps</div>
                    <OutlinedInput 
                        sx={{
                            height: '35px', 
                            marginTop:'5px', 
                            background:'#EEF2F1', 
                            border:'1px solid #777777',
                            fontSize:'12px'
                        }} 
                        value={noOfPump}
                        onChange={e => setNoOfPump(e.target.value)}
                        placeholder="" 
                    />
                </div>
                <div className='text-group'>
                    <div className='form-text'>State</div>
                    <OutlinedInput 
                        sx={{
                            height: '35px', 
                            marginTop:'5px', 
                            background:'#EEF2F1', 
                            border:'1px solid #777777',
                            fontSize:'12px'
                        }} 
                        value={state}
                        onChange={e => setState(e.target.value)}
                        placeholder="" 
                    />
                </div>
                <div className='text-group'>
                    <div className='form-text'>Town</div>
                    <OutlinedInput 
                        sx={{
                            height: '35px', 
                            marginTop:'5px', 
                            background:'#EEF2F1', 
                            border:'1px solid #777777',
                            fontSize:'12px'
                        }} 
                        value={town}
                        onChange={e => setTown(e.target.value)}
                        placeholder="" 
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
                            border:'1px solid #777777',
                            fontSize:'12px'
                        }} 
                        value={lga}
                        onChange={e => setLga(e.target.value)}
                        placeholder="" 
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
                            marginBottom:'30px',
                            fontSize:'12px'
                        }} 
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                        placeholder="" 
                    />
                </div>

                <Button 
                    variant="contained" 
                    sx={{
                        width:'100%',
                        height:'30px',
                        background:'#054834',
                        fontSize:'11px',
                        marginBottom:'20px',
                        '&:hover': {
                            backgroundColor: '#054834'
                        }
                    }}
                    onClick={updateOutlet}
                >
                    Save
                </Button>

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
                            background:'#054834',
                            fontSize:'11px',
                            marginTop:'30px',
                            marginBottom:'20px',
                            '&:hover': {
                                backgroundColor: '#054834'
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
            <div style={{width:'200px', marginTop:'10px'}} className='app'>
                <div className='head'>Change Password</div>
            </div>
            <div className='details'>
                <div className='text-group'>
                    <div className='form-text'>New Password</div>
                    <OutlinedInput 
                        sx={{
                            width:'100%',
                            height: '35px', 
                            marginTop:'5px', 
                            background:'#EEF2F1', 
                            border:'1px solid #777777'
                        }} placeholder="" 
                    />
                </div>

                <div style={{marginTop:'20px'}} className='text-group'>
                    <div className='form-text'>Re-type New Password</div>
                    <OutlinedInput 
                        sx={{
                            width:'100%',
                            height: '35px', 
                            marginTop:'5px', 
                            background:'#EEF2F1', 
                            border:'1px solid #777777'
                        }} placeholder="" 
                    />
                </div>

                <div style={{
                    marginTop:'20px', 
                    fontSize:'14px', 
                    fontFamily:'Nunito-Regular'
                    }} className='text-group'>Forgot password?
                </div>

                <div style={{marginTop:'20px'}} className='text-group'>
                    <Button 
                        variant="contained" 
                        sx={{
                            width:'100%',
                            height:'30px',
                            background:'#054834',
                            fontSize:'11px',
                            marginTop:'20px',
                            marginBottom:'20px',
                            '&:hover': {
                                backgroundColor: '#054834'
                            }
                        }}
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
}));

const Email = () => {
    return(
        <div className='appearance'>
            <div style={{width:'200px', marginTop:'10px'}} className='app'>
                <div className='head'>Change Email</div>
            </div>
            <div className='details'>
                <div className='text-group'>
                    <div className='form-text'>Email</div>
                    <OutlinedInput 
                        sx={{
                            width:'100%',
                            height: '35px', 
                            marginTop:'5px', 
                            background:'#EEF2F1', 
                            border:'1px solid #777777'
                        }} placeholder="" 
                    />
                </div>

                <div style={emailSwith} className='text-group'>
                    <IOSSwitch sx={{ m: 1 }} defaultChecked />
                    <div style={email}>
                        Recieve notification and messages through this email
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='text-group'>
                    <Button 
                        variant="contained" 
                        sx={{
                            width:'100%',
                            height:'30px',
                            background:'#054834',
                            fontSize:'11px',
                            marginTop:'20px',
                            marginBottom:'20px',
                            '&:hover': {
                                backgroundColor: '#054834'
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

const DeleteOutlet = () => {
    return(
        <div className='appearance'>
            <div style={{width:'200px', marginTop:'10px'}} className='app'>
                <div className='head'>Delete Outlet</div>
            </div>
            <div className='details'>
                <div className='text-group'>
                    <div style={{fontFamily:'Nunito-Regular', fontWeight:'bold', fontSize:'14px'}}>Notice</div>
                    <div style={{
                        fontFamily:'Nunito-Regular', 
                        fontSize:'12px', 
                        marginTop:'10px',
                        textAlign:'left'
                    }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Posuere  
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='text-group'>
                    <div className='form-text'>Why do you want to delete outlets?</div>
                    <OutlinedInput 
                        sx={{
                            width:'100%',
                            height: '35px', 
                            marginTop:'5px', 
                            background:'#EEF2F1', 
                            border:'1px solid #777777'
                        }} placeholder="" 
                    />
                </div>

                <div style={{marginTop:'20px'}} className='text-group'>
                    <Button 
                        variant="contained" 
                        sx={{
                            width:'100%',
                            height:'30px',
                            background:'#054834',
                            fontSize:'11px',
                            marginTop:'20px',
                            marginBottom:'20px',
                            '&:hover': {
                                backgroundColor: '#054834'
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

const Settings = (props) => {

    const [nav, setNav] = useState(0);
    const [defaultState, setDefault] = useState(0);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);

    const logouts = () => {
        swal({
            title: "Alert!",
            text: "Are you sure you want to logout?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                dispatch(logout());
                props.history.push('/login');
            }
        });
    }

    const getStationData = useCallback(() => {
        OutletService.getAllOutletStations({organisation: user.userType === "superAdmin"? user._id : user.organisationID}).then(data => {
            dispatch(getAllStations(data.station));
            dispatch(oneStation(data.station[0]));
        });
    }, [user.organisationID, user._id, user.userType, dispatch]);

    useEffect(()=>{
        getStationData();
    },[getStationData]);

    const changeMenu = (index, item ) => {
        setDefault(index);
        dispatch(oneStation(item));
    }
    
    return(

        <div data-aos="zoom-in-down" className='settingsContainer'>
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
                    <MenuItem onClick={()=>{setNav(0)}} value={2}>Outlet Information</MenuItem>
                    <MenuItem onClick={()=>{setNav(1)}} value={3}>Appearances</MenuItem>
                    <MenuItem onClick={()=>{setNav(2)}} value={4}>Logo (Branding)</MenuItem>
                    <MenuItem onClick={()=>{setNav(3)}} value={5}>Change Password</MenuItem>
                    <MenuItem onClick={()=>{setNav(4)}} value={6}>Change Email</MenuItem>
                    <MenuItem onClick={()=>{setNav(5)}} value={7}>Delete Outlet</MenuItem>
                    <MenuItem onClick={logouts} value={8}>Logout</MenuItem>
                </Select>
            </div>
            <div className='inner-container'>
                <div className='leftSettings'>
                    <div className='linspace'>
                        <div onClick={()=>{setNav(0)}} className='accord'>
                            <div style={nav === 0? active: inActive}>Outlet Information</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(1)}} className='accord'>
                            <div style={nav === 1? active: inActive} className='text'>Appearances</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(2)}} className='accord'>
                            <div style={nav === 2? active: inActive} className='text'>Logo ( Branding )</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(3)}} className='accord'>
                            <div style={nav === 3? active: inActive} className='text'>Change Password</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(4)}} className='accord'>
                            <div style={nav === 4? active: inActive} className='text'>Change Email</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={()=>{setNav(5)}} className='accord'>
                            <div style={nav === 5? active: inActive} className='text'>Delete Outlets</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                        <div onClick={logouts} className='accord'>
                            <div style={{color:'#1F1F1F'}} className='text'>Logout</div>
                            <img style={{width:'7px', height:'13px'}} src={rightArrow} alt="icon" />
                        </div>
                    </div>
                </div>
                <div className='rightSettings'>
                    <div className='inner'>
                        <div style={contain}>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={defaultState}
                                sx={selectStyle2}
                            >
                                {
                                    allOutlets.map((item, index) => {
                                        return(
                                            <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index, item)}} value={index}>{item.outletName}</MenuItem>
                                        )
                                    })  
                                }
                            </Select>
                        </div>
                        { nav === 0 && <OutletInfo refresh={getStationData} />}
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

const emailSwith = {
    marginTop:'30px',
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
}

const email = {
    fontSize:'12px',
    fontFamily:'Nunito-Regular',
    marginLeft:'10px'
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

const active = {
    fontFamily: 'Nunito-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '12px',
    lineHeight: '150.4%',
    color: '#06805B',
}

const inActive = {
    fontFamily: 'Nunito-Regular',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '12px',
    lineHeight: '150.4%',
    color: '#1F1F1F',
}

const selectStyle2 = {
    width:'160px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#054834',
    color:'#fff',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none',
    marginBottom: '10px'
}

const contain = {
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start'
}

export default Settings;