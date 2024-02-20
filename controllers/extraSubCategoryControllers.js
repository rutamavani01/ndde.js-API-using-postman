const categoryModel = require('../models/categoryModel');
const extraSubCategoryModel = require('../models/extraSubCategoryModel');
const subCategoryModel = require('../models/subCategoryModel');

const ex_subcat_add = async(req,res) => {
    //duplicate extra sub category
    let dup_ex_subcate = await extraSubCategoryModel.findOne({extrasubcategoryName : req.body.extrasubcategoryName});

    if(dup_ex_subcate){ 
        return res.status(200).send({
            success : true,
            message : 'extra subcategory already added!'
        })
    }

    let category = await categoryModel.find({});
    let subcategory = await subCategoryModel.find({});
    
    let extraSubcategory = await extraSubCategoryModel.create({
        categoryId : req.query.categoryId,
        subcategoryId : req.query.subcategoryId,
        extrasubcategoryName : req.body.extrasubcategoryName
    })

    return res.status(200).send({
        sucess : true,
        message : "extra sub category added successfully"
    })
}

const ex_subcat_view = async(req,res) => {
    try {
        let extraSubCategoryView = await extraSubCategoryModel.find({status : 1}).populate('categoryId').populate('subcategoryId');
        return res.status(200).send({
            success : true,
            message : "extra sub category view",
            extraSubCategoryView
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const ex_subcat_delete = async(req,res) => {
    try {
        let extraSubCategoryDelete = await extraSubCategoryModel.findByIdAndDelete(req.query.id);
        return res.status(200).send({
            success : true,
            message :"extra subcategory deleted"
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const ex_subcate_update = async(req,res) => {
    try {
        let id = req.query.id;
        
        let update = await extraSubCategoryModel.findByIdAndUpdate(id,{
            extrasubcategoryName : req.body.extrasubcategoryName
        })

        return res.status(200).send({
            success :true,
            message : "extra category updated successfully!"
        })
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

// extra subcategory active-deactive
const ex_subcate_active = async(req,res) => {
    try{
        let id = req.query.id;
        let status = req.body.status;

        let update = await extraSubCategoryModel.findByIdAndUpdate(id,{
            status : status
        })

        if(status == 0){
            return res.status(200).send({
                success : true,
                message : "extra category status is deactivate"
            
            })
        }else if(status == 1){
            return res.status(200).send({
                success : true,
                message : "extra category status is activate"
            })
        }else{
            return res.status(200).send({
                success : false,
                message : "Invalid choice!! use 1 for status actived and 0 for deactivated"
            })
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const admin_excategory_view = async(req,res) => {
    try {
        let active = await extraSubCategoryModel.find({status : 1});
        let inactive = await extraSubCategoryModel.find({status : 0});

        return res.status(200).send({
            success : true,
            message : "extra subcategory fetch",
            "active extra subcategory  " : active,
            "inactive extra subcategory" : inactive
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    ex_subcat_add , ex_subcat_view , ex_subcat_delete , ex_subcate_update ,admin_excategory_view , ex_subcate_active
})