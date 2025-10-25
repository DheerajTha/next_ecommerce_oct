import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/dbConnection";
import { catchError, generateOTP, response } from "@/lib/helperFuncation";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.mode";

export async function POST(request){
    try {
        await connectDB();
        const payload = await request.json();
        const validationSchema = zSchema.pick({email:true})
        const validateData = validationSchema.safeParse(payload)
        if(!validateData.success){
            return response(false,401,"Invalid Request",validateData.error)
        }
        const {email} = validateData.data

        // check user exist or not 
        const getUser = await UserModel.findOne({email})
        if(!getUser){
            return response(false,404,"user not found")
        }
        // remove old otp 
        await OTPModel.deleteMany({ email })
        const otp = generateOTP()
        const newOtpData = new OTPModel({
            email, otp
        })

        await newOtpData.save()

        const otpSend = await sendMail('your login verification code ', email, 
            otpEmail(otp)
        )

        if(!otpSend){
            return response(false,400,"failed to resend OTP")
        }
        return response(true,200,"OTP sent successfully")

    } catch (error) {
        return catchError(error);

        
    }
}