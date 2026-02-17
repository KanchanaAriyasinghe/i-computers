import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    productId : {
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    altNames:{
        type:[String],
        required:false,
        default:[]
    },
    price : {
        type:Number,
        required:true
    },
    labeledPrice:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true,
        default:[
            "/images/default-product-01.png",
            "/images/default-product-02.png"

        ]
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isAvailable:{
        type:Boolean,
        required:true,
        default:true
    },
    stock:{
        type:Number,
        required:true,
        default:0
    }

})

const Product = mongoose.model("Product", productSchema)

export default Product