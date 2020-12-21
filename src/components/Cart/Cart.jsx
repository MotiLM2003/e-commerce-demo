import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import EmptyCart from './EmptyCart';
import CartDetails from './CartDetails';

import useStyles from './styles';
const Cart = ({
  cart,
  handleRemoveFromCart,
  handleUpdateCartQuantity,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  if (!cart.line_items) return ' Loading!';
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your shopping cart
      </Typography>

      {cart.line_items.length === 0 ? (
        <EmptyCart />
      ) : (
        <CartDetails
          cart={cart}
          handleUpdateCartQuantity={handleUpdateCartQuantity}
          handleRemoveFromCart={handleRemoveFromCart}
          handleEmptyCart={handleEmptyCart}
        />
      )}
    </Container>
  );
};

export default Cart;
