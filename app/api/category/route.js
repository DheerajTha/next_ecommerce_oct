

import { isAuthenticated } from "@/lib/authentic";
import { connectDB } from "@/lib/dbConnection";
import { catchError } from "@/lib/helperFuncation";
import CATEGORYModel from "@/models/category.model";
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
      matchQuery={deletedAt: null};
    } else if (deleteType === "PD") {
      matchQuery = {deletedAt: { $ne: null }}
    }

    // global search
    if (globalFilter) {
      matchQuery = {
        ...matchQuery,
        $or: [
          { name: { $regex: globalFilter, $options: "i" } },
          { slug: { $regex: globalFilter, $options: "i" } },
        ],
      };
    }

    // column filters
    filters.forEach((filter) => {
      matchQuery[filter.id] = { $regex: filter.value, $options: "i" };
    });

    // sorting
    const sortQuery = {};
    sorting.forEach((sort) => {
      sortQuery[sort.id] = sort.desc ? -1 : 1;
    });

    // aggregate pipeline
    const aggregatePipeline = [
      { $match: matchQuery },
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          name: 1,
          slug: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];

    const getCategory = await CATEGORYModel.aggregate(aggregatePipeline);
    const totalRowCount = await CATEGORYModel.countDocuments(matchQuery);

    return NextResponse.json({
      data: getCategory,
      meta: { totalRowCount },
    });
  } catch (error) {
    return catchError(error);
  }
}
