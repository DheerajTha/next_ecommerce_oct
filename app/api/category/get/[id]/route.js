import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import CATEGORYModel from "@/models/category.model";
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

        const getCategory = await CATEGORYModel.findOne(filter).lean()
        if(!getCategory){
            return response(false, 404 ,'Category not found')

        }

        return response(true,200,'Category Found',getCategory)

    } catch (error) {
        return catchError(error)
    }
}