import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};



export const catchError = async(error, customMessage) =>{
  if(error.code === 11000){
    const keys = Object.keys(error.keysPattern).join(',');
    error.message = `Duplicate field value entered for ${keys}`;
    error.statusCode = 409
  }

  const statusCode = error.statusCode || error.code || 500

  let errorObj = {}

  if(process.env.NODE_ENV === 'development'){
    errorObj = {
      message :error.message,
      error
    }
  }
  else{
    errorObj = {
      message: customMessage || 'Internal server error'
    }
  }

  return NextResponse.json({
    success:false,
    statusCode,
    ...errorObj
  },{
    status: statusCode
  })
}

export const generateOTP = () =>{
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp
}

export const isAuthenticated = async (role) => {
  try {
    const cookieStore = await cookies()
    if(!cookieStore.has('access_token')){
      return {
        isAuth: false,
      }
    }

    const access_token = cookieStore.get('access_token')
    const {payload}  = await jwtVerify(access_token.value, new TextEncoder().encode(process.env.JWT_SECRET_KEY))

    if (payload.role !== role) {
      return {
        isAuth: false,
      }
    }
    return {
      isAuth:true,
      userId: payload._Id
    }

  } catch (error) {
    return {
      isAuth: false,
      error
    }
  }
}