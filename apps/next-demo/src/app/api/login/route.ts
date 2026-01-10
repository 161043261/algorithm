import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const tokenStore = await cookies();
  const token = tokenStore.get("token")?.value || null;
  console.log("token:", token);
  if (token && token === "161043261") {
    return NextResponse.json({ code: 1, message: "Logged in" });
  }
  return NextResponse.json({ code: 0, message: "Not logged in" });
}

interface IBody {
  username: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const { username, password } = (await request.json()) as IBody;
  console.log(username, password);
  if (username === "admin" && password === "pass") {
    const cookieStore = await cookies();
    cookieStore.set("token", "161043261", {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true, // 只允许服务器访问
    });
    return NextResponse.json({ message: "Login successful", code: 1 });
  }
  return NextResponse.json({ message: "Login failed", code: 0 });
}
