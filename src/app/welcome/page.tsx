import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function WelcomePage() {
  const token = (await cookies()).get('accessToken')?.value;
  if (!token) redirect('/');

  const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const name = payload.username || payload.email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {name}!</h1>
        <p className="text-gray-600 mb-6">You have successfully logged in.</p>
        <Link
          href="/login"
          className="inline-block bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
}
