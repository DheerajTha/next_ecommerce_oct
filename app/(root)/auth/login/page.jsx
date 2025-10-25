"use client";

import React, { useState } from "react";
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
import z from "zod";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { USER_DASHBOARD, WEBSITE_REGISTER, WEBSITE_RESET_PASSWORD } from "@/routes/WebsiteRoute";
import axios from "axios";
import { showToast } from "@/lib/showToast";
import OtpValidation from "@/components/Application/otpValidation";
import { useDispatch } from "react-redux";
import { login } from "@/store/reducer/authReducer";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoutes";

const LoginPage = () => {
  const disptach = useDispatch();
  const searchParams = useSearchParams(); 
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [otpEmail, setOptEmail] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const formSchema = zSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min("4", "password field is required"),
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handlerLoginSubmit = async (values) => {
    try {
      setLoading(true);
      const { data: loginResponse } = await axios.post(
        "/api/auth/login",
        values
      );
      if (!loginResponse.success) {
        throw new Error(loginResponse.message);
      }
      setOptEmail(values.email);
      form.reset();
      showToast("success", loginResponse.message);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };


  // opt verification 

  const handleOtpVerification = async (values) =>{
try {
      setOtpVerificationLoading(true);
      const { data: otpResponse } = await axios.post(
        "/api/auth/verify-otp",
        values
      );
      if (!otpResponse.success) {
        throw new Error(otpResponse.message);
      }
      setOptEmail("");
      showToast("success", otpResponse.message);

      disptach(login(otpResponse.data))

      if(searchParams.has('callback')){
        router.push(searchParams.get('callback'))
      }
      else{
        otpResponse.data.role === 'admin' ? 
        router.push(ADMIN_DASHBOARD)
        : router.push(USER_DASHBOARD)
      }

    } catch (error) {
      showToast("error", error.message);
    } finally {
      setOtpVerificationLoading(false);
    }
}

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
                Login into your account
              </h1>
            </div>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handlerLoginSubmit)}
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
                  <div className="mb-5">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type={isTypePassword ? "password" : "text"}
                              placeholder="*******"
                              {...field}
                            />
                          </FormControl>
                          <button
                            className="absolute top-1/2 right-2  cursor-pointer"
                            onClick={() => setIsTypePassword(!isTypePassword)}
                            type="button"
                          >
                            {isTypePassword ? (
                              <IoEyeOffOutline />
                            ) : (
                              <IoEyeOutline />
                            )}
                          </button>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <Button type="submit">Submit</Button> */}
                  <CustomButton
                    loading={loading}
                    className="w-full cursor-pointer text-lg py-6 px-5"
                    type="submit"
                    text="Login"
                  />
                  <div className="text-center">
                    <div className="flex justify-center items-center ">
                      <span>Don't have an account?</span>
                      <Link
                        href={WEBSITE_REGISTER}
                        className="ml-3 text-md text-primary hover:text-black underline"
                      >
                        Signup
                      </Link>
                    </div>
                    <div className="text-center">
                      <Link
                        href={WEBSITE_RESET_PASSWORD}
                        className="ml-3 text-md text-primary hover:text-black underline"
                      >
                        Forget Password{" "}
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <>
          <OtpValidation email={otpEmail} loading={otpVerificationLoading} onSubmit={handleOtpVerification} />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LoginPage;
