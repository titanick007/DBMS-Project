// Import required modules
var express = require('express');
var asyncValidator = require('async-validator');
var router = express.Router();
regAdminModel = require.main.require('./models/reg-admin-model');
regAdminValidation = require.main.require('./Validation_rule/registration_admin_validation');

// Request Handler

router.get('/', function(req, res) {
    res.render('./reg-admin/reg-admin');
});

router.post('/', function(req, res) {
    var data = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        gender: req.body.gender,
        dob: req.body.dob,
        nid: req.body.nid,
        presentaddress: req.body.presentaddress,
        parmanentaddress: req.body.parmanentaddress
    };

    var validator = new asyncValidator(regAdminValidation.registration_admin);
    validator.validate(data, function(errors, fields) {

        console.log(errors);
        console.log('-----------------------------------------------------------');
        console.log(fields);

        if (errors) {
            res.render('reg-admin/reg-admin', { errors: errors });
        } else {
            if (req.body.password == req.body.cpassword) {
                regAdminModel.registerAdmin(data, function(valid) {
                    if (valid) {
                        res.redirect('./login');
                    } else {
                        res.redirect('/error');
                    }
                });
            } else {
                res.redirect('./error/error');
            }
        }
    });
});

//Exports

module.exports = router;
