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
import axios from "axios";
import { showToast } from "@/lib/showToast";
import { useRouter } from "next/navigation";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute";

const UpDatePassword = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const router = useRouter();
  const formSchema = zSchema
    .pick({
      email: true,
      password: true,
    })
    .extend({
      confirmPassword: z.string().min(1).max(40),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
  });

  const handlerPassworUpdate = async (values) => {
    try {
      setLoading(true);
      const { data: passwrordUpdate } = await axios.put(
        "/api/auth/reset-password/update-otp",
        values
      );
      if (!passwrordUpdate.success) {
        throw new Error(passwrordUpdate.message);
      }
      form.reset();
      showToast("success", passwrordUpdate.message);
      router.push(WEBSITE_LOGIN);
    } catch (error) {
      showToast("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center ">Update Password</h1>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handlerPassworUpdate)}
            className="space-y-8"
          >
            <div className="mb-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*******" {...field} />
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
                      {isTypePassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
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
              text="Update Password"
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpDatePassword;
