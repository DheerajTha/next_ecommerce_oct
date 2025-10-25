"use client"

import { zSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "./customButton";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { showToast } from "@/lib/showToast";
import axios from "axios";

const OtpValidation = ({ email, onSubmit, loading }) => {

  const [isResendOtp , setIsResendOtp] = useState(false);
  const formSchema = zSchema.pick({
    otp: true,
    email: true,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
      email: email,
    },
  });

  const handlerOtpVerification = async (values) => {
    onSubmit(values);
  };

  const resendOtp = async () => {
    try {
      setIsResendOtp(true);
      const { data: registerResponse } = await 
      axios.post("/api/auth/resend-otp", {email} )
      if (!registerResponse.success) {
        throw new Error(registerResponse.message);
      }
      showToast("success", registerResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setIsResendOtp(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlerOtpVerification)}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-center font-bold text-xl mb-5">
              Please Enter OTP
            </h1>
            <p className="text-center">
              We have sent an OTP to your registered email address. Please enter
              the same here
            </p>
          </div>
          <div className="mb-5 mt-5 flex justify-center">
            <FormField
              control={form.control}
              name="otp" // ✅ must match your schema and defaultValues
              render={({ field }) => (
                <FormItem className="flex flex-col items-center text-center">
                  <FormLabel className="mb-3">
                    One Time Password (OTP) for Email Verification
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="flex justify-center">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* <Button type="submit">Submit</Button> */}
          <CustomButton
            loading={loading}
            className="w-full cursor-pointer text-lg py-6 px-5"
            type="submit"
            text="Verify OTP"
          />
          <div className="text-center">
            {!isResendOtp 
            ?
            <button onClick={resendOtp} className="text-md cursor-pointer hover:text-blue-700 hover:underline">
              Resend Otp
            </button>
            :
            <span>Loading...</span>

            }
          </div>
        </form>
      </Form>
    </div>
  );
};

export default OtpValidation;
