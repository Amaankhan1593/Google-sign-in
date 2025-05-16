// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { confirmPassword } from '@/lib/cognito';

// export default function ResetPasswordPage() {
//   const [username, setUsername]   = useState('');
//   const [code, setCode]           = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [error, setError]         = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       setError('');
//       await confirmPassword(username.trim(), code.trim(), newPassword);
//       router.push('/');
//     } catch (err: unknown) {
//       const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
//       setError(errorMessage);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-md shadow-lg w-[400px]"
//       >
//         <h2 className="text-center text-2xl font-semibold mb-6">
//           Reset Password
//         </h2>

//         <div className="mb-5 pb-5 relative">
//           <label htmlFor="username" className="text-gray-600 block mb-1">
//             Email / Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Enter your email or username"
//             value={username}
//             onChange={e => { setUsername(e.target.value); setError(''); }}
//             className="w-full p-2 border-2 border-[#ECF0F1] rounded-md focus:outline-none focus:border-gray-500"
//           />
//         </div>

//         <div className="mb-5 pb-5 relative">
//           <label htmlFor="code" className="text-gray-600 block mb-1">
//             Verification Code
//           </label>
//           <input
//             type="text"
//             id="code"
//             placeholder="Enter code"
//             value={code}
//             onChange={e => { setCode(e.target.value); setError(''); }}
//             className="w-full p-2 border-2 border-[#ECF0F1] rounded-md focus:outline-none focus:border-gray-500"
//           />
//         </div>

//         <div className="mb-5 pb-5 relative">
//           <label htmlFor="newPassword" className="text-gray-600 block mb-1">
//             New Password
//           </label>
//           <input
//             type="password"
//             id="newPassword"
//             placeholder="Enter new password"
//             value={newPassword}
//             onChange={e => { setNewPassword(e.target.value); setError(''); }}
//             className="w-full p-2 border-2 border-[#ECF0F1] rounded-md focus:outline-none focus:border-gray-500"
//           />
//         </div>

//         {error && <p className="text-[orangered] text-sm mb-4">{error}</p>}

//         <button
//           type="submit"
//           className="w-full bg-[navy] text-white text-lg py-2 px-4 rounded-md border-2 border-[navy] hover:bg-blue-900 transition-colors cursor-pointer"
//         >
//           Reset Password
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
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { confirmPassword } from '@/lib/cognito';

export default function ResetPasswordPage() {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError('');
      await confirmPassword(username.trim(), code.trim(), newPassword);
      router.push('/');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset password';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🔒 Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Email / Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="e.g. john.doe@example.com"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Code Field */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              placeholder="Enter the code you received"
              value={code}
              onChange={e => { setCode(e.target.value); setError(''); }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* New Password Field */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={e => { setNewPassword(e.target.value); setError(''); }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium text-lg transition"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-indigo-600 hover:underline text-sm">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
