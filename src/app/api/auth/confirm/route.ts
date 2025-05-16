import { NextRequest, NextResponse } from 'next/server';
import { confirmSignUp } from '@/lib/cognito';

export async function POST(req: NextRequest) {
  const { username, code } = await req.json();

  try {
    await confirmSignUp(username, code);

    const response = NextResponse.json({ success: true });

    // Clear the cookie by setting it with maxAge 0
    response.cookies.set('signupInitiated', '', {
      httpOnly: true,
      path: '/confirm',
      maxAge: 0,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return response;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { confirmSignUp } from '@/lib/cognito';
// import { serialize } from 'cookie';

// export async function POST(req: NextRequest) {
//   const { username, code } = await req.json();
//   try {
//     await confirmSignUp(username, code);
//     const clear = serialize('signupInitiated', '', {
//       httpOnly: true,
//       path: '/confirm',
//       maxAge: 0
//     });
//     return NextResponse.json({ success: true }, { headers: { 'Set-Cookie': clear } });
//   } catch (e: unknown) {
//     const errorMessage = e instanceof Error ? e.message : 'Unknown error';
//     return NextResponse.json({ error: errorMessage }, { status: 400 });
//   }
// }
