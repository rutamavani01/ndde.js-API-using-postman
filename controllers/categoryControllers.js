const categoryModel = require('../models/categoryModel');

const category_add = async(req,res) => {
   try {
    // duplicate category
    let duplicate_category =await categoryModel.findOne({categoryName : req.body.categoryName});

    if(duplicate_category){
        return res.status(200).send({
            success : true,
            message : "category already added"
        })
    }    

    let category = await categoryModel.create({
        categoryName : req.body.categoryName
    })
    return res.status(200).send({
        success : true,
        message : "category added",
        category
    })
   } catch (error) {
    console.log(error);
    return false;
   }
}       
//only status : 1(activate category) is show
const category_view = async(req,res) => {
    try {
        let view = await categoryModel.find({status : 1});
        return res.status(200).send({
            success : true,
            message : "category fetch",
            view
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const category_delete = async(req,res) => {
    try {
        let deleteCategory = await categoryModel.findByIdAndDelete(req.query.id);

        return res.status(200).send({
            success : true,
            message : "category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const category_update = async(req,res) => {
    try {
        const id = req.query.id;
        let update = await categoryModel.findByIdAndUpdate(id,{
            categoryName : req.body.categoryName
        });
        return res.status(200).send({
            success : true,
            message : "Category Succesfully Updated!"
        })
      
    } catch (error) {
        console.log(error);
        return false;
    }
} 
  
// category active & deactive
const category_active = async(req,res) => {
    try{  
        let id = req.query.id;
        let status = req.body.status;
        let updateStatus = await categoryModel.findByIdAndUpdate(id,{
            status  : status
        })
        if(status == 0){
            return res.status(200).send({
                success : true,
                message : "deactivated catgory"
            })
        }else if(status ==1){
            return res.status(200).send({
                success : true,
                message : "active category"
            })
        }else{
            return res.status(200).send({
                success : true,
                message : "Invalid choice!! use 1 for status actived and 0 for deactivated"
            })
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

// only admin can see this (whole data)!
const adminCategory_view = async(req,res) => {
    try{
        let category = await categoryModel.find({status : 1});
        let categoryinactive = await categoryModel.find({status : 0});

        return res.status(200).send({
            success : true,
            message : "category fetch",
            category,
            inactive : categoryinactive
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    category_add , category_view , category_delete , category_update ,category_active , adminCategory_view
}