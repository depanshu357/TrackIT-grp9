const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true
    },
    rollNo:{
        type:Number,
        required:false
    },
    shopName:{
        type:String,
        required: false
    },
    budget:{
        type:Number,
        required:false,
        // default:15000
    }
})
// static signup model
userSchema.statics.signup = async function(email,password,userType,rollNo,shopName,budget){
    const exist = await this.findOne({email})

    //validation
    if(!email || !password || !userType ){
        throw Error("All fields must be filled")
    }
    if(userType=="Customer"){
        if(!rollNo || !budget){
            throw Error("All fields must be filled")
        }
    }
    if(userType=="Shopkeeper"){
        if(!shopName){
            throw Error("All fields must be filled")
        }
    }
    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough - it must have a minimum length of 8 characters, and must contain a minimum of 1 lowercase, 1 uppercase, 1 symbol and 1 number")
    }
    if(exist){
        throw Error("Email already in use")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)
    const user = this.create({email,password:hash,userType,rollNo,shopName,budget})
    return user
}
//static login method
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if(!user){throw Error("Incorrect Email");}
    const match = await bcrypt.compare(password,user.password)
    if(!match){throw Error("Incorrect Password");}
    return user;
}
mongoose.set('strictQuery', true);

module.exports = mongoose.model("TrackItUser",userSchema)