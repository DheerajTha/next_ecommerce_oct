import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.mode";

export async function PUT (request){
    try {
       await connectDB()
        const payload = await request.json()
        const validation = zSchema.pick({
            email: true,
            password: true,
        })
        const validatedData = validation.safeParse(payload)

        if(!validatedData.success){
        return response(false, 401, "invalid or missing data")
        }
    const {email, password} = validatedData.data;

        const getUser = await UserModel.findOne({deleteAt:null, email})
    .select("+password")

    if (!getUser) {
      return response(false, 404, "user not found");
    }
    get.password =  password
    await getUser.save()
    return response(true, 200, "password updated successfully")


    } catch (error) {
        catchError(error)
    }
}