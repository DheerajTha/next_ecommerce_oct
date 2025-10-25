"use client";

import React, { use, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { zSchema } from "@/lib/zodSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/Application/customButton";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import OtpValidation from "@/components/Application/otpValidation";
import UpDatePassword from "@/components/Application/UpDatePassword";
import { showToast } from "@/lib/showToast";
import axios from "axios";

const Restpassword = () => {
  const [emailverification, setEmailverification] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [otpEmail, setOptEmail] = useState(false);
  const [isotpVeried, setIsotpVeried] = useState(false);
  const formSchema = zSchema.pick({
    email: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleremailVerification = async (values) => {
    try {
      setEmailverification(true);
      const { data: sendOtpResponse } = await axios.post(
        "/api/auth/reset-password/send-otp",
        values
      );
      if (!sendOtpResponse.success) {
        throw new Error(sendOtpResponse.message);
      }
      setOptEmail(values.email);
      showToast("success", sendOtpResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setEmailverification(false);
    }
  };

  const handleOtpVerification = async (value) => {
    try {
      setEmailverification(true);
      const { data: sendotp } = await axios.post(
        "/api/auth/reset-password/verify-otp",
        value
      );
      if (!sendotp.success) {
        throw new Error(sendotp.message);
      }
      showToast("success", sendotp.message);
      setIsotpVeried(true);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setEmailverification(false);
    }
  };

  return (
    <Card className=" w-[500px] ">
      <CardContent>
        <div className="flex justify-center">
          <span>Dheeraj Thakur</span>
        </div>

        {!otpEmail ? (
          <>
            <div>
              <h1 className="text-2xl font-bold text-center ">
                Reset your password
              </h1>
            </div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleremailVerification)}
                  className="space-y-8"
                >
                  <div className="mb-5 mt-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="example@email.com"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* <Button type="submit">Submit</Button> */}
                  <CustomButton
                    loading={emailverification}
                    className="w-full cursor-pointer text-lg py-6 px-5"
                    type="send OTP"
                    text="Reset Password"
                  />
                  <div className="text-center">
                    <div className="flex justify-center items-center ">
                      <span>Please Back for login page</span>
                      <Link
                        href={WEBSITE_LOGIN}
                        className="ml-3 text-md text-primary hover:text-black underline"
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <>

            {!isotpVeried ? (
              <OtpValidation
                email={otpEmail}
                loading={otpVerificationLoading}
                onSubmit={handleOtpVerification}
              />
            ) : (
              <UpDatePassword email={otpEmail} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Restpassword;
