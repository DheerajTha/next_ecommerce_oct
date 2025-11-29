import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import MediaModel from "@/models/media.model";
import ProductModel from "@/models/product.model";
import { isValidObjectId } from "mongoose";
export async function GET(request, {params}) {
    try {
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth) {
            return response(false, 403 , 'unauthorized')
        }

        await connectDB()

        const getParams = await params
        const id = getParams.id

        const filter = {
            deletedAt: null
        }
        if(!isValidObjectId(id)){
            return response(false, 400 ,'invalid id')
        }

        filter._id = id

        const getProduct = await ProductModel.findOne(filter).populate('media', '_id secure_url').lean()
        if(!getProduct){
            return response(false, 404 ,'Product not found')

        }

        return response(true,200,'Product Found',getProduct)

    } catch (error) {
        return catchError(error)
    }
}