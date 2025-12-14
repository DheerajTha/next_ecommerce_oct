import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import MediaModel from "@/models/media.model";
import ProductModel from "@/models/product.model";
export async function GET() {
  try {
    await connectDB();

    const getProduct = await ProductModel.find({ deleteType: null })
      .populate("media")
      .limit(8)
      .lean();
    if (!getProduct) {
      return response(false, 404, "Product not found");
    }

    return response(true, 200, "Product Found", getProduct);
  } catch (error) {
    return catchError(error);
  }
}
