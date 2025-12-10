import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import ProductVariantModel from "@/models/productVariant.model";
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

    const data = await ProductVariantModel.find({ _id: { $in: ids } }).lean();
    if (!data) {
      return response(false, 404, "Data not found");
    }

    if (!["SD", "RSD"].includes(deleteType)) {
      return response(false, 400, "Invalid delete type");
    }
    if (deleteType === "SD") {
      // soft delete
      await ProductVariantModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: new Date().toISOString() } }
      );
      return response(true, 200, " deleted successfully");
    } else {
      await ProductVariantModel.updateMany(
        { _id: { $in: ids } },
        { $set: { deletedAt: null } }
      );
    }

    return response(
      true,
      200,
      deleteType === "SD" ? "deleted successfully" : "Restored successfully"
    );
  } catch (error) {
    return catchError(error);
  }
}

export async function DELETE(request) {
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

    const data = await ProductVariantModel.find({ _id: { $in: ids } }).lean();

    if (data.length === 0) {
      return response(false, 404, "Data not found");
    }

    if (deleteType !== "PD") {
      return response(
        false,
        400,
        "Invalid delete type. Delete Type must be PD"
      );
    }

    const result = await ProductVariantModel.deleteMany({ _id: { $in: ids } });

    console.log(`Attempted to delete ${ids.length} documents. Deleted count: ${result.deletedCount}`);

    return response(true, 200, "Data deleted permanently");
  } catch (error) {
    return catchError(error);
  }
}
