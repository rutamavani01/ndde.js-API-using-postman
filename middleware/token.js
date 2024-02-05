const token = (req,res,next) => {

    const token = req.headers.authorization;

    if(!token) {
        return res.status(200).send({
            success : false,
            message : "token is blank"
        })
    }   
    return res.send(token);
}

module.exports = {
    token
}