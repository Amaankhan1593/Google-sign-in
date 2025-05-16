// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function ConfirmPage() {
//   const [code, setCode]   = useState('');
//   const [error, setError] = useState('');
//   const [msg, setMsg]     = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch('/api/auth/confirm', {
//       method: 'POST',
//       body: JSON.stringify({ code }), // username removed
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
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-100 px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white max-w-md w-full rounded-xl shadow-lg p-10 space-y-6"
//       >
//         <h2 className="text-center text-3xl font-semibold text-indigo-700 mb-2">
//           Confirm Your Account
//         </h2>

//         <p className="text-center text-gray-600 text-sm">
//           Enter the verification code sent to your email.
//         </p>

//         <input
//           type="text"
//           placeholder="Verification Code"
//           value={code}
//           onChange={(e) => {
//             setCode(e.target.value);
//             setError('');
//             setMsg('');
//           }}
//           className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 ${
//             error && !code.trim()
//               ? 'border-red-500 focus:ring-red-300'
//               : 'border-gray-300 focus:ring-indigo-500'
//           }`}
//           required
//         />

//         {error && <p className="text-red-600 text-sm">{error}</p>}
//         {msg && <p className="text-green-600 text-sm">{msg}</p>}

//         <button
//           type="submit"
//           className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
//         >
//           Verify Account
//         </button>

//         <div className="text-center text-sm text-indigo-600 mt-4">
//           <Link href="/" className="font-medium hover:underline">
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
  const [code, setCode]         = useState('');
  const [error, setError]       = useState('');
  const [msg, setMsg]           = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/confirm', {
      method: 'POST',
      body: JSON.stringify({ username: username, code: code }),
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
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-lg w-[400px]"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          Confirm Account
        </h2>

        
        <div className="mb-5 pb-5 relative">
          <label htmlFor="username" className="text-gray-600 block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => { setUsername(e.target.value); setError(''); setMsg(''); }}
            className={`w-full p-2 border-2 rounded-md focus:outline-none ${
              error && !username.trim() ? 'border-red-500' : 'border-[#ECF0F1] focus:border-gray-500'
            }`}
          />
        </div>

        
        <div className="mb-5 pb-5 relative">
          <label htmlFor="code" className="text-gray-600 block mb-1">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            placeholder="Enter the code"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(''); setMsg(''); }}
            className={`w-full p-2 border-2 rounded-md focus:outline-none ${
              error && !code.trim() ? 'border-red-500' : 'border-[#ECF0F1] focus:border-gray-500'
            }`}
          />
        </div>

        
        {error && (
          <p className="text-[orangered] text-sm mb-4">{error}</p>
        )}
        {msg && (
          <p className="text-green-600 text-sm mb-4">{msg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[navy] text-white text-lg py-2 px-4 rounded-md border-2 border-[navy] hover:bg-blue-900 transition-colors cursor-pointer"
        >
          Verify Account
        </button>

        <div className="mt-6 text-center">
          <Link href="/" className="text-blue-600 underline">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}