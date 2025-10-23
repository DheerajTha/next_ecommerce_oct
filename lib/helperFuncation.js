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
  // handle dublicate error handling
  if(error.code === 11000){
    const keys = Object.keys(error.keysPattern).join(',');
    error.message = `Duplicate field value entered for ${keys}`;
  }

let errorObj = {}

  if(process.env.NODE_ENV !== 'development'){
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
    statusCode: error.code,
    ...errorObj

  })
}

export const generateOTP = () =>{
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp
}