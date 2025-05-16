// 'use client';
// import { useState } from "react";
// import Link from "next/link";
// import { forgotPassword } from "@/lib/cognito";
// import { useRouter } from 'next/navigation';

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState("");
//   const [msg, setMsg]     = useState("");
//   const router = useRouter();

//   const handleForgot = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await forgotPassword(email);
//       setMsg("✅ Code sent! Check your email.");
//       router.push("/reset-password");
//     } catch (err: any) {
//       setMsg(`❌ ${err.message}`);
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
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
      <form onSubmit={handleForgot} className="bg-white p-8 rounded shadow-md w-[400px]">
        <h2 className="text-center text-2xl mb-6">Forgot Password</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full py-2 bg-[navy] text-white rounded">
          Send Code
        </button>
        <p className="mt-4 text-center">{msg}</p>
        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}