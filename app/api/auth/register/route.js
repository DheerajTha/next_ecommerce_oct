import { emailVerificationLink } from "@/email/emailverificationlink";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.mode";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDB();
    const validationSchema = zSchema.pick({
      name: true,
      email: true,
      password: true,
    });
    const payload = await request.json();

    // const validatedData = validationSchema.parse(payload);
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing data",
        validatedData.error
      );
    }
    const { name, email, password } = validatedData.data;

    // check already registered user
    const checkUser = await UserModel.exists({ email });

    if (checkUser) {
      return response(false, 409, "Email already exists");
    }

    // new regigeration
    const NewRegistration = new UserModel({
      name,
      email,
      password,
    });

    await NewRegistration.save();

    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

    const token = await new SignJWT({ userId: NewRegistration._id.toString() })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    const encodedToken = encodeURIComponent(token);

    sendMail(
      "Email verification request from Dheeraj Thakur",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${encodedToken}`
      )
    ).catch(err => console.error("Email send failed:", err));

    return response(
      true,
      200,
      "registration successful and verification email sent"
    );
  } catch (error) {
    catchError(error);
  }
}
