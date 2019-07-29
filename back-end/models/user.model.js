const db = require('../configs/link');

var props = {
    loginUser: function (email, pass) {
        let sql = "SELECT emlusr,nrousr,fnames,lnames FROM `market_users` where emlusr = ? and pssusr = ?;";
        return new Promise(function (resolve, reject) {
            var results = db.query(sql, [email, pass], function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: XXXXXX";
                    console.log(error.sql);
                    return resolve(resultJson);
                }
                console.log(this.sql);
                resultJson = JSON.parse(JSON.stringify(results));
                return resolve(resultJson);
            });
        });
    },
    getDetailUser: function (nrousr) {
        let sql = "SELECT * FROM `market_users` where nrousr = ?;";
        return new Promise(function (resolve, reject) {
            var results = db.query(sql, [nrousr], function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: XXXXXX";
                    console.log(error.sql);
                    return resolve(resultJson);
                }
                console.log(this.sql);
                resultJson = JSON.parse(JSON.stringify(results));
                return resolve(resultJson);
            });
        });
    },
    updateUserDetail: function (data) {
        let sql = "UPDATE `market_users` SET `fnames` = ? ,\n\
                                             `lnames` = ? ,\n\
                                             `phone` = ? ,\n\
                                             `address` = ? ,\n\
                                             `postal_code` = ? ,\n\
                                             `emlusr` = ? \n\
                                             WHERE  `nrousr` = ?;";
        return new Promise(function (resolve, reject) {
            var results = db.query(sql, data, function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: XXXXXX";
                    console.log(error.sql);
                    return resolve(resultJson);
                }
                console.log(this.sql);
                resultJson = JSON.parse(JSON.stringify(results));
                console.log(resultJson);
                return resolve(resultJson);
            });
        });
    },
    createNewUser: function (data) {
        let sql = "insert  into `market_users` (`fnames`,`lnames`,`phone`,`address`,`postal_code`,`emlusr`,`pssusr`)\n\
                                       VALUES (       ?,       ?,      ?,        ?,            ?,       ?,      ?)";
        return new Promise(function (resolve, reject) {
            var results = db.query(sql, data, function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: XXXXXX";
                    console.log(error.sql);
                    return resolve(resultJson);
                }
                console.log(this.sql);
                resultJson = JSON.parse(JSON.stringify(results));
                console.log(resultJson);
                return resolve(resultJson);
            });
        });
    },
    listUsers: function () {
        let sql = "";
        return new Promise(function (resolve, reject) {
            var results = db.query(sql, [], function (error, results, fields) {
                var resultJson = {};
                if (error) {
                    resultJson.error = true;
                    resultJson.errno = error.errno;
                    resultJson.msg = "Error No: XXXXXX";
                    return resolve(resultJson);
                }
                resultJson = JSON.parse(JSON.stringify(results));
                return resolve(resultJson);
            });
        });
    },
}

module.exports = props;