var category_model = require('../models/category.model');

var functions =  {
    listAllCategories: function(req,res){
        var result = category_model.listAllCategories();
        result.then(function(results){
            res.status(200).json(results);
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    listSubCategoriesOfCaterory: function(req,res){
        let numcat = req.body.numcat;
        let all = ((req.body.numcat === "All") ? true : false);
        var result = category_model.listSubCategoriesOfCaterory(numcat,all);
        result.then(function(results){
            res.status(200).json(results);
        }).catch((err) => setImmediate(() => { throw err; }));
    },
    createNewCategory: function(req,res){
        let props = [req.params.name];
        var result = category_model.createNewCategory(props);
        result.then(function(results){
            res.status(200).json(results);
        }).catch((err) => setImmediate(() => { throw err; }));
    }
}

module.exports = functions;