import React, {useState} from 'react';
import '../../styles/payments.scss';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import tan from '../../assets/tan.png';
import eye from '../../assets/eye.png';
import filling from '../../assets/filling.png';
import outletSuccess from '../../assets/outletSuccess.png';
import createTank from '../../assets/createTank.png';
import createPump from '../../assets/createPump.png';
import OutlinedInput from '@mui/material/OutlinedInput';
import Modal from '@mui/material/Modal';
import close from '../../assets/close.png';
import { ThreeDots } from  'react-loader-spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Radio from '@mui/material/Radio';
import Tank from '../Outlet/Tanks';
import Pumps from '../Outlet/Pumps';
import Sales from '../Outlet/Sales';
import { Switch, Route } from 'react-router-dom';

const Outlets = (props) => {

    const [open, setOpen] = useState(0);
    const handleOpen = (value) => setOpen(value);
    const handleClose = (value) => setOpen(value);

    const loadingSpinner = false
    const dispatch = useDispatch();

    const CreateFillingStation = () => {
        return(
            <Modal
                open={open === 1}
                onClose={()=>{handleClose(0)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >
                    <div className='modalContainer'>
                        <div className='inner'>
                            <div className='head'>
                                <div className='head-text'>Create Filling Station</div>
                                <img onClick={()=>{handleClose(0)}} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                            </div>

                            <div className='inputs'>
                                <div className='head-text2'>Outline Name</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>Choose state</div>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={10}
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }}
                                >
                                    <MenuItem value={10}>Abuja</MenuItem>
                                    <MenuItem value={20}>Download PDF</MenuItem>
                                    <MenuItem value={30}>Print</MenuItem>
                                </Select>
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>City/Town</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>LGA</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>Area/Street</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                />
                            </div>

                            <div style={{marginTop:'15px'}} className='inputs'>
                                <div className='head-text2'>GPS Cordinates ( Longitude & Latitude )</div>
                                <OutlinedInput 
                                    sx={{
                                        width:'100%',
                                        height: '35px', 
                                        marginTop:'5px', 
                                        background:'#EEF2F1', 
                                        border:'1px solid #777777',
                                        fontSize:'12px',
                                    }} placeholder="" 
                                />
                            </div>

                            <div className='butt'>
                                <Button sx={{
                                    width:'100px', 
                                    height:'30px',  
                                    background: '#427BBE',
                                    borderRadius: '3px',
                                    fontSize:'10px',
                                    marginTop:'00px',
                                    '&:hover': {
                                        backgroundColor: '#427BBE'
                                    }
                                    }} 
                                    onClick={handleTankModal} 
                                    variant="contained"> Save
                                </Button>

                                {loadingSpinner &&
                                    <ThreeDots 
                                        height="60" 
                                        width="50" 
                                        radius="9"
                                        color="#076146" 
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName=""
                                        visible={true}
                                    />
                                }
                            </div>
                            
                        </div>
                    </div>
            </Modal>
        )
    }

    const handleTankModal = () => {
        handleClose(0);
        handleOpen(4);
    }

    const handleAddTanks = () => {
        handleClose(0);
        handleOpen(2);
    }

    const handleAddPump = () => {
        handleClose(0);
        handleOpen(5);
    }

    const handleAddPumps = () => {
        handleClose(0);
        handleOpen(3);
    }

    const handleMorePumps = () => {
        handleClose(0);
        handleOpen(6);
    }

    const AddTank = () => {
        return(
            <Modal
                open={open === 2}
                onClose={()=>{handleClose(0)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >
                <div className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'>Add Tank</div>
                            <img onClick={()=>{handleClose(0)}} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                        <div className='inputs'>
                            <div className='head-text2'>Tank Name/ Series</div>
                            <OutlinedInput 
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }} placeholder="" 
                            />
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Tank Height (cm)</div>
                            <OutlinedInput 
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }} placeholder="" 
                            />
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Choose product type</div>
                            <div className='radio'>
                                <div className='rad-item'>
                                    <Radio />
                                    <div className='head-text2' style={{marginRight:'5px'}}>PMS</div>
                                </div>
                                <div className='rad-item'>
                                    <Radio />
                                    <div className='head-text2' style={{marginRight:'5px'}}>AGO</div>
                                </div>
                                <div className='rad-item'>
                                    <Radio />
                                    <div className='head-text2' style={{marginRight:'5px'}}>DPK</div>
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Tank Capacity</div>
                            <OutlinedInput 
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }} placeholder="" 
                            />
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Dead Stock Level (Litre)</div>
                            <OutlinedInput 
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }} placeholder="" 
                            />
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Calibration Date</div>
                            <input style={date} type={'date'} />
                        </div>

                        <div className='butt'>
                            <Button sx={{
                                width:'100px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'10px',
                                marginTop:'00px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }} 
                                onClick={handleAddPump}
                                variant="contained"> Save
                            </Button>

                            {loadingSpinner &&
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#076146" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    const AddPump = () => {
        return(
            <Modal
                open={open === 3}
                onClose={()=>{handleClose(0)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >
                <div style={{height:'430px'}} className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'>Add Pump</div>
                            <img onClick={()=>{handleClose(0)}} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                        <div className='inputs'>
                            <div className='head-text2'>Pump Name</div>
                            <OutlinedInput 
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }} placeholder="" 
                            />
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Tank Connected to pump</div>
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={10}
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }}
                            >
                                <MenuItem value={10}>Pump 1</MenuItem>
                                <MenuItem value={20}>Download PDF</MenuItem>
                                <MenuItem value={30}>Print</MenuItem>
                            </Select>
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Choose product type</div>
                            <div className='radio'>
                                <div className='rad-item'>
                                    <Radio />
                                    <div className='head-text2' style={{marginRight:'5px'}}>PMS</div>
                                </div>
                                <div className='rad-item'>
                                    <Radio />
                                    <div className='head-text2' style={{marginRight:'5px'}}>AGO</div>
                                </div>
                                <div className='rad-item'>
                                    <Radio />
                                    <div className='head-text2' style={{marginRight:'5px'}}>DPK</div>
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop:'15px'}} className='inputs'>
                            <div className='head-text2'>Totalizer Reading</div>
                            <OutlinedInput 
                                sx={{
                                    width:'100%',
                                    height: '35px', 
                                    marginTop:'5px', 
                                    background:'#EEF2F1', 
                                    border:'1px solid #777777',
                                    fontSize:'12px',
                                }} placeholder="" 
                            />
                        </div>

                        <div className='butt'>
                            <Button sx={{
                                width:'100px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'10px',
                                marginTop:'00px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }} 
                                onClick={handleOpen} 
                                variant="contained"> Save
                            </Button>

                            {loadingSpinner &&
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#076146" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    const AddTankSuccess = () => {
        return(
            <Modal
                open={open === 4}
                onClose={()=>{handleClose(0)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >
                <div style={{height:'430px'}} className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'></div>
                            <img onClick={()=>{handleClose(0)}} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                        <div className='tank'>
                            <img style={{width:'300px', height:'250px'}} src={outletSuccess} alt="icon" />
                        </div>

                        <div className='tex'>
                            A new outlets has been created proceed to add tanks and pump
                        </div>

                        <div style={{flexDirection:'column'}} className='butt'>
                            <Button sx={{
                                width:'200px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'10px',
                                marginTop:'0px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }}  
                                onClick={handleAddTanks}
                                variant="contained"> Add Tanks
                            </Button>

                            {loadingSpinner &&
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#076146" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    const AddPumpSuccess = () => {
        return(
            <Modal
                open={open === 5}
                onClose={()=>{handleClose(0)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >
                <div style={{height:'430px'}} className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'></div>
                            <img onClick={()=>{handleClose(0)}} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                        <div className='tank'>
                            <img style={{width:'300px', height:'250px'}} src={createPump} alt="icon" />
                        </div>

                        <div className='tex'>
                            A new pump has been added to your outlet
                        </div>

                        <div style={{flexDirection:'column'}} className='butt'>
                            <Button sx={{
                                width:'200px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'10px',
                                marginTop:'0px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }}  
                                onClick={handleMorePumps}
                                variant="contained"> Add More Pumps
                            </Button>

                            {loadingSpinner &&
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#076146" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    const AddPumpMore = () => {
        return(
            <Modal
                open={open === 6}
                onClose={()=>{handleClose(0)}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >
                <div style={{height:'430px'}} className='modalContainer'>
                    <div className='inner'>
                        <div className='head'>
                            <div className='head-text'></div>
                            <img onClick={()=>{handleClose(0)}} style={{width:'18px', height:'18px'}} src={close} alt={'icon'} />
                        </div>

                        <div className='tank'>
                            <img style={{width:'300px', height:'250px'}} src={createTank} alt="icon" />
                        </div>

                        <div className='tex'>
                            A new outlets has been created proceed to add tanks and pump
                        </div>

                        <div style={{flexDirection:'column'}} className='butt'>
                            <Button sx={{
                                width:'200px', 
                                height:'30px',  
                                background: '#427BBE',
                                borderRadius: '3px',
                                fontSize:'10px',
                                marginTop:'0px',
                                '&:hover': {
                                    backgroundColor: '#427BBE'
                                }
                                }}  
                                onClick={handleAddPumps}
                                variant="contained"> Add Pumps
                            </Button>

                            {loadingSpinner &&
                                <ThreeDots 
                                    height="60" 
                                    width="50" 
                                    radius="9"
                                    color="#076146" 
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClassName=""
                                    visible={true}
                                />
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    const goToSales = () => {
        props.history.push('/home/outlets/sales');
    }

    const goToTanks = () => {
        props.history.push('/home/outlets/tanks');
    }

    const goToPumps = () => {
        props.history.push('/home/outlets/pumps');
    }


    return(
        <>
            {props.activeRoute.split('/').length === 3 &&
                <div className='paymentsCaontainer'>
                    <div className='inner-pay'>
                        { open ===1 && <CreateFillingStation /> }
                        { open ===2 && <AddTank /> }
                        { open ===3 && <AddPump /> }
                        { open ===4 && <AddTankSuccess /> }
                        { open ===5 && <AddPumpSuccess /> }
                        { open ===6 && <AddPumpMore /> }
                        <div className='action'>
                            <div style={{width:'150px'}} className='butt2'>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={10}
                                    sx={{...selectStyle2, backgroundColor:"#F36A4C", color:'#fff'}}
                                >
                                    <MenuItem value={10}>Create new filling station</MenuItem>
                                    <MenuItem value={20}>Download PDF</MenuItem>
                                    <MenuItem value={30}>Print</MenuItem>
                                </Select>
                            </div>
                        </div>
        
                        <div className='search'>
                            <div className='input-cont'>
                                <div className='second-select'>
                                    <Select
                                        labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={10}
                                        sx={selectStyle2}
                                    >
                                        <MenuItem value={10}>07 August, 2022</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </div>
                                <div className='second-select'>
                                    <OutlinedInput 
                                        placeholder="Search" 
                                        sx={{
                                            width:'100%',
                                            height:'35px', 
                                            fontSize:'12px',
                                            background:'#F2F1F1',
                                            color:'#000'
                                        }} 
                                    />
                                </div>
                            </div>
                            <div style={{width:'195px'}} className='butt'>
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
                                    onClick={()=>{handleOpen(1)}} 
                                    variant="contained"> Create new filling station
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
                                <div className='column'>Licence Code</div>
                                <div className='column'>Name</div>
                                <div className='column'>Outlet Code</div>
                                <div className='column'>No of Tanks</div>
                                <div className='column'>No of Pumps</div>
                                <div className='column'>State</div>
                                <div className='column'>City/Town</div>
                                <div className='column'>Actions</div>
                            </div>
        
                            <div className='row-container'>
                                <div className='table-head2'>
                                    <div className='column'>01</div>
                                    <div className='column'>09 June, 2022</div>
                                    <div className='column'>Wema bank</div>
                                    <div className='column'>1524353625262</div>
                                    <div className='column'>150,000</div>
                                    <div className='column'>352,000</div>
                                    <div className='column'>170,000</div>
                                    <div className='column'>230,000</div>
                                    <div className='column'>
                                        <div className='actions'>
                                            <img onClick={goToSales} style={{width:'27px', height:'27px'}} src={eye} alt="icon" />
                                            <img onClick={goToPumps} style={{width:'27px', height:'27px'}} src={filling} alt="icon" />
                                            <img onClick={goToTanks} style={{width:'27px', height:'27px'}} src={tan} alt="icon" />
                                        </div>
                                    </div>
                                </div>
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
            }

            { props.activeRoute.split('/').length === 4 &&
                <div style={contain}>
                    <Switch>
                        <Route path='/home/outlets/sales'>
                            <Sales/>
                        </Route>
                        <Route path='/home/outlets/tanks'>
                            <Tank/>
                        </Route>
                        <Route path='/home/outlets/pumps'>
                            <Pumps/>
                        </Route>
                    </Switch>
                </div>
            }
        </>
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

const date = {
    width:'96%',
    height:'35px',
    background: 'rgba(229, 240, 237, 0.6)',
    border: '0.938659px solid #606060',
    borderRadius: '5px',
    paddingLeft: '2%',
    paddingRight:'2%'
}

const contain = {
    width:'96%',
    height:'89%',

}

export default Outlets;