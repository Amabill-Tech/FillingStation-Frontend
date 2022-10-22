import React from 'react';
import '../../styles/hr.scss';
import hr1 from '../../assets/hr1.png';
import hr11 from '../../assets/hr11.png';
import hr3 from '../../assets/hr3.png';
import hr5 from '../../assets/hr5.png';
import me6 from '../../assets/me6.png';
import { Switch, Route } from 'react-router-dom';
import Employee from '../HRComponents/Employee';
import Manager from '../HRComponents/Manager';
import Salary from '../HRComponents/Salary';
import Query from '../HRComponents/Query';
import Attendance from '../HRComponents/Attendance';
import { useSelector } from 'react-redux';

const HumanResource = (props) => {

    const handleNavigation = (data) => {
        if(data.name === 'Employee'){
            props.history.push('/home/hr/manager');
        }else if(data.name === 'Salary structure'){
            props.history.push('/home/hr/salary');
        }else if(data.name === 'Query'){
            props.history.push('/home/hr/query');
        }else if(data.name === 'Attendance'){
            props.history.push('/home/hr/attendance');
        }
    }

    const DashboardImage = (props) => {
        return(
            <div data-aos="flip-left" onClick={()=>{handleNavigation(props)}} className='first-image'>
                <div style={{marginRight:'10px'}} className='inner-first-image'>
                    <div className='top-first-image'>
                        <div className='top-icon'>
                            <img style={{width:'60px', height:'50px'}} src={props.image} alt="icon" />
                        </div>
                        <div style={{justifyContent:'flex-end'}} className='top-text'>
                            <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>{props.name}</div>
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
        <div data-aos="zoom-in-down" className='hrContainer'>
            { props.activeRoute.split('/').length === 3 &&
                <div style={contain2}>
                    <div className='imgContainer'>
                        <DashboardImage image={hr1} name={'Employee'} value={'41'} />
                        <DashboardImage image={hr11} name={'Salary structure'} value={'41'} />
                        <DashboardImage image={hr3} name={'Query'} value={'41'} />
                        <DashboardImage image={hr5} name={'Attendance'} value={'41'} />
                    </div>
                </div>
            }

            { props.activeRoute.split('/').length === 4 &&
                <div style={contain}>
                    <Switch>
                        <Route path='/home/hr/manager'>
                            <Manager history={props.history}/>
                        </Route>
                        <Route path='/home/hr/employee'>
                            <Employee/>
                        </Route>
                        <Route path='/home/hr/salary'>
                            <Salary/>
                        </Route>
                        <Route path='/home/hr/query'>
                            <Query/>
                        </Route>
                        <Route path='/home/hr/attendance'>
                            <Attendance  />
                        </Route>
                    </Switch>
                </div>
            }
        </div>
    )
}

const contain = {
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
}

const contain2 = {
    width:'96%',
    marginLeft:'2%'
}

export default HumanResource;