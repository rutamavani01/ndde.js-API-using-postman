const mongoose = require('mongoose');

const addToCartSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    qty : {
        type : Number,
        require : true
    },
    image : {
        type : String,
        require : true
    },
    desc : {
        type : String,
        require : true
    },
    status : {
        type : String,
        default : 1
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "categoryModel"
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "userModel"
    }
})

const addToCartModel = mongoose.model('addToCartModel',addToCartSchema);

module.exports = addToCartModel;