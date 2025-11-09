import { z } from "zod";

export const zSchema = z.object({
  email:z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),

  password:z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character (@, $, !, %, *, ?, &, #)" }),

  name:z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be less than 50 characters" })
      .regex(/^[A-Za-z\s]+$/, { message: "Name can only contain letters and spaces" }),

  otp:z
    .string().regex(/^\d{6}$/, 
    { message: "OTP must contain only digits" }),

  _id: z.string().min(3, '_id is required'),
  alt: z.string().min(3, 'Alt is required'),
  title: z.string().min(3, 'Title is required'),
})