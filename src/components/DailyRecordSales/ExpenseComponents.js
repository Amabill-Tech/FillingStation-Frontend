import { Button } from "@mui/material";
import photo from '../../assets/photo.png';
import upload from '../../assets/upload.png';
import { useDispatch, useSelector } from "react-redux";
import IncomingService from "../../services/IncomingService";
import { createIncomingOrder } from "../../store/actions/incomingOrder";
import { getAllOutletTanks } from "../../store/actions/outlet";
import OutletService from "../../services/outletService";

const ExpenseComponents = (props) => {

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

    return(
        <div style={{width:'98%', display:'flex', flexDirection: 'column', alignItems:'center'}}>

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
                            <span>Expense Name</span>
                            <input className='text-field' type={'text'} />
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Description</span>
                            <textarea style={{height:'100px'}} className='text-field' type={'text'}> </textarea>
                        </div>
                    </div>

                    <div className='single-form'>
                        <div className='input-d'>
                            <span>Expense Amount</span>
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

export default ExpenseComponents;