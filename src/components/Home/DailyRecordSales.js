import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import InventoryIcon from '@mui/icons-material/Inventory';
import SanitizerIcon from '@mui/icons-material/Sanitizer';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import PaidIcon from '@mui/icons-material/Paid';
import AddCardIcon from '@mui/icons-material/AddCard';
import '../../styles/newSales.scss';
import { Button, MenuItem, Select } from '@mui/material';
import SupplyComponent from '../DailyRecordSales/SupplyComponent';
import PumpUpdateComponent from '../DailyRecordSales/PumpUpdateComponent';
import LPOComponent from '../DailyRecordSales/LPOComponent';
import ExpenseComponents from '../DailyRecordSales/ExpenseComponents';
import PaymentsComponents from '../DailyRecordSales/PaymentComponents';
import ReturnToTankComponent from '../DailyRecordSales/ReturnToTankComponent';
import DippingComponents from '../DailyRecordSales/DippingComponents';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { passRecordSales } from '../../store/actions/dailySales';
import { useSelector } from 'react-redux';
import OutletService from '../../services/outletService';
import IncomingService from '../../services/IncomingService';
import { createIncomingOrder } from '../../store/actions/incomingOrder';
import { adminOutlet, getAllOutletTanks, getAllPumps, getAllStations } from '../../store/actions/outlet';
import LPOService from '../../services/lpo';
import { createLPO } from '../../store/actions/lpo';
import swal from "sweetalert";
import RecordSalesService from '../../services/DailyRecordSales';
import Backdrop from '@mui/material/Backdrop';
import { BallTriangle } from 'react-loader-spinner';
import { useState } from 'react';
import { useRef } from 'react';
import calendar from '../../assets/calendar.png';

const months = {
    '01' : 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Aug',
    '09': 'Sep',
    '10': 'Oct',
    '11': 'Nov',
    '12': 'Dec',
}

function DoublyLinkedListNode(data){
    this.data = data;
    this.next = null;
    this.prev = null;
}

function DoublyLinkedList(){
    this.head = null;
    this.currentDate = null;
    this.size = 0;
    this.page = 1;
    this.correctAnswers = [];

    this.isEmpty = function(){
        return this.size === 0;
    }

    this.addNode = function(value){
        if(this.head === null){
            this.head = new DoublyLinkedListNode(value);
        }else{
            var temp = new DoublyLinkedListNode(value);
            temp.next = this.head;
            this.head.prev = temp;
            this.head = temp;
        }
        this.size++;
    }

    this.nextPage = function(){
        this.head = this.head.next
    }

    this.previousPage = function(){
        this.head = this.head.prev
    }
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
      'linear-gradient( 136deg, #06805B 0%, #143d59 50%, #213970 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
      'linear-gradient( 136deg, #06805B 0%, #143d59 50%, #213970 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  fontSize:'11px',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
    'linear-gradient( 136deg, #06805B 0%, #143d59 50%, #213970 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
    'linear-gradient( 136deg, #06805B 0%, #143d59 50%, #213970 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <SanitizerIcon />,
    2: <AssignmentReturnedIcon />,
    3: <CreditScoreIcon />,
    4: <InventoryIcon />,
    5: <PaidIcon />,
    6: <AddCardIcon />,
    7: <PropaneTankIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Pump Update', 'Return to Tank', 'LPO', 'Supply', 'Expenses', 'Payments', 'Dipping'];

const DailyRecordSales = () => {
    const date = new Date();
    const toString = date.toDateString();
    const [month, day, year] = toString.split(' ');
    const date2 = `${day} ${month} ${year}`;

    const dateHandle = useRef();
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const linkedData = useSelector(state => state.dailySalesReducer.linkedData);
    const allOutlets = useSelector(state => state.outletReducer.allOutlets);
    const oneStationData = useSelector(state => state.outletReducer.adminOutlet);
    const [defaultState, setDefault] = useState(0);
    const [open, setOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(date2);

    useEffect(()=>{

        const list = new DoublyLinkedList();
        for(let i=7; i > 0 ; i--){
            list.addNode({
                currentPage: String(i),
                payload: [],
            });
        }
        
        dispatch(passRecordSales(list));

        if(user.userType === "superAdmin" || user.userType === "admin"){
            const payload = {
                organisation: user._id
            }
    
            OutletService.getAllOutletStations(payload).then(data => {
                dispatch(getAllStations(data.station));
                dispatch(adminOutlet(data.station[0]));
                if(data.station.length !== 0){
                    setDefault(1);
                }
                return data.station[0];
            }).then((data)=>{
                const payload = {
                    outletID: data?._id, 
                    organisationID: data?.organisation
                }
        
                IncomingService.getAllIncoming3(payload).then((data) => {
                    dispatch(createIncomingOrder(data.incoming.incoming));
                });

                OutletService.getAllStationPumps(payload).then(data => {
                    dispatch(getAllPumps(data));
                });

                OutletService.getAllOutletTanks(payload).then(data => {
                    const outletTanks = data.stations.map(data => {
                        const newData = {...data, label: data.tankName, value: data._id};
                        return newData;
                    });
                    dispatch(getAllOutletTanks(outletTanks));
                });

                LPOService.getAllLPO(payload).then((data) => {
                    dispatch(createLPO(data.lpo.lpo));
                });
            });
        }else{
            OutletService.getOneOutletStation({outletID: user.outletID}).then(data => {
                dispatch(adminOutlet(data.station));
                return data.station;
            }).then((data)=>{
                const payload = {
                    outletID: data?._id, 
                    organisationID: data?.organisation
                }
        
                IncomingService.getAllIncoming3(payload).then((data) => {
                    dispatch(createIncomingOrder(data.incoming.incoming));
                });

                OutletService.getAllStationPumps(payload).then(data => {
                    dispatch(getAllPumps(data));
                });

                OutletService.getAllOutletTanks(payload).then(data => {
                    const outletTanks = data.stations.map(data => {
                        const newData = {...data, label: data.tankName, value: data._id};
                        return newData;
                    });
                    dispatch(getAllOutletTanks(outletTanks));
                });

                LPOService.getAllLPO(payload).then((data) => {
                    dispatch(createLPO(data.lpo.lpo));
                });
            });
        }
    },[dispatch, user._id, user.outletID, user.userType]);

    const nextQuestion = () => {
        let newList = {...linkedData}
        if(newList.head.next !== null){
            newList.nextPage();
            newList.page++;
            dispatch(passRecordSales(newList));
            // console.log(newList, 'next')
        }
    }

    const prevQuestion = () => {
        let newList = {...linkedData}
        if(newList.head.prev !== null){
            newList.previousPage();
            newList.page--;
            dispatch(passRecordSales(newList));
            // console.log(newList, 'prev')
        }
    }

    const finishAndSubmit = () => {

        let payload = {
            currentDate: linkedData.currentDate,
            load: {
                '8':[],
                '7': linkedData.head.data.payload,
            }
        }

        let dataLoad = {...linkedData.head}
        while(true){
            dataLoad = dataLoad.prev;
            payload.load[dataLoad.data.currentPage] = dataLoad.data.payload;

            if(dataLoad.prev === null){
                break;
            }
        }

        swal({
            title: "Alert!",
            text: "Are you sure you want to submit?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                setOpen(true);
                RecordSalesService.saveRecordSales(payload).then(data => {
                    swal("Success!", "Daily sales recorded successfully!", "success");
                }).then(()=>{
                    const list = new DoublyLinkedList();
                    for(let i=7; i > 0 ; i--){
                        list.addNode({
                            currentPage: String(i),
                            payload: [],
                        });
                    }
                    dispatch(passRecordSales(list));
                    setOpen(false);
                })
            }
        });
    }

    const changeMenu = (index, item ) => {
        setDefault(index);

        const payload = {
            outletID: item._id, 
            organisationID: item.organisation
        }

        IncomingService.getAllIncoming3(payload).then((data) => {
            dispatch(createIncomingOrder(data.incoming.incoming));
        });

        OutletService.getAllStationPumps(payload).then(data => {
            dispatch(getAllPumps(data));
        });

        OutletService.getAllOutletTanks(payload).then(data => {
            const outletTanks = data.stations.map(data => {
                const newData = {...data, label: data.tankName, value: data._id};
                return newData;
            });
            dispatch(getAllOutletTanks(outletTanks));
        });

        LPOService.getAllLPO(payload).then((data) => {
            dispatch(createLPO(data.lpo.lpo));
        });

        dispatch(adminOutlet(item));
    }

    const dateHandleInputDate = () => {
        dateHandle.current.showPicker();
    }

    const updateDate = (e) => {
        const date = e.target.value.split('-');
        const format = `${date[2]} ${months[date[1]]} ${date[0]}`;
        setCurrentDate(format);

        const newList = {...linkedData};
        newList.currentDate = e.target.value;
        dispatch(passRecordSales(newList));
    }


    return (
        <div className='salesRecordStyle'>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                // onClick={handleClose}
            >
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#fff"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass={{}}
                    wrapperStyle=""
                    visible={true}
                />
            </Backdrop>
            <div style={{width:'90%', marginTop:'20px', display:'flex', justifyContent:'space-between'}}>
                <div>
                    {(user.userType === "superAdmin" || user.userType === "admin") &&
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
                                        <MenuItem key={index} style={menu} onClick={()=>{changeMenu(index + 1, item)}} value={index + 1}>{item.outletName+ ', ' +item.alias}</MenuItem>
                                    )
                                })  
                            }
                        </Select>
                    }
                    {user.userType === "staff" &&
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={0}
                            sx={selectStyle2}
                            disabled
                        >
                            <MenuItem style={menu} value={0}>{user.userType === "staff"? oneStationData?.outletName+", "+oneStationData?.alias: "No station created"}</MenuItem>
                        </Select>
                    }
                </div>
                <div>
                    <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                        <input onChange={updateDate} ref={dateHandle} style={{position:"absolute", marginTop:'10px', visibility:'hidden'}} type="date" />
                        <Button 
                            variant="contained" 
                            sx={{
                                width:'170px',
                                height:'30px',
                                background:'#06805B',
                                fontSize:'12px',
                                borderRadius:'0px',
                                textTransform:'capitalize',
                                display:'flex',
                                flexDirection:'row',
                                alignItems:'center',
                                '&:hover': {
                                    backgroundColor: '#06805B'
                                }
                            }}
                            onClick={dateHandleInputDate}
                        >
                            <div style={{marginRight:'10px'}}>{currentDate}</div>
                            <img style={{width:'20px', height:'20px'}} src={calendar} alt="icon"/>
                        </Button>
                    </div>
                </div>
            </div>
            <Stack sx={{ width: '100%', marginTop:'20px' }} spacing={4}>
                <Stepper alternativeLabel activeStep={linkedData.page - 1} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Stack>

            <div className='form-body'>
                {linkedData.page === 1 && <PumpUpdateComponent />}
                {linkedData.page === 2 && <ReturnToTankComponent />}
                {linkedData.page === 3 && <LPOComponent />}
                {linkedData.page === 4 && <SupplyComponent />}
                {linkedData.page === 5 && <ExpenseComponents /> }
                {linkedData.page === 6 && <PaymentsComponents /> }
                {linkedData.page === 7 && <DippingComponents /> }
            </div>

            <div className="navs">
                <div>
                    {linkedData.head?.prev !== null &&
                        <Button 
                            variant="contained" 
                            sx={{
                                width:'100px',
                                height:'30px',
                                background:'#054834',
                                fontSize:'13px',
                                borderRadius:'5px',
                                textTransform:'capitalize',
                                '&:hover': {
                                    backgroundColor: '#054834'
                                }
                            }}
                            onClick={prevQuestion}
                        >
                            Previous
                        </Button>
                    }
                </div>
                
                {linkedData.head?.next === null ||
                    <Button 
                        variant="contained" 
                        sx={{
                            width:'140px',
                            height:'30px',
                            background:'#054834',
                            fontSize:'13px',
                            borderRadius:'5px',
                            textTransform:'capitalize',
                            '&:hover': {
                                backgroundColor: '#054834'
                            }
                        }}
                        onClick={nextQuestion}
                    >
                        Save & Proceed
                    </Button>
                }

                {linkedData.head?.next === null &&
                    <Button 
                        variant="contained" 
                        sx={{
                            width:'140px',
                            height:'30px',
                            background:'#054834',
                            fontSize:'13px',
                            borderRadius:'5px',
                            textTransform:'capitalize',
                            '&:hover': {
                                backgroundColor: '#054834'
                            }
                        }}
                        onClick={finishAndSubmit}
                    >
                        Finish
                    </Button>
                }
            </div>
        </div>
    );
}

const menu = {
    fontSize:'14px',
    fontFamily:'Nunito-Regular'
}

const selectStyle2 = {
    width:'200px', 
    height:'35px', 
    borderRadius:'5px',
    background: '#F2F1F1B2',
    color:'#000',
    fontFamily: 'Nunito-Regular',
    fontSize:'14px',
    outline:'none',
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border:'1px solid #777777',
    },
}

export default DailyRecordSales;