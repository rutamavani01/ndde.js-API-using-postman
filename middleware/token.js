const jwt = require('jsonwebtoken');

const token = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]; 

   jwt.verify(token,'API',(err,decoded)=>{
    if(err){
        return res.status(403).json({message : 'token not valid'})
    }
    req.user = decoded;
    next();
   })
}

const adminRole = (role) => {
    return (req,res,next) =>{
        if(req.user.user.role === "admin"){
            next();
        }else{
            res.status(403).json({message : 'Access denied'});   
        }
    }
}

module.exports = {
    token , adminRole
}