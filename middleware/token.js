const jwt = require('jsonwebtoken');

const token = (req,res,next) => {
    const token = req.headers.authorization;
    
    if(!token){
        return res.status(400).send({
            success : false,
            message : 'Token is blank'
        })
    }

    var doneToken = token.split(' ')[1];

   jwt.verify(doneToken,'API',(err,decoded)=>{
    if(err){
        return res.status(403).send({
            success : false,
            message : 'token is not valid!'
        })
    }
    req.user = decoded;
    next();
   })
}

const adminRole = (role) => {
    return (req,res,next) =>{
        // role[0] => admin || role [1] => manager
        if(req.user.user.role ==  role[0] || req.user.user.role == role[1]){
           return next();
        }else{
            res.status(403).send({
                success : false,
                message : 'Access denied'
            });   
        }
    }
}

const managerRole = (role) => {
    return (req,res,next) => {
        if (req.user.user.role !== "manager") {
            res.status(400).send({
                success : false,
                message : "only manager can access this"
            })
        }
        next();
    }
}

module.exports = {
    token , adminRole , managerRole
}