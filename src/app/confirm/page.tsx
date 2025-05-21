// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function ConfirmPage() {
//   const [username, setUsername] = useState('');
//   const [code, setCode]         = useState('');
//   const [error, setError]       = useState('');
//   const [msg, setMsg]           = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await fetch('/api/auth/confirm', {
//       method: 'POST',
//       body: JSON.stringify({ username: username, code: code }),
//       headers: { 'Content-Type': 'application/json' },
//     });
//     const data = await res.json();
//     if (res.ok) {
//       router.push('/');
//     } else {
//       setError(data.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-md shadow-lg w-[400px]"
//       >
//         <h2 className="text-center text-2xl font-semibold mb-6">
//           Confirm Account
//         </h2>

        
//         <div className="mb-5 pb-5 relative">
//           <label htmlFor="username" className="text-gray-600 block mb-1">
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Enter your username"
//             value={username}
//             onChange={(e) => { setUsername(e.target.value); setError(''); setMsg(''); }}
//             className={`w-full p-2 border-2 rounded-md focus:outline-none ${
//               error && !username.trim() ? 'border-red-500' : 'border-[#ECF0F1] focus:border-gray-500'
//             }`}
//           />
//         </div>

        
//         <div className="mb-5 pb-5 relative">
//           <label htmlFor="code" className="text-gray-600 block mb-1">
//             Verification Code
//           </label>
//           <input
//             type="text"
//             id="code"
//             placeholder="Enter the code"
//             value={code}
//             onChange={(e) => { setCode(e.target.value); setError(''); setMsg(''); }}
//             className={`w-full p-2 border-2 rounded-md focus:outline-none ${
//               error && !code.trim() ? 'border-red-500' : 'border-[#ECF0F1] focus:border-gray-500'
//             }`}
//           />
//         </div>

        
//         {error && (
//           <p className="text-[orangered] text-sm mb-4">{error}</p>
//         )}
//         {msg && (
//           <p className="text-green-600 text-sm mb-4">{msg}</p>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-[navy] text-white text-lg py-2 px-4 rounded-md border-2 border-[navy] hover:bg-blue-900 transition-colors cursor-pointer"
//         >
//           Verify Account
//         </button>

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
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ConfirmPage() {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/confirm', {
      method: 'POST',
      body: JSON.stringify({ username, code }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/');
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md w-full max-w-md p-10 rounded-3xl shadow-2xl border border-indigo-200 transition-all duration-300"
      >
        <h2 className="text-center text-3xl font-extrabold text-indigo-800 mb-8 tracking-wide drop-shadow-md">
          🔐 Confirm Your Account
        </h2>

        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 mb-2 font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
              setMsg('');
            }}
            placeholder="Enter your username"
            className={`w-full px-4 py-3 rounded-xl border-2 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all ${
              error && !username.trim()
                ? 'border-red-500'
                : 'border-gray-200 focus:border-indigo-500'
            }`}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="code" className="block text-gray-700 mb-2 font-medium">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError('');
              setMsg('');
            }}
            placeholder="Enter the verification code"
            className={`w-full px-4 py-3 rounded-xl border-2 bg-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all ${
              error && !code.trim()
                ? 'border-red-500'
                : 'border-gray-200 focus:border-indigo-500'
            }`}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium">{error}</p>
        )}
        {msg && (
          <p className="text-green-600 text-sm mb-4 text-center font-medium">{msg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-800 text-white font-semibold text-lg py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          ✅ Confirm Account
        </button>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-indigo-600 hover:underline text-sm font-medium">
            ⬅ Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
