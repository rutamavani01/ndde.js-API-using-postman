const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
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
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subCategoryModel"
    },
    extrasubcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "extraSubCategoryModel"
    }
})

const productModel = mongoose.model('productModel',productSchema);

module.exports = productModel;