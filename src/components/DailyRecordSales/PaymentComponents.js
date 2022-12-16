import { Button } from "@mui/material"
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import IncomingService from "../../services/IncomingService";
import OutletService from "../../services/outletService";
import { createIncomingOrder } from "../../store/actions/incomingOrder";
import { getAllOutletTanks } from "../../store/actions/outlet";

const PaymentsComponents = (props) => {

    const [selected, setSelected] = useState(false);
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const allAdminStations = useSelector(state => state.dailyRecordReducer.allAdminStations);
    const singleAdminStation = useSelector(state => state.dailyRecordReducer.singleAdminStation);

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

    const switchPay = (data) => {
        if(data === "bank") setSelected(false);
        if(data === "pos") setSelected(true);
    }

    return(
        <div style={{width:'98%', display:'flex', flexDirection: 'column', alignItems:'center'}}>

            <div className='inner-body'>
                <div className='left'>
                    <div className="butts">
                        <Button 
                            variant="contained" 
                            sx={selected? active: inactive}
                            onClick={()=>{switchPay("bank")}}
                        >
                            Bank Payment
                        </Button>

                        <Button 
                            variant="contained" 
                            sx={selected? inactive: active}
                            onClick={()=>{switchPay("pos")}}
                        >
                            POS Payment
                        </Button>
                    </div>

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

                    {selected ||
                        <div style={{marginTop:'20px'}} className='double-form'>
                            <div className='input-d'>
                                <span>Bank Name</span>
                                <input className='text-field' type={'text'} />
                            </div>

                            <div className='input-d'>
                                <span>Teller ID</span>
                                <input className='text-field' type={'text'} />
                            </div>
                        </div>
                    }

                    {selected &&
                        <div style={{marginTop:'20px'}} className='double-form'>
                            <div className='input-d'>
                                <span>Pos Name</span>
                                <input className='text-field' type={'text'} />
                            </div>

                            <div className='input-d'>
                                <span>Terminal ID</span>
                                <input className='text-field' type={'text'} />
                            </div>
                        </div>
                    }

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Amount Paid</span>
                            <input className='text-field' type={'text'} />
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Payment Date</span>
                            <input className='text-field' type={'date'} />
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

const active = {
    width:'130px',
    height:'35px',
    fontSize:'13px',
    background:'#F0F9F7',
    color:'#000',
    border: '1.80345px solid #646363',
    borderRadius: '27.9534px',
    marginLeft:'10px',
    textTransform:'capitalize',
    '&:hover': {
        backgroundColor: '#F0F9F7'
    }
}

const inactive = {
    width:'130px',
    height:'35px',
    fontSize:'13px',
    textTransform:'capitalize',
    marginLeft:'10px',
    background: '#06805B',
    border: '1.80345px solid #646363',
    borderRadius: '27.9534px',
    '&:hover': {
        backgroundColor: '#06805B'
    }
}

export default PaymentsComponents;