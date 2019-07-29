const db = require('../configs/link');

var props = {
    addItemToShoppingCart: function (numitm, qtyitm, nrousr) {
        var products_model = require('../models/products.model');
        //Get actual value of product
        var result = products_model.getDetailOfProduct(numitm);
        result.then(function (results) {
            var props = [numitm, nrousr, qtyitm, results.value];
            var sql = "INSERT INTO `market_shoppingcart` (`nroitm`, `nrousr`, `qtyitm`, `value`) VALUES (?, ?, ?, ?);";
            return new Promise(function (resolve, reject) {
                var results = db.query(sql, props, function (error, results, fields) {
                    var resultJson = {};
                    if (error) {
                        resultJson.error = true;
                        resultJson.errno = error.errno;
                        resultJson.msg = "Error No: " + error.errno;
                        console.log(error.sql);
                        return resolve(resultJson);
                    }
                    resultJson = JSON.parse(JSON.stringify(results));
                    return resolve(resultJson);
                });
            });
        }).catch((err) => setImmediate(() => { throw err; }));
        return result;
    },
    detailOfMyShoppingCart: function (nrousr) {
        var sql = "SELECT  crt.nrocrt,cat.namcat,sub.namesub,crt.value as value_crt,crt.qtyitm ,itm.* \n\
                        FROM market_items itm\n\
                            inner join market_subcategory as sub on sub.numsub = itm.numsub\n\
                            inner join market_category as cat on cat.numcat = sub.numcat\n\
                            inner join market_shoppingcart as crt on crt.nroitm  = itm.numitm\n\
                                where crt.nrousr = ?\n\
                                order by crt.date_add desc";
        return new Promise(function (resolve, reject) {
            var results = db.query(sql, [nrousr], function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: " + error.errno;
                    console.log(error.sql);
                    return resolve(resultJson);
                }
                resultJson = JSON.parse(JSON.stringify(results));
                console.log(results.sql);
                return resolve(resultJson);
            });
        });
    },deleteItemOfMycart: function(nrousr,nrocrt){
        var sql = "delete from market_shoppingcart where nrousr = ? and nrocrt = ?;";
        return new Promise(function (resolve, reject) {
            var results = db.query(sql, [nrousr,nrocrt], function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: " + error.errno;
                    console.log(error.sql);
                    return resolve(resultJson);
                }
                resultJson = JSON.parse(JSON.stringify(results));
                console.log(results.sql);
                return resolve(resultJson);
            });
        });
    }
}

module.exports = props;