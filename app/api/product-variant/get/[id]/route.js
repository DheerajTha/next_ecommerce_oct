import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import MediaModel from "@/models/media.model";
import ProductVariantModel from "@/models/productVariant.model";
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

        const getProductVariant = await ProductVariantModel.findOne(filter).populate('media', '_id secure_url').lean()
        if(!getProductVariant){
            return response(false, 404 ,'Product Variant not found')

        }

        return response(true,200,'Product Variant Found',getProductVariant)

    } catch (error) {
        return catchError(error)
    }
}