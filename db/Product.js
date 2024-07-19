const mongoose=require('mongoose');

const ProductSc= new mongoose.Schema({
    name:String,
    price:String,
    company:String,
    userId:String
},{collection:'product'})

module.exports=mongoose.model('product',ProductSc)