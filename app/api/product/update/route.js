import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/product.model";
import { encode } from "entities";

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
      name: true,
      slug: true,
      category: true,
      mrp: true,
      sellingPrice: true,
      discountPercentage: true,
      description: true,
      media: true,
    });

    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(false, 400, "invalid or missing fileds");
    }

    const validatedData = validate.data;

    const getProduct = await ProductModel.findOne({
      deletedAt: null,
      _id: validatedData._id,
    });

    if (!getProduct) {
      return response(false, 404, "Data Not Found");
    }

    getProduct.name = validatedData.name;
    getProduct.slug = validatedData.slug;
    getProduct.category = validatedData.category;
    getProduct.mrp = validatedData.mrp;
    getProduct.sellingPrice = validatedData.sellingPrice;
    getProduct.discountPercentage = validatedData.discountPercentage;
    getProduct.description = encode(validatedData.description);
    getProduct.media = validatedData.media;

    await getProduct.save();

    return response(true, 200, "Product updated successfully");
  } catch (error) {
    return catchError(error);
  }
}
