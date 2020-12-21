import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { commerce } from './lib/commerce';
import { Navbar, Products, Cart, Checkout } from './components';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (id, quantity) => {
    const { cart } = await commerce.cart.add(id, quantity);
    setCart(cart);
  };

  const handleUpdateCartQuantity = async (id, quantity) => {
    const { cart } = await commerce.cart.update(id, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (id) => {
    const { cart } = await commerce.cart.remove(id);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <Navbar cart={cart} />
        <Switch>
          <Route exact path='/'>
            <Products products={products} handleAddToCart={handleAddToCart} />
          </Route>
          <Route path='/cart'>
            <Cart
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route path='/checkout'>
            <Checkout cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
