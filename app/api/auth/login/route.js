import { emailVerificationLink } from "@/email/emailverificationlink";
import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/dbConnection";
import { catchError, generateOTP, response } from "@/lib/helperFuncation";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.mode";
import { SignJWT } from "jose";
import z from "zod";

export async function POST(request) {
  try {
    await connectDB();

    const payload = await request.json();
    const validation = zSchema
      .pick({
        email: true,
      })
      .extend({
        password: z.string(),
      });

    const validatedData = validation.safeParse(payload);
    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing data",
        validatedData.error
      );
    }

    const {email, password} = validatedData.data
    const getUser = await UserModel.findOne({ deleted: null, email}).select("+password")

    if(!getUser){
      return response(false, 404 , "invalid credentials" )
    }

    const ispassworvarified = await getUser.comarePassword(password)

    
    if(!getUser.isEmailVerified) {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        
        const token = await new SignJWT({ userId: getUser._id.toString() })
        .setIssuedAt()
        .setExpirationTime("1h")
        .setProtectedHeader({ alg: "HS256" })
        .sign(secret);
        
        const encodedToken = encodeURIComponent(token);

        
        await sendMail(
            "Email verification request from Dheeraj Thakur",
            email,
            emailVerificationLink(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${encodedToken}`
            )
        );

      return response(false, 401 , "please verify your email address" )

    }
    
    if(!ispassworvarified){
      return response(false, 400 , "invalid credentials" )

    }

    // otp genration 

    await OTPModel.deleteMany({email})

    const otp = generateOTP()

    const newOtpData = new OTPModel({
        email, otp
    })

    await newOtpData.save()

    sendMail("OTP for login", email, otpEmail(otp)).catch(err => 
      console.error("Email send failed:", err)
    )

    return response(true, 200 , "please verify your device ")


  } catch (error) {
    return catchError(error);
  }
}
