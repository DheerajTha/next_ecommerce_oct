import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        await connectDB()
        const cookieStore = await cookies()
        cookieStore.delete('access_token')
        return response(true, 'Logout successfully')
    } catch (error) {
        catchError(error)
    }
}