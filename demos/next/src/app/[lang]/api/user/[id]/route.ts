import { NextRequest, NextResponse } from "next/server";

interface IParams {
  id: string;
}

// Export the uppercase 'GET' method name
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<IParams> },
) {
  const { id } = await params;
  return NextResponse.json({
    message: `GET user OK: id=${id}`,
  });
}
