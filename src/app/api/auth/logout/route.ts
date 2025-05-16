import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { signOut } from "@/lib/cognito";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
  const region = process.env.NEXT_PUBLIC_COGNITO_REGION!;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
  const appBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL!;

  // Helper function to clear the cookie
  function clearAccessTokenCookie(res: NextResponse) {
    res.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0, // immediately expire
    });
  }

  if (!token) {
    const res = NextResponse.redirect(appBaseUrl);
    clearAccessTokenCookie(res);
    return res;
  }

  let isFederated = false;
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    isFederated =
      payload.identities !== undefined ||
      (typeof payload['cognito:identity_provider'] === 'string' &&
       payload['cognito:identity_provider'].startsWith("Google"));
  } catch (e) {
    console.error("Failed to decode token payload:", e);
  }

  if (isFederated) {
    const logoutUrl =
      `https://${domain}.auth.${region}.amazoncognito.com/logout` +
      `?client_id=${clientId}` +
      `&logout_uri=${encodeURIComponent(appBaseUrl)}`;

    const res = NextResponse.redirect(logoutUrl);
    clearAccessTokenCookie(res);
    return res;
  } else {
    try {
      await signOut(token);
    } catch (e) {
      console.error("Global sign out failed:", e);
    }

    const res = NextResponse.redirect(appBaseUrl);
    clearAccessTokenCookie(res);
    return res;
  }
}


// import { cookies } from "next/headers";
// import { NextResponse } from "next/server";
// import { serialize } from "cookie";
// import { signOut } from "@/lib/cognito";

// export async function GET() {
//   const cookieStore = cookies();
//   const token = (await cookieStore).get("accessToken")?.value;

//   const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
//   const region = process.env.NEXT_PUBLIC_COGNITO_REGION!;
//   const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
//   // Use your app's base URL for post-logout redirect
//   const appBaseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL!;

//   // Helper to clear the accessToken cookie
//   const clearCookie = serialize("accessToken", "", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     path: "/",
//     expires: new Date(0),
//   });

//   // If no token, just clear and redirect to homepage
//   if (!token) {
//     const res = NextResponse.redirect(appBaseUrl);
//     res.headers.set("Set-Cookie", clearCookie);
//     return res;
//   }

//   // Parse token to detect federated identities
//   const payload = JSON.parse(
//     Buffer.from(token.split('.')[1], 'base64').toString()
//   );
//   const isFederated =
//     payload.identities ||
//     payload['cognito:identity_provider']?.startsWith("Google");

//   if (isFederated) {
//     // Redirect federated users to Cognito's hosted logout endpoint
//     const logoutUrl =
//       `https://${domain}.auth.${region}.amazoncognito.com/logout` +
//       `?client_id=${clientId}` +
//       `&logout_uri=${encodeURIComponent(appBaseUrl)}`;

//     const res = NextResponse.redirect(logoutUrl);
//     res.headers.set("Set-Cookie", clearCookie);
//     return res;
//   } else {
//     // Global sign out for native users
//     try {
//       await signOut(token);
//     } catch (e) {
//       console.error("Global sign out failed:", e);
//     }

//     const res = NextResponse.redirect(appBaseUrl);
//     res.headers.set("Set-Cookie", clearCookie);
//     return res;
//   }
// }