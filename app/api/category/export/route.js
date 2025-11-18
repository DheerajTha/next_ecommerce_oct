import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import CATEGORYModel from "@/models/category.model";


export async function GET(request) {
    try {
        const auth = await isAuthenticated('admin')
        if(!auth.isAuth) {
            return response(false, 403 , 'unauthorized')
        }

        await connectDB()


        const filter = {
            deletedAt: null
        }
        
        const getCategory = await CATEGORYModel.find(filter).sort({createdAt: -1}).lean()

        if(!getCategory){
            return response(true, 200 , 'No category found')
        }

        return response(true, 200 , 'data fetch successfully', getCategory)

    } catch (error) {
        return catchError(error)
    }
}