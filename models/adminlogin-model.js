var db = require('./db');

var loginData = function(data, callback) {
    var sql = 'SELECT * FROM admin WHERE username=?';

    var param = [data.username];
    db.getData(sql, param, function(result) {
        if (result.length == 0 || result == null) {
            // No user found with the provided username
            callback(false);
        } else {
            // Compare the input password with the one stored in the database
            if (data.password === result[0].password) {
                // Passwords match, login successful
                callback(result);
            } else {
                // Passwords do not match, login failed
                callback(false);
            }
        }
    });
}

module.exports.loginData = loginData;
