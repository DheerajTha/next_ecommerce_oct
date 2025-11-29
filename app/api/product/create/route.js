import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import { encode } from "entities";

export async function POST(request) {
  let payload

  try {
    payload = await request.json()
    if (!payload || (Array.isArray(payload) && payload.length === 0)) {
          return response(false, 400, "Payload is required")
        }
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");
    await connectDB()

    const schema = zSchema.pick({
        name: true,
        slug: true,
        category: true,
        mrp: true,
        sellingPrice: true,
        discountPercentage: true,
        description: true,
        media: true
      });

    const validate = schema.safeParse(payload)
    if(!validate.success){
      return response(false, 400, "invalid or missing fileds");
    }

    // Check if category with same name or slug already exists
    // const existingCategory = await ProductModel.findOne({
    //     $or: [{ name }, { slug }],
    //     deletedAt: null
    // });

    // if (existingCategory) {
    //     const field = existingCategory.name === name ? 'name' : 'slug';
    //     return response(false, 409, `Category with this ${field} already exists`);
    // }

    const product = validate.data

    const newProduct = new ProductModel({
        name: product.name,
        slug: product.slug,
        category: product.category,
        mrp: product.mrp,
        sellingPrice: product.sellingPrice,
        discountPercentage: product.discountPercentage,
        description: encode(product.description),
        media: product.media,

    })
    await newProduct.save();
    return response(true, 200, "Product created successfully");


  } catch (error) {
    return catchError(error);
  }
}
