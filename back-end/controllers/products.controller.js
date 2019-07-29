var products_model = require('../models/products.model');

var functions =  {
    listAllProducts: function(req,res){
        let numcat = req.body.numcat;
        let numsub = req.body.numsub;
        let name = req.body.name;
        let order = req.body.order;
        let allcat = ((numcat === "All") ? true : false);
        let allsub = ((numsub === "All") ? true : false);
        let allnam = ((name === "All") ? true : false);
        var result = products_model.listAllProducts(numcat,numsub,name,order,allcat,allsub,allnam);
        result.then(function(results){
            res.status(200).json(results);
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    getDetailOfProduct: function(req,res){
        let numitm = req.body.numitm;
        var result = products_model.getDetailOfProduct(numitm);
        result.then(function(results){
            res.status(200).json(results);
        }).catch((err) => setImmediate(() => { throw err; }));
    }
}

module.exports = functions;