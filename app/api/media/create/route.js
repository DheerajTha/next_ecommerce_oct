import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import MediaModel from "@/models/media.model";
import cloudinary from "@/lib/cloudinary";
import { isAuthenticated } from "@/lib/authentic";

export async function POST(request) {
  let payload

  try {
    payload = await request.json()

    if (!payload || (Array.isArray(payload) && payload.length === 0)) {
      return response(false, 400, "Payload is required")
    }

    const data = Array.isArray(payload) ? payload : [payload]

    const hasInvalid = data.some(item => !item.asset_id || !item.public_id || !item.path || !item.thumbnail_url || !item.secure_url)
    if (hasInvalid) {
      return response(false, 400, "Missing required fields")
    }

    const auth = await isAuthenticated("admin")
    if (!auth.isAuth) return response(false, 403, "Unauthorized")

    await connectDB()

    const newMedia = await MediaModel.insertMany(data)
    return response(true, 200, "succesfully", newMedia)

  } catch (error) {
    const items = Array.isArray(payload) ? payload : payload ? [payload] : []

    if (items.length > 0) {
      const publicIds = items.map(d => d.public_id)
      try {
        await cloudinary.api.delete_resources(publicIds)
      } catch (deleteError) {
        error.cloudinary = deleteError
      }
    }

    return catchError(error)
  }
}
