const categoryModel = require('../models/categoryModel');
const extraSubCategoryModel = require('../models/extraSubCategoryModel');
const productModel = require('../models/productModel');
const subCategoryModel = require('../models/subCategoryModel');
const fs = require('fs');

const product_add = async (req, res) => {
    try {
        let category = await categoryModel.find({});
        let subcategory = await subCategoryModel.find({});
        let extrasubcategory = await extraSubCategoryModel.find({});

        let addData = await productModel.create({
            categoryId: req.query.categoryId,
            subcategoryId: req.query.subcategoryId,
            extrasubcategoryId: req.query.extrasubcategoryId,
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty,
            desc: req.body.desc,
            image: req.file.path,
        })
        return res.status(201).send({
            success: true,
            message: "Product added successfully!",
            addData
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const product_view = async (req, res) => {
    try {
        let viewData = await productModel.find({}).populate('categoryId').populate('subcategoryId').populate('extrasubcategoryId')

        return res.status(201).send({
            success: true,
            message: "view product data",
            viewData
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const product_delete = async (req, res) => {
    try {
        let deleteFile = await productModel.findByIdAndDelete(req.query.id);
        fs.unlinkSync(deleteFile.image);

        let productDelete = await productModel.findByIdAndDelete(req.query.id);
        return res.status(200).send({
            success: true,
            message: 'Product deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const product_update = async (req, res) => {
    try {
        if (req.file) {
            let oldImage = await productModel.findById(req.query.id);
            fs.unlinkSync(oldImage.image);
        }
    } catch (error) {
        console.log(error);
        return false;
    }

    try {
        let id = req.query.id;

        if (req.file) {
            image = req.file.path;
        }

        let update = await productModel.findByIdAndUpdate(id, {
            name: req.body.name,
            price: req.body.price,
            qty: req.body.qty,
            desc: req.body.desc,
            image: image
        })
        return res.status(200).send({
            success: true,
            message: "product updated successfully",
            update
        })
    }
    catch (error) {
        console.log(error);
        return false;
    }

}

module.exports = ({
    product_add, product_view, product_delete, product_update
})