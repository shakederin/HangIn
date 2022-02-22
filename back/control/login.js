const User = require("../mongoDB/userSchema")

exports.login = async (req, res, next) =>{
    const { username, password } = (req.body);
    if(!username || !password){
        next("Either username or password are missing");
        return
    };
}