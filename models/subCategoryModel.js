const mongoose = require('mongoose')

const subcategoryschema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'categoryModel'
    },
    subcategoryName : {
        type : String,
        require : true
    }
})

const subCategoryModel = mongoose.model('subCategoryModel',subcategoryschema);

module.exports = subCategoryModel;