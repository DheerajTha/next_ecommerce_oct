import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { zSchema } from "@/lib/zodSchema";
import ProductVariantModel from "@/models/productVariant.model";

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
    if (!payload || (Array.isArray(payload) && payload.length === 0)) {
      return response(false, 400, "Payload is required");
    }
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");
    await connectDB();

    const schema = zSchema.pick({
      product: true,
      color: true,
      sku: true,
      size: true,
      mrp: true,
      sellingPrice: true,
      discountPercentage: true,
      media:true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
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

    const variantData = validate.data;

    const newProductVariant = new ProductVariantModel({
      product:variantData.product,
      color:variantData.color,
      sku:variantData.sku,
      size:variantData.size,
      mrp:variantData.mrp,
      sellingPrice:variantData.sellingPrice,
      discountPercentage:variantData.discountPercentage,
      media:variantData.media,
    });
    await newProductVariant.save();
    return response(true, 200, "Product Variant added successfully");
  } catch (error) {
    return catchError(error);
  }
}
