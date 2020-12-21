import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  Typography,
} from '@material-ui/core';

import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assests/commerce.png';
import useStyles from './styles';
const Navbar = ({ cart }) => {
  const classes = useStyles();
  const location = useLocation();
  return (
    <div>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography
            className={classes.title}
            color='inherit'
            component={Link}
            to='/'
          >
            <img
              src={logo}
              alt='CommerceClone.js'
              height='25px'
              className={classes.image}
            />
            CommerceClone.js
          </Typography>
          <div className={classes.grow} />
          {location.pathname !== '/cart' && (
            <div className={classes.button}>
              <IconButton
                aria-label='Show cart items'
                color='inherit'
                component={Link}
                to='/cart'
              >
                <Badge badgeContent={cart.total_items} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
