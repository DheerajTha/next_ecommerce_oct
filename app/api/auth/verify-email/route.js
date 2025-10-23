import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import UserModel from "@/models/user.mode";
import { jwtVerify } from "jose";

export async function POST(request) {
  try {
    await connectDB();
    const {token} = await request.json();
    if (!token) {
      return response(false, 400, "token is required");
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    const decode = await jwtVerify(token, secret);
    const userId = decode.payload.userId;

    const user = await UserModel.findById(userId);
    if (!user) {
      return response(false, 404, "User not found");
    }
    user.isEmailVerified = true;

    await user.save();

    return response(true, 200, "email verified");
  } catch (error) {
    return catchError(error);
  }
}
