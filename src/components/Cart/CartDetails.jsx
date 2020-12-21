import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import CartItem from './CartItem/CartItem';
import useStyles from './CartItem/styles';

const CartDetails = ({
  cart,
  handleRemoveFromCart,
  handleUpdateCartQuantity,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {cart?.line_items?.map((item) => {
          return (
            <Grid item xs={12} sm={4} key={item.id}>
              <CartItem
                item={item}
                handleUpdateCartQuantity={handleUpdateCartQuantity}
                handleRemoveFromCart={handleRemoveFromCart}
              />
            </Grid>
          );
        })}
      </Grid>
      <div className={classes.cartDetails}>
        <Typography variant='h4'>
          Sub total: {cart?.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size='large'
            type='button'
            variant='contained'
            color='primary'
            component={Link}
            to='/checkout'
          >
            Checkout
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartDetails;
