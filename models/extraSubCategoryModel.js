const mongoose = require('mongoose');

const extraSubCategorySchema = ({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "categoryModel"
    },
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "subCategoryModel"
    },
    extrasubcategoryName : {
        type : String,
        require : true
    }
})

const extraSubCategoryModel = mongoose.model('extraSubCategoryModel',extraSubCategorySchema);

module.exports = extraSubCategoryModel;