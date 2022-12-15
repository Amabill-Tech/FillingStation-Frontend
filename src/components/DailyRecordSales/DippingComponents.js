import { Button, Radio } from "@mui/material"
import { useState } from "react";
import me4 from '../../assets/me4.png';

const DippingComponents = (props) => {

    const [productType, setProductType] = useState("PMS");
    const mainTankList = [];

    const onRadioClick = (data) => {
        
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
            
            <div style={{width:'100%'}} className='pmscont'>{productType}</div>

            <div className='pumping'>
                {
                    mainTankList.length === 0?
                    <div style={created}>No PMS tank created</div>:
                    mainTankList.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start', height:'260px', marginLeft:'20px', marginRight:'0px'}} key={index} className='item'>
                                <img style={{width:'80px', height:'65px', marginTop:'15px'}} src={me4}  alt="icon"/>
                                <div style={{marginTop:'0px'}} className='pop'>{item.tankName}</div>
                                <div style={{marginTop:'0px', color:'green'}} className='pop'>{`Tank capacity: ${item.tankCapacity}`}</div>
                                <div style={{marginTop:'10px'}} className='label'>Dipping (Litres)</div>
                                <Button sx={{
                                    width:'140px', 
                                    height:'30px',  
                                    background: '#06805B',
                                    borderRadius: '3px',
                                    fontSize:'12px',
                                    marginTop:'10px',
                                    textTransform: 'capitalize',
                                    '&:hover': {
                                        backgroundColor: '#06805B'
                                    }
                                    }}  
                                    // onClick={()=>{dippingValue(item)}}
                                    variant="contained"> Record Sales
                                </Button>
                                <input defaultValue={item.dipping} style={imps} type="text" />
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

const created = {
    fontSize:'12px',
    marginLeft:'10px',
    marginTop:'20px',
}

const imps = {
    height:'30px', 
    width:'160px', 
    background:'#D7D7D799',
    outline:'none',
    border:'1px solid #000',
    paddingLeft:'10px'
}

export default DippingComponents;