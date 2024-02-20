const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async(req,res)=> {
    try {
        // let hash = await bcrypt.hash(password,10);        l
        let user = await userModel.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(200).send({
                success : true,
                message : "Email and password are not match"
            })   
        }  
        
        // let match = await bcrypt.compare(password, user.password);

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
            password : req.body.password,
            role : req.body.role
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

const changePassword = async(req,res) => {
    const { name, oldPassword, newPassword } = req.body;
    try {
        let user = await userModel.findOne({ name });

        if (!user || user.password !== oldPassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or incorrect oldpassword'
            });
        }

        user.password = newPassword;    
        await user.save();

        return res.send({
            success: true,
            message: 'Password changed successfully'
        });
        
    } catch (error) {
        console.log(error);
        return false;
    }
}
  
module.exports = {    
    registerUser, login , changePassword
}  