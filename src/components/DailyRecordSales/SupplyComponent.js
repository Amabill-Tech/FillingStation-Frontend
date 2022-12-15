import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const SupplyComponent = () => {

    const [selected, setSelected] = useState([]);

    const options = [
        {label: "Grapes", value:"grapes"},
        {label: "Mango", value:"mango"},
        {label: "Strawberry", value:"strawberry", disabled: true},
    ]

    return(
        <div className='inner-body'>
            <div className='left'>
                <div className='double-form'>
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