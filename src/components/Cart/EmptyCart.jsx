import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const EmptyCart = () => {
  return (
    <Typography variant='subtitle1'>
      You have no items in your shopping cart,
      <Link to='/'>start adding some!</Link>
    </Typography>
  );
};

export default EmptyCart;
