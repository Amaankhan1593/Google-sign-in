import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';


export default async function WelcomePage() {
  const token = (await cookies()).get('accessToken')?.value;
  if (!token) redirect('/');

  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const name = payload.username || payload.email;

  return (
    <div className="…">
      <h1>Welcome, {name}!</h1>
      <Link href="/api/auth/logout">Sign Out</Link>
    </div>
  );
}