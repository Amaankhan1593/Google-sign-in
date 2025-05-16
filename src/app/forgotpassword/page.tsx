'use client';
import { useState } from "react";
import Link from "next/link";
import { forgotPassword } from "@/lib/cognito";
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg]     = useState("");
  const router = useRouter();

  const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMsg("✅ Code sent! Check your email.");
      router.push("/reset-password");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setMsg(`❌ ${errorMessage}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-100 px-4">
      <form 
        onSubmit={handleForgot} 
        className="bg-white max-w-md w-full rounded-xl shadow-lg p-10 space-y-6"
        aria-label="Forgot password form"
      >
        <h2 className="text-center text-3xl font-semibold text-indigo-700 mb-6">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button 
          type="submit" 
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Send Reset Code
        </button>

        {msg && <p className="text-center text-sm text-red-600">{msg}</p>}

        <div className="text-center text-sm text-indigo-600 mt-6">
          <Link href="/" className="font-medium hover:underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}


// 'use client';
// import { useState } from "react";
// import Link from "next/link";
// import { forgotPassword } from "@/lib/cognito";
// import { useRouter } from 'next/navigation';

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [msg, setMsg]     = useState("");
//   const router = useRouter();

//   const handleForgot = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await forgotPassword(email);
//       setMsg("✅ Code sent! Check your email.");
//       router.push("/reset-password");
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : 'Unknown error';
//       setMsg(`❌ ${errorMessage}`);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
//       <form onSubmit={handleForgot} className="bg-white p-8 rounded shadow-md w-[400px]">
//         <h2 className="text-center text-2xl mb-6">Forgot Password</h2>
//         <input
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           className="block w-full mb-4 p-2 border rounded"
//         />
//         <button type="submit" className="w-full py-2 bg-[navy] text-white rounded">
//           Send Code
//         </button>
//         <p className="mt-4 text-center">{msg}</p>
//         <div className="mt-6 text-center">
//           <Link href="/" className="text-blue-600 underline">
//             Back to Login
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }