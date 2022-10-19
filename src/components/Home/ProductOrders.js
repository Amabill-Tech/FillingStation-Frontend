import React, {useEffect, useCallback, useState} from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import ProductOrderModal from '../Modals/ProductOrderModal';
import ProductService from '../../services/productService';
import {createProductOrder} from '../../store/actions/productOrder';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import { getAllStations } from '../../store/actions/outlet';

const ProductOrders = () => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const productOrder = useSelector(state => state.productOrderReducer.productOrder);
    const [defaultState, setDefault] = useState(0);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);

    const createOrderHandler = () => {
        setOpen(true);
    }

    const getAllProductData = useCallback(() => {

        const payload = {
            organizationID: user._id
        }

        ProductService.getAllProductOrder(payload).then((data) => {
            dispatch(createProductOrder(data));
        });

        OutletService.getAllOutletStations({organisation: user._id}).then(data => {
            dispatch(getAllStations(data.station));
        });
    }, [dispatch, user._id]);

    useEffect(()=>{
        getAllProductData();
    },[getAllProductData])

    const changeMenu = (index, item ) => {
        setDefault(index);
    }

    const searchTable = (value) => {
        //dispatch(searchQuery(value));
    }

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            {<ProductOrderModal open={open} close={setOpen} refresh={getAllProductData} />}
            <div className='inner-pay'>
                <div className='action'>
                    <div style={{width:'150px'}} className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={{...selectStyle2, backgroundColor:"#06805B", color:'#fff'}}
                        >
                            <MenuItem value={10}>Actions</MenuItem>
                            <MenuItem onClick={createOrderHandler} value={20}>Create Order</MenuItem>
                            <MenuItem value={30}>Download PDF</MenuItem>
                            <MenuItem value={40}>Print</MenuItem>
                        </Select>
                    </div>
                </div>

                <div className='search'>
                    <div className='input-cont'>
                        <div className='second-select'>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={defaultState}
                                sx={selectStyle2}
                            >
                                {
                                   allOutlets.map((item, index) => {
                                        return(
                                            <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index, item)}} value={index}>{item.outletName}</MenuItem>
                                        )
                                   })  
                                }
                            </Select>
                        </div>
                        <div className='second-select'>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px',  
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} 
                                    type='text'
                                    placeholder="Search" 
                                    onChange={(e) => {searchTable(e.target.value)}}
                                />
                        </div>
                    </div>
                    <div style={{width:'120px'}} className='butt'>
                        <Button sx={{
                            width:'100%', 
                            height:'30px',  
                            background: '#427BBE',
                            borderRadius: '3px',
                            fontSize:'10px',
                            '&:hover': {
                                backgroundColor: '#427BBE'
                            }
                            }}  
                            onClick={createOrderHandler}
                            variant="contained"> Create Order
                        </Button>
                    </div>
                </div>

                <div className='search2'>
                    <div className='butt2'>
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={10}
                            sx={selectStyle2}
                        >
                            <MenuItem value={10}>Show entries</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </div>
                    <div style={{width:'210px'}} className='input-cont2'>
                        <div className='second-select2'>
                            <Button sx={{
                                width:'100%', 
                                height:'30px',  
                                background: '#58A0DF',
                                borderRadius: '3px',
                                fontSize:'10px',
                                '&:hover': {
                                    backgroundColor: '#58A0DF'
                                }
                                }}  variant="contained"> Download PDF
                            </Button>
                        </div>
                        <div className='second-select3'>
                            <Button sx={{
                                width:'100%', 
                                height:'30px',  
                                background: '#F36A4C',
                                borderRadius: '3px',
                                fontSize:'10px',
                                '&:hover': {
                                    backgroundColor: '#F36A4C'
                                }
                                }}  variant="contained"> Print
                            </Button>
                        </div>
                    </div>
                </div>

                <div className='table-container'>
                    <div className='table-head'>
                        <div className='column'>S/N</div>
                        <div className='column'>Date Created</div>
                        <div className='column'>Depot</div>
                        <div className='column'>Depot Address</div>
                        <div className='column'>Quantity (LTR)</div>
                        <div className='column'>Loading Location</div>
                        <div className='column'>Status</div>
                    </div>

                    <div className='row-container'>
                        {
                            productOrder.length === 0?
                            <div style={place}>No product data</div>:
                            productOrder.map((data, index) => {
                                return(
                                    <div className='table-head2'>
                                        <div className='column'>{index + 1}</div>
                                        <div className='column'>{data.dateCreated}</div>
                                        <div className='column'>{data.depot}</div>
                                        <div className='column'>{data.depotAddress}</div>
                                        <div className='column'>{data.quantity}</div>
                                        <div className='column'>{data.loadingLocation}</div>
                                        <div className='column'>{data.status}</div>
                                    </div> 
                                )
                            })
                        }
                    </div>
                </div>

                <div className='footer'>
                    <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>Showing 1 to 11 of 38 entries</div>
                    <div className='nav'>
                        <button className='but'>Previous</button>
                        <div className='num'>1</div>
                        <button className='but2'>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const selectStyle2 = {
    width:'100%', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none'
}

const place = {
    width:'100%',
    textAlign:'center',
    fontSize:'14px',
    fontFamily:'Nunito-Regular',
    marginTop:'20px',
    color:'green'
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

export default ProductOrders;