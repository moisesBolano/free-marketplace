const db = require('../configs/link');

var props = {
    listAllProducts: function(numcat,numsub,name,order,allcat,allsub,allnam){
        let props = [];
        var sql = "SELECT  cat.numcat,itm.* \n\
                    FROM market_items itm\n\
                    inner join market_subcategory as sub on sub.numsub = itm.numsub\n\
                        inner join market_category as cat on cat.numcat = sub.numcat";
        if(allcat === false){
            sql += " where cat.numcat = ? ";
            props.push(numcat);
        }
        if(allsub === false){
            sql += ((allcat) ? ' WHERE ' : 'AND ')+" sub.numsub = ? ";
            props.push(numsub);
        }
        if(allnam === false){
            sql += ((allcat && allsub) ? ' WHERE ' : 'AND ')+" itm.name like ?";
            props.push('%'+name+'%');
        }
        //order = db.escape(order);
        sql +=  " order by itm.value "+order+", itm.time_add desc;";
        return new Promise(function(resolve,reject){
            var results = db.query(sql, props, function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: "+error.errno;
                    console.log(error.sql);
                    return resolve(resultJson);
                }
                resultJson = JSON.parse(JSON.stringify(results));
                return resolve(resultJson);
            });
        });
    },
    getDetailOfProduct: function(numitm){
        var sql = "select itm.* FROM market_items itm where numitm = ?;";
        return new Promise(function(resolve,reject){
            var results = db.query(sql, [numitm], function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: "+error.errno;
                    console.log(error.sql);
                    return resolve(resultJson);
                }
                resultJson = JSON.parse(JSON.stringify(results));
                console.log(results.sql);
                return resolve(resultJson[0]);
            });
        });
    }
}

module.exports = props;