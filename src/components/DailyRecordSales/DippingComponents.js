import { Button, Radio } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import me4 from '../../assets/me4.png';
import { passRecordSales } from "../../store/actions/dailySales";

const DippingComponents = (props) => {

    const [productType, setProductType] = useState("PMS");
    const tankList = useSelector(state => state.outletReducer.tankList);
    const dispatch = useDispatch();
    const linkedData = useSelector(state => state.dailySalesReducer.linkedData);
    const [selected, setSelected] = useState([]);

    const getPMSPump = () => {
        const newList = [...tankList];
        const pms = newList.filter(data => data.productType === "PMS");
        const pmsCopy = pms.map(data => Object.assign({}, data));
        return pmsCopy;
    }

    const getAGOPump = () => {
        const newList = [...tankList];
        const ago = newList.filter(data => data.productType === "AGO");
        const agoCopy = ago.map(data => Object.assign({}, data));
        return agoCopy;
    }

    const getDPKPump = () => {
        const newList = [...tankList];
        const dpk = newList.filter(data => data.productType === "DPK");
        const dpkCopy = dpk.map(data => Object.assign({}, data));
        return dpkCopy;
    }

    const [pms] = useState(getPMSPump());
    const [ago] = useState(getAGOPump());
    const [dpk] = useState(getDPKPump());

    const onRadioClick = (data) => {
        if(data === "PMS"){
            setProductType('PMS');
        }
        
        if(data === "AGO"){
            setProductType('AGO');
        }

        if(data === "DPK"){
            setProductType('DPK');
        }
    }

    const setTotalizer = (e, item) => {
        let clonedPMS = {...item};
        clonedPMS = {...clonedPMS, dippingValue: e.target.value}
        const findID = selected.findIndex(data => data._id === item._id);

        if(findID === -1){
            setSelected(prev => [...prev, clonedPMS])

        }else{
            const newList = [...selected]
            newList[findID] = clonedPMS;
            setSelected(newList);
        }
    }

    const saveDippingValues = () => {
        const newList = {...linkedData};
        newList.head.data.payload = selected;
        dispatch(passRecordSales(newList));
    }

    return(
        <div style={{flexDirection: 'column', alignItems:'flex-start'}} className='inner-body'>

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
                    tankList.length === 0?
                    <div style={created}>No PMS tank created</div>:
                    productType === "PMS"?
                    pms.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start', height:'210px', marginLeft:'20px', marginRight:'0px'}} key={index} className='item'>
                                <img style={{width:'80px', height:'65px', marginTop:'15px'}} src={me4}  alt="icon"/>
                                <div style={{marginTop:'0px'}} className='pop'>{item.tankName}</div>
                                <div style={{marginTop:'0px', color:'green'}} className='pop'>{`Tank capacity: ${item.tankCapacity}`}</div>
                                <div style={{marginTop:'10px'}} className='label'>Dipping (Litres)</div>

                                <input onChange={e => setTotalizer(e, item)} defaultValue={"0"} style={imps} type="text" />
                            </div>
                        )
                    }):
                    productType === "AGO"?
                    ago.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start', height:'210px', marginLeft:'20px', marginRight:'0px'}} key={index} className='item'>
                                <img style={{width:'80px', height:'65px', marginTop:'15px'}} src={me4}  alt="icon"/>
                                <div style={{marginTop:'0px'}} className='pop'>{item.tankName}</div>
                                <div style={{marginTop:'0px', color:'green'}} className='pop'>{`Tank capacity: ${item.tankCapacity}`}</div>
                                <div style={{marginTop:'10px'}} className='label'>Dipping (Litres)</div>

                                <input onChange={e => setTotalizer(e, item)} defaultValue={"0"} style={imps} type="text" />
                            </div>
                        )
                    }):
                    dpk.map((item, index) => {
                        return(
                            <div style={{justifyContent:'flex-start', height:'210px', marginLeft:'20px', marginRight:'0px'}} key={index} className='item'>
                                <img style={{width:'80px', height:'65px', marginTop:'15px'}} src={me4}  alt="icon"/>
                                <div style={{marginTop:'0px'}} className='pop'>{item.tankName}</div>
                                <div style={{marginTop:'0px', color:'green'}} className='pop'>{`Tank capacity: ${item.tankCapacity}`}</div>
                                <div style={{marginTop:'10px'}} className='label'>Dipping (Litres)</div>

                                <input onChange={e => setTotalizer(e, item)} defaultValue={"0"} style={imps} type="text" />
                            </div>
                        )
                    })
                }
            </div>

            <div style={add}>
                <Button sx={{
                    width:'80px', 
                    height:'30px',  
                    background: '#427BBE',
                    borderRadius: '3px',
                    fontSize:'11px',
                    '&:hover': {
                        backgroundColor: '#427BBE'
                    }
                    }}  
                    onClick={saveDippingValues}
                    variant="contained"> 
                    save
                </Button>
                {linkedData.head.data.payload.length !== 0 &&
                    <span style={{fontWeight:'600', color:'green', marginLeft:'10px'}}>Done !!</span>
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
    width:'170px', 
    background:'#D7D7D799',
    outline:'none',
    border:'1px solid #000',
    paddingLeft:'10px',
    marginTop:'10px'
}

const add = {
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    marginTop:'30px'
}

export default DippingComponents;