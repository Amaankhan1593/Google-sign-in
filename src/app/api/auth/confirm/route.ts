// import { NextResponse } from 'next/server';
// import { confirmSignUp } from '@/lib/cognito';
// import { serialize } from 'cookie';

// export async function POST(req: Request) {
//   const { username, code } = await req.json();
//   try {
//     await confirmSignUp(username, code);
//     const clear = serialize('signupInitiated', '', {
//       httpOnly: true,
//       path: '/confirm',
//       maxAge: 0
//     });
//     return NextResponse.json({ success: true }, { headers: { 'Set-Cookie': clear } });
//   } catch (e: any) {
//     return NextResponse.json({ error: e.message }, { status: 400 });
//   }
// }



import { NextRequest, NextResponse } from 'next/server';
import { confirmSignUp } from '@/lib/cognito';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { username, code } = await req.json();
  try {
    await confirmSignUp(username, code);
    const clear = serialize('signupInitiated', '', {
      httpOnly: true,
      path: '/confirm',
      maxAge: 0
    });
    return NextResponse.json({ success: true }, { headers: { 'Set-Cookie': clear } });
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}