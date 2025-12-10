import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import CATEGORYModel from "@/models/category.model";
import ProductModel from "@/models/product.model";

export async function GET() {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB

    const [category, product ] = await Promise.all([
      CATEGORYModel.countDocuments({deletedAt: null}),
      ProductModel.countDocuments({deletedAt: null})
    ])

    return response(true, 201, "success", { category, product })

  } catch (error) {
    catchError(error)
  }
}
