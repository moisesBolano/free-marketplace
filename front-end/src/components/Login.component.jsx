import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {validateSession, baseUrl} from '../principal';


export default class Login extends Component {

    constructor(props) {
        super(props);

        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.makePost = this.makePost.bind(this);
        this.state = {
            email: '',
            pass: '',
            login : false,
            message : '',
            numitm: this.props.match.params.numitm,
            qtyitm: this.props.match.params.qtyitm,
        };
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
            //this.props.history.push('/');
        });
    }

    makePost(event) {
        event.preventDefault();
        const data = {
            email: this.state.email,
            pass: this.state.pass,
            qtyitm: this.state.qtyitm,
            numitm: this.state.numitm
        };
        axios.post(baseUrl+'loginUser', data)
            .then(res => {
                if (res.data.login) {
                    alert("Welcome:" + res.data.user.fnames+' '+res.data.user.lnames+((res.data.cartupd) ? ', Your shopping cart has been updated, happy buying!' : ''));
                    localStorage.setItem("TokenId", res.data.token);
                    this.setState({
                        pass: '',
                        user: ''
                    });
                    this.props.history.goBack();
                } else {
                    alert("User or password incorrect!");
                    localStorage.setItem("TokenId", '');
                }
            });
    }


    onChangeEmail(e) {
        this.setState({
            email: e.currentTarget.value
        });
    }

    onChangePass(e) {
        this.setState({
            pass: e.currentTarget.value
        });
    }

    render() {
        return (
            <div className="container">
                <h3>Login</h3>
                <form onSubmit={this.makePost}>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faUser} /> Email</label>
                        <input className="form-control" required name="" onChange={this.onChangeEmail} value={this.state.email} type="email" />
                    </div>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faKey} /> Password: </label>
                        <input className="form-control" type="password" required name="" onChange={this.onChangePass} value={this.state.pass} />
                    </div>
                    <div className="form-group">
                        <input className="form-control btn btn-primary" type="submit" value="Iniciar sesión" />
                    </div>
                    <div className="form-group">
                        <Link to="/Sign-up" className="nav-link"><FontAwesomeIcon icon={faUserPlus} /> Sign-up Here</Link>
                    </div>
                </form>
            </div>
        )
    }
};
