
import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};

export const catchError = async (error, customMessage) => {
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern || error.keysPattern || {}).join(
      ","
    );
    error.message = `Duplicate field value entered for ${keys}`;
    error.statusCode = 409;
  }

  const statusCode = error.statusCode || error.code || 500;

  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error,
    };
  } else {
    errorObj = {
      message: customMessage || "Internal server error",
    };
  }

  return NextResponse.json(
    {
      success: false,
      statusCode,
      ...errorObj,
    },
    {
      status: statusCode,
    }
  );
};

export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};



export const colomnConfig = (
  column,
  iscreatedAt = false,
  isupdatedAt = false,
  isDeletedAt = false
) => {
  const newColumn = [...column];

  if (iscreatedAt) {
    newColumn.push({
      accessorKey: "createdAt",
      header: "createdAt",
      Cell: ({ renderedCellValue }) =>
        new Data(renderedCellValue).toLocaleString(),
    });

    if (isupdatedAt) {
      newColumn.push({
        accessorKey: "updatedAt",
        header: "updatedAt",
        Cell: ({ renderedCellValue }) =>
          new Data(renderedCellValue).toLocaleString(),
      });
    }

    if (isDeletedAt) {
      newColumn.push({
        accessorKey: "deletedAt",
        header: "deletedAt",
        Cell: ({ renderedCellValue }) =>
          new Data(renderedCellValue).toLocaleString(),
      });
    }
  }

  return newColumn;
};
