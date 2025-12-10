import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { zSchema } from "@/lib/zodSchema";
import ProductVariantModel from "@/models/productVariant.model";

export async function PUT(request) {
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
          _id: true,
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
      return response(false, 400, "invalid or missing fields");
    }

    const validatedData = validate.data;

    const getProductVariant = await ProductVariantModel.findOne({
      deletedAt: null,
      _id: validatedData._id,
    });

    if (!getProductVariant) {
      return response(false, 404, "Data Not Found");
    }

    getProductVariant.product = validatedData.product;
    getProductVariant.color = validatedData.color;
    getProductVariant.size = validatedData.size;
    getProductVariant.sku = validatedData.sku;
    getProductVariant.mrp = validatedData.mrp;
    getProductVariant.sellingPrice = validatedData.sellingPrice;
    getProductVariant.discountPercentage = validatedData.discountPercentage;
    getProductVariant.media = validatedData.media;

    await getProductVariant.save();

    return response(true, 200, "Product Variant updated successfully");
  } catch (error) {
    return catchError(error);
  }
}
