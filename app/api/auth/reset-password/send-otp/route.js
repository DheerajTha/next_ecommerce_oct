import { otpEmail } from "@/email/otpEmail";
import { connectDB } from "@/lib/dbConnection";
import { catchError, generateOTP, response } from "@/lib/helperFuncation";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPModel from "@/models/otp.model";
import UserModel from "@/models/user.mode";

export async function POST(request) {
  try {
    connectDB();
    const payload = await request.json();
    const validation = await zSchema.pick({
      email: true,
    });
    const validatedData = await validation.safeParse(payload);
    if (!validatedData) {
      return response(
        false,
        401,
        "Invalid Data",
        validatedData.error.errors[0].message
      );
    }

    const { email } = validatedData.data;
    const getUser = await UserModel.findOne({ deletedAt: null, email }).lean();

    if (!getUser) {
      return response(false, 404, "User Not Found");
    }

    // remove old otp
    await OTPModel.deleteMany({ email });
    const otp = generateOTP();
    const newOtpData = new OTPModel({
      email,
      otp,
    });

    await newOtpData.save();

    const otpSend = await sendMail(
      "your login verification code ",
      email,
      otpEmail(otp)
    );

    if (!otpSend) {
      return response(false, 400, "failed to resend OTP");
    }
    return response(true, 200, "OTP sent successfully");
  } catch (error) {
    catchError(error);
  }
}
