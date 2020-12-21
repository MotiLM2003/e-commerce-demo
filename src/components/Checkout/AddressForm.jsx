import React, { useState, useEffect } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import { commerce } from '../../lib/commerce';
import FormInput from './FormInput';

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingContries, setShippingContries] = useState([]);
  const [shippingContry, setShippingContry] = useState('');
  const [shippingSubDevisions, setShippingSubDevisions] = useState([]);
  const [shippingSubDevision, setShippingSubDevision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const fetchShippingOptions = async (token, country, region = null) => {
    try {
      const options = await commerce.checkout.getShippingOptions(token.id, {
        country,
        region,
      });

      setShippingOptions(options);
      setShippingOption(options[0]);
    } catch (err) {}
    // console.log('options', options);
  };

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingContries(countries);
    setShippingContry(Object.keys(countries)[0]);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  const fetchSubDivision = async (code) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      code
    );

    console.log(subdivisions, ' ', code, 'data');
    setShippingSubDevisions(subdivisions);
    setShippingSubDevision(Object.keys(subdivisions)[0]);
  };

  useEffect(() => {
    if (shippingContry) fetchSubDivision(shippingContry);
  }, [shippingContry]);

  useEffect(() => {
    if (shippingSubDevision)
      fetchShippingOptions(checkoutToken, shippingContry, shippingSubDevision);
  }, [shippingSubDevision]);

  const methods = useForm();
  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            next({
              ...data,
              shippingContry,
              shippingSubDevision,
              shippingOption,
            });
          })}
        >
          <Grid container spacing={3}>
            <FormInput required name='firstName' label='First name' />
            <FormInput required name='lastName' label='Last name' />
            <FormInput required name='address1' label='Address' />
            <FormInput required name='email' label='Email' />
            <FormInput required name='city' label='City' />
            <FormInput required name='zip' label='ZIP / Postal code' />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingContry}
                fullWidth
                onChange={(e) => {
                  setShippingContry(e.target.value);
                }}
              >
                {Object.keys(shippingContries).map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {shippingContries[item]}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubDevision}
                fullWidth
                onChange={(e) => {
                  setShippingSubDevision(e.target.value);
                }}
              >
                {Object.keys(shippingSubDevisions).map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {shippingSubDevisions[item]}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption.id}
                fullWidth
                onChange={(e) => {
                  setShippingOption(e.target.value);
                }}
              >
                {shippingOptions.map((option) => {
                  const label = `${option.description} - (${option.price.formatted_with_symbol})`;
                  return (
                    <MenuItem key={option.id} value={option.id}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to='/cart' variant='outlined'>
              Back to Cart
            </Button>
            <Button type='submit' variant='contained' color='primary'>
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </React.Fragment>
  );
};

export default AddressForm;
