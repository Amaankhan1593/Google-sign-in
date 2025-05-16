'use client';
import { useState } from "react";
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
    `https://${domain}/oauth2/authorize` +
    `?identity_provider=${provider}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&client_id=${clientId}` +
    `&scope=openid%20email%20profile` +
    `&prompt=select_account`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-100 px-4">
      <form 
        onSubmit={handleLogin} 
        className="bg-white max-w-md w-full rounded-xl shadow-lg p-10 space-y-6"
        aria-label="Login form"
      >
        <h2 className="text-center text-3xl font-semibold text-indigo-700 mb-8">Welcome Back</h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button 
          type="submit" 
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Sign In
        </button>

        {msg && <p className="text-center text-sm text-red-600">{msg}</p>}

        <div className="flex justify-between text-sm text-indigo-600 font-medium">
          <Link href="/forgotpassword" className="hover:underline">Forgot Password?</Link>
          <Link href="/signup" className="hover:underline">Create Account</Link>
        </div>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => window.location.href = buildHostedUIUrl('Google')}
            className="w-full flex items-center justify-center gap-3 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 48 48"
              fill="none"
            >
              <path fill="#FFC107" d="M43.611 20.083h-1.651v-.08H24v7.917h11.23c-1.095 3.09-4.14 5.32-7.88 5.32-4.78 0-8.66-3.874-8.66-8.65 0-4.777 3.88-8.65 8.66-8.65 2.173 0 4.17.814 5.682 2.148l5.66-5.66C34.37 11.577 29.54 10 24 10 14.67 10 7 17.67 7 27s7.67 17 17 17c9.808 0 17-7.67 17-17 0-1.11-.11-2.19-.39-3.02z" />
              <path fill="#FF3D00" d="M6.306 14.691l6.18 4.54C13.818 16.74 18.448 13 24 13c2.89 0 5.52 1.08 7.56 2.85l5.64-5.65C33.83 7.99 29.28 7 24 7c-7.43 0-13.78 4.28-17.69 10.69z" />
              <path fill="#4CAF50" d="M24 37c-4.9 0-9.12-3.14-10.77-7.5l-6.18 4.54C9.53 38.99 16.33 43 24 43c5.46 0 10.17-2.63 13.18-6.68l-6.14-5.13C28.8 34.62 26.55 37 24 37z" />
              <path fill="#1976D2" d="M43.61 20.083h-1.65v-.08H24v7.917h11.23c-.49 1.38-1.42 2.54-2.64 3.37l6.14 5.14c3.07-2.83 4.84-7.03 4.84-11.4 0-1.11-.11-2.19-.39-3.02z" />
            </svg>
            Sign in with Google
          </button>

          <button
            type="button"
            onClick={() => window.location.href = buildHostedUIUrl('Microsoft')}
            className="w-full flex items-center justify-center gap-3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="1" y="3" width="10" height="8" />
              <rect x="13" y="3" width="10" height="8" />
              <rect x="1" y="13" width="10" height="8" />
              <rect x="13" y="13" width="10" height="8" />
            </svg>
            Sign in with Microsoft
          </button>
        </div>
      </form>
    </div>
  );
}


// 'use client';
// import {useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";


// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const router = useRouter();

//   const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
//   const region = process.env.NEXT_PUBLIC_COGNITO_REGION!;
//   const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;

  
 
//   const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!);
  
//   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         body: JSON.stringify({ username: email, password }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (res.ok) {
//         router.push('/welcome');
//       } else {
//         const data = await res.json();
//         setMsg(data.error || 'Login failed');
//       }
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : 'Unknown error';
//       setMsg(`❌ ${errorMessage}`);
//     }
//   };

  
//   const buildHostedUIUrl = (provider: string) =>
    
//     `https://${domain}.auth.${region}.amazoncognito.com/oauth2/authorize` +
//     `?identity_provider=${provider}` +
//     `&redirect_uri=${redirectUri}` +
//     `&response_type=code` +
//     `&client_id=${clientId}` +
//     `&scope=openid%20email%20profile` +
//     `&prompt=select_account`;


//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
//       <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-[400px]">
//         <h2 className="text-center text-2xl mb-6">Login</h2>
//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           className="block w-full mb-4 p-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           className="block w-full mb-4 p-2 border rounded"
//         />
//         <button type="submit" className="w-full py-2 bg-[navy] text-white rounded">
//           Sign In
//         </button>
//         <p className="mt-4 text-center">{msg}</p>
//         <div className="mt-6 text-center">
//           <Link href="/forgotpassword" className="text-blue-600 underline">
//             Forgot Password?
//           </Link>
//           <br />
//           <Link href="/signup" className="text-blue-600 underline">
//             Don’t have an account? Sign Up
//           </Link>
//           <button
//             type="button"
//             onClick={() => window.location.href = buildHostedUIUrl('Google')}
//             className="block w-full mt-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Sign in with Google
//           </button>

//           <button
//             type="button"
//             onClick={() => window.location.href = buildHostedUIUrl('Microsoft')}
//             className="block w-full mt-2 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
//           >
//             Sign in with Microsoft
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }