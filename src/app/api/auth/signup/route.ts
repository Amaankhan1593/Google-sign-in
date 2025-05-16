import { NextRequest, NextResponse } from 'next/server';
import { signUp } from '@/lib/cognito';

export async function POST(req: NextRequest) {
  const { username, password, email } = await req.json();

  try {
    await signUp(username, password, email);

    const response = NextResponse.json({ success: true });

    response.cookies.set('signupInitiated', 'true', {
      httpOnly: true,
      path: '/',
      maxAge: 300, // 5 minutes
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return response;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { signUp } from '@/lib/cognito';
// import { serialize } from 'cookie';

// export async function POST(req: NextRequest) {
//   const { username, password, email } = await req.json();
//   try {
//     await signUp(username, password, email);
//     const cookie = serialize('signupInitiated', 'true', {
//       httpOnly: true,
//       path: '/',
//       maxAge: 300,
//       sameSite: 'strict'
//     });
//     return NextResponse.json({ success: true }, {
//       headers: { 'Set-Cookie': cookie }
//     });
//   } catch (e: unknown) {
//     const errorMessage = e instanceof Error ? e.message : 'Unknown error';
//     return NextResponse.json({ error: errorMessage }, { status: 400 });
//   }
// }