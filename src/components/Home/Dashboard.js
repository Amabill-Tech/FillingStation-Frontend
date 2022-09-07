import React from 'react';
import '../../styles/dashboard.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Dashboard = () => {
    return(
        <div className='dashboardContainer'>
            <div className='left-dash'>
                <div className='selectItem'>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={10}
                        sx={selectStyle}
                    >
                        <MenuItem value={10}>07 August, 2022</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={10}
                        sx={selectStyle2}
                    >
                        <MenuItem value={10}>07 August, 2022</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </div>
            </div>
            <div className='right-dash'>

            </div>
        </div>
    )
}

const selectStyle = {
    width:'200px', 
    height:'35px', 
    borderRadius:'5px',
    background: 'linear-gradient(264.74deg, #0A6147 -18.7%, rgba(10, 97, 71, 0.88) 54.22%)',
    color:'#fff',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
}

const selectStyle2 = {
    width:'200px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
}

export default Dashboard;