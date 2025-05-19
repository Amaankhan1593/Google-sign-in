'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, User, Lock } from "lucide-react";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg]           = useState("");
  const [strength, setStrength] = useState("Weak");
  const router = useRouter();

  useEffect(() => {
    const evaluateStrength = (pass: string) => {
      let score = 0;
      if (pass.length > 8) score++;
      if (/[A-Z]/.test(pass)) score++;
      if (/\d/.test(pass)) score++;
      if (/[^A-Za-z0-9]/.test(pass)) score++;
      
      const levels = ["Weak", "Moderate", "Strong", "Very Strong"];
      setStrength(levels[Math.min(score, levels.length - 1)]);
    };

    evaluateStrength(password);
  }, [password]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/confirm");
    } else {
      setMsg(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 px-4">
      <form
        onSubmit={handleSignUp}
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-10 space-y-6 animate-fadeIn"
      >
        <h2 className="text-center text-3xl font-bold text-indigo-700">
          <ShieldCheck className="inline w-7 h-7 mb-1 mr-1" />
          Sign Up
        </h2>

        {/* Username */}
        <div className="relative">
          <User className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="pl-10 w-full py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 w-full py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10 w-full py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <p className={`mt-2 text-sm font-medium ${strength === "Weak" ? "text-red-500" : strength === "Moderate" ? "text-yellow-500" : "text-green-600"}`}>
            Password strength: {strength}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300"
        >
          Create Account
        </button>

        {msg && <p className="text-sm text-red-600 text-center animate-shake">{msg}</p>}

        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-medium hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function SignupPage() {
//   const [username, setUsername] = useState("");
//   const [email, setEmail]       = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg]           = useState("");
//   const router = useRouter();

//   const handleSignUp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('/api/auth/signup', {
//       method: 'POST',
//       body: JSON.stringify({ username, password, email }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const data = await res.json();
//     if (res.ok) {
//       router.push('/confirm');
//     } else {
//       setMsg(data.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-100 px-4">
//       <form 
//         onSubmit={handleSignUp} 
//         className="bg-white max-w-md w-full rounded-xl shadow-lg p-10 space-y-6"
//         aria-label="Signup form"
//       >
//         <h2 className="text-center text-3xl font-semibold text-indigo-700 mb-6">Create an Account</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email address"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           required
//         />

//         <button 
//           type="submit" 
//           className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
//         >
//           Sign Up
//         </button>

//         {msg && <p className="text-center text-sm text-red-600">{msg}</p>}

//         <div className="text-center text-sm text-indigo-600 mt-6">
//           Already have an account?{' '}
//           <Link href="/" className="font-medium hover:underline">
//             Back to Login
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }
