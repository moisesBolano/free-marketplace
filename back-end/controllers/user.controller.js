var user_model = require('../models/user.model');
const crypto = require('crypto')
let utils = require('../helpers/utils');

var functions = {
    loginUser: function (req, res) {
        let email = req.body.email;
        let pass = crypto.createHash('md5').update(req.body.pass).digest("hex");//Crypt user password of the request(plain text) to MD5 HASH 
        var result = user_model.loginUser(email, pass);

        var numitm = req.body.numitm;
        var qtyitm = req.body.qtyitm;
        result.then(function (resp) {
            if (resp.length === 0) {//If the login isnt correct return access denied
                res.status(200).json({ "login": false, "email": null });
            } else {//Access granted return JWT 
                res.status(200).json({ "login": true, "user": resp[0], "token": utils.createToken(resp[0].emlusr, resp[0].nrousr), 'cartupd': (numitm != 'false' || qtyitm != 'false') });
                if (numitm != 'false' || qtyitm != 'false') {//Add item to cart after correct login
                    let cart_model = require('../models/shoppingCar.model');
                    var result = cart_model.addItemToShoppingCart(numitm, qtyitm, resp[0].nrousr);
                }
            }
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    getDetailUser: function (req, res) {
        var tokenid = req.body.TokenId;
        var result = utils.decodeToken(tokenid);
        result.then(function (resp) {//decode token
            var nrousr = resp.nrousr;
            let result = user_model.getDetailUser(nrousr);
            result.then(function (resp) {
                res.status(200).json(resp[0]);
            }).catch((err) => setImmediate(() => { throw err; }));
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    updateUserDetail: function (req, res) {
        var data = [
            req.body.fnames,
            req.body.lnames,
            req.body.phone,
            req.body.address,
            req.body.postal_code,
            req.body.emlusr,
            req.body.nrousr
        ];
        var result = user_model.updateUserDetail(data);
        result.then((resp) => {
            console.log(resp);
            res.status(200).json(resp);
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    createNewUser: function(req,res){
        var data = [
            req.body.fnames,
            req.body.lnames,
            req.body.phone,
            req.body.address,
            req.body.postal_code,
            req.body.emlusr,
            crypto.createHash('md5').update(req.body.pssusr).digest("hex")//Crypt user password of the request(plain text) to MD5 HASH 
        ];
        var result = user_model.createNewUser(data);
        result.then((resp) => {
            res.status(200).json(resp);
        }).catch((err) => setImmediate(() => { throw err; }));
    }
}

module.exports = functions;