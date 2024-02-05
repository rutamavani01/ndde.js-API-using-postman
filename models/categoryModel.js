const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName : {
        type : String,
        require : true
    }
})

const categoryModel = mongoose.model('categoryModel',categorySchema);

module.exports = categoryModel;