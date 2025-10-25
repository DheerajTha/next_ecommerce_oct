import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.mode";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

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

    const logginUserData = {
        _id:getUser._id,
        role:getUser.role,
        name:getUser.name,
        avatar:getUser.avatar,
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
    const token= await new SignJWT(logginUserData)
    .setIssuedAt()
    .setExpirationTime("24h")
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);

    const cookieStore = await cookies()

    cookieStore.set({
        name: 'access_token',
        value:token,
        httpOnly: process.env.NODE_ENV === "production",
        path:"/",
        secure:process.env.NODE_ENV === "production",
        sameSite:'lax'
    })

    await getOtpData.deleteOne()

    return response(true, 200, "Login Success", logginUserData)

  } catch (error) {
    return catchError(error);
  }
}
