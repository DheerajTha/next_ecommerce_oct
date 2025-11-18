import mongoose from "mongoose";


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    deletedAt:{
        type:Date,
        default:null,
        index:true,
    },
    
},{timestamps:true})



const CATEGORYModel = mongoose.models.category || mongoose.model("category", categorySchema, "categories")

export default CATEGORYModel