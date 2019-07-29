'use strict';

const util = require('./utils');

function isAuth(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message : 'Access denied', login : false});
    }

    const token = req.headers.authorization.split(" ")[1];
    util.decodeToken(token)
        .then(response => {
            next();
        })
        .catch(response => {
            res.status(response.status).send({message: 'Invalid token',login : false});
        });
}

module.exports = {isAuth}