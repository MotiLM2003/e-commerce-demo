import React, { useState, useEffect } from 'react';

import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';
import { commerce } from '../../lib/commerce';
import useStyles from './styles';

import PaymentForm from './PaymentForm';
import AddressForm from './AddressForm';
import Confirmation from './Confirmation';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log(' error', error);
      }
    };

    generateToken();
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const backStep = () => setActiveStep((prev) => prev - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm shippingData={shippingData} />
    );
  return (
    <React.Fragment>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default Checkout;
