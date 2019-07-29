'use strict'

const jwt = require('jwt-simple');
const moment = require("moment");
const config = require('../configs/configs');


function createToken(emlusr,nrousr) {
    //console.log(user,'pello');
    const payload = {
        email: emlusr,
        nrousr: nrousr,
        iat: moment().unix(),
        exp: moment().add(15, 'days').unix()
    }
    return jwt.encode(payload, config.token_key);
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.token_key);
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'Token expired',
                    login : false
                });
            }
            resolve(payload);
        } catch (err) {
            reject({
                status: 500,
                message: 'Invalid token',
                login : false
            })
        }
    });
    return decoded;
}

module.exports = { createToken, decodeToken }