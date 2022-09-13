import React from 'react';
import '../../styles/hr.scss';
import hr1 from '../../assets/hr1.png';
import hr11 from '../../assets/hr11.png';
import hr3 from '../../assets/hr3.png';
import hr4 from '../../assets/hr4.png';
import hr5 from '../../assets/hr5.png';
import me6 from '../../assets/me6.png';

const HumanResource = (props) => {

    const handleNavigation = (data) => {
        if(data.name === 'Employee'){
            props.history.push('/home/employee');
        }else if(data.name === 'Salary structure'){
            props.history.push('/home/salary');
        }else if(data.name === 'Query'){
            props.history.push('/home/query');
        }else if(data.name === 'Recruitment'){
            props.history.push('/home/recruitment');
        }else if(data.name === 'Attendance'){
            props.history.push('/home/attendance');
        }
    }

    const DashboardImage = (props) => {
        return(
            <div onClick={()=>{handleNavigation(props)}} className='first-image'>
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
        <div className='hrContainer'>
            <div className='imgContainer'>
                <DashboardImage image={hr1} name={'Employee'} value={'41'} />
                <DashboardImage image={hr11} name={'Salary structure'} value={'41'} />
                <DashboardImage image={hr3} name={'Query'} value={'41'} />
                <DashboardImage image={hr4} name={'Recruitment'} value={'41'} />
            </div>
            <div className='imgContainer2'>
                <DashboardImage image={hr5} name={'Attendance'} value={'41'} />
            </div>
        </div>
    )
}

export default HumanResource;