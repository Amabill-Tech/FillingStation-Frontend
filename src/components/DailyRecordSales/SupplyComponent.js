import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useDispatch, useSelector } from "react-redux";
import IncomingService from "../../services/IncomingService";
import OutletService from "../../services/outletService";
import { createIncomingOrder } from "../../store/actions/incomingOrder";
import { getAllOutletTanks } from "../../store/actions/outlet";

const SupplyComponent = () => {

    const [selected, setSelected] = useState([]);
    const dispatch = useDispatch();
    const linkedData = useSelector(state => state.dailySalesReducer.linkedData);
    const user = useSelector(state => state.authReducer.user);
    const allAdminStations = useSelector(state => state.dailyRecordReducer.allAdminStations);
    const singleAdminStation = useSelector(state => state.dailyRecordReducer.singleAdminStation);
    const incomingOrder = useSelector(state => state.incomingOrderReducer.incomingOrder);
    const tankList = useSelector(state => state.outletReducer.tankList);

    // payload data
    const [transporter, setTransporter] = useState('');
    const [waybillNo, setWaybillNo] = useState('');
    const [productSupply, setProductSupply] = useState('');
    const [quantityLoaded, setQuantityLoaded] = useState('');
    const [quantityDischarge, setQuantityDischarge] = useState('');

    // console.log(linkedData, "supply sales");
    // console.log(allAdminStations, "allAdminStations");
    // console.log(singleAdminStation, "singleAdminStation");

    const selectedIncomingOrder = (e) => {
        const value = e.target.options[e.target.options.selectedIndex].value;

        setTransporter(JSON.parse(value).transporter);
        setWaybillNo(JSON.parse(value).wayBillNo);
        setProductSupply(JSON.parse(value).product);
        setQuantityLoaded(JSON.parse(value).quantity);
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

                <div style={{marginTop:'20px'}} className='double-form'>
                    <div className='input-d'>
                        <span>Incoming Order ID</span>
                        <select onChange={selectedIncomingOrder} className='text-field'>
                            <option>Select Incoming Order ID</option>
                            {
                                incomingOrder.map((data, index) => {
                                    return(
                                        <option value={JSON.stringify(data)} key={index}>{data._id}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className='input-d'>
                        <span>Transporter</span>
                        <input disabled value={transporter} onChange={e => setTransporter(e.target.value)} className='text-field' type={'text'} />
                    </div>
                </div>

                <div className='single-form'>
                    <div className='input-d'>
                        <span>Waybill No</span>
                        <input disabled value={waybillNo} onChange={e => setWaybillNo(e.target.value)} className='text-field' type={'text'} />
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='double-form'>
                    <div className='input-d'>
                        <span>Product Supply</span>
                        <input disabled value={productSupply} onChange={e => setProductSupply(e.target.value)} className='text-field' type={'text'} />
                    </div>

                    <div className='input-d'>
                        <span>Quantity Loaded</span>
                        <input disabled value={quantityLoaded} onChange={e => setQuantityLoaded(e.target.value)} className='text-field' type={'text'} />
                    </div>
                </div>

                <div className='single-form'>
                    <div className='input-d'>
                        <span>Select tanks</span>
                        <MultiSelect
                            options={tankList}
                            value = {selected}
                            onChange = {setSelected}
                            className="multiple"
                        />
                    </div>
                </div>

                <div className="tanks">
                    {
                        selected.map(data => {
                            return(
                                <div className="items">
                                    <span>{data.label}</span>
                                    <input className="tank-input" type={'text'} />
                                </div>
                            )
                        })
                    }
                </div>

                <div style={{marginTop:'20px'}} className='double-form'>
                    <div className='input-d'>
                        <span>Shortage</span>
                        <input className='text-field' type={'text'} />
                    </div>

                    <div className='input-d'>
                        <span>Overage</span>
                        <input className='text-field' type={'text'} />
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
    )
}

export default SupplyComponent;