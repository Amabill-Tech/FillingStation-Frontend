import React, {useEffect, useCallback, useState} from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import ProductOrderModal from '../Modals/ProductOrderModal';
import ProductService from '../../services/productService';
import {createProductOrder, searchProduct} from '../../store/actions/productOrder';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import { adminOutlet, getAllStations } from '../../store/actions/outlet';
import ProductReport from '../Reports/ProductReport';

const mediaMatch = window.matchMedia('(max-width: 530px)');

const ProductOrders = () => {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const productOrder = useSelector(state => state.productOrderReducer.productOrder);
    const oneStationData = useSelector(state => state.outletReducer.adminOutlet);
    const [defaultState, setDefault] = useState(0);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const [currentStation, setCurrentStation] = useState({});
    const [entries, setEntries] = useState(10);
    const [skip, setSkip] = useState(0);
    const [limit, setLimit] = useState(15);
    const [total, setTotal] = useState(0);
    const [prints, setPrints] = useState(false);

    const createOrderHandler = () => {
        setOpen(true);
    }

    const getAllProductData = useCallback(() => {

        const payload = {
            organisation: user._id
        }

        if(user.userType === "superAdmin"){
            OutletService.getAllOutletStations(payload).then(data => {
                dispatch(getAllStations(data.station));
                setDefault(1);
                setCurrentStation(data.station[0]);
                return data.station[0];
            }).then((data)=>{
                const payload = {
                    skip: skip * limit,
                    limit: limit,
                    outletID: data._id, 
                    organisationID: data.organisation
                }
    
                ProductService.getAllProductOrder(payload).then((data) => {
                    setTotal(data.product.count);
                    dispatch(createProductOrder(data.product.product));
                });
            });
        }else{
            OutletService.getOneOutletStation({outletID: user.outletID}).then(data => {
                dispatch(adminOutlet(data.station));
                setCurrentStation(data.station);
                return data.station;
            }).then((data)=>{
                const payload = {
                    skip: skip * limit,
                    limit: limit,
                    outletID: data._id, 
                    organisationID: data.organisation
                }
    
                ProductService.getAllProductOrder(payload).then((data) => {
                    setTotal(data.product.count);
                    dispatch(createProductOrder(data.product.product));
                });
            });
        }
    }, [user._id, user.userType, user.outletID, dispatch, skip, limit]);

    useEffect(()=>{
        getAllProductData();
    },[getAllProductData])

    const refresh = () => {
        const payload = {
            skip: skip * limit,
            limit: limit,
            outletID: currentStation._id, 
            organisationID: currentStation.organisation
        }

        ProductService.getAllProductOrder(payload).then((data) => {
            setTotal(data.product.count);
            dispatch(createProductOrder(data.product.product));
        });
    }

    const changeMenu = (index, item ) => {
        setDefault(index);
        setCurrentStation(item);

        const payload = {
            skip: skip * limit,
            limit: limit,
            outletID: item._id, 
            organisationID: item.organisation
        }

        ProductService.getAllProductOrder(payload).then((data) => {
            setTotal(data.product.count);
            dispatch(createProductOrder(data.product.product));
        });
    }

    const searchTable = (value) => {
        dispatch(searchProduct(value));
    }

    const printReport = () => {
        setPrints(true);
    }

    const entriesMenu = (value, limit) => {
        setEntries(value);
        setLimit(limit);
        refresh();
    }

    const nextPage = () => {
        if(!(skip < 0)){
            setSkip(prev => prev + 1)
        }
        refresh();
    }

    const prevPage = () => {
        if(!(skip <= 0)){
            setSkip(prev => prev - 1)
        } 
        refresh();
    }

    return(
        <div data-aos="zoom-in-down" className='paymentsCaontainer'>
            {<ProductOrderModal station = {currentStation} open={open} close={setOpen} refresh={refresh} />}
            { prints && <ProductReport allOutlets={productOrder} open={prints} close={setPrints}/>}
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
                            {oneStationData.hasOwnProperty("outletName") ||
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={defaultState}
                                    sx={selectStyle2}
                                >
                                    <MenuItem style={menu} value={0}>Select Station</MenuItem>
                                    {
                                        allOutlets.map((item, index) => {
                                            return(
                                                <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index + 1, item)}} value={index + 1}>{item.outletName+ ', ' +item.city}</MenuItem>
                                            )
                                        })  
                                    }
                                </Select>
                            }
                            {oneStationData.hasOwnProperty("outletName") &&
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={0}
                                    sx={selectStyle2}
                                    disabled
                                >
                                    <MenuItem style={menu} value={0}>{oneStationData.hasOwnProperty("outletName")?oneStationData.outletName+", "+oneStationData.city: "No station created"}</MenuItem>
                                </Select>
                            }
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
                            value={entries}
                            sx={selectStyle2}
                        >
                            <MenuItem style={menu} value={10}>Show entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(20, 15)}} style={menu} value={20}>15 entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(30, 30)}} style={menu} value={30}>30 entries</MenuItem>
                            <MenuItem onClick={()=>{entriesMenu(40, 100)}} style={menu} value={40}>100 entries</MenuItem>
                        </Select>
                    </div>
                    <div style={{width: mediaMatch.matches? '100%': '190px'}} className='input-cont2'>
                        <Button sx={{
                            width: mediaMatch.matches? '100%': '100px', 
                            height:'30px',  
                            background: '#58A0DF',
                            borderRadius: '3px',
                            fontSize:'10px',
                            display: mediaMatch.matches && 'none',
                            marginTop: mediaMatch.matches? '10px': '0px',
                            '&:hover': {
                                backgroundColor: '#58A0DF'
                            }
                            }}  variant="contained"> History
                        </Button>
                        <Button sx={{
                            width: mediaMatch.matches? '100%': '80px', 
                            height:'30px',  
                            background: '#F36A4C',
                            borderRadius: '3px',
                            fontSize:'10px',
                            display: mediaMatch.matches && 'none',
                            marginTop: mediaMatch.matches? '10px': '0px',
                            '&:hover': {
                                backgroundColor: '#F36A4C'
                            }
                            }}  
                            onClick={printReport}
                            variant="contained"> Print
                        </Button>
                    </div>
                </div>

                <div className='table-container'>
                    <div className='table-head'>
                        <div className='column'>S/N</div>
                        <div className='column'>Date Created</div>
                        <div className='column'>Depot</div>
                        <div className='column'>Depot Address</div>
                        <div className='column'>Product</div>
                        <div className='column'>Quantity (LTR)</div>
                        <div className='column'>Loading Location</div>
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
                                        <div className='column'>{data.productType}</div>
                                        <div className='column'>{data.quantity}</div>
                                        <div className='column'>{data.loadingLocation}</div>
                                    </div> 
                                )
                            })
                        }
                    </div>
                </div>

                <div className='footer'>
                    <div style={{fontSize:'14px', fontFamily:'Nunito-Regular'}}>
                        Showing {((skip + 1) * limit) - (limit-1)} to {(skip + 1) * limit} of {total} entries
                    </div>
                    <div className='nav'>
                        <button onClick={prevPage} className='but'>Previous</button>
                        <div className='num'>{skip + 1}</div>
                        <button onClick={nextPage} className='but2'>Next</button>
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