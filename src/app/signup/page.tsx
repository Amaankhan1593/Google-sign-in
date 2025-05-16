'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg]           = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username: username, password: password, email: email }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/confirm');
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
      <form onSubmit={handleSignUp} className="bg-white p-8 rounded shadow-md w-[400px]">
        <h2 className="text-center text-2xl mb-6">Sign Up</h2>
        <input
          type="text" placeholder="Username"
          value={username} onChange={e => setUsername(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="text" placeholder="Email"
          value={email} onChange={e => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <input
          type="password" placeholder="Password"
          value={password} onChange={e => setPassword(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full py-2 bg-[navy] text-white rounded">
          Sign Up
        </button>
        <p className="mt-4 text-center">{msg}</p>
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 underline">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}