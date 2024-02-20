const categoryModel = require('../models/categoryModel');
const subCategoryModel = require('../models/subCategoryModel');

const subcat_add = async(req,res) => {
    try {
        //duplicate subcategory
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
        // let category = await categoryModel.find({status:1});
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
const subcat_active = async(req,res) => {
    try {
        let id = req.query.id;
        let status = req.body.status;

        let updateStatus = await subCategoryModel.findByIdAndUpdate(id,{
            status : status
        })
        if(status == 0){
            return res.status(200).send({
                success : true,
                message : "subcategory deactivated"
            })
        }else if(status == 1){
            return res.status(200).send({
                success : true,
                message : "subcategory activated!"
            })
        }else{
            return res.status(200).send({
                success : false,
                message : "Invalid choice!! use 1 for status actived and 0 for deactivated"
            })
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
 
const adminStatusView = async(req,res) => {
    try {
        let active = await subCategoryModel.find({status : 1});
        let inactive = await subCategoryModel.find({status  : 0});
        return res.status(200).send({
            success : true,
            message : "subcategory fetched successfully",
            "active sub-category": active,
             "inactive sub-category" : inactive 
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    subcat_add , subcat_view , subcat_delete , subcate_update , subcat_active , adminStatusView
})