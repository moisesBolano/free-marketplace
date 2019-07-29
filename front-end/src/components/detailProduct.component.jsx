import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { validateSession, baseUrl } from '../principal';
import ReactHtmlParser from 'react-html-parser';
export default class Login extends Component {

    constructor(props) {
        super(props);
        this.setStateQty = this.setStateQty.bind(this);
        this.adToCart = this.addToCart.bind(this);
        this.state = {
            numitm: this.props.match.params.numitm,
            itm: {},
            login: false,
            qty: 1,
            message: ''
        };
        this.getDetailOfProduct();
        validateSession().then(response => {
            console.log(response);
            this.setState({
                login: response.login,
                message: response.message
            });
            if (this.state.login) {
                //alert("logged in, Welcome!");
            }
        }).catch((err) => {
            console.log(err);
            this.setState({
                login: err.login,
                message: err.message
            });
            //this.props.history.push('/login');
        });
    }

    getDetailOfProduct() {
        var data = {
            numitm: this.state.numitm
        };
        axios.post(baseUrl + 'products/getDetailOfProduct/', data)
            .then(res => {
                if (res.data.length === 0) {
                    this.props.history.push('/');
                } else {
                    this.setState({
                        itm: res.data
                    });
                }
            });
    }

    setStateQty(e) {
        this.setState({
            qty: e.currentTarget.value
        })
    }

    addToCart() {
        var itm = this.state.itm;
        var qty = this.state.qty;
        if (this.state.login) {//if user logged item into shoppingcart directly
            var data = {
                numitm: itm.numitm,
                qtyitm: qty,
                TokenId: localStorage.getItem("TokenId")//send valid token ID for validate user logged in
            };
            var head = { headers: { 'authorization': "token " + localStorage.getItem('TokenId') } };
            axios.post(baseUrl + 'shoppingCart/addItemToShoppingCart/', data, head)
                .then(res => {
                    if (res.data.length === 0) {
                        alert("Error at last operation!");
                        this.props.history.push('/');
                    } else {
                        alert("Your shoppingcart has been updated!");
                    }
                });

        } else {//Else proceed to login, and last add item to cart 
            if (window.confirm("To add items to the shopping cart you must login, procced to login?")) {
                this.props.history.push('/login/' + itm.numitm + '/' + qty);
            }
        }
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <img src={this.state.itm.img_b64} width="450" height="450" alt=""/>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <h5>{this.state.itm.name}</h5><br></br>
                            <p className="font-weight-bold">Details of product: </p>
                        </div>
                        <div className="row">
                            <div >{ReactHtmlParser(this.state.itm.descript)}</div>
                        </div>
                        <br></br>
                        <div className="row">
                            <p className="font-weight-bold">Price: $ {this.state.itm.value} USD</p>
                        </div>
                        <br></br>
                        <div className="row">
                            <input type="number" className="form-control col-md-4" onChange={this.setStateQty} value={this.state.qty} />
                            <button href="#" className="btn btn-success col-md-4" onClick={(e) => this.addToCart()}><FontAwesomeIcon icon={faCartPlus} /> Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
