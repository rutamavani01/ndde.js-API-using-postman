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
// API=>secret key
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
        
        // if(req.user.user.role ==  role[0] || req.user.user.role == role[1]){
        //    return next();
        // }else{
        //     res.status(403).send({
        //         success : false,
        //         message : 'Access denied'
        //     });   
        // }

        if(req.user && role.includes(req.user.user.role)){
            return next();
        }
        res.status(400).send({
            success : false,
            message : "Acces denied by admin"
        })
    }
}

module.exports = {
    token , adminRole
}