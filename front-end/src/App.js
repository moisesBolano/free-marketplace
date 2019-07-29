import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import logo from './logo.svg';
import './App.css';
import { validateSession } from './principal';


import products from './components/products.component.jsx';
import profile from './components/profile.component.jsx';
import newProfile from './components/newProfile.component.jsx';
import login from './components/Login.component.jsx';
import Logout from './components/Logout.component.jsx';
import detailProduct from './components/detailProduct.component.jsx';
import shoppingcart from './components/shoppingCart.component.jsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser, faList, faFileInvoice, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { login: false };
    validateSession().then(response => {
      console.log(response);
      this.setState({
        login: response.login,
        message: response.message
      });
    })
      .catch((err) => {
        console.log(err);
        this.setState({
          login: err.login,
          message: err.message
        });
      });
  }

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">
              <img src={logo} width="30" height="30" alt="chat mern" />
            </a>
            <Link to="/products" className="navbar-brand"> MarketPlace</Link>
            <div className="collpase nav-collapse pull-right">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/products" className="nav-link"><FontAwesomeIcon icon={faList} /> Products</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/profile" className="nav-link"><FontAwesomeIcon icon={faUser} /> Profile</Link>
                </li>
                <li className="navbar-item d-none">
                  <Link to="/orders" className="nav-link"><FontAwesomeIcon icon={faFileInvoice} /> My Orders</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/shoppingcart" className="nav-link"><FontAwesomeIcon icon={faShoppingCart} /> Cart</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login/false/false" className="nav-link"><FontAwesomeIcon icon={faSignInAlt} /> Log-in</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/logout" className="nav-link"><FontAwesomeIcon icon={faSignOutAlt} /> Log-out</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/products" exact component={products} />
          <Route path="/products/detailProduct/:numitm" exact component={detailProduct} />
          <Route path="/" exact component={products} />
          <Route path="/profile" exact component={profile} />
          <Route path="/login/:numitm/:qtyitm" exact component={login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/orders" exact component={products} />
          <Route path="/shoppingcart" exact component={shoppingcart} />
          <Route path="/Sign-up/" exact component={newProfile} />
        </div>
      </Router>
    );
  }


}


export default App;
