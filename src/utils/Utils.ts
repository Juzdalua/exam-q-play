import { NextResponse } from "next/server";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const successResponse = (data: any, statusCode: number = 200) => {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: statusCode }
  );
};

export const errorResponse = (errorCode: number, errorMsg: string = "Internal Server Error", statusCode: number = 500) => {
  return NextResponse.json(
    {
      success: false,
      error: {
        errorCode,
        errorMsg,
      },
    },
    { status: statusCode }
  );
};
