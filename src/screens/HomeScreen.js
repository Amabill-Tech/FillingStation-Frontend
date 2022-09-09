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
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Dashboard from '../components/Home/Dashboard';
import DailySales from '../components/Home/DailySales';
import Expenses from '../components/Home/Expenses';
import HumanResources from '../components/Home/HumanResource';
import IncomingOrders from '../components/Home/IncomingOrders';
import Outlets from '../components/Home/Outlets';
import Payments from '../components/Home/Payments';
import ProductOrders from '../components/Home/ProductOrders';
import RecordSales from '../components/Home/RecordSales';
import Regulatory from '../components/Home/Regulatory';
import Settings from '../components/Home/Settings';
import TankUpdate from '../components/Home/TankUpdate';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const HomeScreen = ({history}) => {

    const [activeRoute, setActiveRoute] = useState('/home');
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('Dashboard');

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    history.listen((location) => {
        setActiveRoute(location.pathname);
    })

    const setNames = (name) => {
        setName(name)
    }

    const SideItems = (props) => {

        return(
            <Link className='link' to={props.link}>
                <div onClick={()=>{setNames(props.name)}} style={{marginTop: props.marginT}} className='item-container'>
                    {
                        activeRoute === props.link?
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
            </Link>
        )
    }

    return(
        <div className='home-container'>
            <div className='side-bar'>
                <div className='inner-side-bar'>
                    <img className='home-logo' src={homeLogo} alt="icon" />
                    <SideItems marginT={"0px"} link={'/home'} name={"Dashboard"} icon={dashboard} icon2={dashboard2} />
                    <SideItems marginT={"50px"} link={'/home/daily-sales'} name={"Daily Sales"} icon={dailySales2} icon2={dailySales} />
                    <SideItems marginT={"100px"} link={'/home/payments'} name={"Payments"} icon={payments2} icon2={payments} />
                    <SideItems marginT={"150px"} link={'/home/outlets'} name={"My Outlets"} icon={outlet2} icon2={outlet} />
                    <SideItems marginT={"200px"} link={'/home/record-sales'} name={"Record Sales"} icon={recordSales2} icon2={recordSales} />
                    <SideItems marginT={"250px"} link={'/home/expenses'} name={"Expenses"} icon={expenses2} icon2={expenses} />
                    <SideItems marginT={"300px"} link={'/home/product-orders'} name={"Product Orders"} icon={productOrders2} icon2={productOrders} />
                    <SideItems marginT={"350px"} link={'/home/regulatory'} name={"Regulatory Pay"} icon={regulatory2} icon2={regulatory} />
                    <SideItems marginT={"400px"} link={'/home/inc-orders'} name={"Incoming Orders"} icon={incOrders2} icon2={incOrders} />
                    <SideItems marginT={"450px"} link={'/home/tank'} name={"Tank Update"} icon={tank2} icon2={tank} />
                    <SideItems marginT={"500px"} link={'/home/hr'} name={"Human Resources"} icon={hr2} icon2={hr} />
                    <SideItems marginT={"550px"} link={'/home/settings'} name={"Settings"} icon={settings2} icon2={settings} />
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
                        <SideItems marginT={"0px"} link={'/home'} name={"Dashboard"} icon={dashboard} icon2={dashboard2} />
                        <SideItems marginT={"50px"} link={'/home/daily-sales'} name={"Daily Sales"} icon={dailySales2} icon2={dailySales} />
                        <SideItems marginT={"100px"} link={'/home/payments'} name={"Payments"} icon={payments2} icon2={payments} />
                        <SideItems marginT={"150px"} link={'/home/outlets'} name={"My Outlets"} icon={outlet2} icon2={outlet} />
                        <SideItems marginT={"200px"} link={'/home/record-sales'} name={"Record Sales"} icon={recordSales2} icon2={recordSales} />
                        <SideItems marginT={"250px"} link={'/home/expenses'} name={"Expenses"} icon={expenses2} icon2={expenses} />
                        <SideItems marginT={"300px"} link={'/home/product-orders'} name={"Product Orders"} icon={productOrders2} icon2={productOrders} />
                        <SideItems marginT={"350px"} link={'/home/regulatory'} name={"Regulatory Pay"} icon={regulatory2} icon2={regulatory} />
                        <SideItems marginT={"400px"} link={'/home/inc-orders'} name={"Incoming Orders"} icon={incOrders2} icon2={incOrders} />
                        <SideItems marginT={"450px"} link={'/home/tank'} name={"Tank Update"} icon={tank2} icon2={tank} />
                        <SideItems marginT={"500px"} link={'/home/hr'} name={"Human Resources"} icon={hr2} icon2={hr} />
                        <SideItems marginT={"550px"} link={'/home/settings'} name={"Settings"} icon={settings2} icon2={settings} />
                    </div>
                </div>
            </Drawer>
            <div className='main-content'>
                <div className='mobile-bar'>
                    <AppBar sx={{background:'#06805B', zIndex:'1'}} position="absolute">
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
                                    onClick={()=>{history.push('/login')}}
                                >
                                    <img style={{width:'35px', height:'35px'}} src={switchT} alt="icon" />
                                </IconButton>
                            </div>
                        </Toolbar>
                    </AppBar>
                </div>
                <div className='top-bar-menu'>
                    <div className='left-lobe'>
                        {name}
                    </div>
                    <div className='right-lobe'>
                        <div className='search-icon'>
                            <input className='search-content' type={'text'} placeholder="Search" />
                            <img style={{width:'35px', height:'35px', marginRight:'1px'}} src={search} alt="icon" />
                        </div>
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
                            onClick={()=>{history.push('/login')}}
                        >
                            <img style={{width:'35px', height:'35px'}} src={switchT} alt="icon" />
                        </IconButton>
                    </div>
                </div>
                <Switch>
                    <Route exact path='/home'>
                        <Dashboard/>
                    </Route>
                    <Route path='/home/daily-sales'>
                        <DailySales/>
                    </Route>
                    <Route path='/home/expenses'>
                        <Expenses/>
                    </Route>
                    <Route path='/home/hr'>
                        <HumanResources/>
                    </Route>
                    <Route path='/home/inc-orders'>
                        <IncomingOrders/>
                    </Route>
                    <Route path='/home/outlets'>
                        <Outlets/>
                    </Route>
                    <Route path='/home/payments'>
                        <Payments/>
                    </Route>
                    <Route path='/home/product-orders'>
                        <ProductOrders/>
                    </Route>
                    <Route path='/home/record-sales'>
                        <RecordSales/>
                    </Route>
                    <Route path='/home/regulatory'>
                        <Regulatory/>
                    </Route>
                    <Route path='/home/tank'>
                        <TankUpdate/>
                    </Route>
                    <Route path='/home/settings'>
                        <Settings/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(HomeScreen);
//filling station
//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

// laravel
//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