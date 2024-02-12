const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        require : true
    },
    status : {
        type : String,
        defaul : 1
    }
})

const categoryModel = mongoose.model('categoryModel',categorySchema);

module.exports = categoryModel;