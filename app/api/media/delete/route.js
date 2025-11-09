import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/dbConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFuncation";
import MediaModel from "@/models/media.model";
import mongoose from "mongoose";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, "Unauthorized", 401);
    }
    await connectDB();
    const payload = await request.json();

    const ids = payload.ids || [];
    const deleteType = payload.deleteType;
    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id list");
    }

    const media = await MediaModel.find({ _id: { $in: ids } }).lean();
    if (!media) {
      return response(false, 404, "Data not found");
    }

    if (!["SD", "RSD"].includes(deleteType)) {
      return response(false, 400, "Invalid delete type");
    }
    if (deleteType === "SD") {
      // soft delete
      await MediaModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deleteAt: new Date().toISOString() } }
      );
      return response(true, "Media deleted successfully");
    } else {
      await MediaModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deleteAt: null } }
      );
    }

    return response(
      true,
      200,
      deleteType === "SD"
        ? "Media deleted successfully"
        : "Media restored successfully"
    );
  } catch (error) {
    return catchError(error);
  }
}

export async function DELETE(request) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, "Unauthorized", 401);
    }
    await connectDB();
    const payload = await request.json();

    const ids = payload.ids || [];
    const deleteType = payload.deleteType;
    if (!Array.isArray(ids) || ids.length === 0) {
      return response(false, 400, "Invalid or empty id list");
    }

    const media = await MediaModel.find({ _id: { $in: ids } })
      .session(session)
      .lean();

    if (media.length === 0) {
      return response(false, 404, "Data not found");
    }

    if (deleteType !== "PD") {
      return response(
        false,
        400,
        "Invalid delete type. Delete Type must be PD"
      );
    }

    await MediaModel.deleteMany({ _id: { $in: ids } }).session(session);

    // delete all matching documents from cloudinary

    const publicIds = media.map((m) => m.public_id);
    try {
      await cloudinary.api.delete_resources(publicIds);
    } catch (error) {
      throw error;
    }

    await session.commitTransaction();
    session.endSession();
    return response(true, 200, "Data deleted permanently");

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return catchError(error);
  }
}
