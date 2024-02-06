const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async(req,res)=> {
    try {
        let user = await userModel.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(200).send({
                success : true,
                message : "Email and password are not match"
            })   
        }      

        let token = jwt.sign({user : user},"API",{expiresIn : '24hr'});
        return res.status(200).send({
            success : true,
            message : "Token is here",
            token
        })  
    } catch (error) {
        console.log(error);
        return false;
    }
}

const registerUser = async(req,res) => {
    try {
       let user = await userModel.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
       });
       return res.status(200).send({
        success : true,
        message : "user successfully registered",
        user 
       }) 
    } catch (error) {
        console.log(error);
        return false;
    }
}
  
module.exports = {    
    registerUser, login
}  