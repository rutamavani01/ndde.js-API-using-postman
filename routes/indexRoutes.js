const express = require('express');

const routes = express.Router();
// multer
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, 'uploads') // Destination folder where uploaded files will be stored
   },
   filename: function (req, file, cb) {
       cb(null, Date.now() + '-' + file.originalname) // Rename file with a timestamp to avoid name conflicts
   }
});

const imageUpload = multer({storage: storage}).single('image'); 

const {token,adminRole} = require('../middleware/token');

// controllers 
const userControllers = require('../controllers/userControllers');
const categoryControllers = require('../controllers/categoryControllers');
const subCategoryControllers = require('../controllers/subCategoryControllers');
const extraSubCategoryControllers = require('../controllers/extraSubCategoryControllers');
const productControllers = require('../controllers/productCategory');
const addToCartControllers= require('../controllers/addToCartControllers');

const passport = require('passport');

// user routes
routes.post('/login',userControllers.login)
routes.post('/registerUser',userControllers.registerUser);
routes.post('/changePassword',token,userControllers.changePassword);

// category-routes
routes.get('/category_view',token,categoryControllers.category_view);
routes.post('/category_add',token,adminRole(["admin","manager"]),categoryControllers.category_add);
routes.delete('/category_delete',token,adminRole(["admin"]),categoryControllers.category_delete);
routes.put('/category_update',token,adminRole(["admin"]),categoryControllers.category_update);
// active-deactive
routes.put('/category_active',token,adminRole(["admin","manager"]),categoryControllers.category_active);
// only admin can see category
routes.get('/adminCategory_view',token,adminRole(["admin"]),categoryControllers.adminCategory_view);


// subcategory-routes
routes.get('/subcat_view',token,subCategoryControllers.subcat_view);
routes.post('/subcat_add',token,adminRole(["admin","manager"]),subCategoryControllers.subcat_add);
routes.delete('/subcat_delete',token,adminRole(["admin"]),subCategoryControllers.subcat_delete);
routes.put('/subcate_update',token,subCategoryControllers.subcate_update);

routes.put('/subcat_active',token,adminRole(["admin","manager"]),subCategoryControllers.subcat_active);

routes.get('/adminStatusView',token,adminRole(["admin"]),subCategoryControllers.adminStatusView)

//extra-subcategory routes  
routes.get('/ex_subcat_view',token,extraSubCategoryControllers.ex_subcat_view);
routes.post('/ex_subcat_add',token,adminRole(["admin","manager"]),extraSubCategoryControllers.ex_subcat_add);
routes.delete('/ex_subcat_delete',token,adminRole(["admin"]),extraSubCategoryControllers.ex_subcat_delete);
routes.put('/ex_subcate_update',token,extraSubCategoryControllers.ex_subcate_update);

routes.put('/ex_subcate_active',token,adminRole(["admin","manager"]),extraSubCategoryControllers.ex_subcate_active)

routes.get('/admin_excategory_view',token,adminRole(["admin"]),extraSubCategoryControllers.admin_excategory_view);
  
// product routes
routes.post('/product_add',token,adminRole(["admin","manager"]),imageUpload,productControllers.product_add);
routes.get('/product_view',token,productControllers.product_view);
routes.delete('/product_delete',token,adminRole(["admin"]),productControllers.product_delete);
routes.put('/product_update',token,imageUpload,productControllers.product_update);

routes.put('/product_active',token,adminRole(["admin","manager"]),productControllers.product_active);

routes.get('/admin_product_view',token,productControllers.admin_product_view);

// addToCart
routes.post('/addCart_add',token,adminRole(["admin","manager"]),addToCartControllers.addCart_add);
routes.get('/addToCart_view',token,addToCartControllers.addToCart_view);
routes.get('/addToCart_adminView',token,adminRole(["admin"]),addToCartControllers.addToCart_adminView);
routes.delete('/addToCart_delete',addToCartControllers.addToCart_delete);

module.exports = routes; 