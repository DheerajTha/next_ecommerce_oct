import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import { zSchema } from "@/lib/zodSchema";
import CATEGORYModel from "@/models/category.model";

export async function PUT(request) {
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
      _id:true,  name: true, slug:true
    })

    const validate = schema.safeParse(payload)
    if(!validate.success){
      return response(false, 400, "invalid or missing fileds");
    }
    console.log(validate.data);

    const {_id,name, slug} = validate.data;

    const getCategory = await CATEGORYModel.findOne({ deletedAt:null,_id })

    if(!getCategory){
      return response(false, 404, "Data Not Found");
    }

    getCategory.name=name;
    getCategory.slug=slug;

    await getCategory.save();
    
    return response(true, 200, "category updated successfully");


  } catch (error) {
    return catchError(error);
  }
}
