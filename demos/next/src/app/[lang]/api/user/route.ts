import { NextRequest, NextResponse } from "next/server";

// Export the uppercase 'GET' method name
export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const name = queryParams.get("name");
  const age = queryParams.get("age");
  return NextResponse.json({
    message: `GET user OK: name=${name}, age=${age}`,
  });
}

interface IBody {
  name: string;
  age: number;
}

export async function POST(request: NextRequest) {
  // request.json()
  // request.formData()
  // request.text()
  // request.blob()
  // request.arrayBuffer()
  const body = (await request.json()) as IBody;
  const { name, age } = body;
  return NextResponse.json(
    {
      message: `POST user OK: name=${name}, age=${age}`,
    },
    { status: 201 }, // HTTP response status code: 201 Created
  );
}
// GET
// HEAD
// POST
// PUT
// DELETE
// PATCH
// OPTIONS
