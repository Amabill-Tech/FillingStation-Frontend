import React, { useState } from 'react';
import '../../styles/tanks.scss';
import me5 from '../../assets/me5.png';
import me6 from '../../assets/me6.png';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';

const Pump = () => {

    const [tabs, setTabs] = useState(0);

    const CardItem = () => {
        return(
            <div className='item'>
                <div className='inner'>
                        <div className='top'>
                            <div className='left'>
                                <img style={{width:'40px', height:'40px'}} src={me5} alt="icon" />
                                <div>PMS Pump 1</div>
                            </div>
                            <div className='right'>
                                <div>Active</div>
                                <IOSSwitch sx={{ m: 1 }} defaultChecked />
                            </div>
                        </div>

                        <div className='out'>
                            <div style={{width:'40%', textAlign:'left'}}>Pump ID</div>
                            <OutlinedInput 
                                placeholder="" 
                                sx={{
                                    width:'60%',
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }} 
                            />
                        </div>

                        <div className='out'>
                            <div style={{width:'40%', textAlign:'left'}}>Tank Connecting to pump</div>
                            <OutlinedInput 
                                placeholder="" 
                                sx={{
                                    width:'60%',
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }} 
                            />
                        </div>

                        <div className='out'>
                            <div style={{width:'40%', textAlign:'left'}}>Total Reading</div>
                            <OutlinedInput 
                                placeholder="" 
                                sx={{
                                    width:'60%',
                                    height:'35px', 
                                    fontSize:'12px',
                                    background:'#F2F1F1',
                                    color:'#000'
                                }} 
                            />
                        </div>

                        <div className='delete'>
                            <Button sx={{
                                width:'120px', 
                                height:'30px',  
                                background: '#06805B',
                                borderRadius: '3px',
                                fontSize:'10px',
                                color:'#fff',
                                '&:hover': {
                                    backgroundColor: '#06805B'
                                }
                                }} 
                                variant="contained"> Delete pump
                            </Button>
                        </div>
                </div>
            </div>
        )
    }

    const AllTabs = () => {
        return(
            <div className='space'>
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
            </div>
        )
    }

    const PMSTabs = () => {
        return(
            <div className='space'>
                <CardItem />
                <CardItem />
                <CardItem />
            </div>
        )
    }

    const AGOTabs = () => {
        return(
            <div className='space'>
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
            </div>
        )
    }

    const DPKTabs = () => {
        return(
            <div className='space'>
                <CardItem />
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

    const DashboardImage = (props) => {
        return(
            <div className='first-image'>
                <div style={{marginRight:'10px'}} className='inner-first-image'>
                    <div className='top-first-image'>
                        <div className='top-icon'>
                            <img style={{width:'60px', height:'50px'}} src={props.image} alt="icon" />
                        </div>
                        <div style={{justifyContent:'flex-end'}} className='top-text'>
                            <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>{props.name}</div>
                            <div style={{fontSize:'18px', fontWeight:'bold', marginLeft:'20px', fontFamily:'Nunito-Regular'}}>{props.value}</div>
                        </div>
                    </div>
                    <div className='bottom-first-image'>
                        <img style={{width:'30px', height:'10px'}} src={me6} alt="icon" />
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className='tanksContainer'>
            <div className='pump-container'>
                <div className='head'>
                    <div className='tabs'>
                        <div onClick={()=>{setTabs(0)}} style={tabs === 0? tab1 : tab2}>All</div>
                        <div onClick={()=>{setTabs(1)}} style={tabs === 1? tab1 : tab2}>PMS</div>
                        <div onClick={()=>{setTabs(2)}} style={tabs === 2? tab1 : tab2}>AGO</div>
                        <div onClick={()=>{setTabs(3)}} style={tabs === 3? tab1 : tab2}>DPK</div>
                    </div>
                </div>
                <div className='cont'>
                    {tabs === 0 && <AllTabs /> }
                    {tabs === 1 && <PMSTabs /> }
                    {tabs === 2 && <AGOTabs /> }
                    {tabs === 3 && <DPKTabs /> }
                </div>
            </div>
            <div className='create-pump'>
                <Button sx={{
                    width:'100%', 
                    height:'30px',  
                    background: '#3471B9',
                    borderRadius: '3px',
                    fontSize:'10px',
                    color:'#fff',
                    '&:hover': {
                        backgroundColor: '#3471B9'
                    }
                }} 
                    variant="contained"> Add Pump To Tank
                </Button>
                <DashboardImage image={me5} name={'Active pump'} value={'10'} />
                <DashboardImage image={me5} name={'Inactive pump'} value={'7'} />
            </div>
        </div>
    )
}

const tab1 = {
    width: '100%',
    height: '100%',
    background: '#E6F5F1',
    borderRadius: '5.20093px 5.20093px 0px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const tab2 = {
    width: '100%',
    height: '100%',
    borderRadius: '5.20093px 5.20093px 0px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#fff'
}

export default Pump;