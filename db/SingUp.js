const mongoose=require('mongoose');
const UserSc= new mongoose.Schema({
    name:String,
    Email:String,
    password:String
},{collection:"user"});


module.exports=mongoose.model('user',UserSc);