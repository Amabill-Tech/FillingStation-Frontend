import React, { useState } from 'react';
import '../styles/home.scss';
import homeLogo from '../assets/homeLogo.png';
import active from '../assets/active.png';
import dashboard from '../assets/dashboard.png';
import dashboard2 from '../assets/dashboard2.png';
import dailySales from '../assets/dailySales.png';
import expenses from '../assets/expenses.png';
import hr from '../assets/hr.png';
import incOrders from '../assets/incOrders.png';
import outlet from '../assets/outlet.png';
import payments from '../assets/payments.png';
import productOrders from '../assets/productOrders.png';
import recordSales from '../assets/recordSales.png';
import regulatory from '../assets/regulatory.png';
import settings from '../assets/settings.png';
import tank from '../assets/tank.png';
import dailySales2 from '../assets/dailySales2.png';
import expenses2 from '../assets/expenses2.png';
import hr2 from '../assets/hr2.png';
import incOrders2 from '../assets/incOrders2.png';
import outlet2 from '../assets/outlet2.png';
import payments2 from '../assets/payments2.png';
import productOrders2 from '../assets/productOrders2.png';
import recordSales2 from '../assets/recordSales2.png';
import regulatory2 from '../assets/regulatory2.png';
import settings2 from '../assets/settings2.png';
import tank2 from '../assets/tank2.png';
import note from '../assets/note.png';
import search from '../assets/search.png';
import switchT from '../assets/switchT.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from '../components/Home/Dashboard';
import DailySales from '../components/Home/DailySales';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const HomeScreen = () => {

    const [activeRoute, setActiveRoute] = useState(0);

    const SideItems = (props) => {

        const handleActiveRoute = (index) => {
            setActiveRoute(index);
        }

        return(
            <div onClick={()=>{handleActiveRoute(props.id)}} style={{marginTop: props.marginT}} className='item-container'>
                {
                    props.id === activeRoute?
                    <div className='side-item'>
                        <div className='side-focus'>
                            <div className='side-focus-image'>
                                <img style={{width:'100%', height:'100%'}} src={active} alt="icon" />
                            </div>
                            <div className='side-focus-text'>
                                <img style={{width:'20px', height:'20px', marginRight:'10px'}} src={props.icon} alt="icon" />
                                <div style={{fontFamily:'Nunito-Regular', color:'#054834'}}>{props.name}</div>
                            </div>
                        </div>
                    </div>:
                    <div className='side-item2'>
                        <img className='normal-image' src={props.icon2} alt="icon" />
                        <div style={{fontFamily:'Nunito-Regular', color:'#fff'}}>{props.name}</div>
                    </div>
                }
            </div>
        )
    }

    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    return(
        <div className='home-container'>
            <div className='side-bar'>
                <div className='inner-side-bar'>
                    <img className='home-logo' src={homeLogo} alt="icon" />
                    <Link className='link' to='/'>
                        <SideItems id={0} marginT={"0px"} name={"Dashboard"} icon={dashboard} icon2={dashboard2} />
                    </Link>
                    <Link className='link' to='/daily-sales'>
                        <SideItems id={1} marginT={"50px"} name={"Daily Sales"} icon={dailySales2} icon2={dailySales} />
                    </Link>
                    <SideItems id={2} marginT={"100px"} name={"Payments"} icon={payments2} icon2={payments} />
                    <SideItems id={3} marginT={"150px"} name={"My Outlets"} icon={outlet2} icon2={outlet} />
                    <SideItems id={4} marginT={"200px"} name={"Record Sales"} icon={recordSales2} icon2={recordSales} />
                    <SideItems id={5} marginT={"250px"} name={"Expenses"} icon={expenses2} icon2={expenses} />
                    <SideItems id={6} marginT={"300px"} name={"Product Orders"} icon={productOrders2} icon2={productOrders} />
                    <SideItems id={7} marginT={"350px"} name={"Regulatory Pay"} icon={regulatory2} icon2={regulatory} />
                    <SideItems id={8} marginT={"400px"} name={"Incoming Orders"} icon={incOrders2} icon2={incOrders} />
                    <SideItems id={9} marginT={"450px"} name={"Tank Update"} icon={tank2} icon2={tank} />
                    <SideItems id={10} marginT={"500px"} name={"Human Resources"} icon={hr2} icon2={hr} />
                    <SideItems id={11} marginT={"550px"} name={"Settings"} icon={settings2} icon2={settings} />
                </div>
            </div>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='left'
            >
                <div style={{display:'flex', width:'100%', flexDirection:'row', justifyContent:'flex-end'}} className='side-bar'>
                    <div style={{width:'90%'}} className='inner-side-bar'>
                        <img className='home-logo' src={homeLogo} alt="icon" />
                        <SideItems id={0} marginT={"0px"} name={"Dashboard"} icon={dashboard} icon2={dashboard2} />
                        <SideItems id={1} marginT={"50px"} name={"Daily Sales"} icon={dailySales2} icon2={dailySales} />
                        <SideItems id={2} marginT={"100px"} name={"Payments"} icon={payments2} icon2={payments} />
                        <SideItems id={3} marginT={"150px"} name={"My Outlets"} icon={outlet2} icon2={outlet} />
                        <SideItems id={4} marginT={"200px"} name={"Record Sales"} icon={recordSales2} icon2={recordSales} />
                        <SideItems id={5} marginT={"250px"} name={"Expenses"} icon={expenses2} icon2={expenses} />
                        <SideItems id={6} marginT={"300px"} name={"Product Orders"} icon={productOrders2} icon2={productOrders} />
                        <SideItems id={7} marginT={"350px"} name={"Regulatory Pay"} icon={regulatory2} icon2={regulatory} />
                        <SideItems id={8} marginT={"400px"} name={"Incoming Orders"} icon={incOrders2} icon2={incOrders} />
                        <SideItems id={9} marginT={"450px"} name={"Tank Update"} icon={tank2} icon2={tank} />
                        <SideItems id={10} marginT={"500px"} name={"Human Resources"} icon={hr2} icon2={hr} />
                        <SideItems id={11} marginT={"550px"} name={"Settings"} icon={settings2} icon2={settings} />
                    </div>
                </div>
            </Drawer>
            <div className='main-content'>
                <div className='mobile-bar'>
                    <AppBar sx={{background:'#06805B'}} position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                                onClick={toggleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                            <div className='side-app-bar'>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ marginRight: '0px' }}
                                >
                                    <img style={{width:'35px', height:'35px'}} src={search} alt="icon" />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ marginRight: '0px' }}
                                >
                                    <img style={{width:'35px', height:'35px'}} src={note} alt="icon" />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ marginRight: '0px' }}
                                >
                                    <img style={{width:'35px', height:'35px'}} src={switchT} alt="icon" />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <Switch>
                    <Route exact path='/'>
                        <Dashboard/>
                    </Route>
                    <Route exact path='/daily-sales'>
                        <DailySales/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default HomeScreen;