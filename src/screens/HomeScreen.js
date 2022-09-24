import React, { useEffect, useState, useMemo } from 'react';
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
import analysis from '../assets/analysis.png';
import lpo from '../assets/lpo.png';
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
import HumanResources from '../components/Home/HumanResource';
import IncomingOrders from '../components/Home/IncomingOrders';
import Outlets from '../components/Home/Outlets';
import ProductOrders from '../components/Home/ProductOrders';
import RecordSales from '../components/Home/RecordSales';
import Regulatory from '../components/Home/Regulatory';
import Settings from '../components/Home/Settings';
import TankUpdate from '../components/Home/TankUpdate';
import Analysis from '../components/Home/Analysis';
import LPO from '../components/RecordSales/LPO';
import Supply from '../components/Home/Supply';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const HomeScreen = ({history}) => {

    const routes = useMemo(()=>{
        return(
            {
                '/home': 'Dashboard',
                '/home/daily-sales': 'Daily Sales',
                '/home/payments': 'Payments',
                '/home/outlets': 'My Outlets',
                '/home/outlets/tanks': 'Outlet Tanks',
                '/home/outlets/pumps': 'Outlet Pumps',
                '/home/outlets/sales': 'Outlet Sales',
                '/home/record-sales': 'Record Sales',
                '/home/record-sales/lpo': 'LPO',
                '/home/record-sales/expenses': 'Expenses',
                '/home/record-sales/payment': 'Payment',
                '/home/analysis': 'Analysis',
                '/home/lpo': 'LPO',
                '/home/product-orders': 'Product Orders',
                '/home/inc-orders': 'Incoming Orders',
                '/home/supply': 'Supply',
                '/home/regulatory': 'Regulatory Pay',
                '/home/tank': 'Tank Update',
                '/home/hr': 'Human Resources',
                '/home/hr/employee': 'Employees',
                '/home/hr/salary': 'Salary Structures',
                '/home/hr/query': 'Query',
                '/home/hr/recruitment': 'Recruitment',
                '/home/hr/attendance': 'Attendance',
            }
        )
    }, [])

    const [activeRoute, setActiveRoute] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');

    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    history.listen((location) => {
        setActiveRoute(location.pathname);
        setName(routes[history.location.pathname]);
    })

    const setNames = (name) => {
        setName(name)
    }

    useEffect(()=>{
        setActiveRoute(history.location.pathname);
        setName(routes[history.location.pathname]);
    }, [history.location.pathname, routes]);

    const SideItems = (props) => {

        return(
            <Link className='link' to={props.link}>
                <div onClick={()=>{setNames(props.name)}} style={{marginTop: props.marginT}} className='item-container'>
                    {
                        activeRoute.split('/')[2] === props.link.split('/')[2]?
                        <div className='side-item'>
                            <div className='side-focus'>
                                <div className='side-focus-image'>
                                    <img style={{width:'100%', height:'100%'}} src={active} alt="icon" />
                                </div>
                                <div className='side-focus-text'>
                                    <img style={{width:'18px', height:'18px', marginRight:'10px'}} src={props.icon} alt="icon" />
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
                    <SideItems marginT={"45px"} link={'/home/daily-sales'} name={"Daily Sales"} icon={dailySales2} icon2={dailySales} />
                    <SideItems marginT={"90px"} link={'/home/outlets'} name={"My Outlets"} icon={outlet2} icon2={outlet} />
                    <SideItems marginT={"135px"} link={'/home/record-sales'} name={"Record Sales"} icon={recordSales2} icon2={recordSales} />
                    <SideItems marginT={"180px"} link={'/home/analysis'} name={"Analysis"} icon={analysis} icon2={analysis} />
                    <SideItems marginT={"225px"} link={'/home/lpo'} name={"LPO"} icon={lpo} icon2={lpo} />
                    <SideItems marginT={"270px"} link={'/home/product-orders'} name={"Product Orders"} icon={productOrders2} icon2={productOrders} />
                    <SideItems marginT={"315px"} link={'/home/inc-orders'} name={"Incoming Orders"} icon={incOrders2} icon2={incOrders} />
                    <SideItems marginT={"360px"} link={'/home/supply'} name={"Supply"} icon={expenses2} icon2={expenses} />
                    <SideItems marginT={"405px"} link={'/home/regulatory'} name={"Regulatory Pay"} icon={regulatory2} icon2={regulatory} />
                    <SideItems marginT={"450px"} link={'/home/tank'} name={"Tank Update"} icon={tank2} icon2={tank} />
                    <SideItems marginT={"495px"} link={'/home/hr'} name={"Human Resources"} icon={hr2} icon2={hr} />
                    <SideItems marginT={"540px"} link={'/home/settings'} name={"Settings"} icon={settings2} icon2={settings} />
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
                        <SideItems marginT={"45px"} link={'/home/daily-sales'} name={"Daily Sales"} icon={dailySales2} icon2={dailySales} />
                        <SideItems marginT={"90px"} link={'/home/outlets'} name={"My Outlets"} icon={outlet2} icon2={outlet} />
                        <SideItems marginT={"135px"} link={'/home/record-sales'} name={"Record Sales"} icon={recordSales2} icon2={recordSales} />
                        <SideItems marginT={"180px"} link={'/home/analysis'} name={"Analysis"} icon={analysis} icon2={analysis} />
                        <SideItems marginT={"225px"} link={'/home/lpo'} name={"LPO"} icon={lpo} icon2={lpo} />
                        <SideItems marginT={"270px"} link={'/home/product-orders'} name={"Product Orders"} icon={productOrders2} icon2={productOrders} />
                        <SideItems marginT={"315px"} link={'/home/inc-orders'} name={"Incoming Orders"} icon={incOrders2} icon2={incOrders} />
                        <SideItems marginT={"360px"} link={'/home/supply'} name={"Supply"} icon={expenses2} icon2={expenses} />
                        <SideItems marginT={"405px"} link={'/home/regulatory'} name={"Regulatory Pay"} icon={regulatory2} icon2={regulatory} />
                        <SideItems marginT={"450px"} link={'/home/tank'} name={"Tank Update"} icon={tank2} icon2={tank} />
                        <SideItems marginT={"495px"} link={'/home/hr'} name={"Human Resources"} icon={hr2} icon2={hr} />
                        <SideItems marginT={"540px"} link={'/home/settings'} name={"Settings"} icon={settings2} icon2={settings} />
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
                    <Route path='/home/hr'>
                        <HumanResources 
                            history={history}
                            activeRoute={activeRoute}
                        />
                    </Route>
                    <Route path='/home/inc-orders'>
                        <IncomingOrders/>
                    </Route>
                    <Route path='/home/outlets'>
                        <Outlets 
                            history={history}
                            activeRoute={activeRoute}
                        />
                    </Route>
                    <Route path='/home/product-orders'>
                        <ProductOrders/>
                    </Route>
                    <Route path='/home/analysis'>
                        <Analysis/>
                    </Route>
                    <Route path='/home/lpo'>
                        <LPO/>
                    </Route>
                    <Route path='/home/supply'>
                        <Supply/>
                    </Route>
                    <Route path='/home/record-sales'>
                        <RecordSales history={history}/>
                    </Route>
                    <Route path='/home/regulatory'>
                        <Regulatory/>
                    </Route>
                    <Route path='/home/tank'>
                        <TankUpdate/>
                    </Route>
                    <Route path='/home/settings'>
                        <Settings history={history}/>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(HomeScreen);
//filling station
// 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