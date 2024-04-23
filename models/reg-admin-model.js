// Import required modules
var db = require('./db');
var passwordHash = require('password-hash');

// Function to validate and insert admin user data into the admin table
var registerAdmin = function(data, callback) {
    // SQL query to insert data into the admin table
    var sql = "INSERT INTO admin (name, username, email, phone, password, gender, dob, nid, presentaddress, parmanentaddress) VALUES (?,?,?,?,?,?,?,?,?,?)";

    // Parameters for the SQL query
    var params = [
        data.name,
        data.username,
        data.email,
        data.phone,
        passwordHash.generate(data.password), // Hash the password before inserting
        data.gender,
        data.dob,
        data.nid,
        data.presentaddress,
        data.parmanentaddress
    ];

    // Call the insertData function from the db module to execute the SQL query
    db.insertData(sql, params, function(result) {
        // Check if the result is null or empty
        if (result == null || result.length == 0) {
            // If no rows were affected, callback with false to indicate failure
            callback(false);
        } else {
            // If rows were affected, callback with true to indicate success
            callback(true);
        }
    });
}

// Export the registerAdmin function to make it accessible from other modules
module.exports.registerAdmin = registerAdmin;
