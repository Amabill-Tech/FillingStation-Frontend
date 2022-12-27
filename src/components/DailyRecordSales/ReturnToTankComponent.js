import { Button, Radio } from "@mui/material"
import { useState } from "react";
import pump1 from '../../assets/pump1.png';
import cross from '../../assets/cross.png';
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { passRecordSales } from "../../store/actions/dailySales";

const ReturnToTank = (props) => {

    const [productType, setProductType] = useState("PMS");
    const user = useSelector(state => state.authReducer.user);
    const [selected, setSelected] = useState([]);
    const [selectedTanks, setSelectedTanks] = useState([]);
    const formStation = useSelector(state => state.dailyRecordReducer.formStation);
    const dispatch = useDispatch();
    const pumpList = useSelector(state => state.outletReducer.pumpList);
    const tankList = useSelector(state => state.outletReducer.tankList);
    const linkedData = useSelector(state => state.dailySalesReducer.linkedData);
    const singleAdminStation = useSelector(state => state.dailyRecordReducer.singleAdminStation);

    const getPMSPump = () => {
        const newList = [...pumpList];
        const pms = newList.filter(data => data.productType === "PMS");
        const pmsCopy = pms.map(data => Object.assign({}, data));
        return pmsCopy;
    }

    const getAGOPump = () => {
        const newList = [...pumpList];
        const ago = newList.filter(data => data.productType === "AGO");
        const agoCopy = ago.map(data => Object.assign({}, data));
        return agoCopy;
    }

    const getDPKPump = () => {
        const newList = [...pumpList];
        const dpk = newList.filter(data => data.productType === "DPK");
        const dpkCopy = dpk.map(data => Object.assign({}, data));
        return dpkCopy;
    }

    const [pms, setPMS] = useState(getPMSPump());
    const [ago, setAGO] = useState(getAGOPump());
    const [dpk, setDPK] = useState(getDPKPump());

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

    const pumpItem = (e, index, item) => {
        e.preventDefault();
        const tank = tankList.filter(data => data._id === item.hostTank)[0];

        const findID = selected.findIndex(data => data._id === item._id);
        if(findID === -1){
            setSelected(prev => [...prev, item]);

        }else{
            const newList = [...selected]
            newList[findID] = {...item};
            setSelected(newList);
        }

        const tankID = selectedTanks.findIndex(data => data._id === tank._id);
        if(tankID === -1){
            setSelectedTanks(prev => [...prev, tank]);

        }else{
            const newList = [...selectedTanks]
            newList[tankID] = {...tank};
            setSelectedTanks(newList);
        }

        if(productType === "PMS"){
            const newPms = [...pms];
            const findID = newPms.findIndex(data => data._id === item._id);
            newPms[findID].identity = index;
            setPMS(newPms);
        }else if(productType === "AGO"){
            const newAgo = [...ago];
            const findID = newAgo.findIndex(data => data._id === item._id);
            newAgo[findID].identity = index;
            setAGO(newAgo);
        }else{
            const newDpk = [...dpk];
            const findID = newDpk.findIndex(data => data._id === item._id);
            newDpk[findID].identity = index;
            setDPK(newDpk);
        }
    }

    const deselect = (payload) => {
        if(productType === "PMS"){
            const list = [...pms];
            const index = list.indexOf(payload);
            list[index] = {...payload, identity: null}
            setPMS(list);

            const deleted = selected.filter(data => data._id !== payload._id);
            const removeTank = selectedTanks.filter(data => data._id !== payload.hostTank);

            setSelected(deleted);
            setSelectedTanks(removeTank);
        }else if(productType === "AGO"){
            const list = [...ago];
            const index = list.indexOf(payload);
            list[index] = {...payload, identity: null}
            setAGO(list);

            const deleted = selected.filter(data => data._id !== payload._id);
            const removeTank = selectedTanks.filter(data => data._id !== payload.hostTank);

            setSelected(deleted);
            setSelectedTanks(removeTank);
        }else{
            const list = [...dpk];
            const index = list.indexOf(payload);
            list[index] = {...payload, identity: null}
            setDPK(list);

            const deleted = selected.filter(data => data._id !== payload._id);
            const removeTank = selectedTanks.filter(data => data._id !== payload.hostTank);

            setSelected(deleted);
            setSelectedTanks(removeTank);
        }
        
    }

    const updateTotalizer = (e, item) => {
        
        if(productType === "PMS"){
            const newPms = [...pms];
            const findID = newPms.findIndex(data => data._id === item._id);
            newPms[findID].RTlitre = Number(e.target.value);
            setPMS(newPms);

            // const newList = {...linkedData};
            // newList.head.data.payload = selected;
            // dispatch(passRecordSales(newList));
        }else if(productType === "AGO"){
            const newAgo = [...ago];
            const findID = newAgo.findIndex(data => data._id === item._id);
            newAgo[findID].RTlitre = Number(e.target.value);
            setAGO(newAgo);

            // const newList = {...linkedData};
            // newList.head.data.payload = selected;
            // dispatch(passRecordSales(newList));
        }else{
            const newDpk = [...dpk];
            const findID = newDpk.findIndex(data => data._id === item._id);
            newDpk[findID].RTlitre = Number(e.target.value);
            setDPK(newDpk);

            // const newList = {...linkedData};
            // newList.head.data.payload = selected;
            // dispatch(passRecordSales(newList));
        }

        // update tank payload
        const newTankList = [...selectedTanks];
        const tankID = newTankList.findIndex(data => data._id === item.hostTank);
        newTankList[tankID] = {
            ...newTankList[tankID], 
            pumps: selected.filter(data => data.hostTank === newTankList[tankID]._id),
        }
        if(user.userType === "superAdmin"){
            newTankList[tankID] = {
                ...newTankList[tankID], 
                outlet: formStation
            }
        }else{
            newTankList[tankID] = {
                ...newTankList[tankID], 
                outlet: singleAdminStation
            }
        }
        setSelectedTanks(newTankList);
    }


    const setTotalizer = (e, item) => {

        const currentTank = tankList.filter(data => data._id === item.hostTank)[0];
        const quantity = Number(currentTank.currentLevel) + Number(e.target.value);

        if(formStation === null){
            swal("Warning!", "Please select a station", "info");
        }else if(item.identity === null){

            updateTotalizer("0", item);
            swal("Warning!", "Please select a pump", "info");
        }else if(selected.length === 0){
            updateTotalizer("0", item);
            swal("Warning!", "Please select a pump", "info");

        }else{
            if(quantity > Number(currentTank.tankCapacity)){
                updateTotalizer("0", item);
                swal("Warning!", "Reading exceeded tank level", "info");
            }else{
                updateTotalizer(e, item);
            }
        }
    }

    const saveReturnToTank = () => {
        let totalSales = 0;
        for(let tank of selectedTanks){
            for(let pump of tank.pumps){
                totalSales = totalSales + Number(pump.RTlitre);
            }
            const newTankList = [...selectedTanks];
            const findID = selectedTanks.findIndex(data => data._id === tank._id);
            newTankList[findID].RTlitre = totalSales;
            setSelectedTanks(newTankList);
            totalSales = 0
        }

        const newList = {...linkedData};
        newList.head.data.payload = selectedTanks;
        dispatch(passRecordSales(newList));
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
                    pumpList.length === 0?
                    <div style={{...box, width:'170px'}}>
                        <div style={{marginRight:'10px'}}>No pump Created</div>
                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                    </div>:
                    productType === "PMS"?
                    pms.map((data, index) => {
                        return(
                            <div key={index}>
                                {data.identity === index &&
                                    <div className='box'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={()=>{deselect(data)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {data.identity !== index &&
                                    <div className='box2'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={()=>{deselect(data)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    }):
                    productType === "AGO"?
                    ago.map((data, index) => {
                        return(
                            <div key={index} >
                                {data.identity === index &&
                                    <div className='box'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={()=>{deselect(data)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {data.identity !== index &&
                                    <div className='box2'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={()=>{deselect(data)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    }):
                    dpk.map((data, index) => {
                        return(
                            <div key={index} >
                                {data.identity === index &&
                                    <div className='box'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img onClick={()=>{deselect(data)}} style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {data.identity !== index &&
                                    <div className='box2'>
                                        <p onClick={e => pumpItem(e, index, data)} style={{marginRight:'10px'}}>{data.pumpName}</p>
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
                    pumpList.length === 0?
                    <div>Please click to select a pump</div>:
                    productType === "PMS"?
                    pms.map((item, index) => {
                        return(
                            <div style={{height:'230px'}} key={index} className='item'>
                                <img style={{width:'55px', height:'60px', marginTop:'10px'}} src={pump1}  alt="icon"/>
                                <div className='pop'>{item.pumpName}</div>
                                <div style={{marginTop:'10px'}}  className='label'>Date: {item.updatedAt.split('T')[0]}</div>
                                <div>

                                    <div style={{marginTop:'10px'}} className='label'>Quantity (Litres)</div>
                                    <input 
                                        onChange={e => setTotalizer(e, item)} 
                                        style={{...imps, border: (Number(item.totalizerReading) > Number(item.newTotalizer)) && item.newTotalizer !== '0'? '1px solid red': '1px solid black'}} 
                                        type="number" 
                                        defaultValue={"0"}
                                    />
                                </div>
                            </div>
                        )
                    }):
                    productType === "AGO"?
                    ago.map((item, index) => {
                        return(
                            <div style={{height:'230px'}} key={index} className='item'>
                                <img style={{width:'55px', height:'60px', marginTop:'10px'}} src={pump1}  alt="icon"/>
                                <div className='pop'>{item.pumpName}</div>
                                <div style={{marginTop:'10px'}}  className='label'>Date: {item.updatedAt.split('T')[0]}</div>
                                <div>

                                    <div style={{marginTop:'10px'}} className='label'>Quantity (Litres)</div>
                                    <input 
                                        onChange={e => setTotalizer(e, item)} 
                                        defaultValue={"0"}
                                        style={{...imps, border: (Number(item.totalizerReading) > Number(item.newTotalizer)) && item.newTotalizer !== '0'? '1px solid red': '1px solid black'}} 
                                        type="number" 
                                    />
                                </div>
                            </div>
                        )
                    }):
                    dpk.map((item, index) => {
                        return(
                            <div style={{height:'230px'}} key={index} className='item'>
                                <img style={{width:'55px', height:'60px', marginTop:'10px'}} src={pump1}  alt="icon"/>
                                <div className='pop'>{item.pumpName}</div>
                                <div style={{marginTop:'10px'}}  className='label'>Date: {item.updatedAt.split('T')[0]}</div>
                                <div>

                                    <div style={{marginTop:'10px'}} className='label'>Quantity (Litres)</div>
                                    <input 
                                        onChange={e => setTotalizer(e, item)} 
                                        defaultValue={"0"}
                                        style={{...imps, border: (Number(item.totalizerReading) > Number(item.newTotalizer)) && item.newTotalizer !== '0'? '1px solid red': '1px solid black'}} 
                                        type="number" 
                                    />
                                </div>
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
                    onClick={saveReturnToTank}
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

const add = {
    width:'100%',
    display: 'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:'30px'
}

export default ReturnToTank;