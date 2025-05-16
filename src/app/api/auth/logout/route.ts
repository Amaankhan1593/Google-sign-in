import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { signOut } from "@/lib/cognito";

export async function GET() {
  // Get cookies without await (cookies() returns a ReadonlyRequestCookies directly)
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
  const region = process.env.NEXT_PUBLIC_COGNITO_REGION!;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
  const appBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL!;

  // Prepare redirect response to app base URL
  const res = NextResponse.redirect(appBaseUrl);

  // Clear the accessToken cookie
  res.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  if (!token) {
    // No token, just redirect after clearing cookie
    return res;
  }

  let isFederated = false;
  try {
    // Decode JWT token payload
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    isFederated =
      !!payload.identities || 
      (typeof payload['cognito:identity_provider'] === 'string' &&
       payload['cognito:identity_provider'].toLowerCase().includes("google"));
  } catch (err) {
    console.error("Failed to parse token payload:", err);
  }

  if (isFederated) {
    // Construct proper Cognito logout URL with region and domain
    const logoutUrl =
      `https://${domain}.auth.${region}.amazoncognito.com/logout` +
      `?client_id=${clientId}` +
      `&logout_uri=${encodeURIComponent(appBaseUrl)}`;

    return NextResponse.redirect(logoutUrl, {
      headers: res.headers,
    });
  }

  try {
    // Global sign out for native Cognito users
    await signOut(token);
  } catch (err) {
    console.error("Global sign out failed:", err);
  }

  return res;
}

// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { signOut } from "@/lib/cognito";

// export async function GET() {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("accessToken")?.value;

//   const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
//   const region = process.env.NEXT_PUBLIC_COGNITO_REGION!;
//   const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
//   const appBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL!;

//   // Helper function to clear the cookie
//   function clearAccessTokenCookie(res: NextResponse) {
//     res.cookies.set("accessToken", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       path: "/",
//       maxAge: 0, // immediately expire
//     });
//   }

//   if (!token) {
//     const res = NextResponse.redirect(appBaseUrl);
//     clearAccessTokenCookie(res);
//     return res;
//   }

//   let isFederated = false;
//   try {
//     const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
//     isFederated =
//       payload.identities !== undefined ||
//       (typeof payload['cognito:identity_provider'] === 'string' &&
//        payload['cognito:identity_provider'].startsWith("Google"));
//   } catch (e) {
//     console.error("Failed to decode token payload:", e);
//   }

//   if (isFederated) {
//     const logoutUrl =
//       `https://${domain}.auth.${region}.amazoncognito.com/logout` +
//       `?client_id=${clientId}` +
//       `&logout_uri=${encodeURIComponent(appBaseUrl)}`;

//     const res = NextResponse.redirect(logoutUrl);
//     clearAccessTokenCookie(res);
//     return res;
//   } else {
//     try {
//       await signOut(token);
//     } catch (e) {
//       console.error("Global sign out failed:", e);
//     }

//     const res = NextResponse.redirect(appBaseUrl);
//     clearAccessTokenCookie(res);
//     return res;
//   }
// }