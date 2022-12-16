import { Button, Radio } from "@mui/material"
import { useState } from "react";
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import cross from '../../assets/cross.png';
import { useDispatch, useSelector } from "react-redux";
import IncomingService from "../../services/IncomingService";
import { createIncomingOrder } from "../../store/actions/incomingOrder";
import OutletService from "../../services/outletService";
import { getAllOutletTanks } from "../../store/actions/outlet";

const LPOComponent = (props) => {

    const [productType, setProductType] = useState("PMS");
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const allAdminStations = useSelector(state => state.dailyRecordReducer.allAdminStations);
    const singleAdminStation = useSelector(state => state.dailyRecordReducer.singleAdminStation);
    const pumpList = useSelector(state => state.outletReducer.pumpList);

    const getPMSPump = () => {
        const pms = pumpList.filter(data => data.productType === "PMS");
        return pms;
    }

    const getAGOPump = () => {
        const ago = pumpList.filter(data => data.productType === "AGO");
        return ago;
    }

    const getDPKPump = () => {
        const dpk = pumpList.filter(data => data.productType === "DPK");
        return dpk;
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
    }

    const selectedStation = (e) => {
        const value = e.target.options[e.target.options.selectedIndex].value;

        const payload = {
            outletID: JSON.parse(value)?._id, 
            organisationID: JSON.parse(value)?.organisation
        }

        IncomingService.getAllIncoming(payload).then((data) => {
            dispatch(createIncomingOrder(data.incoming.incoming));
        });

        OutletService.getAllOutletTanks(payload).then(data => {
            const outletTanks = data.stations.map(data => {
                const newData = {...data, label: data.tankName, value: data._id};
                return newData;
            });
            dispatch(getAllOutletTanks(outletTanks));
        });
    }

    return(
        <div className="inner-body" style={{width:'98%', display:'flex', flexDirection: 'column', alignItems:'center'}}>

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
                            <div key={index} onClick={e => pumpItem(e, index, data)}>
                                {data.identity === index &&
                                    <div className='box'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {data.identity !== index &&
                                    <div className='box2'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    }):
                    productType === "AGO"?
                    ago.map((data, index) => {
                        return(
                            <div key={index} onClick={e => pumpItem(e, index, data)}>
                                {data.identity === index &&
                                    <div className='box'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {data.identity !== index &&
                                    <div className='box2'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    }):
                    dpk.map((data, index) => {
                        return(
                            <div key={index} onClick={e => pumpItem(e, index, data)}>
                                {data.identity === index &&
                                    <div className='box'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                                {data.identity !== index &&
                                    <div className='box2'>
                                        <p style={{marginRight:'10px'}}>{data.pumpName}</p>
                                        <img style={{width:'20px', height:'20px'}} src={cross}  alt="icon"/>
                                    </div>
                                }
                            </div>
                        )
                    })
                }
            </div>

            <div className='inner-body'>
                <div className='left'>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Select Station</span>
                            {user.userType === "superAdmin" &&
                                <select onChange={selectedStation} className='text-field'>
                                    {
                                        allAdminStations.map((data, index) => {
                                            return(
                                                <option value={JSON.stringify(data)} key={index}>{data.outletName}</option>
                                            )
                                        })
                                    }
                                </select>
                            }
                            {user.userType === "superAdmin" ||
                                <select onChange={selectedStation} className='text-field'>
                                    <option value={JSON.stringify(singleAdminStation)}>{singleAdminStation?.outletName}</option>
                                </select>
                            }
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Account Name</span>
                            <select className='text-field'>
                                <option>PMS</option>
                                <option>AGO</option>
                                <option>DPK</option>
                            </select>
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Product Type</span>
                            <select className='text-field'>
                                <option>PMS</option>
                                <option>AGO</option>
                                <option>DPK</option>
                            </select>
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Truck No</span>
                            <select className='text-field'>
                                <option>PMS</option>
                                <option>AGO</option>
                                <option>DPK</option>
                            </select>
                        </div>
                    </div>

                    <div style={{marginTop:'20px'}} className='double-form'>
                        <div className='input-d'>
                            <span>Quantity (Litres)</span>
                            <input className='text-field' type={'text'} />
                        </div>

                        <div className='input-d'>
                            <span>Rate</span>
                            <input className='text-field' type={'text'} />
                        </div>
                    </div>

                    <div style={{marginTop:'30px'}} className='double-form'>
                        <div className='input-d'>
                            <Button 
                                variant="contained" 
                                sx={{
                                    width:'100%',
                                    height:'35px',
                                    background:'#216DB2',
                                    fontSize:'13px',
                                    borderRadius:'5px',
                                    textTransform:'capitalize',
                                    '&:hover': {
                                        backgroundColor: '#216DB2'
                                    }
                                }}
                            >
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={photo} alt="icon" />
                                <span>Take photo</span>
                            </Button>
                        </div>

                        <div className='input-d'>
                            <Button 
                                variant="contained" 
                                sx={{
                                    width:'100%',
                                    height:'35px',
                                    background:'#087B36',
                                    fontSize:'13px',
                                    borderRadius:'5px',
                                    textTransform:'capitalize',
                                    '&:hover': {
                                        backgroundColor: '#087B36'
                                    }
                                }}
                            >
                                <img style={{width:'22px', height:'18px', marginRight:'10px'}} src={upload} alt="icon" />
                                <span>File uploaded</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='right'>
                    <div className="table-head">
                        <div className="col">S/N</div>
                        <div className="col">Transporter</div>
                        <div className="col">Product</div>
                        <div className="col">Quantity</div>
                        <div className="col">Action</div>
                    </div>
                </div>
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

export default LPOComponent;