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
      .max(50, { message: "Name must be less than 50 characters" }),

  otp:z
    .string().regex(/^\d{6}$/, 
    { message: "OTP must contain only digits" }),

  _id: z.string().min(3, '_id is required'),
  alt: z.string().min(3, 'Alt is required'),
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(3, 'Slug is required'),

  category: z.string().min(3, 'Category is required'),
  mrp: z.union([
    z.number().positive('Expected positive value , received nagative'),
    z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0 , 'please Enter e valid Number ' ),
  ]),

  sellingPrice: z.union([
    z.number().positive('Expected positive value , received nagative'),
    z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0 , 'please Enter e valid Number ' ),
  ]),

  discountPercentage: z.union([
    z.number().positive('Expected positive value , received nagative'),
    z.string().transform((val) => Number(val)).refine((val) => !isNaN(val) && val >= 0 , 'please Enter e valid Number ' ),
  ]),

  description: z.string().min(3, 'Description is required'),
  media: z.array(z.string()),
  product: z.string().min(3, 'Product is required'),
  color: z.string().min(3, 'Color is required'),
  sku: z.string().min(3, 'Sku is required'),
  size: z.string().min(1, 'Size is required'),
  
})