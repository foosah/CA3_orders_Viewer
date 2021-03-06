var express = require('express');
var mongo = require('./../mongo');
var model = require('./../database/model');

var router = express.Router();

router.get('/', function (req, res) {
    mongo.connect();
    model.EmployeeModel.find(function(error, employees) {
        employees.sort(function(a, b) {
            return (a.firstName + a.lastName).localeCompare(b.firstName + b.lastName);
        });

        res.render('employees', {title: "Employees", employees: employees});
        mongo.close();
    });
});

/* GET employee details. */
router.get('/:id', function (req, res) {
    mongo.connect();
    var id = req.params.id;
    model.EmployeeModel.find( {_id: id }, function (error, employees) {
        res.render('employeeDetails', {title: "Employee details", employee: employees[0]});
        mongo.close();
    });
});

router.get('/:employeeId/:employeeName', function (req, res) {
    mongo.connect();
    var employeeId = req.params.employeeId;
    var employeeName = req.params.employeeName;

    model.OrderModel.find({employee: employeeId}, function (err, orders) {
        res.render('orders', {
            title: "Orders for employee " + employeeName,
            orders: orders
        });
        mongo.close();
    });
});

module.exports = router;
