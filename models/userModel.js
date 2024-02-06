const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { 
        type : String,
        require : true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type : String,
        required : true
    },
    "role" : {
        type :String,
        required : true
    }
})

const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;