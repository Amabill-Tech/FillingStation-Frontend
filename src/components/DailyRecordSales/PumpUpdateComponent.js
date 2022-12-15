import { Radio } from "@mui/material"
import { useState } from "react";
import pump1 from '../../assets/pump1.png';
import cross from '../../assets/cross.png';

const PumpUpdateComponent = (props) => {

    const [productType, setProductType] = useState("PMS");
    const mainPumpList = []

    const onRadioClick = (data) => {
        
    }

    const pumpItem = (e, index, item) => {
        e.preventDefault();

    
    }

    const deselect = (item) => {
        
    }

    const setTotalizer = (e, item) => {
        
    }

    return(
        <div style={{flexDirection: 'column', alignItems:'center'}} className='inner-body'>

            <div style={rad} className='radio'>
                <div className='rad-item'>
                    <Radio {...props}
                        sx={{
                            '&, &.Mui-checked': {
                            color: '#054834',
                            },
                        }} 
                        onClick={()=>onRadioClick("PMS")} 
                        checked={productType === 'PMS'? true: false} 
                    />
                    <div className='head-text2' style={{marginRight:'5px', fontSize:'12px'}}>PMS</div>
                </div>
                <div className='rad-item'>
                    <Radio {...props}
                        sx={{
                            '&, &.Mui-checked': {
                            color: '#054834',
                            },
                        }}
                        onClick={()=>onRadioClick("AGO")} 
                        checked={productType === 'AGO'? true: false} 
                    />
                    <div className='head-text2' style={{marginRight:'5px', fontSize:'12px'}}>AGO</div>
                </div>
                <div className='rad-item'>
                    <Radio {...props}
                        sx={{
                            '&, &.Mui-checked': {
                            color: '#054834',
                            },
                        }} 
                        onClick={()=>onRadioClick("DPK")} 
                        checked={productType === 'DPK'? true: false} 
                    />
                    <div className='head-text2' style={{marginRight:'5px', fontSize:'12px'}}>DPK</div>
                </div>
            </div>
            
            <div style={{marginTop:'10px', marginBottom:'10px'}}>Select Pump used for the day</div>
            <div style={{flexDirection:'row', justifyContent:'center'}} className='pump-list'>
                {
                    mainPumpList.length === 0?
                    <div style={{...box, width:'170px'}}>
                        <div style={{marginRight:'10px'}}>No pump Created</div>
                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                    </div>:
                    mainPumpList.map((data, index) => {
                        return(
                            <div key={index} onClick={e => pumpItem(e, index, data)}>
                                {data.identity === index &&
                                    <div className='box'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={()=>{deselect(data)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {data.identity !== index &&
                                    <div className='box2'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={()=>{deselect(data)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>

            <div style={{width:'100%', marginTop:'20px', justifyContent:'center'}} className='pumping'>
                {
                    mainPumpList.length === 0?
                    <div>Please click to select a pump</div>:
                    mainPumpList.map((item, index) => {
                        return(
                            <div style={{height:'300px'}} key={index} className='item'>
                                <img style={{width:'55px', height:'60px', marginTop:'10px'}} src={pump1}  alt="icon"/>
                                <div className='pop'>{item.pumpName}</div>
                                <div style={{marginTop:'10px'}}  className='label'>Date: {item.updatedAt.split('T')[0]}</div>
                                <div>
                                    <div style={{marginTop:'10px'}} className='label'>Opening meter (Litres)</div>
                                    <input disabled={true} defaultValue={item.totalizerReading} style={imps} type="text" />

                                    <div style={{marginTop:'10px'}} className='label'>Closing meter (Litres)</div>
                                    <input 
                                        onChange={e => setTotalizer(e, item)} 
                                        defaultValue={item.closingMeter} 
                                        style={{...imps, border: (Number(item.totalizerReading) > Number(item.closingMeter)) && item.closingMeter !== '0'? '1px solid red': '1px solid black'}} 
                                        type="text" 
                                    />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const rad = {
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center'
}

const box = {
    width: '100px',
    height: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06805B',
    borderRadius: '30px',
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    marginRight: '10px',
    marginTop: '10px',
}

const imps = {
    height:'30px', 
    width:'160px', 
    background:'#D7D7D799',
    outline:'none',
    border:'1px solid #000',
    paddingLeft:'10px'
}

export default PumpUpdateComponent;