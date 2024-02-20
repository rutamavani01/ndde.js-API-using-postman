const addToCartModel = require('../models/addToCartModel');
const productModel = require('../models/productModel');

const addCart_add = async(req,res) => {
    try {
        let product = await productModel.findById(req.body.id).populate('categoryId').populate('subcategoryId').populate('extrasubcategoryId');
       
        let addData = await addToCartModel.create({
            name : product.name,   
            price : product.price,
            desc : product.desc,
            qty : product.qty,
            image : product.image,
            categoryId  :product.categoryId,
            subcategoryId : product.subcategoryId,
            extrasubcategoryId : product.extrasubcategoryId,
            userId : req.body.userId
        })

        return res.status(200).send({
            success  :true,
            message : "product added successfully in add to cart",
            addData
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addToCart_view = async(req,res) => {
    try {
        let cart = await addToCartModel.find({}).populate("userId","name email").populate('categoryId');
      
        let userData = cart.filter((v)=>{
            // console.log(v.userId.id);
            // console.log(req.query.id);
            // console.log(req.id);
            return v.userId.id === req.user.user._id
        })     

        return res.status(200).send({
            success : true,
            message : "cart fetch",
            userData
        }) 
    } catch (error) {
        console.log(error);
        return false;
    }
}

const addToCart_delete = async(req,res) => {
    try {
        let cartDelete = await addToCartModel.findByIdAndDelete(req.query.id);

        return res.status(200).send({
            success : true,
            message : "cart deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

const addToCart_adminView = async(req,res) => {
    try {
        let cartadminView = await addToCartModel.find({});
        return res.status(200).send({
            success : true,
            message : 'admin view cart',
            cartadminView
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    addCart_add , addToCart_view , addToCart_adminView , addToCart_delete
})