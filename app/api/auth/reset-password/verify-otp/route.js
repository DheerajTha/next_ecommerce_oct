import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.mode";

export async function POST(request) {
  try {
    await connectDB();
    const payload = await request.json();

    const validationSchema = zSchema.pick({
        email:true,
        otp: true
    })
    
    const validatedData = await validationSchema.safeParse(payload)
    if(!validatedData.success){
      return response(error, 401, "Invalid or Missing Input filed ", validatedData.error)
    }

    const {email, otp} = validatedData.data;

    const getOtpData = await OTPModel.findOne({email, otp})

    if(!getOtpData){
        return response(false, 403, "OTP or expired The OTP you entered is invalid")
    }

    const getUser = await UserModel.findOne({deleteAt:null, email})
    .lean()

    if(!getUser){
        return response(false, 404, "user not found")
    }

     
    await getOtpData.deleteOne()

    return response(true, 200, "verify otp")

  } catch (error) {
    return catchError(error);
  }
}
