import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShoppingBag, faCartPlus, faInfo } from '@fortawesome/free-solid-svg-icons';
import { validateSession, baseUrl } from '../principal';


export default class prod extends Component {

    
    constructor(props) {
        super(props);
        this.addToCart = this.addToCart.bind(this);
        this.setStateCategory = this.setStateCategory.bind(this);
        this.setStateSubCategory = this.setStateSubCategory.bind(this);
        this.setStateProductName = this.setStateProductName.bind(this);
        this.setStateOrder = this.setStateOrder.bind(this);
        this.state = {
            products: [],
            categories: [],
            subcategories: [],
            category: 'All',
            subcategory: 'All',
            productname: '',
            order: 'desc',
            qty: 1,
            login: false

        };
        this.listAllCategories();
        validateSession().then(response => {
            console.log(response);
            this.setState({
                login: response.login,
                message: response.message
            });
            if (this.state.login) {

            }
        }).catch((err) => {
            console.log(err);
            this.setState({
                login: err.login,
                message: err.message
            });
        });
    }

    listAllCategories() {
        axios.post(baseUrl + 'categories/listAllCategories/', {}, {})
            .then(response => {
                this.setState({
                    categories: response.data
                });
                this.listSubCategoriesOfCaterory(this.state.category);
            })
            .catch((err) => {
                console.log(err.response.data);
                this.setState({
                    login: err.response.data.login,
                    message: err.response.data.message
                });
            });
    }

    listSubCategoriesOfCaterory(numcat = this.state.category) {
        axios.post(baseUrl + 'categories/listSubCategoriesOfCaterory/', {numcat}, {})
            .then(response => {
                this.setState({
                    subcategories: response.data
                });
                this.listAllProducts(numcat,this.state.subcategory);
            })
            .catch((err) => {
                console.log(err.response.data);
                this.setState({
                    login: err.response.data.login,
                    message: err.response.data.message
                });
            });
    }

    listAllProducts(numcat = this.state.category, numsub = this.state.subcategory, name = this.state.productname, order = this.state.order) {
        axios.post(baseUrl + 'poducts/listAllProducts/', {numcat,numsub,name,order}, {})
            .then(response => {
                this.setState({
                    products: response.data
                });
                //this.props.history.push('/welcome');
            })
            .catch((err) => {
                console.log(err.response.data);
                this.setState({
                    login: err.response.data.login,
                    message: err.response.data.message
                });
                //this.props.history.push('/');
            });
    }

    listProducts() {
        const Products = props => (
            <div className="card col-md-3">
                <div className="card-body" >
                    <div className="row">
                        <h6 className="card-title">{props.products.name}</h6>
                        <a href={"/products/detailProduct/"+props.products.numitm}>
                        <img src={props.products.img_b64} width="220" height="220" alt={props.products.name} /></a>
                        <p className="card-text">
                            {/*ReactHtmlParser(props.products.descript)*/}
                        </p>
                    </div>
                    <div>
                        <p className="font-weight-bold text-right">US ${props.products.value} </p>
                    </div>
                    <div className="row">
                        <input type="number" className="form-control col-md-4" defaultValue="1" />
                        <button href="#" className="btn btn-success col-md-4" onClick={(e) => this.addToCart(props.products)}><FontAwesomeIcon icon={faCartPlus}/></button>
                        <a href={"/products/detailProduct/"+props.products.numitm} className="btn btn-primary col-md-4"><FontAwesomeIcon icon={faInfo}/></a>
                    </div>
                </div>
            </div>
        );
        if(this.state.products.length === 0){
            return <div className="col-md-12 text-center p-3 mb-2 bg-info text-white">No results found!</div>;
        }
        return this.state.products.map(function (currentProduct, i) {
            return <Products products={currentProduct} key={i} />;
        });
    }

    listCategories(){
        console.log(this.state.subcategories);
        const Categories = props => (
            <option value={props.categories.numcat}>{props.categories.namcat}</option>
        );

        return this.state.categories.map(function (currentCategory, i) {
            return <Categories categories={currentCategory} key={i} />;
        });
    }

    listSubCategories(){
        const Subcategories = props => (
            <option value={props.subcategories.numsub}>{props.subcategories.namesub}</option>
        );

        return this.state.subcategories.map(function (currentSub, i) {
            return <Subcategories subcategories={currentSub} key={i} />;
        });
    }

    addToCart(product) {
        console.log(product);
        var qty = this.state.qty;
        if (this.state.login) {//if user logged item into shoppingcart directly
            var data = {
                numitm: product.numitm,
                qtyitm: qty,
                TokenId: localStorage.getItem("TokenId")//send valid token ID for validate user logged in
            };
            var head = {headers: { 'authorization': "token " + localStorage.getItem('TokenId') } };
            axios.post(baseUrl + 'shoppingCart/addItemToShoppingCart/', data,head)
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
                this.props.history.push('/login/' + product.numitm + '/' + qty);
            }
        }
    }



    /********Set state events */

    setStateCategory(e){
        this.setState({
            category: e.currentTarget.value
        });
        this.listSubCategoriesOfCaterory(e.currentTarget.value);
    }

    setStateSubCategory(e){
        this.setState({
            subcategory: e.currentTarget.value
        });
        this.listAllProducts(this.state.category,e.currentTarget.value);
    }

    setStateProductName(e){
        this.setState({
            productname: e.currentTarget.value
        });
        this.listAllProducts(this.state.category,this.state.subcategory,e.currentTarget.value);
    }

    setStateOrder(e){
        this.setState({
            order: e.currentTarget.value
        });
        this.listAllProducts(this.state.category,this.state.subcategory,this.state.productname,e.currentTarget.value);
    }




    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h5><FontAwesomeIcon icon={faShoppingBag} /> List of Products</h5>
                        <div className="row">
                            <div className="form-group col-md-3">
                                <label>Category:</label>
                                <select className="form-control" id="slct-categories" onChange={this.setStateCategory} value={this.state.category}>
                                    <option value="All">All Categories</option>
                                    {this.listCategories()}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Sub-Category:</label>
                                <select className="form-control" id="slct-subcategories" onChange={this.setStateSubCategory} value={this.state.subcategory}>
                                    <option value="All">All Sub-categories</option>
                                    {this.listSubCategories()}
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Quick search:</label>
                                <input className="form-control" id="search-product" onChange={this.setStateProductName} value={this.state.productname}/>
                            </div>
                            <div className="form-group col-md-3">
                                <label>Order:</label>
                                <select className="form-control" id="slct-order-price" onChange={this.setStateOrder} value={this.state.order}>
                                    <option value="asc">Lowest price:</option>
                                    <option value="desc">Highest price:</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            {this.listProducts()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};
