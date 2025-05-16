'use client';
import {useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
  const region = process.env.NEXT_PUBLIC_COGNITO_REGION!;
  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;

  
 
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!);
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username: email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/welcome');
      } else {
        const data = await res.json();
        setMsg(data.error || 'Login failed');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setMsg(`❌ ${errorMessage}`);
    }
  };

  
  const buildHostedUIUrl = (provider: string) =>
    
    `https://${domain}.auth.${region}.amazoncognito.com/oauth2/authorize` +
    `?identity_provider=${provider}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&client_id=${clientId}` +
    `&scope=openid%20email%20profile` +
    `&prompt=select_account`;


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-[400px]">
        <h2 className="text-center text-2xl mb-6">Login</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full py-2 bg-[navy] text-white rounded">
          Sign In
        </button>
        <p className="mt-4 text-center">{msg}</p>
        <div className="mt-6 text-center">
          <Link href="/forgotpassword" className="text-blue-600 underline">
            Forgot Password?
          </Link>
          <br />
          <Link href="/signup" className="text-blue-600 underline">
            Don’t have an account? Sign Up
          </Link>
          <button
            type="button"
            onClick={() => window.location.href = buildHostedUIUrl('Google')}
            className="block w-full mt-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign in with Google
          </button>

          <button
            type="button"
            onClick={() => window.location.href = buildHostedUIUrl('Microsoft')}
            className="block w-full mt-2 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Sign in with Microsoft
          </button>
        </div>
      </form>
    </div>
  );
}