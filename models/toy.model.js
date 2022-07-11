const mongoose = require('mongoose');
// var validator = require("email-validator");

var toySchema = new mongoose.Schema({
    ToyName: {
        type: String,
        required: 'This field is required'
    },
    ImagePath: {
        type: String
    },
    Price: {
        type: Number
    },
    Quantity: {
        type: Number
    },
    Description: {
        type: String
    },
    Category: {
        type: String
    }

});

// custom validation for email

// employeeSchema.path('email').validate((val) => {
//     return validator.validate(val);
// }, 'Invalid Email');

mongoose.model('Toy', toySchema);