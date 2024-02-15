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

const passport = require('passport');

// userControllers
routes.post('/login',userControllers.login)
routes.post('/registerUser',userControllers.registerUser);

// category-controllers
routes.get('/category_view',token,categoryControllers.category_view);
routes.post('/category_add',token,adminRole(["admin","manager"]),categoryControllers.category_add);
routes.delete('/category_delete',token,adminRole(["admin"]),categoryControllers.category_delete);
routes.put('/category_update',categoryControllers.category_update);
// active-deactive
routes.put('/category_active',categoryControllers.category_active);
// only admin can see category
routes.get('/adminCategory_view',token,adminRole(["admin"]),categoryControllers.adminCategory_view);

// subcategory-controllers
routes.get('/subcat_view',token,subCategoryControllers.subcat_view);
routes.post('/subcat_add',token,adminRole(["admin","manager"]),subCategoryControllers.subcat_add);
routes.delete('/subcat_delete',token,adminRole(["admin"]),subCategoryControllers.subcat_delete);
routes.put('/subcate_update',subCategoryControllers.subcate_update);

routes.put('/subcat_active',subCategoryControllers.subcat_active);

//extra-subcategory controllers 
routes.get('/ex_subcat_view',extraSubCategoryControllers.ex_subcat_view);
routes.post('/ex_subcat_add',token,adminRole(["admin","manager"]),extraSubCategoryControllers.ex_subcat_add);
routes.delete('/ex_subcat_delete',token,adminRole(["admin"]),extraSubCategoryControllers.ex_subcat_delete);
routes.put('/ex_subcate_update',extraSubCategoryControllers.ex_subcate_update);

// product controllers
routes.post('/product_add',imageUpload,productControllers.product_add);
routes.get('/product_view',productControllers.product_view);
routes.delete('/product_delete',productControllers.product_delete)
routes.put('/product_update',imageUpload,productControllers.product_update)

module.exports = routes; 