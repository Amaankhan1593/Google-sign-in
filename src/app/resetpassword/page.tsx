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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       setError('');
//       await confirmPassword(username.trim(), code.trim(), newPassword);
      
//       router.push('/');
//     } catch (err: any) {
//       setError(err.message || 'Failed to reset password');
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
  const [username, setUsername]   = useState('');
  const [code, setCode]           = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError]         = useState('');
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
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F1]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-md shadow-lg w-[400px]"
      >
        <h2 className="text-center text-2xl font-semibold mb-6">
          Reset Password
        </h2>

        <div className="mb-5 pb-5 relative">
          <label htmlFor="username" className="text-gray-600 block mb-1">
            Email / Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your email or username"
            value={username}
            onChange={e => { setUsername(e.target.value); setError(''); }}
            className="w-full p-2 border-2 border-[#ECF0F1] rounded-md focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="mb-5 pb-5 relative">
          <label htmlFor="code" className="text-gray-600 block mb-1">
            Verification Code
          </label>
          <input
            type="text"
            id="code"
            placeholder="Enter code"
            value={code}
            onChange={e => { setCode(e.target.value); setError(''); }}
            className="w-full p-2 border-2 border-[#ECF0F1] rounded-md focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="mb-5 pb-5 relative">
          <label htmlFor="newPassword" className="text-gray-600 block mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={e => { setNewPassword(e.target.value); setError(''); }}
            className="w-full p-2 border-2 border-[#ECF0F1] rounded-md focus:outline-none focus:border-gray-500"
          />
        </div>

        {error && <p className="text-[orangered] text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[navy] text-white text-lg py-2 px-4 rounded-md border-2 border-[navy] hover:bg-blue-900 transition-colors cursor-pointer"
        >
          Reset Password
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