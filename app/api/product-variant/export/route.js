import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import ProductVariantModel from "@/models/productVariant.model";


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
        
        const getCategoryVaraint = await ProductVariantModel.find(filter).select(' -media').sort({createdAt: -1}).lean()

        if(!getCategoryVaraint){
            return response(true, 200 , 'No category found')
        }

        return response(true, 200 , 'data fetch successfully', getCategoryVaraint)

    } catch (error) {
        return catchError(error)
    }
}