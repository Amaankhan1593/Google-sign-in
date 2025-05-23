
// import { NextResponse } from "next/server";
// import { serialize } from "cookie";
// import { exchangeAuthCode } from "@/lib/cognito";

// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const code = searchParams.get("code");

//   if (!code) {
//     return NextResponse.json({ error: "Missing code" }, { status: 400 });
//   }

//   try {
//     const tokens = await exchangeAuthCode(code);

//     const cookie = serialize("accessToken", tokens.access_token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 3600, // 1 hour or as per your token expiry
//     });

//     const res = NextResponse.json({ success: true });
//     res.headers.set("Set-Cookie", cookie);
//     return res;

//   } catch (err) {
//     console.error("Token exchange failed:", err);
//     return NextResponse.json({ error: "Token exchange failed" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import { exchangeAuthCode } from "@/lib/cognito";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const tokens = await exchangeAuthCode(code);

    const response = NextResponse.json({ success: true });

    response.cookies.set("accessToken", tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3600, // 1 hour in seconds
    });

    return response;
  } catch (err) {
    console.error("Token exchange failed:", err);
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 });
  }
}
