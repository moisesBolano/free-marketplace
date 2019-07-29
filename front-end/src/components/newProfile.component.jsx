import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, faPhone, faAddressCard, faEnvelope, faAt } from '@fortawesome/free-solid-svg-icons';
import { validateSession, baseUrl } from '../principal';

export default class profile extends Component {

    constructor(props) {
        super(props);

        this.onChangeFnames = this.onChangeFnames.bind(this);
        this.onChangeLnames = this.onChangeLnames.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangePostal_code = this.onChangePostal_code.bind(this);
        this.onChangeEmlusr = this.onChangeEmlusr.bind(this);
        this.onChangePassword1 = this.onChangePassword1.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
        this.makePost = this.makePost.bind(this);
        this.state = {
            login: false,
            message: '',
            fnames: '',
            lnames: '',
            phone: '',
            address: '',
            postal_code: '',
            emlusr: '',
            nrousr: '',
            password1: '',
            password2: ''
        };

        validateSession().then(response => {
            console.log(response);
            this.setState({
                login: response.login,
                message: response.message
            });
            if (this.state.login) {
                
            }
        })
            .catch((err) => {
                console.log(err);
                this.setState({
                    login: err.login,
                    message: err.message
                });
                
            });

    }

    getDetailUser() {
        const data = {
            TokenId: localStorage.getItem("TokenId")
        };
        var head = { headers: { 'authorization': "token " + localStorage.getItem('TokenId') } };
        axios.post(baseUrl + 'getDetailUser', data, head)
            .then(res => {
                console.log(res.data);
                if (res.data.nrousr != null) {
                    this.setState({
                        fnames: res.data.fnames,
                        lnames: res.data.lnames,
                        phone: res.data.phone,
                        address: res.data.address,
                        postal_code: res.data.postal_code,
                        emlusr: res.data.emlusr,
                        nrousr: res.data.nrousr
                    });

                } else {
                    this.props.history.push('/login/false/false');
                }
            });
    }

    makePost(event) {
        event.preventDefault();
        if(this.state.password1 !== this.state.password2){
            alert("Password are deferents!");
            return false;
        }
        var data = {
            fnames: this.state.fnames,
            lnames: this.state.lnames,
            phone: this.state.phone,
            address: this.state.address,
            postal_code: this.state.postal_code,
            emlusr: this.state.emlusr,
            nrousr: this.state.nrousr,
            pssusr: this.state.password1
        }
        
        axios.post(baseUrl + 'createNewUser', data)
            .then(resp => {
                if(resp.data.affectedRows > 0){
                    alert("Your new account has been created succesfully, please login first!");
                    this.props.history.push('/login/false/false');
                };
            });
    }


    /*****ON CHANGE EVENTS */
    onChangeFnames(e){
      this.setState({
            fnames: e.currentTarget.value        
      });  
    }

    onChangeLnames(e){
        this.setState({
            lnames: e.currentTarget.value        
        });  
    }

    onChangePhone(e){
        this.setState({
            phone: e.currentTarget.value        
        });  
    }

    onChangeAddress(e){
        this.setState({
            address: e.currentTarget.value        
        });
    }

    onChangePostal_code(e){
        this.setState({
            postal_code: e.currentTarget.value        
        });
    }

    onChangeEmlusr(e){
        this.setState({
            emlusr: e.currentTarget.value        
        });
    }

    onChangePassword1(e){
        this.setState({
            password1: e.currentTarget.value        
        });
    }

    onChangePassword2(e){
        this.setState({
            password2: e.currentTarget.value        
        });
    }

    render() {
        return (
            <div className="container">
                <h3>New account</h3>
                <form onSubmit={this.makePost} className="form-vertical">
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faUser} /> First name</label>
                        <input className="form-control" required name="" onChange={this.onChangeFnames} value={this.state.fnames} />
                    </div>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faUser} /> Last name</label>
                        <input className="form-control" required name="" onChange={this.onChangeLnames} value={this.state.lnames} />
                    </div>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faPhone} /> Phone</label>
                        <input className="form-control" required name="" onChange={this.onChangePhone} value={this.state.phone} />
                    </div>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faAddressCard} /> Address</label>
                        <input className="form-control" required name="" onChange={this.onChangeAddress} value={this.state.address} />
                    </div>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faEnvelope} /> Postal code: </label>
                        <input className="form-control" required name="" onChange={this.onChangePostal_code} value={this.state.postal_code} />
                    </div>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faAt} /> Email: </label>
                        <input className="form-control" type="email" required name="" onChange={this.onChangeEmlusr} value={this.state.emlusr} />
                    </div>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faKey} /> Pass: </label>
                        <input className="form-control" type="password" required name="" onChange={this.onChangePassword1} value={this.state.password1} />
                    </div>
                    <div className="form-group">
                        <label><FontAwesomeIcon icon={faKey} /> Re-type password: </label>
                        <input className="form-control" type="password" required name="" onChange={this.onChangePassword2} value={this.state.password2} />
                    </div>
                    <div className="form-group">
                        <input className="form-control btn btn-primary" type="submit" value="Update Profile" />
                    </div>
                </form>
            </div>
        )
    }
};
