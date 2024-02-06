const express = require('express');

const routes = express.Router();

const {token,adminRole} = require('../middleware/token');

// controllers
const userControllers = require('../controllers/userControllers');
const categoryControllers = require('../controllers/categoryControllers');

const passport = require('passport');

routes.post('/login',userControllers.login)
routes.post('/registerUser',userControllers.registerUser);

routes.post('/category_add',token,adminRole("admin"),categoryControllers.category_add);

routes.get('/category_view',token,categoryControllers.category_view);
    
module.exports = routes; 