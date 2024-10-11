import { NextResponse } from "next/server";

export function apiErrorResponse(error: unknown) {
  console.error(error);
  ("use server");
  return NextResponse.json(
    {
      message: "Failed to fetch data",
    },
    { status: 400 }
  );
}
export function roleNotHighEnoughResponse() {
  ("use server");
  return NextResponse.json(
    {
      message: "You do not have enough access! Please contact an Admin.",
    },
    { status: 401 }
  );
}
export function missingParamsResponse(param: string | string[]) {
  ("use server");
  return NextResponse.json(
    {
      message: `Missing paramater : ${JSON.stringify(param)}`,
    },
    { status: 400 }
  );
}
export function notFoundResponse(item: string) {
  ("use server");
  return NextResponse.json(
    {
      message: `${item} not found!`,
    },
    { status: 400 }
  );
}
export function itemExistsResponse(item: string) {
  ("use server");
  return NextResponse.json(
    {
      message: `${item} already exists!`,
    },
    { status: 400 }
  );
}
export function successResponse(
  obj: any[] | Record<string, any> | Record<string, any>[]
) {
  ("use server");
  // console.log("successfull response:", obj);
  return NextResponse.json(obj, { status: 200 });
}
export function generalErrorResponse(location: string, errorMessage?: string) {
  ("use server");
  return NextResponse.json(
    `An API Error has occured:\nCheck here=>${location}\nMore Info:\n${errorMessage} `,
    { status: 400 }
  );
}
