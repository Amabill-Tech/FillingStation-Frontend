import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { useSelector } from "react-redux";

const SupplyComponent = () => {

    const [selected, setSelected] = useState([]);
    const linkedData = useSelector(state => state.dailySalesReducer.linkedData);
    const user = useSelector(state => state.authReducer.user);
    const allAdminStations = useSelector(state => state.dailyRecordReducer.allAdminStations);
    const singleAdminStation = useSelector(state => state.dailyRecordReducer.singleAdminStation);
    console.log(linkedData, "supply sales");
    console.log(allAdminStations, "allAdminStations");
    console.log(singleAdminStation, "singleAdminStation");
    // console.log(selected, "selected")

    const options = [
        {label: "Tank 1", value:"grapes"},
        {label: "Tank 2", value:"mango"},
        {label: "Tank 3", value:"strawberry"},
    ]

    const getAllSupplyDetails = useCallback(() => {
        // const payload = {
        //     outletID: data._id, 
        //     organisationID: data.organisation
        // }

        // IncomingService.getAllIncoming(payload).then((data) => {
        //     setTotal(data.incoming.count);
        //     dispatch(createIncomingOrder(data.incoming.incoming));
        // });
    }, [])

    useEffect(()=> {
        getAllSupplyDetails()
    }, [getAllSupplyDetails]);

    return(
        <div className='inner-body'>
            <div className='left'>
                <div className='single-form'>
                    <div className='input-d'>
                        <span>Select Station</span>
                        {user.userType === "superAdmin" &&
                            <select className='text-field'>
                                {
                                    allAdminStations.map((data, index) => {
                                        return(
                                            <option value={data} key={index}>{data.outletName}</option>
                                        )
                                    })
                                }
                            </select>
                        }
                        {user.userType === "superAdmin" ||
                            <select className='text-field'>
                                <option value={singleAdminStation}>{singleAdminStation?.outletName}</option>
                            </select>
                        }
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='double-form'>
                    <div className='input-d'>
                        <span>Incoming Order ID</span>
                        <input className='text-field' type={'text'} />
                    </div>

                    <div className='input-d'>
                        <span>Transporter</span>
                        <input className='text-field' type={'text'} />
                    </div>
                </div>

                <div className='single-form'>
                    <div className='input-d'>
                        <span>Waybill No</span>
                        <input className='text-field' type={'text'} />
                    </div>
                </div>

                <div className='single-form'>
                    <div className='input-d'>
                        <span>Product Supply</span>
                        <select className='text-field'>
                            <option>PMS</option>
                            <option>AGO</option>
                            <option>DPK</option>
                        </select>
                    </div>
                </div>

                <div style={{marginTop:'20px'}} className='double-form'>
                    <div className='input-d'>
                        <span>Quantity Loaded</span>
                        <input className='text-field' type={'text'} />
                    </div>

                    <div className='input-d'>
                        <span>Quantity Discharge</span>
                        <input className='text-field' type={'text'} />
                    </div>
                </div>

                <div className='single-form'>
                    <div className='input-d'>
                        <span>Select tanks</span>
                        <MultiSelect
                            options={options}
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