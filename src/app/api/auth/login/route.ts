// import { NextResponse } from 'next/server';
// import { signIn } from '@/lib/cognito';
// import { serialize } from 'cookie';

// export async function POST(req: Request) {
//   const { username, password } = await req.json();
//   try {
//     const resp = await signIn(username, password);
//     const tokens = resp.AuthenticationResult!;
//     const cookie = serialize('accessToken', tokens.AccessToken!, {
//       httpOnly: true,
//       path: '/',
//       maxAge: tokens.ExpiresIn,
//       sameSite: 'strict',
//       secure: process.env.NODE_ENV === 'production',
//     });
//     return NextResponse.json({ success: true }, {
//       headers: { 'Set-Cookie': cookie }
//     });
//   } catch (e: any) {
//     return NextResponse.json({ error: e.message }, { status: 400 });
//   }
// }


import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/cognito';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  try {
    const resp = await signIn(username, password);
    const tokens = resp.AuthenticationResult!;
    const cookie = serialize('accessToken', tokens.AccessToken!, {
      httpOnly: true,
      path: '/',
      maxAge: tokens.ExpiresIn,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === "production",
    });
    return NextResponse.json({ success: true }, {
      headers: { 'Set-Cookie': cookie }
    });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}