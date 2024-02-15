const categoryModel = require('../models/categoryModel');
const subCategoryModel = require('../models/subCategoryModel');

const subcat_add = async(req,res) => {
    try {
        let dup_subcate = await subCategoryModel.findOne({subcategoryName : req.body.subcategoryName});
    
        if(dup_subcate){
            return res.status(200).send({
                success : true,
                message : "sub category allready added!"
            })
        }

        let subcategory = await subCategoryModel.create({
            categoryId : req.query.id,
            subcategoryName : req.body.subcategoryName
        })
    
        return res.status(200).send({
            success : true,
            message : "subcategory added",
            subcategory
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const subcat_view = async(req,res) => {
    try {
        let subCategoryView = await subCategoryModel.find({status : 1}).populate('categoryId');
        return res.status(200).send({
            success : true,
            message : "subcategory view",
            subCategoryView
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const subcat_delete = async(req,res) => {
    try {
        let subCategoryDelete = await subCategoryModel.findByIdAndDelete(req.query.id);
      
        return res.status(200).send({
            success : true,
            message : "Category deleted successfully!"
        })
    } catch (error) {    
        console.log(error);
        return false;
    }
}

const subcate_update = async(req,res) => {
    try {
        let id = req.query.id;

        let update = await subCategoryModel.findByIdAndUpdate(id,{
            subcategoryName : req.body.subcategoryName
        });
        return res.status(200).send({
            success : true,
            message : "sub category updated successfully"
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

// subcategory active/deactive
const subcat_active = (req,res) => {

}

module.exports = ({
    subcat_add , subcat_view , subcat_delete , subcate_update , subcat_active
})