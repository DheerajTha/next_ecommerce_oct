import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { zSchema } from "@/lib/zodSchema";
import CATEGORYModel from "@/models/category.model";

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
        name: true, slug:true
    })

    const validate = schema.safeParse(payload)
    if(!validate.success){
      return response(false, 400, "invalid or missing fileds");
    }

    const {name, slug} = validate.data;

    // Check if category with same name or slug already exists
    const existingCategory = await CATEGORYModel.findOne({
        $or: [{ name }, { slug }],
        deletedAt: null
    });

    if (existingCategory) {
        const field = existingCategory.name === name ? 'name' : 'slug';
        return response(false, 409, `Category with this ${field} already exists`);
    }

    const newCatrogy = new CATEGORYModel({
        name, slug
    })
    await newCatrogy.save();
    return response(true, 200, "category created successfully");


  } catch (error) {
    return catchError(error);
  }
}
