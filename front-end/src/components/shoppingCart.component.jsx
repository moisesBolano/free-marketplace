import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag,faTrashAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { validateSession, baseUrl } from '../principal';

export default class prod extends Component {


    constructor(props) {
        super(props);
        this.deleteItemOfMycart = this.deleteItemOfMycart.bind(this);
        this.state = {
            itemsInCart: [],
            login: false,
            message: ''
        };
        validateSession().then(response => {
            console.log(response);
            this.setState({
                login: response.login,
                message: response.message
            });
            if (this.state.login) {
                this.listaAlliTemsInCart();
            }
        }).catch((err) => {
            console.log(err);
            this.setState({
                login: err.login,
                message: err.message
            });
            this.props.history.push('/login/false/false');
        });
    }


    listaAlliTemsInCart() {
        var head = { headers: { 'authorization': "token " + localStorage.getItem('TokenId') } };
        var data = {
            TokenId : localStorage.getItem("TokenId")
        };
        axios.post(baseUrl + 'shoppingcart/detailOfMyShoppingCart/', data, head)
            .then(response => {
                this.setState({
                    itemsInCart: response.data
                });
            })
            .catch((err) => {
                console.log(err.response.data);
                this.setState({
                    login: err.response.data.login,
                    message: err.response.data.message
                });
            });
    }

    deleteItemOfMycart(nrocrt){
        var head = { headers: { 'authorization': "token " + localStorage.getItem('TokenId') } };
        var data = {
            nrocrt: nrocrt,
            TokenId : localStorage.getItem("TokenId")
        };
        axios.post(baseUrl + 'shoppingcart/deleteItemOfMycart/', data, head)
            .then(resp => {
                if(resp.data.affectedRows > 0){
                    alert("Item removed from your shoppingcart succesfully!");
                    this.listaAlliTemsInCart();
                };
            })
            .catch((err) => {
                console.log(err.response.data);
                this.setState({
                    login: err.response.data.login,
                    message: err.response.data.message
                });
            });
    }

    listItemsInCart() {
        const Products = props => (
            <tr>
                <td className=""><img src={props.products.img_b64} width="40" height="40" alt=""/></td>
                <td className="">{props.products.name}</td>
                <td className="">{props.products.namcat}</td>
                <td className="">{props.products.namesub}</td>
                <td className="">US ${props.products.value_crt}</td>
                <td className="">{props.products.qtyitm}</td>
                <td>
                    <button className="btn btn-sm btn-danger" onClick={(e) => this.deleteItemOfMycart(props.products.nrocrt)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </td>
            </tr>
        );
        if (this.state.itemsInCart.length === 0) {
            return <tr><td colSpan="7" className="text-center">The shoppingcart is empty!</td></tr>;
        }
        return this.state.itemsInCart.map(function (currentProduct, i) {
            return <Products products={currentProduct} key={i} />;
        });
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h5><FontAwesomeIcon icon={faShoppingBag} /> Products in shoppingcart</h5>
                        <div className="row">
                            <table className="table table-striped" style={{ marginTop: 20 }}>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                        <th>Subcategory</th>
                                        <th>Value</th>
                                        <th>quantity</th>
                                        <th><FontAwesomeIcon icon={faTrash} /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.listItemsInCart()}
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            {/*this.listProducts()*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
