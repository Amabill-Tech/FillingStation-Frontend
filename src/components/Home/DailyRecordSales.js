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
import { Button } from '@mui/material';
import SupplyComponent from '../DailyRecordSales/SupplyComponent';
import { useState } from 'react';
import PumpUpdateComponent from '../DailyRecordSales/PumpUpdateComponent';
import LPOComponent from '../DailyRecordSales/LPOComponent';
import ExpenseComponents from '../DailyRecordSales/ExpenseComponents';
import PaymentsComponents from '../DailyRecordSales/PaymentComponents';
import ReturnToTankComponent from '../DailyRecordSales/ReturnToTankComponent';
import DippingComponents from '../DailyRecordSales/DippingComponents';

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
    1: <InventoryIcon />,
    2: <SanitizerIcon />,
    3: <AssignmentReturnedIcon />,
    4: <CreditScoreIcon />,
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

const steps = ['Supply', 'Pump Update', 'Return to Tank', 'LPO', 'Expenses', 'Payments', 'Dipping'];

const DailyRecordSales = () => {

    const [page, setPage] = useState(6);

    return (
        <div className='salesRecordStyle'>
            <Stack sx={{ width: '100%', marginTop:'20px' }} spacing={4}>
                <Stepper alternativeLabel activeStep={6} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Stack>

            <div className='form-body'>
                {page === 0 && <SupplyComponent />}
                {page === 1 && <PumpUpdateComponent />}
                {page === 2 && <ReturnToTankComponent />}
                {page === 3 && <LPOComponent />}
                {page === 4 && <ExpenseComponents /> }
                {page === 5 && <PaymentsComponents /> }
                {page === 6 && <DippingComponents /> }
            </div>

            <div className="navs">
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
                    // onClick={()=>{openDailySales("report")}}
                >
                    Previous
                </Button>
                
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
                    // onClick={()=>{openDailySales("report")}}
                >
                    Save & Proceed
                </Button>
            </div>
        </div>
    );
}

export default DailyRecordSales;