var cart_model = require('../models/shoppingCar.model');

var functions = {
    addItemToShoppingCart: function (req, res) {
        let util = require('../helpers/utils');
        var numitm = req.body.numitm;
        var qtyitm = req.body.qtyitm;
        var tokenid = req.body.TokenId;
        var result = util.decodeToken(tokenid);
        result.then(function (resp) {
            let result = cart_model.addItemToShoppingCart(numitm, qtyitm, resp.nrousr);
            var ans = result.then(function (resp) {
                return resp;
            }).catch((err) => setImmediate(() => { throw err; }));
            ans.then(function(resp){
                res.status(200).json(resp);
            }).catch((err) => setImmediate(() => { throw err; }));
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    detailOfMyShoppingCart: function(req,res){
        let util = require('../helpers/utils');
        var tokenid = req.body.TokenId;
        var result = util.decodeToken(tokenid);
        result.then(function (resp) {
            let result = cart_model.detailOfMyShoppingCart(resp.nrousr);
            var ans = result.then(function (resp) {
                return resp;
            }).catch((err) => setImmediate(() => { throw err; }));
            ans.then(function(resp){
                res.status(200).json(resp);
            }).catch((err) => setImmediate(() => { throw err; }));
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    deleteItemOfMycart: function(req,res){
        let util = require('../helpers/utils');
        var tokenid = req.body.TokenId;
        var nrocrt = req.body.nrocrt;
        var result = util.decodeToken(tokenid);
        result.then(function (resp) {
            let result = cart_model.deleteItemOfMycart(resp.nrousr,nrocrt);
            var ans = result.then(function (resp) {
                return resp;
            }).catch((err) => setImmediate(() => { throw err; }));
            ans.then(function(resp){
                res.status(200).json(resp);
            }).catch((err) => setImmediate(() => { throw err; }));
        }).catch((err) => setImmediate(() => { throw err; }));
    }
}

module.exports = functions;