import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import MediaModel from "@/models/media.model";
import { NextResponse } from "next/server";

export async function GET(request){
    try{
        const auth = await isAuthenticated("admin")

        if (!auth.isAuth) return response(false, 403, "Unauthorized")


        await connectDB()

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page'), 10) || 0
        const limit = parseInt(searchParams.get('limit'), 10) || 10
        const deleteType = searchParams.get('deleteType')

        let filter = {}
        if(deleteType === 'SD'){
            filter= {deleteAt: null}
        } else if (deleteType === 'PD') {
            filter= {deleteAt: {$ne:null}}
        }

        const [mediaData, totalMedia] = await Promise.all([
            MediaModel.find(filter).sort({created: -1}).skip(page * limit).limit(limit).lean(),
            MediaModel.countDocuments(filter).lean()
        ])

        return NextResponse.json({
            mediaData:mediaData,
            hasMore: ((page +1) * limit) < totalMedia,
        })

    }catch(err){
        return catchError(err)
    }
}