const User = require("../mongoDB/userModel");
const  Mongoose  = require("mongoose");
const { hashPassword } = require("./hash");
require('dotenv').config();


const connectionString = process.env.CONNECTIONSTRING;

Mongoose.connect(connectionString)
.then(()=>{console.log("DB connected")})
.catch((error)=>{'error connecting to MongoDB:', error.message});


exports.addUser = async (req, res, next)=>{
    const {username, password, email} = req.body;
    console.log({username, password, email});
    const isNewUser = await isUserExists(email, username);
    switch (isNewUser) {
        case "Email":
            next("Email already in use");
            return;
        case "Username":
            next("Username already taken");
            return;
        case true:
            const hashedPassword = await hashPassword(password)
            const newUser = {
                username,
                password: hashedPassword,
                email
            }
            try {
                await User.insertMany(newUser);
                res.send("User add successfully")
            } catch (error) {
                console.log(error);
                next("couldn't add new user")
            }
            break;
        default:
            next("couldn't add new user")
            return
    }
}

exports.deleteUser = async (req, res, next)=>{
    const {username} = req.body;
    try {
        const response = await User.deleteOne({ username }); // returns {deletedCount: 1}
        if(response.deletedCount === 1){
            res.send("User deleted successfully")
            return
        }else{
            next("couldn't delete user")
        }
    } catch (error) {
        next("couldn't delete user")
    }
}

const isUserExists = async (email, username) =>{
    try {
        const isEmailExists = await User.exists({email});
        const isUsernameExists = await User.exists({username});
        if(!isEmailExists){
            return "Email"
        }
        if(!isUsernameExists){
            return "Username"
        }
        return true;
    } catch (error) {
        return "error"
    }

}