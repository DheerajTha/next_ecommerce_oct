import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError, response } from "@/lib/helperFuncation";
import ProductVariantModel from "@/models/productVariant.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) return response(false, 403, "Unauthorized");

    await connectDB();
    const searchParams = request.nextUrl.searchParams;
    const start = parseInt(searchParams.get("start") ?? "0", 10);
    const size = parseInt(searchParams.get("size") ?? "10", 10);
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const globalFilter = searchParams.get("globalFilter") || "";
    const deleteType = searchParams.get("deleteType");

    let matchQuery = {};

    // delete type filter
    if (deleteType === "SD") {
      matchQuery = { deletedAt: null };
    } else if (deleteType === "PD") {
      matchQuery = { deletedAt: { $ne: null } };
    }

    // global search
    if (globalFilter) {
      matchQuery["$or"] = [
        { color: { $regex: globalFilter, $options: "i" } },
        { size: { $regex: globalFilter, $options: "i" } },
        { sku: { $regex: globalFilter, $options: "i" } },
        { "productData.name": { $regex: globalFilter, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$mrp" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$sellingPrice" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$discountPercentage" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
      ];
    }

    // column filters
    filters.forEach((filter) => {
      if (
        filter.id === "mrp" ||
        filter.id === "sellingPrice" ||
        filter.id === "discountPercentage"
      ) {
        matchQuery[filter.id] = Number(filter.value);
      } else if (filter.id === "product") {
        matchQuery["productData.name"] = {
          $regex: filter.value,
          $options: "i",
        };
      } else {
        matchQuery[filter.id] = { $regex: filter.value, $options: "i" };
      }
    });

    // sorting
    const sortQuery = {};
    sorting.forEach((sort) => {
      sortQuery[sort.id] = sort.desc ? -1 : 1;
    });

    const aggregatePipeline = [
      {
        $lookup: {
          from: "Products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },

      {
        $unwind: {
          path: "$productData",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $match: matchQuery },
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          product: "$productData.name",
          color: 1,
          size: 1,
          sku: 1,
          mrp: 1,
          sellingPrice: 1,
          discountPercentage: 1,
          media: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];

    const countPipeline = [
      {
        $lookup: {
          from: "Products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: {
          path: "$productData",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $match: matchQuery },
      { $count: "total" },
    ];

    const [getProduct, countResult] = await Promise.all([
      ProductVariantModel.aggregate(aggregatePipeline).allowDiskUse(true),
      ProductVariantModel.aggregate(countPipeline).allowDiskUse(true),
    ]);

    const totalRowCount = countResult[0]?.total || 0;

    return NextResponse.json({
      success: true,
      data: getProduct,
      meta: { totalRowCount },
    });
  } catch (error) {
    return catchError(error);
  }
}
