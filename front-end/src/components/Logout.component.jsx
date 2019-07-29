import React, { Component } from 'react';



export default class Login extends Component {

    constructor(props) {
        super(props);
        this.logout();
    }

    logout() {
        localStorage.removeItem("TokenId");
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="container"></div>
        )
    }
};
