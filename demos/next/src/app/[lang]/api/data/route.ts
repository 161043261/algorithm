import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";

export async function GET(request: NextRequest) {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(readFile("./data.json", "utf-8"));
    }, 3000);
  });
  return NextResponse.json({ data });
}
