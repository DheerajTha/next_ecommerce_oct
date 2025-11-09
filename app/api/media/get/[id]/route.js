import { connectDB } from "@/lib/dbConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFuncation";
import MediaModel from "@/models/media.model";
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
            deleteAt: null
        }
        if(!isValidObjectId(id)){
            return response(false, 400 ,'invalid id')
        }

        filter._id = id

        const getMedia = await MediaModel.findOne(filter).lean()
        if(!getMedia){
            return response(false, 404 ,'Media not found')

        }

        return response(true,200,'Media Found',getMedia)

    } catch (error) {
        return catchError(error)
    }
}