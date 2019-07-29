const db = require('../configs/link');

var props = {
    listAllCategories: function(){
        let sql = "SELECT  * FROM `market_category`;";
        return new Promise(function(resolve,reject){
            var results = db.query(sql, [], function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: "+error.errno;
                    //console.log(error);
                    return resolve(resultJson);
                }
                resultJson = JSON.parse(JSON.stringify(results));
                //console.log(resultJson);
                return resolve(resultJson);
            });
        });
    },
    listSubCategoriesOfCaterory: function(props,all){
        if(all){
            var sql = "SELECT * FROM `market_subcategory`";
        }else{
            var sql = "SELECT * FROM `market_subcategory` where numcat = ?";
        }
        return new Promise(function(resolve,reject){
            var results = db.query(sql, [props], function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: "+error.errno;
                    console.log(error);
                    return resolve(resultJson);
                }
                resultJson = JSON.parse(JSON.stringify(results));
                //console.log(resultJson);
                return resolve(resultJson);
            });
        });
    },
    createNewCategory: function(props){
        let sql = "INSERT INTO `market_place`.`market_category` (`namcat`) VALUES (?);";
        return new Promise(function(resolve,reject){
            var results = db.query(sql, [props], function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: "+error.errno;
                    console.log(error);
                    return resolve(resultJson);
                }
                resultJson = JSON.parse(JSON.stringify(results));
                //console.log(resultJson);
                return resolve(resultJson);
            });
        });
    }
}

module.exports = props;