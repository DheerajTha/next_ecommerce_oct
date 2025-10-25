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
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";
import { set } from "mongoose";
import axios from "axios";
import { showToast } from "@/lib/showToast";
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const formSchema = zSchema
    .pick({
      name: true,
      email: true,
      password: true,
    }) 
    .extend({
      confirmPassword: z.string().min(1).max(40),
    })
    .refine(
      (data) => data.password === data.confirmPassword,
      {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }
    );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handlerRegisterSubmit = async (values) => {
    try {
      
      setLoading(true);
      const {data: registerResponse} = await axios.post('/api/auth/register', values)
      if(!registerResponse.success){
        throw new Error(registerResponse.message)
      }
      form.reset()
      showToast('success', registerResponse.message)
      

    } catch (error) {
      showToast('error', error.message)
      
    } finally{
      setLoading(false)
    }
    
  };

  return (
    <Card className=" w-[500px] ">
      <CardContent>
        <div className="flex justify-center">
          <span>Dheeraj Thakur</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-center ">
            Create your Account
          </h1>
        </div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handlerRegisterSubmit)}
              className="space-y-8"
            >
              <div className="mb-5 mt-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Dheeraj Thakur"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
                          type='password'
                          placeholder="*******"
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
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormLabel>Confirm Password</FormLabel>
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
                text="Submit"
              />
              <div className="text-center">
                <div className="flex justify-center items-center ">
                  <span>Already have an account</span>
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
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
