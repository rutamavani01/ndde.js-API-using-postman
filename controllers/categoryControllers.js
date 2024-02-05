const categoryModel = require('../models/categoryModel');

const category_add = async(req,res) => {
   try {
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

const category_view = async(req,res) => {
    try {
        let view = await categoryModel.find({});
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

module.exports = {
    category_add , category_view
}