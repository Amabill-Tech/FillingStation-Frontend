import React, { useState } from 'react';
import '../../styles/tanks.scss';

const Tank = () => {

    const [tabs, setTabs] = useState(0);

    const AllTabs = () => {
        return(
            <div className='space'>
                <div className='item'>1</div>
                <div className='item'>2</div>
                <div className='item'>3</div>
                <div className='item'>4</div>
                <div className='item'>5</div>
            </div>
        )
    }

    const PMSTabs = () => {
        return(
            <div className='space'>
                PMS
            </div>
        )
    }

    const AGOTabs = () => {
        return(
            <div className='space'>
                AGO
            </div>
        )
    }

    const DPKTabs = () => {
        return(
            <div className='space'>
                DPK
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
                hello
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

export default Tank;